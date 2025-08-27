from flask import request
from flask_restx import Namespace, Resource
from http import HTTPStatus
import numpy as np
import pandas as pd
from app.trading.market import get_market_data, calculate_profit, calculate_algorithm_profit
from app.trading.algorithms import ALGORITHM_FUNCTIONS, EXTRA_INDICATORS
from app.docs.models import post_market_request

ns = Namespace("market", description="Market Data API")


def handle_algorithm(algorithm_func, market_data, first_day_buy):
    line_values_dict, signals = algorithm_func(market_data, first_day_buy=first_day_buy)
    algorithm_profit = calculate_algorithm_profit(market_data, signals) if algorithm_func != ALGORITHM_FUNCTIONS[
        "none"] else 0
    return line_values_dict, signals, algorithm_profit


@ns.route("/")
class Market(Resource):
    @ns.expect(post_market_request)
    def post(self):
        data = request.get_json()
        ticker = data.get("ticker", "^NDX")
        start_date = data.get("start_date")
        end_date = data.get("end_date")
        interval = data.get("interval")
        first_day_buy = data.get("first_day_buy")
        algorithm = data.get("algorithm", "moving_average")

        market_data = get_market_data(ticker, start_date, end_date, interval)
        profit = calculate_profit(market_data)

        algorithm_func = ALGORITHM_FUNCTIONS.get(algorithm, ALGORITHM_FUNCTIONS["none"])
        line_values_dict, signals, algorithm_profit = handle_algorithm(algorithm_func, market_data, first_day_buy)

        for line_name, line_values in line_values_dict.items():
            line_values_dict[line_name] = [
                float(val) if not pd.isna(val) and not np.isinf(val) else 0
                for val in line_values
            ]

        response_data = []
        rsi_data = []
        macd_data = []
        macd_signal_line_data = []
        macd_histogram_data = []
        obv_data = []
        volume_data = []
        vwap_data = []

        for i, (index, row) in enumerate(market_data.iterrows()):
            candle_data = {
                "x": index.strftime('%Y-%m-%d'),
                "y": row[["Open", "High", "Low", "Close"]].tolist(),
            }
            for line_name, line_values in line_values_dict.items():
                if line_name not in EXTRA_INDICATORS:
                    candle_data[f"{line_name}_line_value"] = line_values[i]
                if line_name == "rsi" and algorithm == "rsi_based":
                    rsi_data.append({
                        "x": index.strftime('%Y-%m-%d'),
                        "y": line_values[i]
                    })
                elif algorithm == "MACD":
                    if line_name == "macd":
                        macd_data.append({
                            "x": index.strftime('%Y-%m-%d'),
                            "y": line_values[i]
                        })
                    if line_name == "macd_signal_line":
                        macd_signal_line_data.append({
                            "x": index.strftime('%Y-%m-%d'),
                            "y": line_values[i]
                        })
                    if line_name == "macd_histogram":
                        macd_histogram_data.append({
                            "x": index.strftime('%Y-%m-%d'),
                            "y": line_values[i]
                        })
                elif line_name == "obv" and algorithm == "OBV":
                    obv_data.append({
                        "x": index.strftime('%Y-%m-%d'),
                        "y": line_values[i]
                    })
                    volume_data.append({
                        "x": index.strftime('%Y-%m-%d'),
                        "y": row["Volume"].tolist()
                    })
                elif algorithm == "vwap_revision":
                    vwap_data.append({
                        "x": index.strftime('%Y-%m-%d'),
                        "y": line_values[i]
                    })
                    volume_data.append({
                        "x": index.strftime('%Y-%m-%d'),
                        "y": row["Volume"].tolist()
                    })
            response_data.append(candle_data)

        profit = float(profit) if not pd.isna(profit) and not np.isinf(profit) else 0
        algorithm_profit = float(algorithm_profit) if not pd.isna(algorithm_profit) and not np.isinf(
            algorithm_profit) else 0

        response = {
            "series": [
                {
                    "name": ticker,
                    "data": response_data,
                }
            ],
            "signals": signals,
            "profit_percentage": profit,
            "algorithm_profit_percentage": algorithm_profit
        }

        if algorithm == 'rsi_based':
            response["rsi_series"] = [{"name": "RSI", "data": rsi_data}]
        elif algorithm == 'MACD':
            response["macd_series"] = [
                {"name": "macd", "data": macd_data},
                {"name": "macd_signal_line", "data": macd_signal_line_data},
                {"name": "macd_histogram", "data": macd_histogram_data}
            ]
        elif algorithm == 'OBV':
            response["obv_series"] = [
                {"name": "OBV", "data": obv_data},
            ]
            response["volume_series"] = [
                {"name": "volume", "data": volume_data}
            ]
        elif algorithm == 'vwap_revision':
            response["vwap_series"] = [
                {"name": "VWAP", "data": vwap_data},
            ]
            response["volume_series"] = [
                {"name": "volume", "data": volume_data}
            ]
        return response, HTTPStatus.OK
