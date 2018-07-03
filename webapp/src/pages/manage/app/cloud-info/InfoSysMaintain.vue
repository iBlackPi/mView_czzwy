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
            <FormItem prop="osType">
                <Select v-model="formInline.osType" placeholder="操作系统" clearable style="width: 200px;">
                    <Option v-for="(item, key) in selectThree" :key="key" :value="item">{{item}}</Option>
                </Select>
            </FormItem>
            <FormItem prop="databaseType">
                <Select v-model="formInline.databaseType" placeholder="数据库" clearable style="width: 200px;">
                    <Option v-for="(item, key) in selectFour" :key="key" :value="item">{{item}}</Option>
                </Select>
            </FormItem>
            <FormItem prop="middlewareType">
                <Select v-model="formInline.middlewareType" placeholder="中间件" clearable style="width: 200px;">
                    <Option v-for="(item, key) in selectFive" :key="key" :value="item">{{item}}</Option>
                </Select>
            </FormItem>
            <FormItem prop="serverType">
                <Select v-model="formInline.serverType" placeholder="服务器" clearable style="width: 200px;">
                    <Option v-for="(item, key) in selectSix" :key="key" :value="item">{{item}}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
            </FormItem>
        </Form>

        <Alert show-icon closable>
            现状说明
            <template slot="desc">
                83家局委办，共收集497套应用系统，其中上级统建212套
                自建和统建本地部署的285套系统：
                互联网99套；
                政务外网11套
                各类业务专网和局域网175套；
                6家单位已建数据共享平台（发改委信用共享交换平台，审批局临时共享交换平台，国土局、人社局、公积金、公安局为内部数据对接交换的资源库）；
                微信公众号44个；APP20个；
                7套视频监控系统；14套视频会议系统；
                26套办公OA系统；
            </template>
        </Alert>

        <Alert type="warning" show-icon closable>
            存在的问题
            <template slot="desc">
                大部分应用系统均是以科室为单位建设，条块分割，数据资源分散；
                信息化建设缺乏统筹规划，部分系统存在功能重复；
                未来越来越多的应用系统将向省级统建一级部署；
                约50%的系统采取了数据备份，但是大部分采用自动化脚本而非专业的备份软件，数据安全存在严重的隐患；
                同时大部分系统缺乏有效的安全防御手段
            </template>
        </Alert>

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
                                    :rippleSize=5
                                    @click-series="selectStatus"
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
                                    :coverOption="coverOption2"
                                    @click-series="selectNetwork">
                                <ve-bar
                                        :data="data"
                                        name="数量（个）"
                                        barWidth="20"
                                ></ve-bar>
                            </ve-rect-coordinate>
                        </div>
                    </Card>
                    <Card class="card">
                        <p slot="title">操作系统占比</p>
                        <div style="height: 10rem;">
                            <ve-pie
                                    :rippleAnimation="true"
                                    style="width: 100%; height: 100%;"
                                    :center="['40%', '50%']"
                                    backgroundColor="transparent"
                                    id="os"
                                    :data="pieData2"
                                    :radius="['55%','75%']"
                                    :coverOption="coverOption"
                                    :rippleSize=5
                                    @click-series="selectOS"
                            ></ve-pie>
                        </div>
                    </Card>
                    <Card class="card">
                        <p slot="title">各数据库占比</p>
                        <div style="height: 10rem;">
                            <ve-pie
                                    :rippleAnimation="true"
                                    style="width: 100%; height: 100%;"
                                    :center="['40%', '50%']"
                                    backgroundColor="transparent"
                                    id="db"
                                    :data="pieData3"
                                    :radius="['55%','75%']"
                                    :coverOption="coverOption"
                                    :rippleSize=5
                                    @click-series="selectDB"
                            ></ve-pie>
                        </div>
                    </Card>
                </div>
            </panel>
        </collapse>

        <Table border :columns="columns" :data="totalInfo" style="margin-top: 1rem;"></Table>
        <!--分页 show-total-->
        <Page :total="totalCount" show-sizer @on-change="changePage" @on-page-size-change="changePageSize"
              style="margin: .5rem 0 .5rem 0;"></Page>
    </div>
</template>

