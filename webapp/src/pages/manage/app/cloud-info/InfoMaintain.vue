<template>
    <div class="info-maintain">
        <Form ref="formInline" inline style="white-space: nowrap;">
            <FormItem prop="user" style="margin-bottom: 15px;">
                <Input v-model="searchName" placeholder="请输入单位名进行查询"  style="width: 400px;">
                <span slot="prepend">单位名</span>
                <Button type="primary" slot="append" icon="ios-search" @click="searchDepartment"></Button>
                </Input>
            </FormItem>
            <FormItem style="margin-bottom: 15px;">
                <!--action="http://192.168.100.228:8080/czportal/upLoadExcelController.do?upLoadExcel"-->
                <Upload multiple
                        action="http://localhost:8088/czportal/upLoadExcelController.do?upLoadExcel"
                        name="excelFileUpload"
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
        <Table border :columns="columns" :data="totalInfo"></Table>
        <!--分页-->
        <Page :total="totalCount" show-total show-sizer @on-change="changePage" @on-page-size-change="changePageSize" style="margin: .5rem 0 .5rem 0;"></Page>
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
                columns: [
                    {
                        title: '单位名称',
                        key: 'departmentName',
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
                                            this.$bus.$emit('showDepartmentInfoModal', params.row.departmentName);
                                        }
                                    }
                                }, params.row.departmentName)
                            ]);
                        }
                    },
                    {
                        title: '信息化投资',
                        key: 'password',
                        sortable: true
                    },
                    {
                        title: '业务系统数量',
                        key: 'password',
                        sortable: true
                    },
                    {
                        title: '可云化系统数',
                        key: 'password',
                        sortable: true
                    },
                    {
                        title: '机房数量',
                        key: 'password',
                        sortable: true
                    },
                    {
                        title: '服务器台数',
                        key: 'password',
                        sortable: true
                    },
                    {
                        title: '资源目录数量',
                        key: 'password',
                        sortable: true
                    },
                    {
                        title: '是否有互联网',
                        key: 'password',
                    },
                    {
                        title: '是否接入政务外网',
                        key: 'password',
                    },
                    {
                        title: '是否有专网',
                        key: 'password',
                    }
                ],
                totalInfo: [{
                    departmentName: '工商局',
                    password:'xxx'
                },{
                    departmentName: '住建局',
                    password:'xxx'
                },{
                    departmentName: '教育局',
                    password:'xxx'
                },{
                    departmentName: '财政局',
                    password:'xxx'
                },{
                    departmentName: '宣传部',
                    password:'xxx'
                }]
            }
        },
        components: {
            DepartmentInfoModal
        },
        methods: {
            // 上传成功回调
            uploadSuccess(res, file, fileList){
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
            searchDepartment(){
                //模糊查询用户
                this.findByPage(this.currentPage, this.countPerPage, this.searchName);
            },
            changePage(destination){
                this.currentPage = destination;
                //翻页的时候是带着查询参数去翻页的
                this.findByPage(this.currentPage, this.countPerPage, this.searchName);
            },
            changePageSize(pageSize){
                this.countPerPage = pageSize;
                //翻页的时候是带着查询参数去翻页的
                this.findByPage(this.currentPage, this.countPerPage, this.searchName);
            },
            findByPage(currentPage, countPerPage, searchName){
                this.$http.post(`upLoadExcelController.do?query&
                start=${this.currentPage}&
                pageSize=${this.countPerPage}&
                department=${this.searchName}`, page).then(({data}) => {
                    if(data.success){
                        this.totalInfo = data.data.list;
                        this.totalCount = data.data.totalCount;
                    }else{
                        this.$Notice.error({
                            title: '获取单位信息失败！'
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less" type="text/less">

</style>