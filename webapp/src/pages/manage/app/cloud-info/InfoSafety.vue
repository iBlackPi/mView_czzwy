<template>
    <div class="computer-room">
        <Card>
            <p slot="title" style="font-weight: normal;">信息化安全</p>
            <AutoComplete
                    v-model="searchName"
                    :data="autoCompleteData"
                    :filter-method="filterMethod"
                    :transfer="true"
                    @on-select="onSelect"
                    placeholder="搜索部门名，若存在会智能提示"
                    clearable
                    icon="ios-search"
                    style="width: 300px;">
            </AutoComplete>
            <Button type="primary" icon="ios-search" @click="search">搜索</Button>
            <collapse v-model="isOpen" accordion style="margin-top: 1rem;">
                <panel name="1">
                    机构人员信息
                    <div slot="content" class="info-sys-important">
                        <Card class="card">
                            <p slot="title">信息科室人员学历统计</p>
                            <div style="height: 10rem;">
                                <ve-pie
                                        :rippleAnimation="true"
                                        style="width: 100%; height: 100%;"
                                        :center="['40%', '50%']"
                                        backgroundColor="transparent"
                                        id="Education"
                                        :data="pieData"
                                        :radius="['55%','75%']"
                                        :coverOption="coverOption"
                                        :rippleSize=5
                                ></ve-pie>
                            </div>
                        </Card>
                        <Card class="card">
                            <p slot="title">信息科室人员年龄统计</p>
                            <div style="height: 10rem;">
                                <ve-pie
                                        :rippleAnimation="true"
                                        style="width: 100%; height: 100%;"
                                        :center="['40%', '50%']"
                                        backgroundColor="transparent"
                                        id="age"
                                        :data="pieData2"
                                        :radius="['55%','75%']"
                                        :coverOption="coverOption"
                                        :rippleSize=5
                                ></ve-pie>
                            </div>
                        </Card>
                    </div>
                </panel>
            </collapse>
            <Table border :columns="columns" :data="groups" style="margin-top: 1rem;"></Table>
            <Page :total="totalCount" show-total show-sizer @on-change="changePage"
                  @on-page-size-change="changePageSize" style="margin: .5rem 0 .5rem 0;"></Page>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                isOpen: '1',
                pieData:
                    [
                        {value: 71, name: '专科及以下'},
                        {value: 19, name: '本科'},
                        {value: 90, name: '硕士以上'}
                    ],
                pieData2:
                    [
                        {value: 71, name: '30岁以下'},
                        {value: 19, name: '30-45岁'},
                        {value: 90, name: '45岁以上'}
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
                                    formatter: `{b}:{d}`
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
                columns: [
                    {
                        title: '部门',
                        key: 'department'
                    },
                    {
                        title: '问题',
                        key: 'insertHint'
                    },
                    {
                        title: '分项问题',
                        key: 'answer'
                    },
                    {
                        title: '数据统计',
                        key: 'other'
                    },
                    {
                        title: '填写提示',
                        key: 'optionAnswer'
                    },
                    {
                        title: '备选答案',
                        key: 'otherQuestion'
                    },
                    {
                        title: '其他',
                        key: 'question',
                        width: 150,
                        align: 'center'
                    }
                ],
                groups: [],
                pageSize: 10,
                start: 1,
                totalCount: 0,
                searchName: '',
                department: ''
            }
        },
        computed: {
            // 搜索框根据用户输入智能补全功能
            autoCompleteData() {
                let czCloudInfo = this.$store.state.czCloudInfo.czCloudInfo;
                // vue实例化的时候该值为默认的空数组，所以排除初始化的情况
                if (czCloudInfo instanceof Array) {

                } else {
                    return Object.keys(czCloudInfo);
                }
            }
        },
        watch: {
            // 当搜索框为空时，默认搜索全部
            searchName(newValue, oldValue) {
                if (newValue === '') {
                    this.department = '';
                    this.getGroupInfo();
                }
            }
        },
        methods: {
            search() {
                this.start = 1;
                this.department = this.searchName;
                this.$httpt.get(`bigScreenController.do?getOrgDiaoyanPagination&currentPage=${this.start}&pageSize=10000&department=${this.department}`).then(({data}) => {
                    if (data.success) {
                        let thirty = 0,
                            thirtyToFourtyfive = 0,
                            fourtyfive = 0,
                            Undergraduate = 0,
                            Specialty = 0,
                            master = 0;
                        let pieData =
                                [
                                    {value: 71, name: '专科及以下'},
                                    {value: 19, name: '本科'},
                                    {value: 90, name: '硕士以上'}
                                ],
                            pieData2 =
                                [
                                    {value: 71, name: '30岁以下'},
                                    {value: 19, name: '30-45岁'},
                                    {value: 90, name: '45岁以上'}
                                ];
                        data.data.list.forEach(item => {
                            if (item.answer.indexOf('30') !== -1 && item.answer.indexOf('45') === -1) {
                                if (parseInt(item.other)) {
                                    thirty += item.other;
                                }
                            }
                            if (item.answer.indexOf('30') !== -1 && item.answer.indexOf('45') !== -1) {
                                if (parseInt(item.other)) {
                                    thirtyToFourtyfive += item.other;
                                }
                            }
                            if (item.answer.indexOf('30') === -1 && item.answer.indexOf('45') !== -1) {
                                if (parseInt(item.other)) {
                                    fourtyfive += item.other;
                                }
                            }
                            if (item.answer.indexOf('专科') !== -1) {
                                if (parseInt(item.other)) {
                                    Specialty += item.other;
                                }
                            }
                            if (item.answer.indexOf('本科') !== -1) {
                                if (parseInt(item.other)) {
                                    Undergraduate += item.other;
                                }
                            }
                            if (item.answer.indexOf('硕士') !== -1) {
                                if (parseInt(item.other)) {
                                    master += item.other;
                                }
                            }
                        });
                        pieData[0].value = Specialty;
                        pieData[1].value = Undergraduate;
                        pieData[2].value = master;
                        pieData2[0].value = thirty;
                        pieData2[1].value = thirtyToFourtyfive;
                        pieData2[2].value = fourtyfive;
                        this.pieData = pieData;
                        this.pieData2 = pieData2;
                    } else {
                        this.$Notice.error({
                            title: '获取组织机构信息失败'
                        })
                    }
                })
                this.getGroupInfo();
            },
            changePage(destination) {
                this.start = destination;
                this.getGroupInfo();
            },
            changePageSize(pageSize) {
                this.pageSize = pageSize;
                this.start = 1;
                //翻页的时候是带着查询参数去翻页的
                this.getGroupInfo();
            },
            getGroupInfo() {
                this.$httpt.get(`bigScreenController.do?getOrgDiaoyanPagination&currentPage=${this.start}&pageSize=${this.pageSize}&department=${this.department}`).then(({data}) => {
                    if (data.success) {
                        this.groups = data.data.list;
                        this.totalCount = data.data.totalCount;

                    } else {
                        this.$Notice.error({
                            title: '获取组织机构信息失败'
                        })
                    }
                })
            },
            // 搜索框根据用户输入智能补全功能：匹配用户输入
            // option为autoCompleteData数组中的项，该方法会遍历所有项
            filterMethod(value, option) {
                if (value !== '') {
                    return option.indexOf(value) !== -1;
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.getGroupInfo();
            });
        },
        //todo 尽快的获取数据
        //todo 如果用户直接进入后台页面，那总信息就无法获取到
        //todo 所以这里尽快的去获取下总览信息，供对话框中的搜索框自动提示功能使用
        created() {
            this.$store.dispatch('czCloudInfo/getCloudInfo', {vm: this});
            this.$httpt.get(`bigScreenController.do?getOrgDiaoyanPagination&currentPage=${this.start}&pageSize=10000&department=${this.department}`).then(({data}) => {
                if (data.success) {
                    let thirty = 0,
                        thirtyToFourtyfive = 0,
                        fourtyfive = 0,
                        Undergraduate = 0,
                        Specialty = 0,
                        master = 0;
                    let pieData =
                            [
                                {value: 71, name: '专科及以下'},
                                {value: 19, name: '本科'},
                                {value: 90, name: '硕士以上'}
                            ],
                        pieData2 =
                            [
                                {value: 71, name: '30岁以下'},
                                {value: 19, name: '30-45岁'},
                                {value: 90, name: '45岁以上'}
                            ];
                    data.data.list.forEach(item => {
                        if (item.answer.indexOf('30') !== -1 && item.answer.indexOf('45') === -1) {
                            if (parseInt(item.other)) {
                                thirty += item.other;
                            }
                        }
                        if (item.answer.indexOf('30') !== -1 && item.answer.indexOf('45') !== -1) {
                            if (parseInt(item.other)) {
                                thirtyToFourtyfive += item.other;
                            }
                        }
                        if (item.answer.indexOf('30') === -1 && item.answer.indexOf('45') !== -1) {
                            if (parseInt(item.other)) {
                                fourtyfive += item.other;
                            }
                        }
                        if (item.answer.indexOf('专科') !== -1) {
                            if (parseInt(item.other)) {
                                Specialty += item.other;
                            }
                        }
                        if (item.answer.indexOf('本科') !== -1) {
                            if (parseInt(item.other)) {
                                Undergraduate += item.other;
                            }
                        }
                        if (item.answer.indexOf('硕士') !== -1) {
                            if (parseInt(item.other)) {
                                master += item.other;
                            }
                        }
                    });
                    pieData[0].value = Specialty;
                    pieData[1].value = Undergraduate;
                    pieData[2].value = master;
                    pieData2[0].value = thirty;
                    pieData2[1].value = thirtyToFourtyfive;
                    pieData2[2].value = fourtyfive;
                    this.pieData = pieData;
                    this.pieData2 = pieData2;
                } else {
                    this.$Notice.error({
                        title: '获取组织机构信息失败'
                    })
                }
            })
        }
    }
</script>

<style scoped type="text/less" lang="less">
    .computer-room {
        height: 100%;
    }

    .button-container {
        position: absolute;
        right: 17px;
        top: 8px;
    }

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