<template>
    <div class="card-content" ref="mychart">
        <div style="height: 100%;width: 100%" :id="id"></div>
        <slot></slot>
    </div>
</template>
<script>
    /**
    *
     * 中国地图
     * 必填属性：id
     * 可选属性：
     * rendererType：渲染器类型，可选svg/canvas
     * title：图表标题
     * placeName: 地图名字：省份对应拼音，中国对应china，世界对应world
     * backgroundColor: 地图背景颜色
     * normalAreaColor: 静态地图块颜色
     * emphasisAreaColor：动态地图块颜色
     * normalBorderColor：静态地图块边界颜色
     * normalLabel： 静态地图图形上的文本标签，可设置字体样式
     * emphasisLabel：动态地图图形上的文本标签，可设置字体样式
     * scatterData：要在地图上画带有涟漪特效动画的散点（气泡）图传入的数据[{name:'',value:''}...]
     * scatterColor: 涟漪特效动画的颜色
     * scatterSymbolSize: 涟漪特效动画的点的尺寸
     * brushType: 涟漪特效波纹绘制方式，可选'stroke' 和 'fill'
     * lineData: 要在地图上画类带有起点和终点信息的线数据时传入的数据[[{name:'广州'},{name:'福州'}],[{name:'广州'},{name:'太原'}],[{name:'广州'},{name:'长春'}]]
     * lineColor: 线数据动画的颜色
     * lineSymbol: 线数据标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
     * lineSymbolSize: 线数据特效标记的大小
     * linePeriod: 线数据特效动画的时间，单位为 s
     * lineTrailLength: 线数据特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
     * coverOption：自定义覆盖配置
     *
    * */
    import option from '../default-option/map.js';
    import emitter from '../emitter/emitter.js';
    import initialize from '../emitter/initialize.js';
    import cityData from './city.js';

    export default {
        name: 've-map',
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
            placeName: {
                type: String,
                default: 'china',
                require: true
            },
            backgroundColor: {
                type: String,
                default: option.backgroundColor || '#000'
            },
            normalAreaColor: {
                type: String,
                default: option.geo.itemStyle.normal.areaColor || '#323c48'
            },
            normalBorderColor: {
                type: String,
                default: option.geo.itemStyle.normal.borderColor || 'dodgerblue'
            },
            normalLabel: {
                type: Object,
                default: () => {
                    let style = {
                        textStyle: {
                            color: '#999',
                            fontWeight:'normal',
                            fontFamily:'Microsoft YaHei',
                            fontSize: 13
                        },
                        show: false
                    };
                    return option.geo.label.normal || style;
                }
            },
            emphasisLabel: {
                type: Object,
                default(){
                    let style = {
                        textStyle: {
                            color: '#fff',
                            fontWeight:'normal',
                            fontFamily:'Microsoft YaHei',
                            fontSize: 13
                        },
                        show: false
                    };
                    return option.geo.label.emphasis || style;
                }
            },
            emphasisAreaColor: {
                type: String,
                default: option.geo.itemStyle.emphasis.areaColor || 'darkorange'
            },
            scatterData: {
                type: Array,
                default: () => []
            },
            scatterColor: {
                type: String,
                default: option.series[1].itemStyle.normal.color || '#F4E925'
            },
            scatterSymbolSize: {
                type: [String,Array,Function],
                default: () => {
                    let fun = function(val){
                        return val[2] / 8
                    };
                    return option.series[1].symbolSize || fun
                }
            },
            brushType: {
                type: String,
                default: option.series[1].rippleEffect.brushType || 'fill'
            },
            lineData: {
                type: Array,
                default: () => []
            },
            lineColor: {
                type: String,
                default: option.series[2].effect.color || '#fff'
            },
            lineSymbol: {
                type: String,
                default: option.series[2].effect.symbol || 'circle'
            },
            lineSymbolSize: {
                type: Number,
                default: option.series[2].effect.symbolSize || 3
            },
            linePeriod: {
                type: Number,
                default: option.series[2].effect.period || 6
            },
            lineTrailLength: {
                type: Number,
                default: option.series[2].effect.trailLength || 0.7
            },
            coverOption:{
                type: Object,
                default: () => null
            }
        },
        methods:{
            setBasicInfo: function(obj) {
                let title = this.title,
                    option = this.tool.extend(true,{},obj);
                option.title.text = title;
                option.backgroundColor = this.backgroundColor;
                option.geo.label.normal = this.normalLabel;
                option.geo.label.emphasis = this.emphasisLabel;
                option.geo.itemStyle.normal.areaColor = this.normalAreaColor;
                option.geo.itemStyle.normal.borderColor = this.normalBorderColor;
                option.geo.itemStyle.emphasis.areaColor = this.emphasisAreaColor;
                return option;
            },
            setDataInfo: function(obj){
                let placeName = this.placeName,
                    option = this.tool.extend(true,{},obj),
                    lineData = this.lineData,
                    scatterData = this.scatterData,
                    scatterDataArray = [],
                    lineDataArray = [],
                    cityData = this.cityData;
                if(scatterData.length != 0) {
                    scatterData.map(function(item){
                        var val = {
                            name: item.name,
                            value: cityData[item.name].concat(item.value)};
                        scatterDataArray.push(val);
                    })
                }
                if(lineData.length != 0) {
                    lineData.map(function (item,index,input) {
                        var fromName = item[0].name,
                            fromCoord = cityData[fromName],
                            toName = item[1].name,
                            toCoord = cityData[toName],
                            coords = [fromCoord,toCoord],
                            val = {
                                fromName,
                                toName,
                                coords
                            };
                        lineDataArray.push(val);
                    })
                }
                option.series[1].data = scatterDataArray;
                option.series[1].itemStyle.normal.color = this.scatterColor;
                option.series[1].rippleEffect.brushType = this.brushType;
                option.series[1].symbolSize = this.scatterSymbolSize;
                option.series[2].data = lineDataArray;
                option.series[2].effect.color = this.lineColor;
                option.series[2].effect.symbol = this.lineSymbol;
                option.series[2].effect.symbolSize = this.lineSymbolSize;
                option.series[2].effect.period = this.linePeriod;
                option.series[2].effect.trailLength = this.lineTrailLength;
                return this.mapParams[placeName].getGeoJosn(this,option);
            },
            geoJsonOper: function(name,option){
                let data = require('./province/'+name+'.json'),
                    d = [];
                 for( let i=0;i<data.features.length;i++ ){
                     d.push({
                        name:data.features[i].properties.name
                     })
                 }
                 this.$echarts.registerMap(name,data);
                 return this.renderMap(name,d,option);
            },
            renderMap: function(map,data,option){
                option.geo.map = map;
                option.series[0] =
                    {
                        name: map,
                        type: 'map',
                        mapType: map,
                        roam: false,
                        label: option.geo.label,
                        itemStyle: option.geo.itemStyle,
                        data: data
                    };
                return option;
            }
        },
        data (){
            return {
                option: option,
                chart: null,
                cityData: cityData,
                mapParams: {
                    'world': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('world',option);
                        }
                    },
                    'china': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('china',option);
                        }
                    },
                    '新疆': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('xinjiang',option);
                        }
                    },
                    '西藏': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('xizang',option);
                        }
                    },
                    '内蒙古': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('neimenggu',option);
                        }
                    },
                    '青海': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('qinghai',option);
                        }
                    },
                    '四川': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('sichuan',option);
                        }
                    },
                    '黑龙江': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('heilongjiang',option);
                        }
                    },
                    '甘肃': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('gansu',option);
                        }
                    },
                    '云南': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('yunnan',option);
                        }
                    },
                    '广西': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('guangxi',option);
                        }
                    },
                    '湖南': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('hunan',option);
                        }
                    },
                    '陕西': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('shanxi',option);
                        }
                    },
                    '广东': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('guangdong',option);
                        }
                    },
                    '吉林': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('jilin',option);
                        }
                    },
                    '河北': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('hebei',option);
                        }
                    },
                    '湖北': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('hubei',option);
                        }
                    },
                    '贵州': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('guizhou',option);
                        }
                    },
                    '山东': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('shandong',option);
                        }
                    },
                    '江西': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('jiangxi',option);
                        }
                    },
                    '河南': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('henan',option);
                        }
                    },
                    '辽宁': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('liaoning',option);
                        }
                    },
                    '山西': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('shanxi',option);
                        }
                    },
                    '安徽': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('anhui',option);
                        }
                    },
                    '福建': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('fujian',option);
                        }
                    },
                    '浙江': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('zhejiang',option);
                        }
                    },
                    '江苏': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('jiangsu',option);
                        }
                    },
                    '重庆': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('chongqing',option);
                        }
                    },
                    '宁夏': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('ningxia',option);
                        }
                    },
                    '海南': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('hainan',option);
                        }
                    },
                    '台湾': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('taiwan',option);
                        }
                    },
                    '北京': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('beijing',option);
                        }
                    },
                    '天津': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('tianjin',option);
                        }
                    },
                    '上海': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('shanghai',option);
                        }
                    },
                    '香港': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('xianggang',option);
                        }
                    },
                    '澳门': {
                        getGeoJosn: function(_this,option){
                            return _this.geoJsonOper('aomen',option);
                        }
                    }
                },
                color: ['#a6c84c', '#ffa022', '#46bee9']
            }
        }
    }
</script>
