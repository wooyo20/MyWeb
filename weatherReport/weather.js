var res;

function getdata() {
    var t = undefined;
    $.ajax({
        type: "GET",
        url: "https://tianqiapi.com/api",
        async: false,
        data: "version=v1&appid=18254637&appsecret=9CyWNnCC&city=" +
            document.querySelector(".search-txt").value,
        success: function(response) {
            t = response;
        }
    });
    return t;
}

function print() {
    res = getdata();
    console.log(res);
    document.getElementById("nowtem").innerHTML = res.data[0].tem;
    document.getElementById("city").innerHTML = `<img src="image/location.png" alt="" height="14px"> ${res.city}`;
    document.getElementById("update").innerHTML = "更新时间：" + res.update_time;
    document.getElementById("img").src = "image/" + res.data[0].wea_img + ".png"
    var i;
    for (i = 1; i < 7; i++) {
        var n = document.getElementsByClassName("time");
        n[i - 1].innerHTML = res.data[i].day;
    }
    for (i = 0; i < 7; i++) {
        var n = document.getElementsByClassName("tem");
        n[i].innerHTML = `${res.data[i].tem1}\\${res.data[i].tem2}`;
    }
    for (i = 0; i < 7; i++) {
        var n = document.getElementsByClassName("wea");
        n[i].innerHTML = res.data[i].wea;
    }
    for (i = 0; i < 7; i++) {
        var n = document.getElementsByClassName("win");
        if (res.data[i].win[0] == res.data[i].win[1]) {
            n[i].innerHTML = res.data[i].win[0] + "<br>" + res.data[i].win_speed;
        } else {
            n[i].innerHTML = res.data[i].win + "<br>" + res.data[i].win_speed;
        }
    }
    for (i = 1; i < 7; i++) {
        var n = document.getElementsByClassName("wea_img");
        n[i - 1].src = "image/" + res.data[i].wea_img + ".png";
    }

    var air = document.getElementsByClassName("index")[0].children;
    air[1].innerHTML = res.data[0].air + " " + res.data[0].air_level;
    air[2].innerHTML = res.data[0].air_tips;
    var index = document.getElementsByClassName("index");

    for (i = 1; i < 6; i++) {
        index[i].children[0].innerHTML = res.data[0].index[i - 1].title;
        index[i].children[1].innerHTML = res.data[0].index[i - 1].level;
        index[i].children[2].innerHTML = res.data[0].index[i - 1].desc;
    }

    printcharts();
}
print();

function printcharts() {
    var temA = new Array(8);
    for (i = 0; i < 8; i++) {
        temA[i] = parseInt(res.data[0].hours[i].tem)
    }
    var myChart = echarts.init(document.getElementById('chart'));
    var option = {
        title: {
            text: '分时段预报'
        },
        tooltip: {},
        legend: {
            data: ['']
        },
        xAxis: {
            data: [res.data[0].hours[0].hours, res.data[0].hours[1].hours, res.data[0].hours[2].hours, res.data[0].hours[3].hours, res.data[0].hours[4].hours, res.data[0].hours[5].hours, res.data[0].hours[6].hours, res.data[0].hours[7].hours],
        },
        yAxis: {},

        series: [{
            name: '气温',
            type: 'line',
            data: [temA[0], temA[1], temA[2], temA[3], temA[4], temA[5], temA[6], temA[7]]
        }]

    };

    myChart.setOption(option);

}

function showblock1() {
    document.getElementsByClassName("po")[0].style.display = "block"
    document.getElementById("chart").style.display = "none"
    document.getElementsByClassName("b")[0].style.left = "150px"

}

function showblock2() {
    document.getElementsByClassName("po")[0].style.display = "none"
    document.getElementById("chart").style.display = "block"
    document.getElementsByClassName("b")[0].style.left = "0"

}

function reload() {

    console.clear();

    print();

}