<style lang="less" scoped>

</style>
<template>
    <div id="main" style="height: 100%">
        <!--<Modal v-model="modal">
            <div slot="footer">
                <ve-pie id="pieTest"
                        title="饼图默认样式"
                        style="height:100%"
                        backgroundColor="#0A1829"
                        :color="color"
                        :center="center"
                        :radius="radius"
                        :data="pieData"
                        labelPosition="outside"
                        :rippleAnimation=true>
                    <ve-sub-pie :data="pieData" roseType="radius" :rippleAnimation=true></ve-sub-pie>
                    <ve-sub-pie :data="pieData" :center="center2" :radius="radius2" :rippleAnimation=false></ve-sub-pie>
                </ve-pie>
                &lt;!&ndash;<ve-gauge id="gaugeDemo" style="height: 50%" rendererType="svg" backgroundColor="#07192B">
                    <ve-sub-gauge :data="gaugeData1" :center=guageCenter1 :radius=gaugeRadius1></ve-sub-gauge>
                    <ve-sub-gauge :data="gaugeData1" :center=guageCenter2 :radius=gaugeRadius1></ve-sub-gauge>
                </ve-gauge>&ndash;&gt;
                &lt;!&ndash;<ve-rect-coordinate
                        id="rectTest"
                        parentId="main"
                        style="height:50%"
                        backgroundColor="#07192B"
                        :xAxisData="yArray0"
                        :showLegend=true
                        :dataZoom="dataZoom"
                        rendererType="svg">
                    <ve-line :data="yArray1" name="CPU" :smooth=true :startGradient="true" :linearGradient="linearGradient1" lineColor="rgba(1,151,228)"></ve-line>
                    <ve-line :data="yArray2" name="内存" :smooth=true :startGradient="true" :linearGradient="linearGradient3" lineColor="rgba(254,158,45)"></ve-line>
                    <ve-line :data="yArray3" name="存储" :smooth=true :startGradient="true" :linearGradient="linearGradient2" lineColor="rgba(28,166,88)"></ve-line>
                </ve-rect-coordinate>&ndash;&gt;
            </div>
        </Modal>-->
        <!--饼图demo-->
        <ve-pie id="pieTest"
                title="饼图默认样式"
                style="height:100%"
                labelPosition="outside">
            <ve-sub-pie :data="pieData" :center="center1" :rippleAnimation=true :rippleSize="20" rippleColor="rgb(237,28,36)"></ve-sub-pie>
            <ve-sub-pie :data="pieData" :center="center2" :rippleAnimation=true :rippleSize="10" rippleColor="green"></ve-sub-pie>
        </ve-pie>
        <!--<ve-svgMap id="test" name="cz5" style="height:100%"></ve-svgMap>-->
        <!--<ve-svgMap id="test" name="cz7" style="height:100%"></ve-svgMap>-->
        <!--地图demo-->
        <!--<ve-map id="mapTest"
                style="height: 100%"
                backgroundColor="#0A1829"
                placeName="china"
                :normalLabel="label"
                :emphasisLabel="label"
                :scatterData="mapData2"
                :lineData="mapData1"
                scatterColor="#F0BD26"
                normalAreaColor="#09203D"
                brushType="stroke">
        </ve-map>-->
        <!--直角坐标系demo-->
        <!--<ve-rect-coordinate
                id="rectTest"
                style="height:50%"
                backgroundColor="#07192B"
                :xAxisData="yArray0"
                :showLegend=true
                :dataZoom="dataZoom"
                rendererType="svg">
            &lt;!&ndash;<ve-bar :data="yArray1" ref="bar-rectTest-1" name="选项1" barWidth="20"></ve-bar>&ndash;&gt;
            &lt;!&ndash;<ve-bar :data="yArray2" ref="bar-rectTest-2" name="选项2" barWidth="20"></ve-bar>
            <ve-bar :data="yArray3" ref="bar-rectTest-3" name="选项3" barWidth="20"></ve-bar>&ndash;&gt;
            <ve-line :data="yArray1" ref="line-rectTest-1" name="CPU" :smooth=true :startGradient="true" :linearGradient="linearGradient1" lineColor="rgba(1,151,228)"></ve-line>
            <ve-line :data="yArray2" ref="line-rectTest-2" name="内存" :smooth=true :startGradient="true" :linearGradient="linearGradient3" lineColor="rgba(254,158,45)"></ve-line>
            <ve-line :data="yArray3" ref="line-rectTest-3" name="存储" :smooth=true :startGradient="true" :linearGradient="linearGradient2" lineColor="rgba(28,166,88)"></ve-line>
            &lt;!&ndash;<ve-bar :data="yArray1"
                    ref="bar-rectTest-4"
                    barWidth="30"
                    gradientDirection="top-bottom"
                    :linearGradient="linearArray">
            </ve-bar>&ndash;&gt;
            &lt;!&ndash;<ve-scatter :data="yArray1" ref="scatter-rectTest-3" name="散点图" symbolSize=10 symbol="rect"></ve-scatter>&ndash;&gt;
        </ve-rect-coordinate>-->
        <!--仪表盘demo-->
        <!--<ve-gauge id="gaugeDemo" style="height: 50%" rendererType="svg" backgroundColor="#07192B">
            <ve-sub-gauge :data="gaugeData1" :center=guageCenter1 :radius=gaugeRadius1></ve-sub-gauge>
            <ve-sub-gauge :data="gaugeData1" :center=guageCenter2 :radius=gaugeRadius1></ve-sub-gauge>
        </ve-gauge>-->
        <!--雷达图-->
        <!--<ve-radar id="radarDemo" :showLegend=true shape="circle" :indicator="indicator" :data="radarData" :center="radarCenter1">
            <ve-sub-radar :indicator="indicator" :data="radarData" :center="radarCenter1" :startAngle=30 shape="polygon"></ve-sub-radar>
            <ve-sub-radar :indicator="indicator" :data="radarData" :center="radarCenter2" radius="50%" shape="circle"></ve-sub-radar>
        </ve-radar>-->
    </div>
