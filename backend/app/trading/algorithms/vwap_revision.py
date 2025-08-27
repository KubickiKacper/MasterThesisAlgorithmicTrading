def vwap_revision(market_data, first_day_buy=False, reset_period=100):
    vwap = []
    cumulative_price_volume = 0
    cumulative_volume = 0

    for i in range(len(market_data)):
        if i % reset_period == 0:
            cumulative_price_volume = 0
            cumulative_volume = 0

        pi = (market_data['High'].iloc[i].item() + market_data['Low'].iloc[i].item() + market_data['Close'].iloc[
            i].item()) / 3
        vi = market_data['Volume'].iloc[i].item()
        cumulative_price_volume += pi * vi
        cumulative_volume += vi
        vwap.append(cumulative_price_volume / cumulative_volume if cumulative_volume > 0 else 0)

    market_data = market_data.copy()
    market_data['VWAP'] = vwap

    line_values_dict = {
        'vwap': market_data['VWAP'].tolist()
    }

    signals = []
    position = first_day_buy
    last_signal = "BUY" if first_day_buy else None

    if first_day_buy:
        signals.append({"x": market_data.index[0].strftime('%Y-%m-%d'), "text": "BUY"})

    for i in range(1, len(market_data)):
        prev_price = market_data['Close'].iloc[i - 1].item()
        current_price = market_data['Close'].iloc[i].item()
        current_vwap = market_data['VWAP'].iloc[i].item()

        if (not position and current_price <= current_vwap and
                current_price >= prev_price and
                (last_signal == "SELL" or last_signal is None)):
            signals.append({"x": market_data.index[i].strftime('%Y-%m-%d'), "text": "BUY"})
            position = True
            last_signal = "BUY"


        elif position and last_signal == "BUY":
            target_price = current_vwap + 0.075 * current_vwap
            if current_price >= target_price:
                signals.append({"x": market_data.index[i].strftime('%Y-%m-%d'), "text": "SELL"})
                position = False
                last_signal = "SELL"

    return line_values_dict, signals
