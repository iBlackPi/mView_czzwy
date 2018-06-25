<template>
    <div class="investment">
        <!--搜索表单-->
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <FormItem prop="department">
                <Input type="text" v-model="formInline.department" clearable placeholder="部门名称">
                <Icon type="cube" slot="prepend" style="color: #28f;"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="infoSysName">
                <Input type="text" v-model="formInline.infoSysName" clearable placeholder="信息系统名称">
                <Icon type="cube" slot="prepend" style="color: #28f;"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="network">
                <Select v-model="formInline.network" placeholder="所属网络" clearable style="width: 200px;">
                    <Option v-for="(item, key) in selectOne" :key="key" :value="item">{{item}}</Option>
                </Select>
            </FormItem>
            <FormItem prop="removeTime">
                <Select v-model="formInline.removeTime" placeholder="迁移时间" clearable style="width: 200px;">
                    <Option v-for="(item, key) in selectTwo" :key="key" :value="item">{{item}}</Option>
                </Select>
            </FormItem>

            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
            </FormItem>
        </Form>

        <!--图表展示重要信息-->
        <!--<collapse v-model="isOpen" accordion>
            <panel name="1">
                &lt;!&ndash;信息化系统数据可视化&ndash;&gt;
                <div slot="content" class="info-sys-important">
                    <Card class="card">
                        <p slot="title">信息化系统迁移时间</p>
                        <div style="height: 10rem; background-color: rgba(43,50,69,.9);">
                            <ve-rect-coordinate
                                    id="benefit-two"
                                    style="height:100%"
                                    backgroundColor=""
                                    :xAxisData="xAxisMoveData"
                                    :showLegend=true
                                    :color="colors"
                                    :coverOption="coverOption">
                                <ve-line
                                        :data="moveData"
                                        name="迁移数量"
                                        lineColor="#F9D135">
                                </ve-line>
                            </ve-rect-coordinate>
                        </div>
                    </Card>
                    <Card class="card">
                        <p slot="title">信息化系统所属网络</p>
                        <div style="height: 10rem; background-color:  rgba(43,50,69,.9);">
                            <ve-rect-coordinate
                                    id="connect-net"
                                    style="height:100%"
                                    backgroundColor=""
                                    :xAxisData="xAxisData"
                                    :showLegend=true
                                    :coverOption="coverOption2">
                                <ve-bar
                                        :data="data"
                                        name="数量（个）"
                                        barWidth="20"
                                ></ve-bar>
                            </ve-rect-coordinate>
                        </div>
                    </Card>
                </div>
            </panel>
        </collapse>-->

        <Table border :columns="columns" :data="totalInfo"></Table>
        <!--分页-->
        <Page :total="totalCount" show-total show-sizer @on-change="changePage" @on-page-size-change="changePageSize"
              style="margin: .5rem 0 .5rem 0;"></Page>
    </div>
</template>