<script>
    import columns from './table-heads/info-sys-maintain-head';

    export default {
        name: "",
        data() {
            return {
                isOpen: '1',
                columns: columns,
                pieData:
                    [
                        {value: 71, name: '建设中'},
                        {value: 19, name: '运行中'},
                        {value: 90, name: '停用'}
                    ],
                pieData2:
                    [
                        {value: 374, name: 'windows'},
                        {value: 144, name: 'linux'},
                        {value: 14, name: 'AIX(Unix)'}
                    ],
                pieData3:
                    [
                        {value: 76, name: 'Oracle'},
                        {value: 96, name: 'SQLServer'},
                        {value: 16, name: 'Mysql'},
                        {value: 29, name: '其他'}
                    ],
                coverOption: {
                    legend: {
                        top: 20,
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
                                    show: true,
                                    textStyle: {
                                        fontSize: '20px',
                                        fontWeight: 'bold'
                                    }
                                }
                            }
                        }
                    ]
                },
                xAxisData: ['互联网', '政务外网', '业务专网', '统建'],
                data: [99, 11, 175, 212],
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
                    infomationSystemName: '',
                    statuss: '',
                    network: '',
                    pageSize: 10,
                    currentPage: 1,
                    osType: '',
                    databaseType: '',
                    middlewareType: '',
                    serverType: ''
                },
                ruleInline: {
                    infomationSystemName: [
                        {required: false, message: '必填项', trigger: 'blur'}
                    ],
                    statuss: [
                        {required: false, message: '必填项', trigger: 'blur'}
                    ]
                },
                selectOne: [],
                selectTwo: [],
                selectThree: [],
                selectFour: [],
                selectFive: [],
                selectSix: [],
            }
        },
        methods: {
            selectStatus(params) {
                this.formInline.statuss = params.name;
                this.changePage();
            },
            selectNetwork(params) {
                if(params.name !== '统建') {
                    this.formInline.network = params.name;
                }else {
                    this.formInline.network = '互联网';
                }
                this.changePage();
            },
            selectOS(params) {
                this.formInline.osType = params.name;
                this.changePage();
            },
            selectDB(params) {
                this.formInline.databaseType = params.name;
                this.changePage();
            },
            changePage(destination = this.formInline.currentPage) {
                // console.log(this.formInline.osType, this.formInline.osType.replace(/\s+/g,"+"));
                // 翻页的时候是带着查询参数去翻页的
                this.$httpt.get('bigScreenController.do?getInfomatinSystemPagination&' +
                    'department=' + this.formInline.department + '&' +
                    'infomationSystemName=' + this.formInline.infomationSystemName + '&' +
                    'status=' + this.formInline.statuss + '&' +
                    'network=' + this.formInline.network + '&' +
                    'osType=' + this.formInline.osType.replace(/\s+/g,"+") + '&' +
                    'databaseType=' + this.formInline.databaseType.replace(/\s+/g,"+") + '&' +
                    'middlewareType=' + this.formInline.middlewareType.replace(/\s+/g,"+") + '&' +
                    'serverType=' + this.formInline.serverType.replace(/\s+/g,"+") + '&' +
                    'currentPage=' + destination + '&' +
                    'pageSize=' + this.formInline.pageSize).then(({data}) => {
                    if (data.success) {
                        this.totalInfo = data.data.list;
                        this.totalCount = data.data.totalCount;
                    } else {
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
            },
            dataForSearch(destination = this.formInline.currentPage) {
                // 翻页的时候是带着查询参数去翻页的
                this.$httpt.get('bigScreenController.do?getInfomatinSystemPagination&' +
                    'department=' + this.formInline.department + '&' +
                    'infomationSystemName=' + this.formInline.infomationSystemName + '&' +
                    'status=' + this.formInline.statuss + '&' +
                    'network=' + this.formInline.network + '&' +
                    'osType=' + this.formInline.osType.replace(/\s+/g,"+") + '&' +
                    'databaseType=' + this.formInline.databaseType.replace(/\s+/g,"+") + '&' +
                    'middlewareType=' + this.formInline.middlewareType.replace(/\s+/g,"+") + '&' +
                    'serverType=' + this.formInline.serverType.replace(/\s+/g,"+") + '&' +
                    'currentPage=' + destination + '&' +
                    'pageSize=' + 10000).then(({data}) => {
                    if (data.success) {
                        this.totalCount = data.data.totalCount;
                        let tempPie = [];
                        let newarr1 = new Array(this.selectOne.length);
                        for (let t = 0; t < newarr1.length; t++) {
                            newarr1[t] = 0;
                        }
                        for (let p = 0; p < this.selectOne.length; p++) {
                            for (let j = 0; j < data.data.list.length; j++) {
                                if (this.selectOne[p] === data.data.list[j].status) {
                                    newarr1[p]++;
                                }
                            }
                        }
                        for (let i = 0; i < newarr1.length; i++) {
                            let tempPieObj = {value: 0, name: ''};
                            tempPieObj.value = newarr1[i];
                            tempPieObj.name = this.selectOne[i];
                            tempPie.push(tempPieObj);
                        }
                        setTimeout(() => {
                            this.pieData = tempPie;
                        }, 300);

                        let newarr2 = new Array(this.selectTwo.length);
                        for (let t = 0; t < newarr2.length; t++) {
                            newarr2[t] = 0;
                        }
                        for (let p = 0; p < this.selectTwo.length; p++) {
                            for (let j = 0; j < data.data.list.length; j++) {
                                if (this.selectTwo[p] === data.data.list[j].network) {
                                    newarr2[p]++;
                                }
                            }
                        }
                        // this.xAxisData = this.selectTwo;
                        // this.data = newarr2;
                    } else {
                        console.error('分页获取表3 信息化系统调研表信息失败')
                    }
                }).catch(err => {
                    throw Error(err);
                })
            }
        },
        created() {
            this.$httpt.get('bigScreenController.do?getInfomatinSystemPagination&pageSize=10000').then(({data}) => {
                if (data.success) {
                    let tempOne = ['建设中', '运行中', '停用', '可用'],
                        tempTwo = [],
                        tempThree = [],
                        tempFour = [],
                        tempFive = [],
                        tempSix = [];
                    data.data.list.forEach(item => {
                        // tempOne.push(item.status);
                        tempTwo.push(item.network);
                        tempThree.push(item.osType);
                        tempFour.push(item.databaseType);
                        tempFive.push(item.middlewareType);
                        tempSix.push(item.serverType);
                    });
                    this.selectOne = [...new Set(tempOne)].filter(item => {
                        return item !== '' && item !== null;
                    });
                    this.selectTwo = ['互联网', '政务外网', '业务专网'];
                    this.selectThree = [...new Set(tempThree)].filter(item => {
                        return item !== '' && item !== null && item !== 'N/A' && item !== '无';
                    });
                    this.selectFour = [...new Set(tempFour)].filter(item => {
                        return item !== '' && item !== null && item !== 'N/A' && item !== '无';
                    });
                    this.selectFive = [...new Set(tempFive)].filter(item => {
                        return item !== '' && item !== null && item !== 'N/A' && item !== '无';
                    });
                    this.selectSix = [...new Set(tempSix)].filter(item => {
                        return item !== '' && item !== null && item !== 'N/A' && item !== '无';
                    });
                    this.changePage();
                    this.dataForSearch();
                } else {
                    console.error('分页获取表3 信息化系统调研表信息失败')
                }
            }).catch(err => {
                throw Error(err);
            })
        },
        mounted() {
            if (this.$route.query.network) {
                this.formInline.network = this.$route.query.network;
                this.changePage();
            }
            if (this.$route.query.infoSystemName) {
                this.formInline.infomationSystemName = this.$route.query.infoSystemName;
                this.changePage();
            }
        }
    }
</script>

<style scoped type="text/less" lang="less">
    .info-sys-important {
        display: flex;
        flex-flow: row wrap;
    }

    .card {
        flex: 1 0 45%;
        width: 45%;
        margin-bottom: 1rem;
        &:first-child {
            margin-right: .5rem;
        }
        &:nth-child(2) {
            margin-left: .5rem;
        }
        &:nth-child(3) {
            margin-right: .5rem;
        }
        &:nth-child(4) {
            margin-left: .5rem;
        }
    }
</style>