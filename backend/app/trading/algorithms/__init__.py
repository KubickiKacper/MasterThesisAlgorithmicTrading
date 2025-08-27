from app.trading.algorithms.moving_average_crossover import moving_average_crossover
from app.trading.algorithms.rsi import rsi_based
from app.trading.algorithms.bollinger_bands import bollinger_bands
from app.trading.algorithms.macd import macd_based
from app.trading.algorithms.on_balance_volume import obv_divergence
from app.trading.algorithms.vwap_revision import vwap_revision

ALGORITHM_FUNCTIONS = {
    "none": lambda market_data, first_day_buy: ({}, []),
    "MAC": moving_average_crossover,
    "rsi_based": rsi_based,
    "bollinger_bands": bollinger_bands,
    "MACD": macd_based,
    "OBV": obv_divergence,
    "vwap_revision": vwap_revision,
}

EXTRA_INDICATORS = ["rsi", "macd", "macd_signal_line", "macd_histogram", "obv"]
