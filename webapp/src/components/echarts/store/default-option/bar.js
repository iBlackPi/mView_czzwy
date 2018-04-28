/**
 * 柱状图series的默认配置
 * since 2018/1/16
 * author cfw2157
 */

/*渐变样式配置*/
let linearGradient = [
    {
        offset: 0,
        color: '#00feff'
    },
    {
        offset: 0.5,
        color: '#027eff'
    },
    {
        offset: 1,
        color: '#0286ff'
    }
];

let obj = {
    type: 'bar',
    barWidth: '自适应',
    barMaxWidth: '自适应',
    barMinHeight: 0,
    barGap: '30%',
    linearGradient: linearGradient,
    coordinateSystem: 'cartesian2d',//可选项:'cartesian2d','polar','geo' 详情链接:http://echarts.baidu.com/option.html#series-scatter.coordinateSystem
    itemStyle: {
        normal: {
            barBorderRadius: 5
            /*color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#83bff6'},
                    {offset: 0.5, color: '#188df0'},
                    {offset: 1, color: '#188df0'}
                ]
            )*/
        },
        emphasis: {
            /*color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#2378f7'},
                    {offset: 0.7, color: '#2378f7'},
                    {offset: 1, color: '#83bff6'}
                ]
            )*/
        }
    },
    data: []
};

export default obj;
//module.exports = obj;