<template>
    <div class="investment">
        <!--搜索表单-->
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <FormItem prop="department">
                <Input type="text" v-model="formInline.department" clearable placeholder="部门名称">
                <Icon type="cube" slot="prepend" style="color: #28f;"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="infomationSystemName">
                <Input type="text" v-model="formInline.infomationSystemName" clearable placeholder="信息系统名称">
                <Icon type="cube" slot="prepend" style="color: #28f;"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="statuss">
                <Select v-model="formInline.statuss" placeholder="运行状态" clearable style="width: 200px;">
                    <Option v-for="(item, key) in selectOne" :key="key" :value="item">{{item}}</Option>
                </Select>
            </FormItem>
            <FormItem prop="network">
                <Select v-model="formInline.network" placeholder="所属网络" clearable style="width: 200px;">
                    <Option v-for="(item, key) in selectTwo" :key="key" :value="item">{{item}}</Option>
                </Select>
            </FormItem>
            <FormItem prop="safeguardDept">
                <Select v-model="formInline.safeguardDept" placeholder="维保单位" clearable style="width: 200px;">
                    <Option v-for="(item, key) in selectThree" :key="key" :value="item">{{item}}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
            </FormItem>
        </Form>

        <!--图表展示重要信息-->
        <collapse v-model="isOpen" accordion>
            <panel name="1">
                信息化系统数据可视化
                <div slot="content" class="info-sys-important">
                    <Card class="card">
                        <p slot="title">信息化系统运行状态</p>
                        <div style="height: 10rem;">
                            <ve-pie
                                    :rippleAnimation="true"
                                    style="width: 100%; height: 100%;"
                                    :center="['40%', '50%']"
                                    backgroundColor="transparent"
                                    id="info-system"
                                    :data="pieData"
                                    :radius="['55%','75%']"
                                    :coverOption="coverOption"
                                    :rippleSize = 5
                            ></ve-pie>
                        </div>
                    </Card>
                    <Card class="card">
                        <p slot="title">信息化系统所属网络</p>
                        <div style="height: 10rem;">
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
        </collapse>

        <Table border :columns="columns" :data="totalInfo" style="margin-top: 1rem;"></Table>
        <!--分页-->
        <Page :total="totalCount" show-total show-sizer @on-change="changePage" @on-page-size-change="changePageSize" style="margin: .5rem 0 .5rem 0;"></Page>
    </div>
</template>

<script>
    import columns from './table-heads/info-sys-maintain-head';
    export default {
        name: "",
        data(){
            return {
                isOpen: '1',
                columns: columns,
                pieData:
                    [
                        {value: 71, name:'互联网'},
                        {value: 19, name:'政务外网'},
                        {value: 90, name:'业务专网'}
                    ],
                coverOption: {
                    legend: {
                        top: 60,
                        right: 0,
                        textStyle: {
                            color: '#000'
                        }
                    },
                    series: [
                        {
                            label: {
                                normal: {
                                    show: true,
                                    formatter: `{b}:{d}({c})`
                                },
                                emphasis: {
                                    show: false,

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
                        type : 'category',
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
                    infomationSystemName: '',
                    statuss: '',
                    network: '',
                    safeguardDept: '',
                    pageSize: 10,
                    currentPage: 1
                },
                ruleInline: {
                    infomationSystemName: [
                        { required: false, message: '必填项', trigger: 'blur' }
                    ],
                    statuss: [
                        { required: false, message: '必填项', trigger: 'blur' }
                    ]
                },
                selectOne: [],
                selectTwo: [],
                selectThree: []
            }
        },
        methods: {
            changePage(destination = this.formInline.currentPage){
                // 翻页的时候是带着查询参数去翻页的
                this.$httpt.get('bigScreenController.do?getInfomatinSystemPagination&' +
                    'department=' + this.formInline.department+ '&' +
                    'infomationSystemName=' + this.formInline.infomationSystemName+ '&' +
                    'statuss=' + this.formInline.statuss+ '&' +
                    'network=' + this.formInline.network+ '&' +
                    'safeguardDept=' + this.formInline.safeguardDept+ '&' +
                    'currentPage='+ destination +'&' +
                    'pageSize=' + this.formInline.pageSize).then(({data}) => {
                    if(data.success) {
                        this.totalInfo = data.data.list;
                        this.totalCount = data.data.totalCount;
                        let tempPie =  [];
                        let newarr1 = new Array(this.selectOne.length);
                        for(let t = 0; t < newarr1.length; t++) {
                            newarr1[t] = 0;
                        }
                        for(let p = 0; p < this.selectOne.length; p++) {
                            for(let j = 0; j < data.data.list.length; j++) {
                                if(this.selectOne[p] === data.data.list[j].statuss) {
                                    newarr1[p]++;
                                }
                            }
                        }
                        for(let i = 0; i < newarr1.length; i ++){
                            let tempPieObj = {value: 0, name:''};
                            tempPieObj.value = newarr1[i];
                            tempPieObj.name = this.selectOne[i];
                            tempPie.push(tempPieObj);
                        }
                        setTimeout(() => {
                            this.pieData = tempPie;
                        }, 300);

                        let newarr2 = new Array(this.selectTwo.length);
                        for(let t = 0; t < newarr2.length; t++) {
                            newarr2[t] = 0;
                        }
                        for(let p = 0; p < this.selectTwo.length; p++) {
                            for(let j = 0; j < data.data.list.length; j++) {
                                if(this.selectTwo[p] === data.data.list[j].network) {
                                    newarr2[p]++;
                                }
                            }
                        }
                        this.xAxisData = this.selectTwo;
                        this.data = newarr2;
                    }else {
                        console.error('分页获取表3 信息化系统调研表信息失败')
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
            this.$httpt.get('bigScreenController.do?getInfomatinSystemPagination').then(({data}) => {
                if(data.success) {
                    let tempOne = [];
                    let tempTwo = [];
                    let tempThree = [];
                    data.data.list.forEach(item => {
                        tempOne.push(item.statuss);
                        tempTwo.push(item.network);
                        tempThree.push(item.safeguardDept);
                    });
                    this.selectOne = [...new Set(tempOne)].filter(item => {
                        return item !== '';
                    });
                    this.selectTwo = [...new Set(tempTwo)].filter(item => {
                        return item !== '';
                    });
                    this.selectThree = [...new Set(tempThree)].filter(item => {
                        return item !== '';
                    });
                    this.changePage();
                }else {
                    console.error('分页获取表3 信息化系统调研表信息失败')
                }
            }).catch(err => {
                throw Error(err);
            })
        },
        mounted() {

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