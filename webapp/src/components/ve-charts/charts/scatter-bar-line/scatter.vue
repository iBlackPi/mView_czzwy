<template>
    <div></div>
</template>
<script>
    /**
     * name：系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
     * childType: 自图表类型，用于父组件里判断类别
     * symbol: 标记的图形，可选项：'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
     * symbolSize：标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
     *
     * */
    import option from '../../default/scatter.js';
    import emitter from '../../mixins/emitter.js';
    export default {
        name: 've-scatter',
        mixins: [emitter],
        props: {
            name: {
                type: String,
                default: ''
            },
            childType: {
                type: String,
                default: 'scatter'
            },
            symbol: {
                type: String,
                default: option.symbol || 'circle'
            },
            symbolSize: {
                type: [Number,String,Array,Function],
                default: option.symbolSize || 4
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