/**
 * 图表组件的公共mounted方法和计算属性lastOption
 * since 2018/1/25
 * author cfw2157
 */
import {Tool} from '../utils/util.js';
export default {
    mounted: function(){
        let _this = this;
        this.$on('changeData',(val) => {
            this.chart.setOption(this.lastOption);
        });
        this.$nextTick(function(){
            let rendererType = _this.rendererType,
                myChart = _this.$echarts.init(document.getElementById(_this.id),null,{renderer: rendererType});
            _this.chart = myChart;
            _this.y = _this.lastOption;
            //todo 测试用，随时删除
            // console.log('最终option');
            // console.log(_this.lastOption);
            myChart.setOption(_this.lastOption);
            myChart.on('click',function(params){
                if(params.componentType === 'series') {
                    _this.$emit('click-series',params);
                }
            });
            myChart.on('mouseover',function(params){
                if(params.componentType === 'series') {
                    _this.$emit('mouseover-series',params);
                }
            });
            window.addEventListener('resize', () => {
                myChart.resize();
            });
        });
    },
    data: function(){
        return {
            tool: new Tool()
        }
    },
    computed: {
        lastOption: function(){
            let option = this.option,
                basicInfoOption = this.setBasicInfo(option),
                dataOption = this.setDataInfo(basicInfoOption),
                coverOption = this.coverOption;
            if(coverOption && coverOption.constructor.name == 'Object'){
                /*let lastOption = $.extend(true,{},option, coverOption);//true开启深拷贝*/
                let lastOption = this.tool.extend(true,{},option ,dataOption, coverOption);//true开启深拷贝
                return lastOption;
            }else {
                let lastOption = this.tool.extend(true,{},option,dataOption);//true开启深拷贝
                return lastOption;
            }
        }
    }
}