import {useEffect} from "react"
import "./CandlestickChart.css"
import Chart from "react-apexcharts"
import {apiUrl} from "@utils/consts"
import useData from "@hooks/useData"
import getMacdChartOptions from "@utils/getMacdChartOptions"
import getModifiedMacdChartOptions from "@utils/getModifiedMacdChartOptions.jsx"
import getChartOptions from "@utils/getChartOptions.jsx";
import getAnnotations from "@utils/getAnnotations.jsx";
import getLineSeries from "@utils/getLineSeries.jsx";
import getVolumeChartOptions from "@utils/getVolumeChartOptions.jsx";
import getRSIChartOptions from "@utils/getRSIChartOptions.jsx";
import getOBVChartOptions from "@utils/getOBVChartOptions.jsx";

function CandlestickChart({requestData, onProfitDataUpdate}) {
  const ENDPOINT = "/market/"
  const {data: chartData, loading, error} = useData(apiUrl + ENDPOINT, requestData)
  const profitData = {
    profit_percentage: chartData?.profit_percentage || 0,
    algorithm_profit_percentage: chartData?.algorithm_profit_percentage || 0,
  }
  const rsiSeries = chartData?.rsi_series
  const macdSeries = chartData?.macd_series
  const obvSeries = chartData?.obv_series
  const volumeSeries = chartData?.volume_series

  useEffect(() => {
    if (chartData && onProfitDataUpdate) {
      onProfitDataUpdate(profitData)
    }
  }, [chartData, onProfitDataUpdate])

  const lineSeries = getLineSeries(chartData)

  const series = []
  if (chartData?.series) {
    const candlestickSeries = {
      ...chartData.series[0],
      type: "candlestick",
    }
    series.push(candlestickSeries)
    if (lineSeries.length > 0) {
      series.push(...lineSeries)
    }
  }

  const annotations = getAnnotations(chartData)
  const chartOptions = getChartOptions(series, annotations)
  const macdChartOptions = getMacdChartOptions(macdSeries, annotations)
  const modifiedMacdSeries = getModifiedMacdChartOptions(macdSeries)
  const volumeChartOptions = getVolumeChartOptions(annotations)
  const rsiChartOptions = getRSIChartOptions(annotations)
  const obvChartOptions = getOBVChartOptions(annotations)

  return (
      <div className="chart-container">
        <div className="chart-header">
          <h2 className="chart-title">Market Analysis</h2>
          <div className="chart-indicators">
            <div className="indicator active">Price Action</div>
            {rsiSeries && <div className="indicator">RSI</div>}
            {macdSeries && <div className="indicator">MACD</div>}
            {obvSeries && <div className="indicator">OBV</div>}
          </div>
        </div>

        {loading && (
            <div className="chart-state">
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <div className="loading-text">Analyzing market data...</div>
                <div className="loading-subtext">Please wait while we process the latest information</div>
              </div>
            </div>
        )}

        {error && (
            <div className="chart-state">
              <div className="error-container">
                <div className="error-icon">⚠</div>
                <div className="error-text">Unable to load market data</div>
                <div className="error-subtext">{error.message}</div>
              </div>
            </div>
        )}

        {!loading && !error && chartData?.series && (
            <div className="charts-grid">
              <div className="main-chart">
                <Chart options={chartOptions} series={series} type="candlestick" height={400}/>
              </div>

              {rsiSeries && (
                  <div className="indicator-chart">
                    <div className="chart-label">Relative Strength Index (RSI)</div>
                    <Chart options={rsiChartOptions} series={rsiSeries} type="line" height={180}/>
                  </div>
              )}

              {macdSeries && (
                  <div className="indicator-chart">
                    <div className="chart-label">MACD Convergence Divergence</div>
                    <Chart
                        options={macdChartOptions}
                        series={modifiedMacdSeries}
                        type="bar"
                        height={180}
                    />
                  </div>
              )}

              {obvSeries && (
                  <div className="indicator-chart">
                    <div className="chart-label">On-Balance Volume (OBV)</div>
                    <Chart options={obvChartOptions} series={obvSeries} type="line" height={180}/>
                  </div>
              )}

              {volumeSeries && (
                  <div className="indicator-chart">
                    <div className="chart-label">Volume</div>
                    <Chart options={volumeChartOptions} series={volumeSeries} type="bar" height={180}/>
                  </div>
              )}
            </div>
        )}
      </div>
  )
}

export default CandlestickChart