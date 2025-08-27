import {CHART_OPTIONS, LINE_COLORS} from "@utils/consts.jsx";

export default function getMacdChartOptions(macdSeries, annotations) {
    return {
        ...CHART_OPTIONS,
        annotations: {xaxis: annotations},
        chart: {
            ...CHART_OPTIONS.chart,
            type: "bar",
        },
        plotOptions: {
            bar: {
                columnWidth: "50%",
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            ...CHART_OPTIONS.stroke,
            curve: "straight",
            width: macdSeries?.map((s) => (s.name === "macd_histogram" ? 0 : 2)) || [2, 2, 0], // Brak linii dla histogramu
        },
        fill: {
            ...CHART_OPTIONS.fill,
            opacity: macdSeries?.map((s) => (s.name === "macd_histogram" ? 0.6 : 1)) || [1, 1, 0.6],
        },
        colors: macdSeries?.map((s) => LINE_COLORS[s.name] || LINE_COLORS.DEFAULT) || [LINE_COLORS.DEFAULT],
        xaxis: {
            ...CHART_OPTIONS.xaxis,
            type: "datetime",
        },
        yaxis: {
            ...CHART_OPTIONS.yaxis,
            title: {
                text: "MACD",
            },
        },
    };
}
