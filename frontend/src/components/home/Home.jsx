import './Home.css'
import {useState, useCallback} from "react"
import CandlestickChart from "./candlestickChart/CandlestickChart"
import StockSelector from "./stockSelector/StockSelector"
import AlgorithmSelector from "./algorithmSelector/AlgorithmSelector"

function Home() {
  const [requestData, setRequestData] = useState({
    ticker: "^NDX",
    start_date: "2024-05-01",
    end_date: "2025-05-31",
    interval: "1wk",
    algorithm: "moving_average",
    first_day_buy: false,
  })

  const [profitData, setProfitData] = useState({
    profit_percentage: 0,
    algorithm_profit_percentage: 0,
  })

  const handleStockSubmit = (stockData) => {
    setRequestData((prev) => ({...prev, ...stockData}))
  }

  const handleAlgorithmSubmit = (algorithmData) => {
    setRequestData((prev) => ({...prev, ...algorithmData}))
  }

  const handleProfitDataUpdate = useCallback((newProfitData) => {
    setProfitData((prev) => {
      if (
          prev.profit_percentage !== newProfitData.profit_percentage ||
          prev.algorithm_profit_percentage !== newProfitData.algorithm_profit_percentage
      ) {
        return newProfitData
      }
      return prev
    })
  }, [])

  return (
      <div className='home-container'>
        <div className="sidebar-container">
          <AlgorithmSelector onSubmit={handleAlgorithmSubmit} profitData={profitData}/>
        </div>
        <div className="main-content">
          <div className="header-section">
            <h1 className="dashboard-title">Trading Analytics Dashboard</h1>
            <p className="dashboard-subtitle">Advanced market analysis with algorithmic trading insights</p>
          </div>
          <StockSelector onSubmit={handleStockSubmit}/>
          <CandlestickChart requestData={requestData} onProfitDataUpdate={handleProfitDataUpdate}/>
        </div>
      </div>
  )
}

export default Home