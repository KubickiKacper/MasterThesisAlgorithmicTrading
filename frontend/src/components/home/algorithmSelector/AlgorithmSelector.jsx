import {useState} from "react"
import "./AlgorithmSelector.css"
import ProfitDisplay from "./ProfitDisplay"

function AlgorithmSelector({onSubmit, profitData}) {
    const [algorithm, setAlgorithm] = useState("moving_average")
    const [firstDayBuy, setFirstDayBuy] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({algorithm, first_day_buy: firstDayBuy})
    }

    return (
        <div className="algorithm-selector">
            <div className="selector-header">
                <h3 className="selector-title">Algorithm Settings</h3>
                <p className="selector-subtitle">Configure your trading strategy</p>
            </div>

            <ProfitDisplay profitData={profitData}/>

            <form className="selector-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="input-label">
                        Trading Algorithm
                        <select
                            value={algorithm}
                            onChange={(e) => setAlgorithm(e.target.value)}
                            className="select-input"
                        >
                            <option value="none">None</option>
                            <option value="MAC">Moving Average Crossover</option>
                            <option value="MACD">Moving Average Convergence Divergence</option>
                            <option value="rsi_based">Relative Strength Index</option>
                            <option value="bollinger_bands">Bollinger Bands</option>
                            <option value="OBV">On-Balance Volume</option>
                            <option value="vwap_revision">VWAP Revision</option>
                        </select>
                    </label>
                </div>

                <div className="input-group">
                    <label className="toggle-label">
                        <span className="toggle-text">First Day Buy</span>
                        <div className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={firstDayBuy}
                                onChange={(e) => setFirstDayBuy(e.target.checked)}
                            />
                            <span className="slider"></span>
                        </div>
                    </label>
                </div>

                <button type="submit" className="submit-button">
                    <span>Apply Strategy</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </button>
            </form>
        </div>
    )
}

export default AlgorithmSelector