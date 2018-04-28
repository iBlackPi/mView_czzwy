<template>
    <Modal
            v-model="modal"
            title="新增资源"
            @on-ok="ok"
            @on-cancel="cancel">
        <Form :model="newResource" :label-width="80">
            <FormItem label="资源名称">
                <Input v-model="newResource.title" placeholder="请输入资源名称"></Input>
            </FormItem>
            <FormItem label="资源路径">
                <Input v-model="newResource.location" placeholder="请输入资源路径"></Input>
            </FormItem>
            <FormItem label="父资源">
                <Input v-model="newResource.parentId" placeholder="请输入父资源"></Input>
            </FormItem>
            <FormItem label="类型">
                <Input v-model="newResource.type" placeholder="请输入菜单类型"></Input>
            </FormItem>
            <FormItem label="图标">
                <Input v-model="newResource.icon" placeholder="请输入图标"></Input>
            </FormItem>
        </Form>
    </Modal>
</template>

<script>
    export default {
        //todo 组件内不能修改props的值，同时修改的值也不会同步到组件外层，即调用组件方不知道组件内部当前的状态是什么
        name: "add-resource-modal",
        //todo 当我想把modal当作单独的组件，在模态框的交互中需要添加props来接收父组件的使模态框显示的属性
        //todo 但是我们不能直接操作props来改变模态框的状态，所以很麻烦，这里我们采用事件总线
        //todo 如果props是对象，改变其属性，则不会报错，也可以变相实现弹框逻辑，但不建议这么做，按照框架的约定来
        /*props: {
            modalInfo: {
                type: Object,
                default: {
                    title: '',
                    isShowModal: false
                }
            }
        },*/
        data () {
            return {
                modal: false,
                newResource: {
                    parentId: '',
                    title: '',
                    location: '',
                    type: '',
                    icon: ''
                }
            }
        },
        methods: {
            ok() {
                //todo 改变props中对象的属性，vue不会报错，但是不推荐更改props的值
                // this.modalInfo.isShowModal = false;
                this.modal = false;
                //保存新增资源
                this.$http.post('/resourceController.do?m=addResource', this.newResource).then((res) => {
                    if(res.data.success){
                        this.$Notice.success({
                            title: '添加资源成功！'
                        });
                        //如果增加的资源是叶子级别的，则更新store刷新页面左侧菜单
                        if(this.newResource.type === 'leaf'){
                            this.$store.dispatch('menu/getMenu', this);
                        }
                        this.$emit('freshResource');
                    }else{
                        this.$Notice.error({
                            title: '添加资源失败！',
                            desc: res.data.message
                        })
                    }
                }).catch((e) => {
                    throw new Error(e);
                });
            },
            cancel() {
                //todo 改变props中对象的属性，vue不会报错，但是不推荐更改props的值
                // this.modalInfo.isShowModal = false;
                this.modal = false;
            }
        },
        mounted(){
            //todo 采用事件总线，代码减少，逻辑非常简单清晰
            this.$bus.$on('showModal', (data) => {
                this.modal = true;
                this.newResource.parentId = data;
            });
        }
    }
</script>

<style scoped>

</style>