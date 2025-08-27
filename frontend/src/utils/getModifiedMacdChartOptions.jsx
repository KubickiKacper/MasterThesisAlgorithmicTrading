export default function getModifiedMacdChartOptions(macdSeries) {
    return macdSeries?.map((series) => ({
        ...series,
        type: series.name === "macd_histogram" ? "bar" : "line",
    })) || []
}
