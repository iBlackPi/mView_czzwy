/**
 * 饼图series的默认配置
 * since 2018/1/16
 * author cfw2157
 */

/*位置和大小的默认配置*/
let center = ['50%','50%'],
    radius = ['50%', '65%'];
//水波涟漪效果的精确度,accuracy越大,位置越精确
let array = [],
    accuracy = 1000;
for(let i=0;i<accuracy;i++){
    array.push(i);
}
//水波涟漪效果的默认配置
let effectScatterObj =
{
    type:"effectScatter",
    data:[],
    showEffectOn: 'render',
    symbol: "circle",
    symbolSize: 30,
    tooltip: {
        show: false
    },
    rippleEffect: {
        period:4,
        brushType: "fill",
        scale:12
    },
    label: {
        normal: {
            show: false,
                formatter:"{b}",
                fontSize:16,
                color:"white",
                offset:[0,0]
        }
    },
    itemStyle: {
        normal: {
            color: "rgba(38,165,236,0.5)",
            shadowBlur: 0,
            shadowColor: '#25fffb'
        }
    }
};
//series中每一项的基础配置
let basicSerie =
{
    name:'',
    type:'pie',
    center: center,
    radius: radius,
    avoidLabelOverlap: false,
    label: {
        normal: {
            show: true,
            position: 'outside'
        },
        emphasis: {
            show: true,
            textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
            }
        }
    },
    labelLine: {
        normal: {
            show: true
        }
    },
    data:[]
};

//最终导出的option对象
let option = {
    color: ['#01A2FC','#F9D135','#01B344','#05E3FD','#2A6FD6','#F6A20A'],
    custom: {//专门存放自定义属性的对象，用来保存series内的一些配置，以便组件vue文件内调用
        accuracy: accuracy,//自定义属性，画水波涟漪效果的精确度
        effectScatterObj: effectScatterObj,//自定义属性，水波涟漪效果的配置
        center: center,//自定义属性,饼图位置
        radius: radius//自定义属性,饼图大小
    },
    title: {
        text: '',
        x: 'center',
        textStyle: {
            color: '#fff'
        }
    },
    backgroundColor: '#07192B',
    tooltip: {
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        top: '30%',
        right: '10%',
        itemGap: 20,
        itemWidth: 20,
        textStyle: {
            color: '#fff'
        }
    },
    grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    xAxis: {
        show: false,
        type: 'category',
        data: array
    },
    yAxis: {
        show: false,
        type: 'category',
        data: array
    },
    series: [
        basicSerie
    ]
};

//module.exports = option;
export default option;