</template>

<script>
    /*import {Tool} from './store/emitter/util.js';*/
    export default {
        mounted: function(){
            /*let tool = new Tool();
            var result = tool.extend(true,{},{a: '1',b:'2',d:{e: '4'}} ,{a:'0',c: '3',d:{f:'5',e: '6'}});
            console.log('extend实验结果:');
            console.log(result);*/
        },
        data (){
            return {
                modal: true,
                coverOption: {
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            center:['20%','60%'],
                            selectedMode: 'single',
                            radius: ['40%', '50%'],
                            markPoint: {
                                symbol: 'circle',
                                symbolSize: 50,

                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'outside'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true
                                }
                            },
                            data:[
                                {value:335, name:'直达', selected:true},
                                {value:679, name:'营销广告'},
                                {value:1548, name:'搜索引擎'}
                            ]
                        }

                    ]
                },
                dataZoom: {x: true,y: true},
                color: ['#01A2FC','#01B344','#05E3FD','#F9D135','#2A6FD6','#F6A20A'],
                center1: ['20%','30%'],
                center2: ['70%','50%'],
                center: ['50%','50%'],
                radius: ['50%', '65%'],
                radius1: ['40%', '55%'],
                radius2: ['30%', '75%'],
                /*pieData: null,*/
                pieData: [
                    {value:35, name:'公共事业'},
                    {value:17, name:'政府'},
                    {value:15, name:'企业'},
                    {value:11, name:'金融'},
                    {value:14, name:'运营商'},
                    {value:8, name:'分销'}
                ],
                label: {
                  show: false
                },
                /*迁徙图数据*/
                mapData1: [
                    [{name:'广州'},{name:'福州'}],
                    [{name:'广州'},{name:'太原'}],
                    [{name:'广州'},{name:'长春'}],
                    [{name:'广州'},{name:'重庆'}],
                    [{name:'广州'},{name:'西安'}],
                    [{name:'广州'},{name:'成都'}],
                    [{name:'广州'},{name:'常州'}],
                    [{name:'广州'},{name:'北京'}],
                    [{name:'广州'},{name:'北海'}],
                    [{name:'广州'},{name:'海口'}]
                ],
                /*涟漪特效动画的散点（气泡）图数据*/
                mapData2: [
                    {name:'广州',value:100},
                    {name:'福州',value:95},
                    {name:'太原',value:90},
                    {name:'长春',value:80},
                    {name:'重庆',value:70},
                    {name:'西安',value:60},
                    {name:'成都',value:50},
                    {name:'常州',value:40},
                    {name:'北京',value:30},
                    {name:'北海',value:20},
                    {name:'海口',value:10}
                ]
                /*scatterData: [
                    '上海': [121.4648,31.2891,'高'],
                    '东莞': [113.8953,22.901,'中'],
                    '东营': [118.7073,37.5513,'低'],
                    '中山': [113.4229,22.478,'中'],
                    '临汾': [111.4783,36.1615,'中'],
                    '临沂': [118.3118,35.2936,'高'],
                    '丹东': [124.541,40.4242,'中'],
                    '丽水': [119.5642,28.1854,'低'],
                    '乌鲁木齐': [87.9236,43.5883,'中'],
                    '佛山': [112.8955,23.1097,'中'],
                    '保定': [115.0488,39.0948,'低'],
                    '兰州': [103.5901,36.3043,'中'],
                    '包头': [110.3467,41.4899,'低'],
                    '北京': [116.4551,40.2539,'中'],
                ]*/
                ,yArray0: ['01', '02', '03', '04', '05'],
                yArray1: [30, 42, 47, 30, 1],
                yArray2: [10, 26, 39, 15, 55],
                yArray3: [26, 11, 21, 21, 20],

                gaugeData1: [{value: 80, name: ''}],
                guageCenter1: ['30%', '50%'],
                guageCenter2: ['60%', '50%'],
                gaugeRadius1: '80%',
                linearGradient1: [{
                                    offset: 0,
                                    color: 'rgba(1, 151, 228, .8)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(1, 151, 228, 0)'
                                }],
                linearGradient2: [{
                                    offset: 0,
                                    color: 'rgba(28, 166, 88, .8)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(28, 166, 88, 0)'
                                }],
                linearGradient3: [{
                                    offset: 0,
                                    color: 'rgba(254, 158, 45, .8)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(254, 158, 45, 0)'
                                }],
                linearArray:  [{
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
                    }
                ],
                radarCenter1: ['30%', '50%'],
                radarCenter2: ['70%', '50%'],
                indicator: [
                    { name: '销售', max: 6500},
                    { name: '管理', max: 16000},
                    { name: '信息技术', max: 30000},
                    { name: '客服', max: 38000},
                    { name: '研发', max: 52000},
                    { name: '市场', max: 25000}
                ],
                radarData: [
                    {
                        value : [4300, 10000, 28000, 35000, 50000, 19000],
                        name : '预算分配'
                    },
                    {
                        value : [5000, 14000, 28000, 31000, 42000, 21000],
                        name : '实际开销'
                    }
                ]
            }
        }
    }
</script>
