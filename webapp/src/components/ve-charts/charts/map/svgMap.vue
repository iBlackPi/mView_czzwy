<template>
    <div class="card-content" ref="mychart">
        <div style="height: 100%;width: 100%" :id="id"></div>
        <slot></slot>
    </div>
</template>

<script>
    import emitter from '../../mixins/emitter.js';
    import 'echarts-liquidfill';

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
                dataInfo:[
                    {name: '市委办', value: 9},
                    {name: '市人大办', value: 12},
                    {name: '统战部', value: 12},
                    {name: '政法委', value: 12},
                    {name: '法院', value: 12},
                    {name: '工商局', value: 12},
                    {name: '质监局', value: 12},
                    {name: '人民银行', value: 12},
                    {name: '教育局', value: 12},
                    {name: '财政部', value: 12},
                    {name: '宣传部', value: 12},
                    {name: '检察院', value: 12},
                    {name: '交通局', value: 12},
                    {name: '住建局', value: 12},
                    {name: '广播电视台', value: 12}
                ],
                geoCoordMap:{
                    '市委办': [116.8446460000,38.2989530000,],
                    '市人大办': [116.8440300000,38.3063400000,],
                    '统战部': [116.8504440000,38.3129940000,],
                    '政法委': [116.5370640000,37.8882440000,],
                    '法院': [116.8539700000,38.3244900000,],
                    '工商局': [116.8515400000,38.3122300000,],
                    '质监局': [116.8268700000,38.3045600000,],
                    '人民银行': [116.8458200000,38.3218600000,],
                    '教育局': [116.8125500000,38.2954800000,],
                    '财政部': [116.8423500000,38.3041200000,],
                    '宣传部': [116.8662300000,38.3142000000,],
                    '检察院': [116.8125900000,38.2932700000,],
                    '交通局': [116.8704220000,38.3149400000,],
                    '住建局': [116.8144400000,38.3122200000,],
                    '广播电视台': [116.8522400000,38.3051900000,]
                }
            }
        },
        methods: {
            convertData(data) {
                let _this = this;
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = _this.geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                console.log(res);
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
                            data: this.convertData(_this.dataInfo),
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