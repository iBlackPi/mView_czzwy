<template>
    <Modal v-model="modal" width="60%">
        <p slot="header" style="text-align: left">
            <Icon type="cube" style="color: #39f; font-size: 1rem;"></Icon>
            <span>{{department}}信息系统</span>
        </p>
        <div>
            <!--此处只显示部门名称，暂时保留，以备需求变更-->
            <!--<Tag v-for="(item, key) in arr" :key="key">{{item}}</Tag>-->
            <busi-sys-info @closeLoading="closeLoading"></busi-sys-info>
        </div>
        <div slot="footer">
            <Button type="primary" long @click="closeModal">关闭</Button>
        </div>
        <Spin size="large" fix v-if="isShowLoading"></Spin>
    </Modal>
</template>

<script>
    import BusiSysInfo from '../components/BusiSysInfo';

    export default {
        name: "",
        data() {
            return {
                modal: false,
                department: '',
                totalCount: '',
                arr: [],
                isShowLoading: true
            }
        },
        methods: {
            closeModal() {
                this.modal = false;
            },
            closeLoading() {
                this.isShowLoading = false;
            }
        },
        components: {
            BusiSysInfo
        },
        mounted() {
            this.$bus.$on('showInfoSysTip', (department) => {
                this.isShowLoading = true;
                this.modal = true;
                this.department = department;
                // 更新部门信息，获取其中的系统信息
                this.$store.dispatch('czCloudInfo/getTotalInfo', {vm: this, department: department});
                // todo 由于领导提出只显示部门名称比较乱，所以此处加载现有的系统信息组件，此处暂时保留，以备需求变更
                // this.$httpt.get(`bigScreenController.do?getPaginationDetail&department=${department}&tableName=CzInfomatinSystem&currentPage=1&pageSize=10000`).then(({data}) => {
                //     if (data.success) {
                //         if (data.data.list instanceof Array) {
                //             this.arr = [];
                //             data.data.list.forEach(item => {
                //                 this.arr.push(item.infomationSystemName);
                //             });
                //             this.totalCount = data.data.totalCount;
                //         }
                //     } else {
                //         console.error('信息总览提示 信息化系统调研表信息失败');
                //     }
                // }).catch(err => {
                //     throw Error(err);
                // })
            });
        }
    }
</script>

<style scoped>

</style>