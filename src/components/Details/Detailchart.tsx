import { IuNFTData } from "@/context/AppContextProvider";
import { getData } from "@/controllers/useNFTHistory";
import { HIstoryData } from "@/controllers/uttils";
import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";

interface UNQ {
    time: string;
    floor_price: number;
    sales: number;
}

export const ChartComponent = ({ data }: { data: HIstoryData[] }) => {
    const chartContainerRef = useRef(null);
    useEffect(() => {
        const chartData = data?.map((data: HIstoryData) => {
            return {
                id: data.id,
                time: new Date(data.time).getTime() / 1000,
                value: data.floor_price,
            };
        });

        const histogramData = data?.map((data: HIstoryData) => {
            return {
                id: data.id,
                time: new Date(data.time).getTime() / 1000,
                value: data.sales,
            };
        });

        var result = chartData.reduce((unique, o) => {
            if (!unique.some((obj) => obj.time.toString() == o.time)) {
                unique.push(o);
            }
            return unique;
        }, []);
        result.sort(function (a, b) {
            var keyA = new Date(a.time),
                keyB = new Date(b.time);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });


        result = result.map(r => {
            return ({
                time: r.time,
                value: r.value
            })
        })

        var resultHisto = histogramData.reduce((unique, o) => {
            if (!unique.some((obj) => obj.time.toString() == o.time)) {
                unique.push(o);
            }
            return unique;
        }, []);
        resultHisto.sort(function (a, b) {
            var keyA = new Date(a.time),
                keyB = new Date(b.time);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });


        resultHisto = resultHisto.map((h) => {
            return {
                time: h.time,
                value: h.value,
                color: h.id % 2 == 0 ? "#11CABE" : "#246CF9"
            }
        })

        console.log("yo", resultHisto)


        console.log("response", result);
        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        };

        const chart = createChart(chartContainerRef.current, {
            layout: {
                backgroundColor: "#212C3A",
                textColor: "#d1d4dc",
            },
            width: chartContainerRef.current.clientWidth,
            height: 500,
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
        newSeries.setData(result);
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
        histogram_series.setData(resultHisto);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
        };
    }, [data]);

    return <div ref={chartContainerRef} />;
};

const data = [
    { value: 0, time: 1642425322 },
    { value: 8, time: 1642511722 },
    { value: 10, time: 1642598122 },
    { value: 20, time: 1642684522 },
    { value: 3, time: 1642770922 },
    { value: 43, time: 1642857322 },
    { value: 41, time: 1642943722 },
    { value: 43, time: 1643030122 },
    { value: 56, time: 1643116522 },
    { value: 46, time: 1643202922 },
];

interface Props {
    slug: string;
    history_data_table: string;
}

export function DetailsChart({ history_data_table, slug }: Props) {
    const [data, setData] = useState<HIstoryData[]>([]);

    useEffect(() => {
        if (history_data_table) {
            (async () => {
                const res = await getData(30, history_data_table, slug);
                const temp = res.NFTHistoryInfo;
                setData((prev) => [...prev, ...temp]);
            })();
        }
    }, [history_data_table]);

    useEffect(() => { }, [data]);

    return <ChartComponent data={data}></ChartComponent>;
}
