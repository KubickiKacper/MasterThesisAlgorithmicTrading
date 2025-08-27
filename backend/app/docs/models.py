from flask_restx import fields

from app.extensions import api

post_market_request = api.model("MarketRequest", {
    "ticker": fields.String(required=True, example="AAPL"),
    "start_date": fields.String(required=True, example="2024-02-01"),
    "end_date": fields.String(required=True, example="2024-02-28"),
    "interval": fields.String(required=True, example="1d"),
    "first_day_buy": fields.Boolean(required=True, example=False),
    "algorithm": fields.String(required=True, example="moving_average"),
})