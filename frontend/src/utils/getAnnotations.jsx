export default function getAnnotations(chartData) {
    return chartData?.signals?.map((signal) => {
        const color = signal.text === "BUY" ? "#00E396" : "#FF4560"
        return {
            x: new Date(signal.x).getTime(),
            borderColor: color,
            label: {
                borderColor: color,
                style: {
                    fontSize: "12px",
                    color: "#fff",
                    background: color,
                },
                orientation: "horizontal",
                text: signal.text,
            },
        }
    }) || []
}
