<template>
    <Modal v-model="modal" width="60%">
        <p slot="header" style="text-align: left">
            <Icon type="ios-world-outline" style="color: #39f; font-size: 1rem;"></Icon>
            <span>{{department}}纵向专网</span>
        </p>
        <div>
            <section>
                <Icon type="ios-paperplane" style="color: #217bcc; font-size: 2rem;"></Icon>{{zongxiangNetBeizhu}}
            </section>
        </div>
        <div slot="footer">
            <Button type="primary" long @click="closeModal">关闭</Button>
        </div>
        <!--<Spin size="large" fix v-if="isShowLoading"></Spin>-->
    </Modal>
</template>

<script>
    export default {
        name: "",
        props: {
            allInfo: Array
        },
        data(){
            return {
                isShowLoading: true,
                isShowPie: false,
                modal: false,
                department: '',
                arr: [],
                zongxiangNetBeizhu: ''
            }
        },
        methods: {
            closeModal(){
                this.modal = false;
            }
        },
        mounted(){
            this.$bus.$on('ZongxiangNetTip', (department) => {
                this.modal = true;
                this.department = department;
                this.allInfo.forEach(item => {
                    if(item.department === department) {
                        this.zongxiangNetBeizhu = item.zongxiangNetBeizhu;
                    }
                });
            });
        }
    }
</script>

<style scoped>

</style>