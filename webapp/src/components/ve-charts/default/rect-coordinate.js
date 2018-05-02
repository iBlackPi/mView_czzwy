/**
 * 直角坐标系默认配置
 * since 2018/1/16
 * author cfw2157
 */

let xdataZoom = false,
    ydataZoom = false;

let option = {
    custom: {//专门存放自定义属性的对象，用来保存一些配置，以便组件vue文件内调用
        xdataZoom: xdataZoom,
        ydataZoom: ydataZoom
    },
    title: {
        text: ''
    },
    backgroundColor: '#07192B',
    color: ['#01A2FC','#F9D135','#01B344','#05E3FD','#2A6FD6','#F6A20A'],
    legend:{
        data: [],
        show: true,
        padding: [10, 70],
        top: '10%',
        right: '10%',
        itemGap: 20,
        itemWidth: 20,
        textStyle: {
            color: 'rgb(181, 214, 252)'
        }
    },
    /*legend: {
        padding: [10, 70],
        itemGap: 70,
        itemWidth: 50,
        backgroundColor: 'rgba(9, 23, 42, .7)',
        borderColor: 'rgba(8, 36, 73, .81)',
        borderWidth: 2,
        textStyle: {
            color: 'rgb(181, 214, 252)'
        },
        data: []
    },*/
    tooltip: {
        trigger: 'axis',
        /*formatter: function (params) {
        },*/
        axisPointer: {
            /*animation: false*/
            /*type : 'line'*/
            type : 'shadow'
        }
    },
    xAxis: {
        type : 'category',
        axisTick: {
            show: false
        },
        splitLine: {
            show: false
        },
        axisLabel: {
            show: true,
            interval: 0,
            rotate: 0,
            textStyle: {
                color: '#fff'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#263549',
                width: 1
            }
        }
    },
    yAxis: {
        type: 'value',
        /*分隔线*/
        splitLine: {
            show: true,
            lineStyle: {
                color: ['#263549']
            }
        },
        /*刻度*/
        axisTick: {
            show: false
        },
        /*刻度标签*/
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff'
            }
        },
        /*轴线*/
        axisLine: {
            lineStyle: {
                color: '#263549',
                width: 1
            }
        }
    },
    dataZoom: [
        {
            type: 'slider',
            textStyle: {
                color: '#fff'
            },
            show: xdataZoom,
            xAxisIndex: [0]
            /*start: 1,
            end: 35*/
        },
        {
            type: 'slider',//滑动条型
            textStyle: {
                color: '#fff'
            },
            show: ydataZoom,
            yAxisIndex: [0]
            /*start: 29,
            end: 36*/
        },
        {
            type: 'inside',//内置型
            textStyle: {
                color: '#fff'
            },
            show: xdataZoom,
            xAxisIndex: [0]
            /*start: 1,
            end: 35*/
        },
        {
            type: 'inside',
            textStyle: {
                color: '#fff'
            },
            show: ydataZoom,
            yAxisIndex: [0]
            /*start: 29,
            end: 36*/
        }
    ],
    series: []
};

//module.exports = option;
export default option;