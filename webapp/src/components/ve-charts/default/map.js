/**
 * 地图默认配置
 * since 2018/1/18
 * author cfw2157
 */

//初始化绘制全国地图配置
var option = {
    backgroundColor: '#07192B',
    title : {
        text: '',
        subtext: '',
        left: 'center',
        textStyle:{
            color: '#fff',
            fontSize:16,
            fontWeight:'normal'
        },
        subtextStyle:{
            color: '#ccc',
            fontSize:13,
            fontWeight:'normal'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b}'
    },
    legend: {
        orient: 'vertical',
        top: 'bottom',
        left: 'right',
        data:[],
        textStyle: {
            color: '#fff'
        },
        selectedMode: 'single'
    },
    toolbox: {
        show: false,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        },
        iconStyle:{
            normal:{
                color:'#fff'
            }
        }
    },
    /*visualMap: [
        {
            type: 'piecewise',
            categories: ['高', '中', '低'],
            inRange: {
                symbolSize: 30,
                symbol: {
                    '优': 'diamond',
                    '': 'circle'
                }
            }
        }
    ],*/
    geo: {
        roam: false,
        map: '',
        label: {
            normal:{
                show: false,
                textStyle:{
                    color:'#999',
                    fontWeight:'normal',
                    fontSize:13
                }
            },
            emphasis: {
                show: false,
                textStyle:{
                    color: '#fff',
                    fontWeight:'normal',
                    fontSize: 13
                }
            }
        },
        itemStyle: {
            normal: {
                areaColor: '#09203D',
                borderColor: 'dodgerblue'
            },
            emphasis: {
                areaColor: 'darkorange'
            }
        },
        data: []
    },
    series: [
        {data: []},
        {
            name: '',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 1,
            rippleEffect: {
                brushType: 'stroke'
            },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                }
            },
            symbolSize: '',
            itemStyle: {
                normal: {
                    color: '#F0BD26'
                }
            },
            data: []
        },
        {
            name: '',
            type: 'lines',
            zlevel: 2,
            polyline: false,
            effect: {
                show: true,
                constantSpeed: 0,//配置特效图形的移动动画是否是固定速度，单位像素/秒，设置为大于 0 的值后会忽略 period 配置项。
                symbol: 'circle',//ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                period: 6,//特效动画的时间，单位为 s。
                trailLength: 0.7,//特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
                color: '#fff',//特效标记的颜色
                symbolSize: 3//特效标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示高和宽，例如 [20, 10] 表示标记宽为20，高为10。
            },
            lineStyle: {
                normal: {
                    color: '#46BEE9',
                    width: 0,
                    curveness: 0.2
                }
            },
            data: []
        },
        {
            name: '',
            type: 'scatter',
            coordinateSystem: 'geo',
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#ddb926'
                }
            }/*,
            data: [
                [121.4648,31.2891,'高'],
                [113.8953,22.901,'中'],
                [118.7073,37.5513,'低'],
                [113.4229,22.478,'中'],
                [111.4783,36.1615,'中'],
                [118.3118,35.2936,'高'],
                [124.541,40.4242,'中'],
                [119.5642,28.1854,'低'],
                [87.9236,43.5883,'中'],
                [112.8955,23.1097,'中'],
                [115.0488,39.0948,'低'],
                [103.5901,36.3043,'中'],
                [110.3467,41.4899,'低'],
                [116.4551,40.2539,'中']
            ]*/
        }
    ],
    animationDuration:1000,
    animationEasing:'cubicOut',
    animationDurationUpdate:1000
};

//module.exports = option;
export default option;