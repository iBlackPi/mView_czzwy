/**
 * 雷达图的默认配置
 * since 2018/1/25
 * author cfw2157
 */
let option = {
    title: {
        text: '基础雷达图'
    },
    tooltip: {},
    backgroundColor: '#07192B',
    color: ['#01A2FC','#F9D135','#01B344','#05E3FD','#2A6FD6','#F6A20A'],
    legend: {
        data: [],
        textStyle: {
            color: 'rgb(181, 214, 252)'
        }
    },
    radar: [{
        center: ['50%','50%'],
        radius: '50%',
        startAngle: 90,
        splitNumber: 4,
        shape: 'polygon',//雷达图绘制类型，支持 'polygon' 和 'circle'
        name: {
            textStyle: {
                color: '#fff',
                /*backgroundColor: '#999',
                borderRadius: 3,*/
                padding: [3, 5]
            }
        },
        /*雷达的边框样式*/
        splitLine: {
            lineStyle: {
                color: [
                    'rgba(1, 165, 222, 0.1)', 'rgba(1, 165, 222, 0.2)',
                    'rgba(1, 165, 222, 0.4)', 'rgba(1, 165, 222, 0.6)',
                    'rgba(1, 165, 222, 0.8)', 'rgba(1, 165, 222, 1)'
                ].reverse()
            }
        },
        /*雷达的轴样式*/
        axisLine: {
            lineStyle: {
                color: 'rgba(1, 165, 222, 1)'
            }
        },
        /*雷达的内区域样式*/
        splitArea: {
            areaStyle: {
                color: ['rgba(1, 162, 252, 0.6)',
                        'rgba(1, 162, 252, 0.5)',
                        'rgba(1, 162, 252, 0.4)',
                        'rgba(1, 162, 252, 0.3)',
                        'rgba(1, 162, 252, 0.2)'],
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowBlur: 10
            }
        },
        indicator: []
    }],
    series: [{
        type: 'radar',
        symbol: 'rect',
        symbolSize: 8
    }]
};

//module.exports = option;
export default option;