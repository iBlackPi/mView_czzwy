<template>
    <module-layout title="运营商接入数量">
        <ve-gauge
                id="connect-operator"
                backgroundColor=""
                style="height: 100%;"
                radius="100%"
                :coverOption="coverOption">
            <ve-sub-gauge :data="dataMobile" :center="positionLeft"></ve-sub-gauge>
            <ve-sub-gauge :data="dataTele" :center="positionCenter"></ve-sub-gauge>
            <ve-sub-gauge :data="dataUnicom" :center="positionRight"></ve-sub-gauge>
        </ve-gauge>
    </module-layout>
</template>

<script>
    import ModuleLayout from '../../common/ModuleLayout';
    export default {
        name: "computor-room",
        data(){
            return {
                dataMobile: [{value: 30, name: '移动'}],
                dataTele: [{value: 50, name: '电信'}],
                dataUnicom: [{value: 90, name: '联通'}],
                positionLeft: ['20%', '50%'],
                positionCenter: ['50%', '50%'],
                positionRight: ['80%', '50%'],
                coverOption: {

                }
            }
        },
        components: {
            ModuleLayout
        },
        methods: {
            getInfo(){
                this.$httpt.get('bigScreenController.do?getOperator').then(({data}) => {
                    if(data.success){
                        let temp = data.data;
                        this.dataMobile[0].value = temp['yiDongNum'];
                        this.dataTele[0].value = temp['dianXingNum'];
                        this.dataUnicom[0].value = temp['lianTongNum'];
                    }else{
                        throw new Error('获取运营商接入信息失败！');
                    }
                })
            }
        },
        mounted(){
            let _this = this;
            this.$nextTick(() => {
                _this.getInfo();
            })
        }
    }
</script>

<style scoped>

</style>