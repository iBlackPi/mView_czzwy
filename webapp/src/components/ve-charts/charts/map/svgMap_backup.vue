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
                geoCoordMap3: data3.geoCoordMap
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
                        formatter(params){
                            let money = '暂无数据',
                                bussinessNum = '暂无数据',
                                removeNum = '暂无数据',
                                machineroomNum = '暂无数据',
                                serverNum = '暂无数据',
                                hasInternet = '暂无数据',
                                hasgovExtrant = '暂无数据',
                                hasspecialNet = '暂无数据',
                                cataLogNum = '暂无数据';
                            //todo 命名空间就代表store中的state，所以可以直接点属性获取数据
                            let temp = _this.$store.state.czCloudInfo.czCloudInfo[params.name];
                            if(temp){
                                money = temp.money;
                                bussinessNum = temp.bussinessNum;
                                removeNum = temp.removeNum;
                                machineroomNum = temp.machineroomNum;
                                serverNum = temp.serverNum;
                                temp.hasInternet ? hasInternet = '是' : hasInternet = '否';
                                temp.hasgovExtrant ? hasgovExtrant = '是' : hasgovExtrant = '否';
                                temp.hasspecialNet ? hasspecialNet = '是' : hasspecialNet = '否';
                                cataLogNum = temp.cataLogNum;
                            }
                            return `<span style="color: #01A2FC">${params.name}</span><br>
                                    <span style="color: rgba(255, 255, 255, .8);">
                                        信息化投资：<span style="color: #217bcc;"> ${money}</span><br>
                                        业务系统数量：<span style="color: #217bcc;"> ${bussinessNum}</span><br>
                                        可云化系统数：<span style="color: #217bcc;"> ${removeNum}</span><br>
                                        机房个数：<span style="color: #217bcc;"> ${machineroomNum}</span><br>
                                        服务器台数：<span style="color: #217bcc;"> ${serverNum}</span><br>
                                        是否有互联网：<span style="color: #217bcc;"> ${hasInternet}</span><br>
                                        是否接入政务外网：<span style="color: #217bcc;"> ${hasgovExtrant}</span><br>
                                        是否有专网：<span style="color: #217bcc;"> ${hasspecialNet}</span><br>
                                        资源目录数量：<span style="color: #217bcc;"> ${cataLogNum}</span><br>
                                    </span>`;
                        }
                    },
                    series : [
                        {
                            name: 'Top 5',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: this.convertData(_this.dataInfo, _this.geoCoordMap),
                            symbolSize: function (val) {
                                return 15;
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
                                    color: '#f4e925',
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
                        }]
                };
                chart.setOption(option);

                // 点击地图，去往后台信息维护系统
                chart.on('click', () => {
                   _this.$router.push({name: 'home'});
                });

                // 切换地图数据的开关, 由于地图数据太多，这里自动切换分批展示
                let isChangeFlag = 1,
                    data = [],
                    geoData = {};
                window.setInterval(() => {
                    if(isChangeFlag % 3 === 0){
                        data = _this.dataInfo2;
                        geoData = _this.geoCoordMap2;
                    }else if(isChangeFlag % 3 === 1){
                        data = _this.dataInfo3;
                        geoData = _this.geoCoordMap3;
                    }else if(isChangeFlag % 3 === 2){
                        data = _this.dataInfo;
                        geoData = _this.geoCoordMap;
                    }
                    isChangeFlag ++;
                    option.series[0].data = this.convertData(data, geoData);
                    chart.setOption(option);
                }, 3000);

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
        }
    }
</script>