import {CHART_OPTIONS, LINE_COLORS} from "@utils/consts.jsx";

export default function getOBVChartOptions(annotations) {
    return {
        ...CHART_OPTIONS,
        annotations: {xaxis: annotations},
        yaxis: {
            labels: {
                formatter: (value) => value.toFixed(0),
                style: {
                    colors: "#ccc",
                },
            },

        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'straight',
            width: 1,
        },
        fill: {
            opacity: 0.8,
        },
        colors: [LINE_COLORS.volume],
    };
}