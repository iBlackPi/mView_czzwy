<template>
    <div class="info-maintain">
        <Form ref="formInline" inline style="white-space: nowrap;">
            <FormItem prop="user" style="margin-bottom: 15px;">
                <AutoComplete
                        v-model="searchName"
                        :data="autoCompleteData"
                        :filter-method="filterMethod"
                        :transfer="true"
                        @on-select="onSelect"
                        placeholder="搜索部门关键字,会智能为您补全部门名称"
                        icon="ios-search"
                        clearable
                        style="width: 300px;">
                </AutoComplete>
                <!--<Button style="background-color: #2D8CF0; color: #fff;" type="primary" slot="append" icon="ios-search" @click="searchDepartment"></Button>-->
            </FormItem>
            <FormItem style="margin-bottom: 15px;">
                <Upload multiple
                        action="http://10.88.8.184:8088/czportal/upLoadExcelController.do?upLoadExcel"
                        name="excelFileUpload"
                        :show-upload-list="false"
                        :on-success="uploadSuccess"
                        :before-upload="beforeUpload"
                        :format="['xls','XLS','xls','XLSX']"
                        :on-format-error="handleFormatError">
                    <Tooltip placement="right" content="支持批量导入excel" transfer :delay="1000">
                        <Button style="background-color: #2D8CF0; color: #fff;" type="ghost" icon="ios-cloud-upload-outline">
                            导入EXCEL
                        </Button>
                    </Tooltip>
                </Upload>
            </FormItem>
        </Form>
        <!--展示信息化资源统计总览-->
        <Table border :columns="columns" :data="totalInfo"></Table>
        <!--分页-->
        <Page :total="totalCount" show-total show-sizer @on-change="changePage" @on-page-size-change="changePageSize" style="margin: .5rem 0 .5rem 0;"></Page>
        <!--对话框：显示部门具体信息-->
        <department-info-modal></department-info-modal>
    </div>
</template>

<script>
    import DepartmentInfoModal from './DepartmentInfoModal';
    export default {
        name: "info-maintain",
        data(){
            return {
                searchName: '',
                countPerPage: 10,
                currentPage: 1,
                totalCount: 0,
                totalInfo: [],
                columns: [
                    {
                        title: '单位名称',
                        key: 'department',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            // 点击单位的同时，弹出对话框并通知对话框中的组件都去更新自己的数据
                                            this.$bus.$emit('showDepartmentInfoModal', params.row.department);
                                        }
                                    }
                                }, params.row.department)
                            ]);
                        }
                    },
                    {
                        title: '信息化投资',
                        key: 'money',
                        sortable: true
                    },
                    {
                        title: '业务系统数量',
                        key: 'bussinessNum',
                        sortable: true
                    },
                    {
                        title: '可云化系统数',
                        key: 'removeNum',
                        sortable: true
                    },
                    {
                        title: '机房数量',
                        key: 'machineroomNum',
                        sortable: true
                    },
                    {
                        title: '服务器台数',
                        key: 'serverNum',
                        sortable: true
                    },
                    {
                        title: '资源目录数量',
                        key: 'cataLogNum',
                        sortable: true
                    },
                    {
                        title: '是否有互联网',
                        key: 'hasInternet',
                    },
                    {
                        title: '是否接入政务外网',
                        key: 'hasgovExtrant',
                    },
                    {
                        title: '是否有专网',
                        key: 'hasspecialNet',
                    }
                ]
            }
        },
        computed: {
            // 搜索框根据用户输入智能补全功能
            autoCompleteData(){
                let czCloudInfo = this.$store.state.czCloudInfo.czCloudInfo;
                // vue实例化的时候该值为默认的空数组，所以排除初始化的情况
                if(czCloudInfo instanceof Array){
                    return;
                }else{
                    return Object.keys(czCloudInfo);
                }
            }
        },
        watch: {
            // 当搜索框为空时，搜索全部部门
            searchName(newValue, oldValue){
                if(newValue === ''){
                    this.findByPage();
                }
            }
        },
        components: {
            DepartmentInfoModal
        },
        methods: {
            // 搜索框根据用户输入智能补全功能：匹配用户输入
            // option为autoCompleteData数组中的项，该方法会遍历所有项
            filterMethod(value, option){
                if(value !== ''){
                    return option.indexOf(value) !== -1;
                }
            },
            onSelect(department){
                this.searchName = department;
                this.findByPage();
            },
            // 上传成功回调
            uploadSuccess(res, file, fileList){
                // 上传成功，及时更新数据
                this.$store.dispatch('czCloudInfo/getCloudInfo', {vm: this});
                this.$Notice.success({
                    title: `${file.name}上传成功！`
                });
            },
            // 验证excel文件命名
            beforeUpload(file){
                const fileName = file.name;
                if(fileName.indexOf('-') === -1 || fileName.indexOf('-') > fileName.indexOf('《')){
                    this.$Notice.error({
                        title: 'excel命名错误！',
                        desc: '请按照“单位名-《表名》”格式命名excel，注意中间以中划线隔开'
                    });
                    return false;
                }
                return true;
            },
            // 验证文件格式
            handleFormatError(){
                this.$Notice.error({
                    title: '请上传excel表格！'
                });
            },
            changePage(destination){
                this.currentPage = destination;
                //翻页的时候是带着查询参数去翻页的
                this.findByPage();
            },
            changePageSize(pageSize){
                this.countPerPage = pageSize;
                //翻页的时候是带着查询参数去翻页的
                this.findByPage();
            },
            findByPage(){
                this.$httpt.post(`upLoadExcelController.do?query&start=${this.currentPage}&pageSize=${this.countPerPage}&department=${this.searchName}`).then(({data}) => {
                    if(data.success){
                        data.data.list.forEach(temp => {
                            temp.hasInternet ? temp.hasInternet = '是' : temp.hasInternet = '否';
                            temp.hasgovExtrant ? temp.hasgovExtrant = '是' : temp.hasgovExtrant = '否';
                            temp.hasspecialNet ? temp.hasspecialNet = '是' : temp.hasspecialNet = '否';
                        });
                        this.totalInfo = data.data.list;
                        this.totalCount = data.data.totalCount;
                    }else{
                        this.$Notice.error({
                            title: '获取单位信息失败！'
                        })
                    }
                })
            }
        },
        mounted(){
            this.$nextTick(() => {
               this.findByPage();
            });
        },
        //todo 尽快的获取数据
        //todo 如果用户直接进入后台页面，那总信息就无法获取到
        //todo 所以这里尽快的去获取下总览信息，供对话框中的搜索框自动提示功能使用
        created(){
            this.$store.dispatch('czCloudInfo/getCloudInfo', {vm: this});
        }
        // todo 从store中取出总览信息，但这里涉及到分页，所以此处另有分页接口，暂时保留，上线前可删
        // computed: {
        //    totalInfo(){
        //        let temp = this.$store.state.czCloudInfo.czCloudInfo;
        //        let totalInfo = [];
        //        Object.keys(temp).forEach(key => {
        //            temp[key].hasInternet ? temp[key].hasInternet = '是' : temp[key].hasInternet = '否';
        //            temp[key].hasgovExtrant ? temp[key].hasgovExtrant = '是' : temp[key].hasgovExtrant = '否';
        //            temp[key].hasspecialNet ? temp[key].hasspecialNet = '是' : temp[key].hasspecialNet = '否';
        //            totalInfo.push(temp[key]);
        //        });
        //        return totalInfo;
        //    }
        // },

    }
</script>

<style scoped lang="less" type="text/less">

</style>