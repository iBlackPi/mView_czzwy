<template>
    <div></div>
</template>
<script>
    /**
     * name：系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
     * childType: 自图表类型，用于父组件里判断类别
     * barWidth:柱条的宽度，不设时自适应。支持设置成相对于类目宽度的百分比。
     * barMaxWidth:柱条的最大宽度，不设时自适应。支持设置成相对于类目宽度的百分比。
     * barMinHeight:柱条最小高度，可用于防止某数据项的值过小而影响交互。
     * barGap:柱间距离，可设固定值（如 20）或者百分比（如 '30%'，表示柱子宽度的 30%）。
     * 如果想要两个系列的柱子重叠，可以设置 barGap 为 '-100%'。这在用柱子做背景的时候有用。
     * gradientDirection: 渐变方向, 有四种选择: top-bottom  bottom-top  left-right  right-left   如果不是这四种之一，就不展示渐变
     * linearGradient: 柱状图渐变配置
     *
     * */
    import option from '../default-option/bar.js';
    import emitter from '../emitter/emitter.js';
    export default {
        name: 've-bar',
        mixins: [emitter],
        props: {
            name: {
                type: String,
                default: ''
            },
            childType: {
                type: String,
                default: 'bar'
            },
            barWidth: {
                type: String,
                default: option.barWidth || '自适应'
            },
            barMaxWidth: {
                type: String,
                default: option.barMaxWidth || '自适应'
            },
            barMinHeight: {
                type: Number,
                default: option.barMinHeight || 0
            },
            barGap: {
                type: String,
                default: option.barMinHeight || '30%'
            },
            gradientDirection: {
                type: String,
                default: 'null'
            },
            linearGradient: {
                type: Array,
                default: () => {
                    return option.linearGradient || [
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
                                                    }];
                }
            },
            data: {
                type: Array,
                default: () => []
            }
        },
        data(){return {}},
        watch: {
            data:function(val,oldVal){
                if(val !== oldVal) {
                    this.dispatch('ve-rect-coordinate', 'changeData', val);
                }
            }
        }
    }
</script>
