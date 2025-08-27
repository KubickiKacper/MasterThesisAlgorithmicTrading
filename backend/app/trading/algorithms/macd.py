def macd_based(market_data, first_day_buy=False):
    def calculate_macd(data, short_window=12, long_window=26, signal_window=9):
        short_ema = data['Close'].ewm(span=short_window, adjust=False).mean()
        long_ema = data['Close'].ewm(span=long_window, adjust=False).mean()
        macd = short_ema - long_ema
        signal = macd.ewm(span=signal_window, adjust=False).mean()
        histogram = macd - signal
        return macd, signal, histogram

    market_data = market_data.copy()
    market_data['MACD'], market_data['macd_signal_line'], market_data['macd_histogram'] = calculate_macd(market_data)
    line_values_dict = {
        "macd": market_data['MACD'].tolist(),
        "macd_signal_line": market_data['macd_signal_line'].tolist(),
        "macd_histogram": market_data['macd_histogram'].tolist()
    }

    signals = []
    position = first_day_buy
    last_signal = "BUY" if first_day_buy else None

    if first_day_buy:
        signals.append({"x": market_data.index[0].strftime('%Y-%m-%d'), "text": "BUY"})

    for i in range(1, len(market_data)):
        current_macd = market_data['MACD'].iloc[i]
        prev_macd = market_data['MACD'].iloc[i - 1]
        current_signal = market_data['macd_signal_line'].iloc[i]
        prev_signal = market_data['macd_signal_line'].iloc[i - 1]

        if not position and prev_macd <= prev_signal and current_macd > current_signal and last_signal != "BUY":
            signals.append({"x": market_data.index[i].strftime('%Y-%m-%d'), "text": "BUY"})
            position = True
            last_signal = "BUY"
        elif position and last_signal == "BUY" and prev_macd >= prev_signal and current_macd < current_signal:
            signals.append({"x": market_data.index[i].strftime('%Y-%m-%d'), "text": "SELL"})
            position = False
            last_signal = "SELL"

    return line_values_dict, signals