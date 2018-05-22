<template>
    <div class="card-content" ref="mychart">
        <div style="height: 100%;width: 100%" :id="id"></div>
        <slot></slot>
    </div>
</template>

<script>
    import emitter from '../../mixins/emitter.js';
    import 'echarts-liquidfill';
    import data1 from './geoJson/geoData1';
    import data2 from './geoJson/geoData2';
    import data3 from './geoJson/geoData3';
    import allDepartments from './geoJson/all-departments';
    import {lineOne, lineTwo, lineThree} from './geoJson/lines-data';
    export default {
        name: 've-svgMap',
        mixins: [emitter],
        props: {
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        },
        data (){
            return {
                dataInfo: data1.dataInfo,
                geoCoordMap: data1.geoCoordMap,
                dataInfo2: data2.dataInfo,
                geoCoordMap2: data2.geoCoordMap,
                dataInfo3: data3.dataInfo,
                geoCoordMap3: data3.geoCoordMap,
                lineOne: lineOne,
                lineTwo: lineTwo,
                lineThree: lineThree,
            }
        },
        methods: {
            convertData(data, geoCoordMap) {
                let res = [];
                for (let i = 0; i < data.length; i++) {
                    let geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                // console.log(res);
                return res;
            },
            convertLineData(data) {
                let _this = this;
                let res = [];
                for (let i = 0; i < data.line.length; i++) {
                    let dataItem = data.line[i];
                    let fromCoord = _this[data.geoFlag][dataItem[0].name];
                    let toCoord = _this[data.geoFlag][dataItem[1].name];
                    if (fromCoord && toCoord) {
                        res.push({
                            fromName: dataItem[0].name,
                            toName: dataItem[1].name,
                            coords: [fromCoord, toCoord],
                            value: dataItem[1].value
                        });
                    }
                }
                return res;
            },
            drawMap: function(name,path){
                let chart = this.$echarts.init(document.getElementById(this.id));
                let _this = this;
                let option = {
                    backgroundColor: '',
                    geo: {
                        map: name,
                        roam: false,
                        left: '17%',
                        top: '0%',
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: 'rgba(0,0,0,0.4)'
                                }
                            }
                        },
                        itemStyle: {
                            normal:{
                                areaColor: 'rgba(0, 0, 0, 0)',
                                borderColor: 'rgba(0, 0, 0, 0.2)',
                                backgroundColor: 'rgba(0, 0, 0, 0)'
                            },
                            emphasis:{
                                show: false,
                                areaColor: 'rgba(255,0,0,0)'
                            }
                        }
                    },
                    tooltip : {
                        backgroundColor: 'rgba(0,0,0,.5)',
                        formatter(params){
                            let money = '0',
                                temp1 = '0',
                                netDeviceNum = '0',
                                bussinessNum = '0',
                                removeNum = '0',
                                machineroomNum = '0',
                                serverNum = '0',
                                hasInternet = '0',
                                hasgovExtrant = '0',
                                hasspecialNet = '0',
                                internetNum = '0',
                                zhengwuNum = '0',
                                netNum = '0',
                                cataLogNum = '0';
                            //todo 命名空间就代表store中的state，所以可以直接点属性获取数据
                            let departmentName = params.name || params.data.fromName;
                            let temp = _this.$store.state.czCloudInfo.czCloudInfo[departmentName];
                            if(temp){
                                money = temp.money;
                                netDeviceNum = temp.netDeviceNum;
                                bussinessNum = temp.bussinessNum;
                                removeNum = temp.removeNum;
                                machineroomNum = temp.machineroomNum;
                                serverNum = temp.serverNum;
                                temp.hasInternet ? hasInternet = '是' : hasInternet = '否';
                                temp.hasgovExtrant ? hasgovExtrant = '是' : hasgovExtrant = '否';
                                temp.hasspecialNet ? hasspecialNet = '是' : hasspecialNet = '否';
                                temp.temp1 === null || temp.temp1 === 'null' || temp.temp1 === '否'? temp1 = '否' : temp1 = '是';
                                cataLogNum = temp.cataLogNum;
                                internetNum = temp.internetNum;
                                zhengwuNum = temp.zhengwuNum;
                                netNum = temp.netNum;
                            }
                            return `<section class="map-modal" style="position: relative;width: 25rem;">
                                        <section class="map-modal-item">
                                            <span class="map-modal-item-data">${temp1}</span>
                                            <p class="map-modal-item-title">是否有信息科</p>
                                        </section>
                                        <section class="map-modal-item">
                                            <span class="map-modal-item-data">${bussinessNum}</span>
                                            <p class="map-modal-item-title">业务系统数量</p>
                                        </section>
                                        <section class="map-modal-item">
                                            <span class="map-modal-item-data">${removeNum}</span>
                                            <p class="map-modal-item-title">可云化系统数</p>
                                        </section>
                                        <section class="map-modal-item">
                                            <span class="map-modal-item-data">${machineroomNum}</span>
                                            <p class="map-modal-item-title">机房个数</p>
                                        </section>
                                        <section class="map-modal-item">
                                            <span class="map-modal-item-data">${serverNum}</span>
                                            <p class="map-modal-item-title">服务器台数</p>
                                        </section>
                                        <section class="map-modal-item">
                                            <span class="map-modal-item-data">${internetNum}</span>
                                            <p class="map-modal-item-title">互联网线路数</p>
                                        </section>
                                        <section class="map-modal-item">
                                            <span class="map-modal-item-data">${zhengwuNum}</span>
                                            <p class="map-modal-item-title">政务外网线路数</p>
                                        </section>
                                        <section class="map-modal-item">
                                            <span class="map-modal-item-data">${netNum}</span>
                                            <p class="map-modal-item-title">专网线路数</p>
                                        </section>
                                        <section class="map-modal-item">
                                            <span class="map-modal-item-data">${cataLogNum}</span>
                                            <p class="map-modal-item-title">资源目录数量</p>
                                        </section>
                                        <section class="map-modal-item">
                                            <span class="map-modal-item-data">${netDeviceNum}</span>
                                            <p class="map-modal-item-title">网络设备数量</p>
                                        </section>
                                    </section>`;
                        }
                    },
                    series : [
                        {
                            name: '沧州信息化资源分布',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: this.convertData(_this.dataInfo, _this.geoCoordMap),
                            symbolSize: function (val) {
                                if(val[2] < 10) {
                                    return Math.random() * 10 + 5;
                                }
                                if(val[2] >= 10 && val[2] < 20) {
                                    return val[2];
                                }
                                if(val[2] >= 20) {
                                    return Math.random() * 25 + 1;
                                }
                            },
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    // color: '#f4e925',
                                    color: '#01FDDC',
                                    shadowBlur: 10,
                                    shadowColor: '#333'
                                }
                            },
                            zlevel: 1
                        },
                        {
                            type: 'liquidFill',
                            radius: '200%',
                            outline: {
                                show: false
                            },
                            backgroundStyle: {
                                borderWidth: 0,
                                shadowColor: 'rgba(0, 0, 0, 0)',
                                color: 'rgba(53, 90, 220, .3)'
                            },
                            data: [0],
                            label: {
                                show: false
                            },
                            shape: path
                        }/*,{
                            name: '沧州信息化资源分布',
                            type: 'lines',
                            zlevel: 10,
                            polyline: false,

                            effect: {
                                show: true,
                                constantSpeed: 30,
                                symbol: 'pin',
                                symbolSize: 3,
                                trailLength: 0,
                            },
                            lineStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0, color: '#58B3CC'
                                    }, {
                                        offset: 1, color: '#F58158'
                                    }], false),
                                    width: 1,
                                    opacity: 0.2,
                                    curveness: 0.1
                                }
                            },
                            data: this.convertLineData({line: this.lineOne, geoFlag: 'geoCoordMap'})
                        }*/]
                };
                chart.setOption(option);

                // 点击地图，去往后台信息维护系统
                chart.on('click', (params) => {
                    // 如果点击地图上的点，则跳转到改点对应的信息详情后台页面,并展示该部门的数据
                    // 如果不是点击部门，则跳转到后台home页
                    if(allDepartments.includes(params.name) || allDepartments.includes(params.data.fromName)) {
                        let departmentName = params.name || params.data.fromName;
                        _this.$router.push({name: 'department-info', query: {
                                department: departmentName //保证每次点击路由的query项都是不一样的，确保会重新刷新view
                            }});
                    }else {
                        debugger;
                        _this.$router.push({name: 'home'});
                    }
                });

                // 切换地图数据的开关, 由于地图数据太多，这里自动切换分批展示
                let isChangeFlag = 1,
                    data = [],
                    geoData = {},
                    lineData = {line: this.lineOne, geoFlag: 'geoCoordMap'};
                window.setInterval(() => {
                    if(isChangeFlag % 3 === 1){
                        data = _this.dataInfo2;
                        geoData = _this.geoCoordMap2;
                        lineData.line = this.lineTwo;
                        lineData.geoFlag = 'geoCoordMap2';
                    }else if(isChangeFlag % 3 === 2){
                        data = _this.dataInfo3;
                        geoData = _this.geoCoordMap3;
                        lineData.line = this.lineThree;
                        lineData.geoFlag = 'geoCoordMap3';
                    }else if(isChangeFlag % 3 === 0){
                        data = _this.dataInfo;
                        geoData = _this.geoCoordMap;
                        lineData = this.lineOne;
                        lineData.geoFlag = 'geoCoordMap';
                        lineData.line = this.lineOne;
                    }
                    isChangeFlag ++;
                    console.log('---------------linedata------------',lineData, this.convertLineData(lineData));
                    option.series[0].data = this.convertData(data, geoData);
                    // option.series[2].data = this.convertLineData(lineData);
                    chart.setOption(option);
                }, 15 * 1000);

                //防止别的图表的resize被覆盖
                window.addEventListener('resize', () => {
                    chart.resize();
                })
            },
            getGeoJson: function(name){
                let data = require('./geoJson/'+name+'.geojson'),
                    path = require('./svgImg/path/'+name+'.js');
                this.$echarts.registerMap(name,data);
                this.drawMap(name,path.default);
            }
        },
        mounted() {
            this.getGeoJson(this.name);
            let cloudInfo = this.$store.state.czCloudInfo.czCloudInfo;
            // 初次加载store中没有数据，会报错，这里做判断
            if(cloudInfo.length > 0) {
                this.dataInfo.forEach(item => {
                    item.value = cloudInfo[item.name].bussinessNum;
                });
                this.dataInfo2.forEach(item => {
                    item.value = cloudInfo[item.name].bussinessNum;
                });
                this.dataInfo3.forEach(item => {
                    item.value = cloudInfo[item.name].bussinessNum;
                });
            }
        }
    }
</script>
<style lang="less" >
    .map-modal-item {
        position: relative;
        float: left;
        width: 6rem;
        height: 4rem;
        border: 1px solid transparent;
        margin: .1rem;
        background-color: rgba(24, 38, 101, 0.5);
        .map-modal-item-data {
            color: #05A2FA;
            font-size: 1.2rem;
            font-weight: bold;
            .middle-center(35%, 50%);
        }
        .map-modal-item-title {
            color: rgba(255,255,255,.7);
            font-size: .8rem;
            white-space: nowrap;
            .middle-center(80%, 50%);
        }
        .map-modal-item-left {
            color: #01FDAD;
            font-size: 1rem;
            .middle-center(35%, 30%);
        }
        .map-modal-item-right {
            color: #01FDAD;
            font-size: 1rem;
            .middle-center(35%, 70%);
        }
    }
    .middle-center(@top: 50%, @left: 50%) {
        position: absolute;
        top: @top;
        left: @left;
        transform: translate(-50%, -50%);
    }
</style>