<script>
    import columns from './table-heads/move-info-head';

    export default {
        name: "",
        data() {
            return {
                isOpen: '1',
                columns: columns,

                colors: ['#01A2FC', '#F9D135', '#01B344', '#01A2FC'],
                xAxisMoveData: ['2018', '2019', '2020'],
                moveData: [40, 65, 70],
                coverOption: {
                    legend: {
                        top: 0,
                        right: -30
                    },
                    grid: {
                        top: '25%',
                        bottom: '20%'
                    },
                    series: [
                        {
                            symbol: 'circle',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            showSymbol: true,
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(137, 189, 27, 0.3)'
                                    }, {
                                        offset: 0.8,
                                        color: 'rgba(137, 189, 27, 0)'
                                    }], false),
                                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                                    shadowBlur: 10
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'rgb(137,189,27)',
                                    borderColor: 'rgba(137,189,2,0.27)',
                                    borderWidth: 12
                                }
                            }
                        }
                    ]
                },
                xAxisData: ['互联网', '政务外网', '业务专线', '政务内网'],
                data: [64, 60, 66, 10],
                coverOption2: {
                    grid: {
                        top: '12%',
                        bottom: '15%'
                    },
                    legend: {
                        top: -10,
                        right: -30,
                        textStyle: {
                            color: '#217bcc'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            show: true,
                            interval: 0,
                            rotate: 0,
                            textStyle: {
                                color: '#333'
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        /*分隔线*/
                        splitLine: {
                            show: false,
                        },
                        /*刻度标签*/
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#333'
                            }
                        }
                    },
                    series: [
                        {
                            label: {
                                show: true,
                                position: 'top',
                                color: '#333'
                            }
                        }
                    ]
                },
                totalCount: 0,
                totalInfo: [],
                formInline: {
                    department: '',
                    infoSysName: '',
                    network: '',
                    removeTime: '',
                    pageSize: 10,
                    currentPage: 1
                },
                ruleInline: {
                    infoSysName: [
                        {required: false, message: '必填项', trigger: 'blur'}
                    ],
                    sysDeployNet: [
                        {required: false, message: '必填项', trigger: 'blur'}
                    ]
                },
                selectOne: [],
                selectTwo: []
            }
        },
        methods: {
            changePage(destination = this.formInline.currentPage) {
                // 翻页的时候是带着查询参数去翻页的
                this.$httpt.get('removeController.do?getCzRemove&' +
                    'department=' + this.formInline.department + '&' +
                    'infoSystemName=' + this.formInline.infoSysName + '&' +
                    'network=' + this.formInline.network + '&' +
                    'removeTime=' + this.formInline.removeTime + '&' +
                    'currentPage=' + destination + '&' +
                    'pageSize=' + this.formInline.pageSize).then(({data}) => {
                    if (data.success) {
                        this.totalInfo = data.data.list;
                        this.totalCount = data.data.totalCount;
                        let tempPie = [];
                        let newarr1 = new Array(this.selectTwo.length);
                        for (let t = 0; t < newarr1.length; t++) {
                            newarr1[t] = 0;
                        }
                        for (let p = 0; p < this.selectTwo.length; p++) {
                            for (let j = 0; j < data.data.list.length; j++) {
                                if (this.selectTwo[p] === data.data.list[j].network) {
                                    newarr1[p]++;
                                }
                            }
                        }
                        for (let i = 0; i < newarr1.length; i++) {
                            let tempPieObj = {value: 0, name: ''};
                            tempPieObj.value = newarr1[i];
                            tempPieObj.name = this.selectTwo[i];
                            tempPie.push(tempPieObj);
                        }
                        setTimeout(() => {
                            this.pieData = tempPie;
                        }, 300);

                        let newarr2 = new Array(this.selectOne.length);
                        for (let t = 0; t < newarr2.length; t++) {
                            newarr2[t] = 0;
                        }
                        for (let p = 0; p < this.selectOne.length; p++) {
                            for (let j = 0; j < data.data.list.length; j++) {
                                if (this.selectOne[p] === data.data.list[j].sysDeployNet) {
                                    newarr2[p]++;
                                }
                            }
                        }
                        this.xAxisData = this.selectOne;
                        this.data = newarr2;

                    } else {
                        console.error('分页获取系统迁移表信息失败')
                    }
                }).catch(err => {
                    throw Error(err);
                })
            },
            changePageSize(pageSize) {
                this.where.countPerPage = pageSize;
                //翻页的时候是带着查询参数去翻页的
                this.changePage();
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.changePage();
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        },
        created() {
            this.$httpt.get('removeController.do?getCzRemove&' +
                'department=&' +
                'infoSysName=&' +
                'network=&' +
                'removeTime=&' +
                'currentPage=0&' +
                'pageSize=100000').then(({data}) => {
                if (data.success) {
                    let tempOne = [];
                    let tempTwo = [];
                    data.data.list.forEach(item => {
                        tempOne.push(item.network);
                        tempTwo.push(item.removeTime);
                    });
                    this.selectOne = [...new Set(tempOne)].filter(item => {
                        return item !== '' && item !== null && item !== 'null';
                    });
                    this.selectTwo = [...new Set(tempTwo)].filter(item => {
                        return item !== '' && item !== null && item !== 'null';
                    });
                    // 该方法初始化中有逻辑依赖这个回调中的值，所以该方法放在这里调用
                    this.changePage();
                } else {
                    console.error('分页获取系统迁移表信息失败')
                }
            }).catch(err => {
                throw Error(err);
            })
        },
        mounted() {
            if (this.$route.query.dName) {
                this.formInline.department = this.$route.query.dName;
                this.changePage();
            }
        }
    }
</script>

<style scoped type="text/less" lang="less">
    .info-sys-important {
        display: flex;
        flex-flow: row nowrap;
    }

    .card {
        flex: 1;
        &:first-child {
            margin-right: .5rem;
        }
        &:nth-child(2) {
            margin-left: .5rem;
        }
    }
</style>