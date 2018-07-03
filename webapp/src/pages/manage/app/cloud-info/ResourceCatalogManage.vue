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
            <FormItem prop="shareType">
                <Select v-model="formInline.shareType" placeholder="共享类型" clearable style="width: 200px;">
                    <Option v-for="(item, key) in selectOne" :key="key" :value="item">{{item}}</Option>
                </Select>
            </FormItem>
            <FormItem prop="isOpen">
                <Select v-model="formInline.isOpen" placeholder="是否向社会开放" clearable style="width: 200px;">
                    <Option v-for="(item, key) in selectTwo" :key="key" :value="item">{{item}}</Option>
                </Select>
            </FormItem>

            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
            </FormItem>
        </Form>

        <Alert show-icon closable style="margin-top: -1rem;">
            现状说明
            <template slot="desc">
                此次调研共上报1023个资源目录，共6514个信息项，其中有条件共享的为2894个，无条件共享的1914个，不予共享的为1706个，可对公众开放的信息项为2024个。可用于共享和可对公众开放的信息项将是今后建设资源目录和共享交换平台时重点关注项；
                <br>
                可对公众开放的信息项占全部信息项约31%，且大部分为部门的官网公开信息资源；
                可用于部门间共享的信息占全部信息项的约74%，但有一部分需要上级部门或者领导审批
            </template>
        </Alert>

        <Alert type="warning" show-icon closable>
            存在的问题
            <template slot="desc">
                1、资源共享需求量最多的5个单位：
                公安局：53个需求，需要的信息范围较广，包括政府部门信息，运营商信息。
                民政局：24个需求，主要为户籍、车辆信息，社保、养老等信息。
                总工会：19个需求，主要为车辆、死亡信息，房屋产权等8个单位的信息。
                工商联：8个需求，主要为有关非公经济政策和措施。
                农工委：8个需求，主要为农业农村等相关信息。
                <br>
                2、资源共享被需求最多的5个单位：
                市场监管局：有19个需求需要从市场监管局获取企业登记、法人等信息。
                教育局：有14个需求需要从教育局获取学生、就学等信息。
                公安局：有13个需求需要从公安局获取户籍、人口等信息。
                人社局：有9个需求需要从人社局获取养老、医疗等社保信息。
                国土局：有9个需求需要从国土局获取地理、地图等信息。
            </template>
        </Alert>

        <!--图表展示重要信息-->
        <collapse v-model="isOpen" accordion>
            <panel name="1">
                <!--信息化系统数据可视化-->
                <div slot="content" class="info-sys-important">
                    <Card class="card">
                        <p slot="title">信息化系统共享情况（是否开放）</p>
                        <div style="height: 10rem;">
                            <ve-pie
                                    :rippleAnimation="true"
                                    style="width: 100%; height: 100%;"
                                    :center="['40%', '50%']"
                                    backgroundColor="transparent"
                                    id="resource-catalog"
                                    :data="pieData"
                                    :radius="['55%','75%']"
                                    :coverOption="coverOption"
                                    :rippleSize=5
                                    @click-series="selectIsOpen"
                            ></ve-pie>
                        </div>
                    </Card>
                    <Card class="card">
                        <p slot="title">信息化系统开放情况（开放类型）</p>
                        <div style="height: 10rem;">
                            <ve-rect-coordinate
                                    id="connect-net"
                                    style="height:100%"
                                    backgroundColor=""
                                    :xAxisData="xAxisData"
                                    :showLegend=true
                                    :coverOption="coverOption2"
                                    @click-series="selectOpenType">
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
        <!--分页 show-total-->
        <Page :total="totalCount" show-sizer @on-change="changePage" @on-page-size-change="changePageSize"
              style="margin: .5rem 0 .5rem 0;"></Page>
    </div>
</template>

