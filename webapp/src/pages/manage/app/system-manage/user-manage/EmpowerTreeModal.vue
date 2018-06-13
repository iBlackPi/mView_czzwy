<template>
    <Modal
            v-model="modal"
            title="用户授权"
            @on-ok="ok"
            @on-cancel="cancel">
        <Tree :data="empowerTree" @on-check-change="checkChange" show-checkbox multiple></Tree>
        <Spin size="large" fix v-if="isShowLoading"></Spin>
    </Modal>
</template>

<script>
    export default {
        name: "empower-tree-modal",
        data(){
            return {
                modal: false,
                empowerTreeData: [],
                newEmpowerData: [],
                userId: '',
                isShowLoading: true
            }
        },
        computed: {
            empowerTree(){
                this.isShowLoading = false;
                //todo 一定要记得加上models名称 tree组件接收的是数组
                return this.$store.state.empowerTree.empowerTree;
            }
        },
        methods: {
            ok() {
                //向后台提交数据时必须时个json对象
                this.$http.post('/empowerController.do?m=empowerResource', {
                    newEmpowerData: this.newEmpowerData,
                    userId: this.userId
                }).then((res) => {
                    if(res.data.success){
                        this.$Notice.success({
                            title: '授权成功！'
                        });
                        //todo 应该再成功授权后再将弹出框隐藏
                        this.modal = false;
                    }else{
                        this.$Notice.error({
                            title: '授权失败！'
                        })
                    }
                })
            },
            cancel() {
                this.modal = false;
            },
            checkChange(selectedResource){
                this.newEmpowerData = selectedResource;
            }
        },
        mounted(){
            this.$bus.$on('showEmpowerTreeModal', (userId) => {
                this.modal = true;
                this.userId = userId;
                this.isShowLoading = true;
                //store中异步加载授权资源菜单，组件共享其状态，适合用store
                this.$store.dispatch('empowerTree/getUserEmpowerIds', {vm: this, userId: this.userId});
            });
        }
    }
</script>

<style scoped>

</style>