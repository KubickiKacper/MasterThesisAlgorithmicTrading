import {CHART_OPTIONS, LINE_COLORS} from "@utils/consts.jsx";

export default function getVolumeChartOptions(annotations) {
    return {
        ...CHART_OPTIONS,
        chart: {
            type: 'bar',
        },
        annotations: {xaxis: annotations},
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            labels: {
                formatter: (value) => value.toFixed(0),
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