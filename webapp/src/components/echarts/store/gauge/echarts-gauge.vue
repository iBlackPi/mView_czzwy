<template>
    <div ref="mychart">
        <div style="height: 100%;width: 100%" :id="id"></div>
        <slot></slot>
    </div>
</template>
<script>
    /**
     * 仪表盘
     * 必填属性：id
     * data：仪表盘数据，默认格式：[{value: 0.5, name: 'gas'},{value: 0.6, name: 'gasdfs'}]
     * 可选属性：
     * rendererType：渲染器类型，可选svg/canvas
     * title：图表标题
     * backgroundColor: 图表背景颜色
     * center: 仪表盘的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度。
     * radius: 仪表盘半径，可以是相对于容器高宽中较小的一项的一半的百分比，也可以是绝对的数值。
     * dataRange：仪表盘数据范围数组[min,max],分别映射到startAngle,endAngle
     * startAnger:仪表盘起始角度。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
     * endAngle:仪表盘结束角度。
     * clockwise: 仪表盘刻度是否是顺时针增长，顺时针是从min到max还是max到min。
     * splitNumber: 仪表盘刻度的分割段数。
     * data：仪表盘数据
     * coverOption：自定义覆盖配置
     *
     * 事件名：
     * click-series，点击到echarts图的series上，返回包含点击图形数据信息的对象params
     * mouseover-series，鼠标移动到echarts图的series上，返回包含点击图形数据信息的对象params
     * 详情见：http://echarts.baidu.com/tutorial.html#ECharts%20%E4%B8%AD%E7%9A%84%E4%BA%8B%E4%BB%B6%E5%92%8C%E8%A1%8C%E4%B8%BA
     *
    */
    import option from '../default-option/gauge.js';
    import emitter from '../emitter/emitter.js';
    import initialize from '../emitter/initialize.js';

    export default {
        name: 've-gauge',
        mixins: [emitter,initialize],
        props: {
            id: {
                type: String,
                required: true
            },
            data: {
                type: Array,
                default: () => []
            },
            rendererType: {
                type: String,
                default: 'canvas'
            },
            title: {
                type: String,
                default: ''
            },
            backgroundColor: {
                type: String,
                default: option.backgroundColor || '#fff'
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
            coverOption:{
                type: Object,
                default: () => null
            }
        },
        data (){
            return {
                option: option,
                chart: null,
                hasChild: false
            }
        },
        methods: {
            setBasicInfo: function(obj) {
                let option = this.tool.extend(true,{},obj);
                option.title.text = this.title;
                option.backgroundColor = this.backgroundColor;
                return option;
            },
            setDataInfo: function(obj){
                const children = this.$children;
                let option = this.tool.extend(true,{},obj),
                    series = option.series,
                    _this = this,
                    seriesArr = [],
                    /*默认样式配置*/
                    basicSerie = option.series[0];
                for(let i=0;i<children.length;i++) {
                    let child = children[i];
                    if (child.childType === 'gauge') {
                        _this.hasChild = true;
                        let dataRange = child.dataRange;
                        let newSerieData = {
                            data: child.data,
                            center: child.center,
                            radius: child.radius,
                            min: dataRange[0],
                            max: dataRange[1],
                            startAnger: child.startAnger,
                            endAngle: child.endAngle,
                            clockwise: child.clockwise,
                            splitNumber: child.splitNumber,
                            type: 'gauge'
                        };
                        let newSerie = _this.tool.extend(true,{},basicSerie,newSerieData);
                        seriesArr.push(newSerie);
                    }
                }
                if(_this.hasChild){
                   option.series = seriesArr;
                }else{
                    /*
                    * 给series[0]赋值对象方式可能会忽略一些其他配置
                    * */
                    series[0].data = this.data;
                    series[0].radius = this.radius;
                    series[0].center = this.center;
                    series[0].min = this.dataRange[0];
                    series[0].max = this.dataRange[1];
                    series[0].startAnger = this.startAnger;
                    series[0].endAngle = this.endAngle;
                    series[0].clockwise = this.clockwise;
                    series[0].splitNumber = this.splitNumber;
                }
                return option;
            }
        },
        watch: {
            /*数据绑定在<ve-gauge>标签上且改变时触发*/
            data: function(val,oldVal){
                if(val !== oldVal) {
                    this.$nextTick(function(){
                        this.chart.setOption(this.lastOption);
                    });
                }
            }
        }
    }
</script>