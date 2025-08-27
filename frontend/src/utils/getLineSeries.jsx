export default function getLineSeries(chartData) {
    const candlestickData = chartData?.series?.[0]?.data || []

    const lineKeys = candlestickData.length > 0
        ? Object.keys(candlestickData[0]).filter((key) => key.endsWith("_line_value"))
        : []

    return lineKeys.map((key) => {
        const lineName = key.replace("_line_value", "").toUpperCase()
        return {
            name: lineName,
            type: "line",
            data: candlestickData.map((item) => ({
                x: new Date(item.x),
                y: item[key],
            })),
        }
    })
}