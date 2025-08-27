export const apiUrl = 'http://127.0.0.1:5000/'

export const LINE_COLORS = {
  "SHORT MA": '#3399ff',
  "LONG MA": '#00e396',
  "RSI": '#FF9900',
  "MIDDLE_BAND": '#cccccc',
  "UPPER_BAND": '#FF4560',
  "LOWER_BAND": '#00E396',
  "macd": '#FF4560',
  "macd_signal_line": '#00E396',
  "macd_histogram": '#775DD0',
  "volume": '#3399ff',
  "DEFAULT": '#3399ff',

}

export const CHART_OPTIONS = {
  chart: {
    type: "candlestick",
    height: 350,
    animations: {
      enabled: false,
    },
    zoom: {
      enabled: true,
      type: 'x',
      autoScaleYaxis: true,
    }
  },
  xaxis: {
    type: "datetime",
    labels: {style: {colors: "#ccc"}}
  },
  yaxis: {
    tooltip: {enabled: true},
    labels: {
      style: {colors: "#ccc"},
      formatter: (value) => value.toFixed(2),
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    borderColor: "#444"
  },
}