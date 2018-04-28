<template>
    <div></div>
</template>
<script>
    /**
    *
     * 添加多个仪表图时可用
     * 必填属性：data：仪表盘数据，默认格式：[{value: 0.5, name: 'gas'},{value: 0.6, name: 'gasdfs'}]
     * 可选属性：
     * childType: 自图表类型，用于父组件里判断类别
     * center: 仪表盘的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度。
     * radius: 仪表盘半径，可以是相对于容器高宽中较小的一项的一半的百分比，也可以是绝对的数值。
     * dataRange：雷达图数据范围数组[min,max],分别映射到startAngle,endAngle
     * startAnger:仪表盘起始角度。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
     * endAngle:仪表盘结束角度。
     * clockwise: 仪表盘刻度是否是顺时针增长。
     * splitNumber: 仪表盘刻度的分割段数。
     *
     *
    * */
    import option from '../default-option/gauge.js';
    import emitter from '../emitter/emitter.js';
    export default {
        name: 've-sub-gauge',
        mixins: [emitter],
        props: {
            childType: {
                type: String,
                default: 'gauge'
            },
            data: {
                type: Array,
                default: () => [],
                required: true
            },
            center: {
                type: Array,
                default: () => option.series[0].center || ['50%', '50%']
            },
            radius: {
                type: [String,Number],
                default: option.series[0].radius || '70%'
            },
            dataRange: {
                type: Array,
                default: () => {
                    let min = option.series[0].min || 0,
                        max = option.series[0].max || 100;
                    return [min,max];
                }
            },
            startAnger: {
                type: Number,
                default: option.series[0].startAnger || 225
            },
            endAngle: {
                type: Number,
                default: option.series[0].endAngle || -45
            },
            clockwise: {
                type: Boolean,
                default: option.series[0].clockwise || true
            },
            splitNumber: {
                type: Number,
                default: option.series[0].splitNumber || 10
            },
        },
        data (){return {}},
        watch: {
            data: function(val,oldVal){
                if(val !== oldVal) {
                    this.dispatch('ve-gauge', 'changeData', val);
                }
            }
        }
    }
</script>
