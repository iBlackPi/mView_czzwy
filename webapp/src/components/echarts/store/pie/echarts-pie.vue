<template>
    <div ref="mychart">
        <div style="height: 100%;width: 100%" :id="id"></div>
        <slot></slot>
    </div>
</template>
<script>
    /**
     * 饼状图
     * 必填属性：id
     * 可选属性：
     * rendererType：渲染器类型，可选svg/canvas
     * title：图表标题
     * backgroundColor: 图表背景颜色
     * center: 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度。
     * radius：饼图的半径，数组的第一项是内半径，第二项是外半径,支持设置成百分比
     * color: 颜色，数组
     * labelPosition: 文字提示位置，可选：'inner','center', 'outside',改变normal中的position
     * showLegend:是否展示legend,布尔值(true/false)
     * data：饼图数据,默认格式：[{name:'name',value:val}，{name:'name',value:val}...]
     * rippleAnimation: 是否开启涟漪动画,布尔值(true/false)，默认false
     * rippleSize: 涟漪动画大小
     * rippleColor: 涟漪动画颜色
     * coverOption：自定义覆盖配置
     *
     * 事件名：
     * click-series，点击到echarts图的series上，返回包含点击图形数据信息的对象params
     * mouseover-series，鼠标移动到echarts图的series上，返回包含点击图形数据信息的对象params
     * 详情见：http://echarts.npmbaidu.com/tutorial.html#ECharts%20%E4%B8%AD%E7%9A%84%E4%BA%8B%E4%BB%B6%E5%92%8C%E8%A1%8C%E4%B8%BA
     *
     * */
    import option from '../default-option/pie.js';
    import emitter from '../emitter/emitter.js';
    import initialize from '../emitter/initialize.js';
    export default {
        name: 've-pie',
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
            center: {
                type: Array,
                default: () => option.custom.center || ['50%','50%']
                
            },
            radius: {
                type: Array,
                default: () => option.custom.radius || ['50%', '65%']
            },
            color: {
                type: Array,
                default: () => option.color || ['#01A2FC','#F9D135','#01B344','#05E3FD','#2A6FD6','#F6A20A']
            },
            labelPosition: {
                type: String,
                default: option.series[0].label.normal.position || 'outside'
            },
            showLegend: {
                type: Boolean,
                default: true
            },
            data: {
                type: Array,
                default: () => []
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
            coverOption:{
                type: Object,
                default: () => null
            }
        },
        data: function(){
            return {
                rippleOption: option.custom.effectScatterObj,
                option: option,
                chart: null,
                hasChild: false//判断是否有对应子组件
            }
        },
        methods: {
            //设置series外属性:color、legend、title、backgroundColor
            setBasicInfo: function(obj) {
                const children = this.$children;
                let legendArr = [],
                    _this = this,
                    data = _this.data,
                    showLegend = _this.showLegend,
                    option = _this.tool.extend(true,{},obj);
                option.color = _this.color;
                option.title.text = _this.title;
                option.backgroundColor = _this.backgroundColor;
                for(let i=0;i<children.length;i++){
                    let child = children[i];
                    if(child.childType === 'pie'){
                        _this.hasChild = true;
                        let subData = child.data;
                        legendArr = _this.getNames(subData);//有子组件，从子组件上data得到legend
                    }
                }
                if(showLegend) {
                    if(!_this.hasChild){
                        legendArr = _this.getNames(data);//无子组件,只能从父组件上找data
                    }
                    option.legend.data = legendArr;
                }else {
                    option.legend.data = [];
                }
                return option;
            },
            //从data中获取name的数组，用来展示legend
            getNames(data){
                let result = [];
                if(data && data instanceof Array){
                    data.forEach(function(value,index,array){
                        //允许为''，但不允许为null和undefined
                        if(value.name == void(0) || value.name == null){
                            throw '传入的饼图数据中缺少name值';
                        }
                        result.push(value.name);
                    });
                }
                return result;
            },
            //设置series内属性
            setDataInfo: function(obj){
                const children = this.$children;
                let index = 0,
                    _this = this,
                    id = _this.id,
                    seriesArr = [],
                    basicSerie = _this.option.series[0],
                    option = _this.tool.extend(true,{},obj),
                    labelPosition = _this.labelPosition;
                for(let i=0;i<children.length;i++) {
                    let child = children[i];
                    if (child.childType === 'pie') {
                        let center = child.center,
                            rippleAnimation = child.rippleAnimation,
                            rippleSize = child.rippleSize,
                            rippleColor = child.rippleColor;
                        let newSerieData = {
                            center,
                            radius: child.radius,
                            roseType: child.roseType,
                            data: child.data,
                            type: 'pie'
                        };
                        let newSerie = _this.tool.extend(true,{},basicSerie,newSerieData);
                        seriesArr.push(newSerie);
                        /*
                         * 遍历seriesArr里的数据，判断里面rippleAnimation的值，为true时获取center
                         * 根据center再次计算出所有的坐标
                         * */
                        if(rippleAnimation){
                            let ripple = _this.tool.extend(true,{},_this.rippleOption);
                            ripple.data[0] = _this.computeCoordinate(center,id);
                            ripple.rippleEffect.scale = rippleSize;
                            ripple.itemStyle.normal.color = rippleColor;
                            seriesArr.push(ripple);
                            index++;
                        }
                    }
                }
                if(_this.hasChild){
                    option.series = seriesArr;
                }else{
                    option.series[0].data = this.data;
                    option.series[0].radius = this.radius;
                    option.series[0].center = this.center;
                    option.series[0].label.normal.position = labelPosition;
                    if(_this.rippleAnimation){
                        let ripple = _this.tool.extend(true,{},this.rippleOption);
                        ripple.data[0] = _this.computeCoordinate(this.center,id);
                        ripple.rippleEffect.scale = _this.rippleSize;
                        ripple.itemStyle.normal.color = _this.rippleColor;
                        option.series[1] = ripple;
                    }
                }
                return option;
            },
            //传入饼图位置数组center和容器id,返回坐标
            computeCoordinate: function(center,id){
                /*
                 * 1.判断center里面是百分比还是数值
                 * center数组可以有三种数据写法
                 * center: ['50','50%']
                 * center: ['50%','50%'],
                 * center: [50,'50%'],
                 * 2.如果是百分比，转化为小数乘以1000得到坐标；
                 * 3.如果是数值，先计算容器宽高，再计算位置百分比，然后乘以accuracy得到坐标
                 * */
                let accuracy = this.option.custom.accuracy,
                    dom = document.getElementById(id),
                    domWidth = dom.offsetWidth,
                    domHeight = dom.offsetHeight,
                    x = center[0],
                    y = center[1],
                    xRate = 0,
                    yRate = 0;
                if(typeof x == 'number'){
                    xRate = Number((x/domWidth).toFixed(3));
                }else if(typeof  x == 'string'){
                    let a = x.split('%');
                    if(a.length > 1){
                        xRate = Number(a[0]/100);
                    }else {
                        xRate = Number((a[0]/domWidth).toFixed(3));
                    }
                }
                if(typeof y == 'number'){
                    yRate = Number((y/domHeight).toFixed(3));
                }else if(typeof  y == 'string'){
                    let b = y.split('%');
                    if(b.length > 1){
                        yRate = Number(b[0]/100);
                    }else {
                        yRate = Number((b[0]/domHeight).toFixed(3));
                    }
                }
                return [xRate*accuracy,(1-yRate)*accuracy];
            }
        },
        watch: {
            //数据绑定在<ve-pie>标签上且改变时触发
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