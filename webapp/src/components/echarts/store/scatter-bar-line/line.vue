<template>
    <div :data="data"></div>
</template>
<script>
    /**
     * name：系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
     * childType: 自图表类型，用于父组件里判断类别
     * symbol: 标记的图形，可选项：'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
     * symbolSize：标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
     * step: 是否是阶梯线图，可以设置为 true 显示成阶梯线图，
     * 也支持设置成 'start', 'middle', 'end' 分别配置在当前点，当前点与下个点的中间点，下个点拐弯
     * smooth: 是否平滑曲线显示
     * lineColor: 折现颜色
     * startGradient: 是否开启渐变
     * linearGradient: 折现图渐变配置
     *
     * */
    import option from '../default-option/line.js';
    import emitter from '../emitter/emitter.js';
    export default {
        name: 've-line',
        mixins: [emitter],
        props: {
            name: {
                type: String,
                default: ''
            },
            childType: {
                type: String,
                default: 'line'
            },
            symbol: {
                type: String,
                default: option.symbol || 'emptyCircle'
            },
            symbolSize: {
                type: [Number,Array,Function],
                default: option.symbolSize || 4
            },
            step: {
                type: [String,Boolean],
                default: option.step || false
            },
            smooth: {
                type: Boolean,
                default: option.smooth || false
            },
            lineColor: {
                type: String,
                default: option.itemStyle.normal.color || '#01A2FC'
            },
            startGradient: {
                type: Boolean,
                default: false
            },
            linearGradient: {
                type: Array,
                default: () => {
                    let colorStep = [
                                        {offset: 0, color: 'rgba(1, 151, 228, .4)'},
                                        {offset: 1, color: 'rgba(1, 151, 228, 0)'}
                                    ];
                    return option.areaStyleObj.normal.color.colorStops || colorStep;
                }
            },
            data: {
                type: Array,
                default: () => []
            }
        },
        data (){
            return {}
        },
        watch: {
            data:function(val,oldVal){
                if(val !== oldVal) {
                    this.dispatch('ve-rect-coordinate', 'changeData', val);
                }
            }
        }
    }
</script>