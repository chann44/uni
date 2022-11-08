import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const ChartComponent = (props: any) => {
    const {
        data,
        backgroundColor = 'black',
        lineColor = 'green',
        textColor = 'white',
        areaTopColor = 'red',
        areaBottomColor = 'yellow',
    } = props;
    const chartContainerRef = useRef(null);
    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    backgroundColor: "#212C3A",
                    textColor: "#d1d4dc",
                },
                width: chartContainerRef.current.clientWidth,
                height: 400,
                localization: {
                    locale: "en-US",
                },
                timeScale: {
                    timeVisible: true,
                    secondsVisible: true,
                    fixLeftEdge: true,
                    fixRightEdge: true,
                },
                rightPriceScale: {
                    visible: false,
                },
                leftPriceScale: {
                    scaleMargins: {
                        top: 0.2,
                        bottom: 0.2,
                    },
                    borderVisible: false,
                    visible: true,
                },
                crosshair: {
                    vertLine: {
                        labelVisible: false,
                    },
                },
                grid: {
                    vertLines: {
                        color: "rgba(42, 46, 57, 0)",
                    },
                    horzLines: {
                        color: "rgba(42, 46, 57, 0.6)",
                    },
                },
            });
            chart.timeScale().fitContent();
            const newSeries = chart.addAreaSeries({
                topColor: "rgba(38,198,218, 0.56)",
                bottomColor: "rgba(38,198,218, 0.04)",
                lineColor: "rgba(38,198,218, 1)",
                lineWidth: 2,
            });
            newSeries.setData(data);
            const histogram_series = chart.addHistogramSeries({
                color: "#26a69a",
                priceFormat: {
                    type: "volume",
                },
                priceScaleId: "",
                scaleMargins: {
                    top: 0.8,
                    bottom: 0,
                },
            });
            histogram_series.setData(data)
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
                chart.remove();
            };
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );

    return (
        <div
            ref={chartContainerRef}
        />
    );
};

const initialData = [
    { time: '2018-12-22', value: 32.51 },
    { time: '2018-12-23', value: 31.11 },
    { time: '2018-12-24', value: 27.02 },
    { time: '2018-12-25', value: 27.32 },
    { time: '2018-12-26', value: 25.17 },
    { time: '2018-12-27', value: 28.89 },
    { time: '2018-12-28', value: 25.46 },
    { time: '2018-12-29', value: 23.92 },
    { time: '2018-12-30', value: 22.68 },
    { time: '2018-12-31', value: 22.67 },
];

export function DetailsChart(props) {
    return (
        <ChartComponent {...props} data={initialData}></ChartComponent>
    );
}