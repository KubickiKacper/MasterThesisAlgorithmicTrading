def obv_divergence(market_data, first_day_buy=False):
    obv = [0]
    for i in range(1, len(market_data)):
        if market_data['Close'].iloc[i].item() > market_data['Close'].iloc[i - 1].item():
            obv.append(obv[-1] + market_data['Volume'].iloc[i].item())
        elif market_data['Close'].iloc[i].item() < market_data['Close'].iloc[i - 1].item():
            obv.append(obv[-1] - market_data['Volume'].iloc[i].item())
        else:
            obv.append(obv[-1])
    market_data['OBV'] = obv

    line_values_dict = {
        'obv': market_data['OBV'].tolist()
    }

    signals = []
    position = first_day_buy
    last_signal = "BUY" if first_day_buy else None

    if first_day_buy:
        signals.append({"x": market_data.index[0].strftime('%Y-%m-%d'), "text": "BUY"})

    bull_streak = 0
    bear_streak = 0

    for i in range(3, len(market_data)):
        price_diff = market_data['Close'].iloc[i].item() - market_data['Close'].iloc[i - 3].item()
        obv_diff = market_data['OBV'].iloc[i].item() - market_data['OBV'].iloc[i - 3].item()

        if obv_diff > 0 and price_diff <= 0:
            bull_streak += 1
            bear_streak = 0
            if bull_streak >= 3 and not position and last_signal != "BUY":
                signals.append({"x": market_data.index[i].strftime('%Y-%m-%d'), "text": "BUY"})
                position = True
                last_signal = "BUY"
        elif obv_diff < 0 and price_diff >= 0:
            bear_streak += 1
            bull_streak = 0
            if bear_streak >= 3 and position and last_signal != "SELL":
                signals.append({"x": market_data.index[i].strftime('%Y-%m-%d'), "text": "SELL"})
                position = False
                last_signal = "SELL"
        else:
            bull_streak = 0
            bear_streak = 0

    return line_values_dict, signals