def moving_average_crossover(market_data, first_day_buy):
    short_window = 10
    long_window = 50

    market_data['Short_MA'] = market_data['Close'].rolling(window=short_window, min_periods=1).mean()
    market_data['Long_MA'] = market_data['Close'].rolling(window=long_window, min_periods=1).mean()

    line_values_dict = {
        'short ma': market_data['Short_MA'].tolist(),
        'long ma': market_data['Long_MA'].tolist()
    }

    signals = []
    position = first_day_buy
    last_signal = "BUY" if first_day_buy else None

    if first_day_buy:
        signals.append({"x": market_data.index[0].strftime('%Y-%m-%d'), "text": "BUY"})

    for i in range(1, len(market_data)):
        current_short = market_data['Short_MA'].iloc[i]
        current_long = market_data['Long_MA'].iloc[i]
        prev_short = market_data['Short_MA'].iloc[i - 1]
        prev_long = market_data['Long_MA'].iloc[i - 1]

        if not position and prev_short <= prev_long and current_short > current_long and last_signal != "BUY":
            signals.append({"x": market_data.index[i].strftime('%Y-%m-%d'), "text": "BUY"})
            position = True
            last_signal = "BUY"

        elif position and prev_short >= prev_long and current_short < current_long and last_signal != "SELL":
            signals.append({"x": market_data.index[i].strftime('%Y-%m-%d'), "text": "SELL"})
            position = False
            last_signal = "SELL"

    return line_values_dict, signals