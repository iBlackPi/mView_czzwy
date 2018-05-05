/**
 * 仪表图默认配置
 * since 2018/1/19
 * author cfw2157
 */

let option = {
    title: {
        text: ''
    },
    type: 'gauge',
    tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
    },
    backgroundColor: '#07192B',
    toolbox: {
        show: false,
        feature: {
            restore: {},
            saveAsImage: {}
        }
    },
    series: [
        {
            name: '',
            type: 'gauge',
            center: ['50%', '50%'],
            //todo 页面里设置不生效
            radius: '80%',
            startAnger: 225,
            endAngle: -45,
            clockwise: true,
            splitNumber: 10,
            min: 0,
            max: 100,
            title : {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'normal',
                fontSize: 15,
                color: '#fff',
                offsetCenter: ['0', '40%']
            },

            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.2, '#e14048'],[0.8,'#01A2FC'],[1, '#1ca658']],
                    width: 8
                }
            },
            axisTick: {            // 坐标轴小标记
                length: 15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto'
                },
                splitNumber: 10
            },
            splitLine: {           // 分隔线
                length: 20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            axisLabel: {

            },
            detail: {
                offsetCenter: [0, '65%'],
                formatter: '{value}分',
                // todo 默认字体大小适中
                fontSize: 15
            },
            /*detail : {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                formatter: function (value) {
                    value = (value + '').split('.');
                    value.length < 2 && (value.push('00'));
                    return ('00' + value[0]).slice(-2)
                        + '.' + (value[1] + '00').slice(0, 2);
                },
                fontWeight: 'bolder',
                borderRadius: 3,
                backgroundColor: '#444',
                borderColor: '#aaa',
                shadowBlur: 5,
                shadowColor: '#333',
                shadowOffsetX: 0,
                shadowOffsetY: 3,
                borderWidth: 2,
                textBorderColor: '#000',
                textBorderWidth: 2,
                textShadowBlur: 2,
                textShadowColor: '#fff',
                textShadowOffsetX: 0,
                textShadowOffsetY: 0,
                fontFamily: 'Arial',
                width: 100,
                color: '#eee',
                rich: {}
            },*/
            data:[]
        }
    ]
};

//module.exports = option;
export default option;