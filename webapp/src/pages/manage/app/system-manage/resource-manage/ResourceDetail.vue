<template>
    <Form :model="resourceDetailData" :label-width="80">
        <FormItem label="资源ID">
            <Input v-model="resourceDetailData.id" placeholder="请输入资源名称" disabled></Input>
        </FormItem>
        <FormItem label="资源名称">
            <Input v-model="resourceDetailData.title" placeholder="请输入资源名称" :disabled="disabled"></Input>
        </FormItem>
        <FormItem label="资源路径">
            <Input v-model="resourceDetailData.location" placeholder="请输入资源路径" :disabled="disabled"></Input>
        </FormItem>
        <FormItem label="父资源">
            <Input v-model="resourceDetailData.parentId" placeholder="请输入父资源" :disabled="disabled"></Input>
        </FormItem>
        <FormItem label="类型">
            <Input v-model="resourceDetailData.type" placeholder="请输入菜单类型（leaf/comp）" :disabled="disabled"></Input>
        </FormItem>
        <FormItem label="图标">
            <Input v-model="resourceDetailData.icon" placeholder="请输入图标" :disabled="disabled"></Input>
        </FormItem>
    </Form>

</template>

<script>
    export default {
        name: "resource-detail",
        props: {
            resourceDetailData: {
                type: Object,
                default: function () {
                    return {
                        id: '请选择具体资源',
                        title: '请选择具体资源',
                        location: '请选择具体资源',
                        parentId: '请选择具体资源',
                        type: '请选择具体资源',
                        icon: '请选择具体资源'
                    }
                }
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        mounted(){
            this.$bus.$on('updateResourceInfo', () => {
                this.$http.post('/resourceController.do?m=updateResource', this.resourceDetailData).then(res => {
                    if(res.data.success){
                        this.$Notice.success({
                            title: '修改资源成功！'
                        });
                        if(this.resourceDetailData.type === 'leaf'){
                            this.$store.dispatch('menu/getMenu', this);
                        }
                    }else{
                        this.$Notice.error({
                            title: '修改资源失败！'
                        });
                    }
                }).catch(err => {
                    this.$Notice.error({
                        title: '修改资源失败！'
                    });
                    throw new Error(err);
                })
            });
        }
    }
</script>

<style scoped>

</style>