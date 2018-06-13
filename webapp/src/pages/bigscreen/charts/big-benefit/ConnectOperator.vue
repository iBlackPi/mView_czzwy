<template>
    <module-layout title="运营商接入数量">
        <ul class="icon_lists clear" @click="goToManage">
            <li>
                <i class="icon iconfont icon-yidonglogo"></i>
                <div class="name">150个</div>
                <div class="fontclass">中国移动</div>
            </li>

            <li>
                <i class="icon iconfont icon-dianxin"></i>
                <div class="name">34个</div>
                <div class="fontclass">中国电信</div>
            </li>

            <li>
                <i class="icon iconfont icon-liantong"></i>
                <div class="name">137个</div>
                <div class="fontclass">中国联通</div>
            </li>

            <li>
                <i class="icon iconfont icon-dianshitai2"></i>
                <div class="name">36个</div>
                <div class="fontclass">广电</div>
            </li>
        </ul>
    </module-layout>
</template>

<script>
    import ModuleLayout from '../../common/ModuleLayout';
    export default {
        name: "computor-room",
        data(){
            return {
                dataMobile: [{value: 150, name: '移动'}],
                dataTele: [{value: 34, name: '电信'}],
                dataUnicom: [{value: 137, name: '联通'}],
                dataSARFT: [{value: 36, name: '广电'}],
                positionLeft: ['13%', '50%'],
                positionCenter: ['37.5%', '50%'],
                positionRight: ['62.5%', '50%'],
                positionLRight: ['87%', '50%'],
                coverOption: {

                }
            }
        },
        components: {
            ModuleLayout
        },
        methods: {
            goToManage() {
                this.$router.push({name: 'move-info'});
            },
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
                // _this.getInfo();
            })
        }
    }
</script>

<style scoped type="text/less" lang="less">
    .icon_lists{
        width: 100% !important;
        display: flex;
        flex-flow: row nowrap;
        margin-top: 1rem;
        cursor: pointer;
    }

    .icon_lists li {
        float: left;
        width: 100px;
        height: 180px;
        text-align: center;
        list-style: none !important;
        flex: 1 0;
        margin: 0 1rem 0 1rem;
        background: rgba(24, 38, 101, 0.1);
        color: #fff;

        &:nth-child(1) {
            .icon {
                color: #01A2FC;
            }
        }
        &:nth-child(2) {
            .icon {
                color: #01B344;
            }
        }
        &:nth-child(3) {
            .icon {
                color: #F9D135;
            }
        }
        &:nth-child(4) {
            .icon {
                color: #01A2FC;
            }
        }
    }
    .icon_lists .icon{
        font-size: 3.5rem;
        line-height: 100px;
        margin: 10px 0;
        /*font-weight: bold;*/
        -webkit-transition: font-size 0.25s ease-out 0s;
        -moz-transition: font-size 0.25s ease-out 0s;
        transition: font-size 0.25s ease-out 0s;

    }
    .icon_lists .icon:hover{
        font-size: 100px;
    }
</style>