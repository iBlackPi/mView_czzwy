/**
 * 折线图series的默认配置
 * since 2018/1/16
 * author cfw2157
 */
let obj = {
    name:'',
    type:'line',
    smooth: true,
    step: false,
    coordinateSystem: 'cartesian2d',//可选项:'cartesian2d','polar','geo' 详情链接:http://echarts.baidu.com/option.html#series-scatter.coordinateSystem
    symbol: 'rect',//可选项:'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow','emptyCircle'
    symbolSize: 8,
    sampling: 'average',
    itemStyle: {
        normal: {
            color: '#01A2FC'
        }
    },
    /*自定义属性,最后会变成areaStyle属性*/
    areaStyleObj: {
            normal: {
                color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(1, 151, 228, .4)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(1, 151, 228, 0)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                }
            }
    },
    data: []
};

//module.exports = obj;
export default obj;