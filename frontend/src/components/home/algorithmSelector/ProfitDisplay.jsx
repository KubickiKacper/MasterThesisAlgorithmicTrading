import "./ProfitDisplay.css"

function ProfitDisplay({profitData}) {
    const totalProfit = profitData.profit_percentage || 0;
    const algorithmProfit = profitData.algorithm_profit_percentage || 0;

    return (
        <div className="profit-display">
            <div className="profit-header">
                <h4 className="profit-title">Performance Metrics</h4>
            </div>

            <div className="profit-metrics">
                <div className="profit-item">
                    <div className="profit-info">
                        <span className="profit-label">Total Return</span>
                        <span className="profit-description">Overall portfolio performance</span>
                    </div>
                    <div className="profit-value-container">
            <span className={`profit-value ${totalProfit >= 0 ? 'positive' : 'negative'}`}>
              {totalProfit >= 0 ? '+' : ''}{totalProfit.toFixed(2)}%
            </span>
                        <div className={`profit-indicator ${totalProfit >= 0 ? 'positive' : 'negative'}`}>
                            {totalProfit >= 0 ? '↗' : '↘'}
                        </div>
                    </div>
                </div>

                <div className="profit-item">
                    <div className="profit-info">
                        <span className="profit-label">Algorithm Return</span>
                        <span className="profit-description">Strategy performance</span>
                    </div>
                    <div className="profit-value-container">
            <span className={`profit-value ${algorithmProfit >= 0 ? 'positive' : 'negative'}`}>
              {algorithmProfit >= 0 ? '+' : ''}{algorithmProfit.toFixed(2)}%
            </span>
                        <div className={`profit-indicator ${algorithmProfit >= 0 ? 'positive' : 'negative'}`}>
                            {algorithmProfit >= 0 ? '↗' : '↘'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfitDisplay