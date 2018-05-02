/**
 * 散点图series的默认配置
 * since 2018/1/16
 * author cfw2157
 */
let obj = {
    name: '',
    data: [],
    type: 'scatter',
    symbol: 'circle',
    symbolSize: 3,
    coordinateSystem: 'cartesian2d',//坐标系类型:'cartesian2d','polar','geo' 参考地址:http://echarts.baidu.com/option.html#series-scatter.coordinateSystem
    label: {
        emphasis: {
            show: true,
            formatter: function (param) {
            },
            position: 'top'
        }
    },
    itemStyle: {
        normal: {
            shadowBlur: 10,
            shadowColor: 'rgba(120, 36, 50, 0.5)',
            shadowOffsetY: 5
        }
    }
};

//module.exports = obj;
export default obj;