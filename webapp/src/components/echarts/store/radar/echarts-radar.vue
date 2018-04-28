<template>
    <div ref="mychart" style="height: 100%;width: 100%">
        <div style="height: 100%;width: 100%" :id="id"></div>
        <slot></slot>
    </div>
</template>

<script>
    /**
     * 雷达图
     * 必填属性：id
     * 可选属性：
     * rendererType：渲染器类型，可选svg/canvas
     * title：图表标题
     * backgroundColor: 图表背景颜色
     * showLegend:是否展示legend,布尔值(true/false)
     * color:颜色，数组
     * indicator：雷达图的指示器，用来指定雷达图中的多个维度，举例：
         [
             { name: '销售（sales）', max: 6500},
             { name: '管理（Administration）', max: 16000, color: 'red'}, // 标签设置为红色
             { name: '信息技术（Information Techology）', max: 30000},
             { name: '客服（Customer Support）', max: 38000},
             { name: '研发（Development）', max: 52000},
             { name: '市场（Marketing）', max: 25000}
         ]
     * data：雷达数据,默认格式：[{name:'name',value:[va11,val2,val3,val4,val5,val6,]}，{name:'name',value:[va11,val2,val3,val4,val5,val6,]}...]
     * 举例：
            [{   value : [4300, 10000, 28000, 35000, 50000, 19000],
                 name : '预算分配（Allocated Budget）'
             },{
                value : [5000, 14000, 28000, 31000, 42000, 21000],
                name : '实际开销（Actual Spending）'
            }]
     * radius：雷达图的半径
     * center: 雷达图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度。
     * startAngle: 坐标系起始角度，也就是第一个指示器轴的角度。
     * splitNumber: 指示器轴的分割段数。
     * shape：雷达图绘制类型，支持 'polygon' 和 'circle'，默认'polygon'
     * coverOption：自定义覆盖配置
     *
     * 事件名：
     * click-series，点击到echarts图的series上，返回包含点击图形数据信息的对象params
     * mouseover-series，鼠标移动到echarts图的series上，返回包含点击图形数据信息的对象params
     * 详情见：http://echarts.baidu.com/tutorial.html#ECharts%20%E4%B8%AD%E7%9A%84%E4%BA%8B%E4%BB%B6%E5%92%8C%E8%A1%8C%E4%B8%BA
     *
     * */
    import option from '../default-option/radar.js';
    import emitter from '../emitter/emitter.js';
    import initialize from '../emitter/initialize.js';

    export default {
        name: 've-radar',
        mixins: [emitter,initialize],
        props: {
            id: {
                type: String,
                required: true
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
            color: {
                type: Array,
                default: () => option.color || ['#01A2FC','#F9D135','#01B344','#05E3FD','#2A6FD6','#F6A20A']
            },
            showLegend: {
                type: Boolean,
                default: true
            },
            center: {
                type: Array,
                default: () => option.radar[0].center || ['50%','50%']
            },
            indicator: {
                type: Array,
                default: () => option.radar[0].indicator || []
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
                default: () => []
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
                hasChild: false//判断是否有对应子组件
            }
        },
        methods: {
            setBasicInfo: function(obj) {
                const children = this.$children;
                let legendArr = [],
                    _this = this,
                    option = this.tool.extend(true,{},obj),
                    data = _this.data,
                    color = _this.color,
                    title = _this.title,
                    showLegend = _this.showLegend,
                    backgroundColor = _this.backgroundColor;
                option.color = color;
                option.title.text = title;
                option.backgroundColor = backgroundColor;
                for(let i=0;i<children.length;i++){
                    let child = children[i];
                    if(child.childType === 'radar'){
                        _this.hasChild = true;
                        let subData = child.data;
                        subData.forEach(function(value){
                            if(value.name == void(0)){
                                throw '传入的雷达数据中缺少name值';
                            }
                            legendArr.push(value.name);
                        });
                    }
                }
                if(showLegend) {
                    if(!_this.hasChild){
                        data.forEach(function(value,index,array){
                            if(value.name == void(0)){
                                throw '传入的雷达图数据中缺少name值';
                            }
                            legendArr.push(value.name);
                        });
                    }
                    option.legend.data = legendArr;
                }else {
                    option.legend.data = [];
                }
                return option;
            },
            setDataInfo: function(obj){
                const children = this.$children;
                let _this = this,
                    data = _this.data,
                    indicator = _this.indicator,
                    option = this.tool.extend(true,{},obj),
                    radar = option.radar,
                    series = option.series,
                    basicSerie = option.series[0],//默认配置series里第一项作为标准配置
                    basicRadar = option.radar[0],
                    seriesArr = [],
                    radarArr = [],
                    radarIndex = -1;//雷达图所使用的radar组件的index。
                for(let i=0;i<children.length;i++){
                    let child = children[i];
                    if(child.childType === 'radar'){
                        radarIndex++;
                        let newSerieData = {
                                data: child.data,
                                radarIndex,
                                type: 'radar'
                            },
                            newRadarData = {
                                indicator: child.indicator,
                                center: child.center,
                                radius: child.radius,
                                startAngle: child.startAngle,
                                splitNumber: child.splitNumber,
                                shape: child.shape
                            },
                            newSerie = _this.tool.extend(true,{},basicSerie,newSerieData),
                            newRadar = _this.tool.extend(true,{},basicRadar,newRadarData);
                        seriesArr.push(newSerie);
                        radarArr.push(newRadar);
                    }
                }
                if(_this.hasChild){
                    option.series = seriesArr;
                    option.radar = radarArr;
                }else{
                    /*此时radar为对象而非数组*/
                    series[0].data = data;
                    if(indicator.length == 0){
                        throw '雷达图的indicator不能为空数组';
                    }
                    let newRadar = _this.tool.extend(true,{},basicRadar,{
                        indicator,
                        shape: _this.shape,
                        center: _this.center,
                        radius: _this.radius,
                        startAngle: _this.startAngle,
                        splitNumber: _this.splitNumber
                    });
                    option.radar = newRadar;
                }
                return option;
            }
        },
        watch: {
            /*数据绑定在<ve-pie>标签上且改变时触发*/
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