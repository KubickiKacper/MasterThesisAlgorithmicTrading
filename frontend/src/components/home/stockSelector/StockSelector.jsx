import { useState } from "react";
import "./StockSelector.css";

function StockSelector({ onSubmit }) {
    const [formData, setFormData] = useState({
        ticker: "^NDX",
        start_date: "2024-05-01",
        end_date: "2025-05-31",
        interval: "1wk"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="stock-selector">
            <div className="selector-header">
                <h3 className="selector-title">Market Data Configuration</h3>
                <p className="selector-subtitle">Configure your market analysis parameters</p>
            </div>

            <form className="selector-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="input-group">
                        <label className="input-label">
                            Ticker Symbol
                            <input
                                type="text"
                                name="ticker"
                                value={formData.ticker}
                                onChange={handleInputChange}
                                className="text-input"
                                placeholder="e.g., ^NDX, AAPL"
                            />
                        </label>
                    </div>

                    <div className="input-group">
                        <label className="input-label">
                            Time Interval
                            <select
                                name="interval"
                                value={formData.interval}
                                onChange={handleInputChange}
                                className="select-input"
                            >
                                <option value="1d">Daily</option>
                                <option value="1wk">Weekly</option>
                                <option value="1mo">Monthly</option>
                            </select>
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-group">
                        <label className="input-label">
                            Start Date
                            <input
                                type="date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleInputChange}
                                className="date-input"
                            />
                        </label>
                    </div>

                    <div className="input-group">
                        <label className="input-label">
                            End Date
                            <input
                                type="date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleInputChange}
                                className="date-input"
                            />
                        </label>
                    </div>
                </div>

                <button type="submit" className="submit-button">
                    <span>Update Analysis</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                        <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/>
                    </svg>
                </button>
            </form>
        </div>
    );
}

export default StockSelector;