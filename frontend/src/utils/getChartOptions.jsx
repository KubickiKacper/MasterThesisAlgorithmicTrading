import {CHART_OPTIONS, LINE_COLORS} from "@utils/consts.jsx";

function getChartOptions(series, annotations) {
    const seriesColors = series.map((s) => {
        if (s.type === "line") {
            return LINE_COLORS[s.name] || LINE_COLORS.DEFAULT
        }
        return undefined
    })

    return {
        ...CHART_OPTIONS,
        annotations: {xaxis: annotations},
        stroke: {
            ...CHART_OPTIONS.stroke,
            curve: "straight",
            width: series.map((s) => (s.type === "line" ? 2 : 1)),
            colors: seriesColors,
        },
        fill: {
            ...CHART_OPTIONS.fill,
            opacity: series.map((s) => (s.type === "line" ? 1 : 0.8)),
        },
    };
}

export default getChartOptions;