<script>
    import columns from './table-heads/resource-catalog-manage-head';

    export default {
        name: "",
        data() {
            return {
                isOpen: '1',
                columns: columns,
                pieData:
                    [
                        {value: 2024, name: '开放'},
                        {value: 4490, name: '不开放'}
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
                xAxisData: ['有条件共享', '无条件共享', '不予共享'],
                data: [2894, 1914, 1706],
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
                    shareType: '',
                    isOpen: '',
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
            selectIsOpen(params) {
                let temp = params.name === '开放' ? '是' : '否';
                this.formInline.isOpen = temp;
                this.changePage();
            },
            selectOpenType(params) {
                this.formInline.shareType = params.name;
                this.changePage();
            },
            changePage(destination = this.formInline.currentPage) {
                // 翻页的时候是带着查询参数去翻页的
                this.$httpt.get('bigScreenController.do?getResourceCatalogPagination&' +
                    'department=' + this.formInline.department + '&' +
                    'infoSysName=' + this.formInline.infoSysName + '&' +
                    'shareType=' + this.formInline.shareType + '&' +
                    'isOpen=' + this.formInline.isOpen + '&' +
                    'currentPage=' + destination + '&' +
                    'pageSize=' + this.formInline.pageSize).then(({data}) => {
                    if (data.success) {
                        this.totalInfo = data.data.list;
                        this.totalCount = data.data.totalCount;
                        // let tempPie =  [];
                        // let newarr1 = new Array(this.selectTwo.length);
                        // for(let t = 0; t < newarr1.length; t++) {
                        //     newarr1[t] = 0;
                        // }
                        // for(let p = 0; p < this.selectTwo.length; p++) {
                        //     for(let j = 0; j < data.data.list.length; j++) {
                        //         if(this.selectTwo[p] === data.data.list[j].isOpen) {
                        //             newarr1[p]++;
                        //         }
                        //     }
                        // }
                        // for(let i = 0; i < newarr1.length; i ++){
                        //     let tempPieObj = {value: 0, name:''};
                        //     tempPieObj.value = newarr1[i];
                        //     tempPieObj.name = this.selectTwo[i];
                        //     tempPie.push(tempPieObj);
                        // }
                        // setTimeout(() => {
                        //     this.pieData = tempPie;
                        // }, 300);
                        //
                        // let newarr2 = new Array(this.selectOne.length);
                        // for(let t = 0; t < newarr2.length; t++) {
                        //     newarr2[t] = 0;
                        // }
                        // for(let p = 0; p < this.selectOne.length; p++) {
                        //     for(let j = 0; j < data.data.list.length; j++) {
                        //         if(this.selectOne[p] === data.data.list[j].shareType) {
                        //             newarr2[p]++;
                        //         }
                        //     }
                        // }
                        // this.xAxisData = this.selectOne;
                        // this.data = newarr2;

                    } else {
                        console.error('分页获取表11 信息化系统调研表信息失败')
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
            this.$httpt.get('bigScreenController.do?getResourceCatalogPagination&' +
                'department=&' +
                'infoSysName=&' +
                'shareType=&' +
                'isOpen=&' +
                'currentPage=0&' +
                'pageSize=100000').then(({data}) => {
                if (data.success) {
                    let tempOne = [];
                    let tempTwo = [];
                    data.data.list.forEach(item => {
                        if (item.shareType !== null && item.shareType !== 'null') {
                            tempOne.push(item.shareType);
                        }
                        if (item.isOpen !== null && item.isOpen !== 'null') {
                            tempTwo.push(item.isOpen);
                        }
                    });
                    this.selectOne = [...new Set(tempOne)].filter(item => {
                        return item !== '' && item !== null && item !== 'null' && item !== '条件共享' && item !== 'N/A' && item !== '无';
                    });
                    this.selectTwo = [...new Set(tempTwo)].filter(item => {
                        return item !== '' && item !== null && item !== 'null' && item !== 'N/A' && item !== '无';
                    });
                    // 该方法初始化中有逻辑依赖这个回调中的值，所以该方法放在这里调用
                    this.changePage();
                } else {
                    console.error('分页资源目录表信息失败')
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