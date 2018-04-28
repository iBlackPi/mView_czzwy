<template>
    <div></div>
</template>
<script>
    /**
    * 添加多个饼图时可用
     * 必填属性：data 饼图数据,默认格式:[{name:'name1',value:val1}，{name:'name2',value:val2}...]
     * 可选属性：
     * childType: 自图表类型，用于父组件里判断类别
     * radius：饼图的半径，数组的第一项是内半径，第二项是外半径,支持设置成百分比
     * center: 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
     * 支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度。
     * rippleAnimation: 是否开启涟漪动画,布尔值(true/false)，默认false
     * rippleSize: 涟漪动画大小
     * rippleColor: 涟漪动画颜色
     * roseType：是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
     * 'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。
     * 'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
     *
    * */
    import option from '../default-option/pie.js';
    import emitter from '../emitter/emitter.js';
    export default {
        name: 've-sub-pie',
        mixins: [emitter],
        props: {
            childType: {
                type: String,
                default: 'pie'
            },
            /*
            * 'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。
            * 'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
            * */
            roseType: {
                type: String,
                default: ''
            },
            center: {
                type: Array,
                default: () => option.custom.center || ['50%','50%']
            },
            radius: {
                type: Array,
                default: () => option.custom.radius || ['50%', '65%']
            },
            rippleAnimation: {
                type: Boolean,
                default: false
            },
            rippleSize: {
                type: Number,
                default: option.custom.effectScatterObj.rippleEffect.scale || 12
            },
            rippleColor: {
                type: String,
                default: option.custom.effectScatterObj.itemStyle.normal.color || "rgba(38,165,236,0.5)"
            },
            data: {
                type: Array,
                default: () => [],
                required: true
            }
        },
        data: function(){
            return {
                option: option
            }
        },
        watch: {
            data: function(val,oldVal){
                if(val !== oldVal) {
                    this.dispatch('ve-pie', 'changeData', val);
                }
            }
        }
    }
</script>