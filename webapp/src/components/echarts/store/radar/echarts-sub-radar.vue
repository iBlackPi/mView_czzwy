<template>
    <div></div>
</template>
<script>
    /**
     * 添加多个雷达时可用
     * 必填属性：
     * data 雷达数据
     * childType: 自图表类型，用于父组件里判断类别
     * indicator 雷达图指示器
     * 可选属性：
     * radius：雷达图的半径
     * center: 雷达图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度。
     * startAngle: 坐标系起始角度，也就是第一个指示器轴的角度。
     * splitNumber: 指示器轴的分割段数。
     * shape：雷达图绘制类型，支持 'polygon' 和 'circle'，默认'polygon'
     * */
    import option from '../default-option/radar.js';
    import emitter from '../emitter/emitter.js';
    export default {
        name: 've-sub-radar',
        mixins: [emitter],
        props: {
            childType: {
                type: String,
                default: 'radar'
            },
            indicator: {
                type: Array,
                default: () => [],
                require: true
            },
            center: {
                type: Array,
                default: () => option.radar[0].center || ['50%','50%']
            },
            radius: {
                type: [Number,String],
                default: option.radar[0].radius || '50%'
            },
            startAngle: {
                type: Number,
                default: option.radar[0].startAngle || 90
            },
            splitNumber: {
                type: Number,
                default: option.radar[0].splitNumber || 4
            },
            shape: {
                type: String,
                default: option.radar[0].shape || 'polygon'
            },
            data: {
                type: Array,
                default: () => [],
                required: true
            }
        },
        data: function(){
            return {}
        },
        watch: {
            data: function(val,oldVal){
                if(val !== oldVal) {
                    this.dispatch('ve-radar', 'changeData', val);
                }
            }
        }
    }

</script>
<style scoped></style>