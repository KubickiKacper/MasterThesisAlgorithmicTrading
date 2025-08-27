import {CHART_OPTIONS, LINE_COLORS} from "@utils/consts.jsx";

export default function getRSIChartOptions(annotations) {
    return {
        ...CHART_OPTIONS,
        chart: {
            ...CHART_OPTIONS.chart,
            id: "rsi-chart",
            height: 200,
            zoom: {
                enabled: true,
            },
        },

        title: {
            text: "RSI",
            align: "left",
            labels: {style: {colors: "#ccc"}}
        },
        xaxis: {
            type: "datetime",
            title: {
                text: "Data",
                style: {
                    color: "#ccc",
                },
            },
            labels: {
                style: {
                    colors: "#ccc",
                },
            },
        },
        yaxis: {
            min: 0,
            max: 100,
            tickAmount: 5,
            title: {
                text: "Wartość",
                style: {
                    color: "#ccc",
                },
            },
            labels: {
                style: {
                    colors: "#ccc",
                },
                formatter: (value) => value.toFixed(0),
            },
        },
        annotations: {
            xaxis: annotations,
            yaxis: [
                {
                    y: 70,
                    borderColor: '#FF4560',
                    label: {
                        borderColor: '#FF4560',
                        style: {
                            color: '#fff',
                            background: '#FF4560',
                        },
                        text: 'Overbought (70)',
                    },
                },
                {
                    y: 30,
                    borderColor: '#00E396',
                    label: {
                        borderColor: '#00E396',
                        style: {
                            color: '#fff',
                            background: '#00E396',
                        },
                        text: 'Oversold (30)',
                    },
                },
            ],
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        colors: [LINE_COLORS.RSI],
    }
}