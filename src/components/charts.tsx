

function businessDayToString(businessDay) {
    console.log(businessDay);
    return (
        businessDay.year +
        "-" +
        businessDay.month +
        "-" +
        businessDay.day +
        businessDay.hour +
        "-" +
        businessDay.minute +
        "-" +
        businessDay.second
    );
}


interface Props {

}


const RenderChart = (time, onlyRenderChart, dom: ) => {
    const domElement = document.getElementById("tvchart");
    if (domElement.lastElementChild) {
        domElement.lastElementChild.remove();
    }


    let ret_ = await getNftBasicInfo(slug);
    let NFTInfo = ret_.NFTInfo[0];

    let ret = await getData(time, NFTInfo["history_data_table"], slug);
    let NFTHistoryInfo = ret.NFTHistoryInfo;
    let listt = [];
    let _7d_vari;
    let _14d_vari;
    let _30d_vari;
    for (let i = 0; i < NFTHistoryInfo.length; i++) {
        let kv = NFTHistoryInfo[i];
        var date = new Date(Date.parse(kv["time"].replace(/[-]/g, "/")));
        // let date = Date.parse(kv["time"]);
        let unix_timestamp = Date.parse(new Date()) - date;
        date = new Date(unix_timestamp);
        if (date.getDate() == 30) {
            _30d_vari =
                ((NFTInfo.floor_price - kv["floor_price"]) * 100) / kv["floor_price"]; //今天-30天前 / 今天
        } else if (date.getDate() == 14) {
            _14d_vari =
                ((NFTInfo.floor_price - kv["floor_price"]) * 100) / kv["floor_price"]; //今天-30天前 / 今天
        } else if (date.getDate() == 7) {
            _7d_vari =
                ((NFTInfo.floor_price - kv["floor_price"]) * 100) / kv["floor_price"]; //今天-30天前 / 今天
            // console.log(_7d_vari);
        }
        // const dt = Date.parse(kv["time"]); 用下面这行的方案，否则在IOS系统的浏览器中会出问题
        const dt = new Date(Date.parse(kv["time"].replace(/[-]/g, "/")));
        listt.push([
            kv["floor_price"],
            kv["volumn"],
            dt / 1000,
            kv["sales"],
            kv["id"],
        ]);
    }
    let klinedata = listt.map((d) => ({
        floor_price: d[0],
        volumn: d[1],
        time: d[2],
        sales: d[3],
        id: d[4],
    }));
    //var date = new Date(Date.parse(kv["time"].replace(/[-]/g,'/')));

    //绘制图表
    var width = 1060 * 0.9;
    // var width = 1500;
    var height = 604 * 0.9;
    var chart = LightweightCharts.createChart(container, {
        width: width,
        height: height,
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
                left: 0.3,
            },
            borderVisible: false,
            visible: true,
        },
        crosshair: {
            vertLine: {
                labelVisible: false,
            },
        },
        layout: {
            backgroundColor: "#192431",
            textColor: "#d1d4dc",
        },
        scaleMargins: {
            left: 0.2,
            right: 0,
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
    // 绘制areaSeries
    var areaSeries = chart.addAreaSeries({
        topColor: "rgba(38,198,218, 0.56)",
        bottomColor: "rgba(38,198,218, 0.04)",
        lineColor: "rgba(38,198,218, 1)",
        lineWidth: 2,
    });
    const areaSeriesData = klinedata
        .filter((d) => d.floor_price)
        .map((d) => ({ time: d.time, value: d.floor_price }));
    areaSeries.setData(areaSeriesData);

    // 绘制HISTOGRAM
    const histogram_series = chart.addHistogramSeries({
        // pane: 2,
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
    const histogram_data = klinedata
        .filter((d) => d.sales)
        .map((d) => ({
            time: d.time,
            value: d.sales,
            color: d.id % 2 == 0 ? "#11CABE" : "#246CF9",
        }));
    histogram_series.setData(histogram_data);

    //根据时间自适应表格
    chart.timeScale().fitContent();

    var toolTipWidth = 80;
    var toolTipHeight = 80;
    var toolTipMargin = 15;

    var toolTip = document.createElement("div");
    toolTip.className = "floating-tooltip-2";
    container.appendChild(toolTip);

    // update tooltip
    chart.subscribeCrosshairMove(function (param) {
        if (
            param.point === undefined ||
            !param.time ||
            param.point.x < 0 ||
            param.point.x > container.clientWidth ||
            param.point.y < 0 ||
            param.point.y > container.clientHeight
        ) {
            toolTip.style.display = "none";
        } else {
            console.log(param.time);
            var dateStr = LightweightCharts.isBusinessDay(param.time)
                ? businessDayToString(param.time)
                : toDateString(new Date(param.time * 1000));
            toolTip.style.display = "block";
            var price = param.seriesPrices.get(areaSeries);
            var sales = param.seriesPrices.get(histogram_series);
            if (sales == undefined) {
                sales = 0;
            }
            toolTip.innerHTML =
                '<div class="tooltip-inside"> <div><img src="./img/ethereum-eth-logo 2.png" style="width: calc(15*0.9px);height:calc(20*0.9px);margin-left:calc(3*0.9px);"></div>&nbsp; ' +
                Math.round(price * 100) / 100 +
                "</div>" +
                '<div style="margin:0 auto;text-align:center;"> Sales: ' +
                sales +
                "</div>" +
                '<div style="margin:0 auto;text-align:center;font-size:calc(9*0.9px);">' +
                dateStr +
                "</div>";

            var coordinate = areaSeries.priceToCoordinate(price);

            var shiftedCoordinate = param.point.x - 50;
            // console.log(param)
            if (coordinate === null) {
                return;
            }
            shiftedCoordinate = Math.max(
                0,
                Math.min(container.clientWidth - toolTipWidth, shiftedCoordinate)
            );
            var coordinateY =
                coordinate - toolTipHeight - toolTipMargin > 0
                    ? coordinate - toolTipHeight - toolTipMargin
                    : Math.max(
                        0,
                        Math.min(
                            container.clientHeight - toolTipHeight - toolTipMargin,
                            coordinate + toolTipMargin
                        )
                    );

            //获取绝对位置
            var actualLeft =
                document.getElementsByClassName("unft_info")[0].offsetLeft;
            var actualTop = document.getElementsByClassName("unft_info")[0].offsetTop;
            // console.log(actualLeft);
            toolTip.style.left = (shiftedCoordinate + actualLeft) * 0.9 + "px";
            toolTip.style.top = (coordinateY + actualTop) * 1 + "px";
        }
    });

    //判断是否只需要refresh 图表
    if (onlyRenderChart == true) {
        const domElement = document.getElementById("tvchart");
        chart.resize(domElement.clientWidth, domElement.clientHeight);
        chart.timeScale().fitContent();
        return;
    }

    //渲染上部分数据

    $("#items-num").html(NFTInfo.total_supply / 1000 + "K");
    $("#owners-num").html(NFTInfo.num_owners / 1000 + "K");
    $("#FP-num").html(NFTInfo.floor_price + " ETH");
    $("#VT-num").html(NFTInfo.total_volume / 1000 + "K ETH");
    if (NFTInfo.variation_eth.toFixed(2) > 0) {
        $("#time_1_variation").html("⬆" + NFTInfo.variation_eth.toFixed(2) + "%");
        $("#time_1_variation").css("color", "#30D988");
    } else {
        $("#time_1_variation").html("⬇" + NFTInfo.variation_eth.toFixed(2) + "%");
        $("#time_1_variation").css("color", "#DD405F");
    }

    //渲染上部分数据---渲染24h 7d 14d 30d的variation数据 ------ TODO 这个数据不太对，不知道他们是怎么统计的
    if (_7d_vari.toFixed(2) > 0) {
        $("#time_2_variation").html("⬆" + _7d_vari.toFixed(2) + "%");
        $("#time_2_variation").css("color", "#30D988");
    } else {
        $("#time_2_variation").html("⬇" + _7d_vari.toFixed(2) + "%");
        $("#time_2_variation").css("color", "#DD405F");
    }

    if (_14d_vari.toFixed(2) > 0) {
        $("#time_3_variation").html("⬆" + _14d_vari.toFixed(2) + "%");
        $("#time_3_variation").css("color", "#30D988");
    } else {
        $("#time_3_variation").html("⬇" + _14d_vari.toFixed(2) + "%");
        $("#time_3_variation").css("color", "#DD405F");
    }

    if (_30d_vari.toFixed(2) > 0) {
        $("#time_4_variation").html("⬆" + _30d_vari.toFixed(2) + "%");
        $("#time_4_variation").css("color", "#30D988");
    } else {
        $("#time_4_variation").html("⬇" + _30d_vari.toFixed(2) + "%");
        $("#time_4_variation").css("color", "#DD405F");
    }

    //渲染右边数据
    let sales_data = ret.sales_data[0];
    console.log(sales_data);
    const detailInfoElement = document.getElementById("detailInfo");
    const Category = [
        "Volume(24H)",
        "Sales(24H)",
        "Average sale(7D)",
        "Lowest sale(7D)",
        "Highest sale(7D)",
        "Listed/Supply",
        "Listed Ratio",
    ]; //  这两个数据从前面可以带过来，不再另外请求后端。
    const chr = [
        "sales_24h_volume",
        "num_sales_24h",
        "sales_7d_avg_price",
        "sales_7d_lowest_price",
        "sales_7d_highest_price",
    ];
    const variation = [
        "sales_24h_volume_variation",
        "num_sales_24h_variation",
        "sales_7d_avg_price_variation",
        "sales_7d_lowest_price_variation",
        "sales_7d_highest_price_variation",
    ];
    for (let i = 0; i < Category.length; i++) {
        let divv = document.createElement("div");
        if (i > 0) {
            divv.style =
                "margin-top:calc(50*0.9px);margin-left:calc(15*0.9px);font-size:calc(15*0.9px);font-family: 'Quicksand', sans-serif;";
        } else {
            divv.style =
                "margin-top:calc(30*0.9px);font-size:calc(15*0.9px);margin-left:calc(15*0.9px);font-family: 'Quicksand', sans-serif;";
        }
        let child1 = document.createElement("div");
        let child2 = document.createElement("div");
        divv.appendChild(child1);
        divv.appendChild(child2);
        child1.innerHTML = Category[i];
        if (i < Category.length - 2) {
            let color;
            let flag;
            if (sales_data[variation[i]] > 0) {
                color = "#30D988";
                flag = "⬆";
            } else {
                color = "#DD405F";
                flag = "⬇";
            }
            child2.innerHTML =
                `<div style="display: flex;">` +
                sales_data[chr[i]].toFixed(2) +
                "&nbsp;" +
                `<div style="color:` +
                color +
                `">` +
                flag +
                sales_data[variation[i]].toFixed(2) +
                "%" +
                `</div>` +
                `</div>`;
        } else {
            //for "Listed/Supply", "Listed Ratio"
            if (i == Category.length - 2) {
                child2.innerHTML =
                    `<div style="display: flex;">` +
                    NFTInfo.count_onsale +
                    "/" +
                    NFTInfo.total_supply +
                    `</div>`;
            } else if (i == Category.length - 1) {
                child2.innerHTML =
                    `<div style="display: flex;">` +
                    NFTInfo.listed_ratio +
                    "%" +
                    `</div>`;
            }
        }
        detailInfoElement.appendChild(divv);
    }

    //渲染顶部数据
    let unft_name = "u" + NFTInfo["name"].split(" ")[0] + "/NFT";
    let nft_floor_price_name = NFTInfo["name"].split(" ")[0] + " Floor Price";
    $("#unft_name").html(unft_name);
    $("#nft_floor_price_name").html(nft_floor_price_name);
    $(".price_time").html(toDateString(new Date()));
    $(".nft_price").html(NFTInfo["floor_price"]);
    return chart;
};

function toDateString(date) {
    Y = date.getFullYear() + "-";
    M =
        (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
    D = date.getDate() + " ";
    h = date.getHours() + ":";
    m = date.getMinutes() + ":";
    s = date.getSeconds();
    return Y + M + D + h + m + s; //呀麻碟
}

renderChart(30, false).then((chart) => {
    function resize() {
        const domElement = document.getElementById("tvchart");
        // console.log(domElement);
        // console.log(domElement.clientWidth);
        chart.resize(domElement.clientWidth, domElement.clientHeight);
        // chart.resize(domElement.clientWidth, 600);
        chart.timeScale().fitContent();
        // chart.resize(domElement.lastElementChild.width, 600);
    }
}); //默认30天
