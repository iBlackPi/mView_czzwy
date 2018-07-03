<template>
    <module-layout title="资源目录">
        <ul class="icon_lists clear" @click="goInfoMaintain">
            <li>
                <i class="icon iconfont icon-resource"></i>
                <div class="name">1023个</div>
                <div class="fontclass">信息资源目录</div>
            </li>

            <li>
                <i class="icon iconfont icon-info"></i>
                <div class="name">6514个</div>
                <div class="fontclass">信息项总量</div>
            </li>

            <li>
                <i class="icon iconfont icon-gongxiang"></i>
                <div class="name">4808个</div>
                <div class="fontclass">可共享信息项</div>
            </li>

            <li>
                <i class="icon iconfont icon-yonghu1"></i>
                <div class="name">85个</div>
                <div class="fontclass">电子证照</div>
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
                colors: ['#01A2FC','#F9D135','#01B344','#01A2FC'],
                xAxisData: ['2018', '2019', '2020'],
                data1: [30, 35, 42],
                data2: [20, 38, 40],
                data3: [15, 20, 30],
                data4: [25, 40, 50],
                coverOption: {
                    series: [
                        {
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            }
                        },
                        {
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            }
                        },
                        {
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            }
                        },
                        {
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            }
                        },
                    ]
                }
            }
        },
        components: {
            ModuleLayout
        },
        methods: {
            goInfoMaintain() {
                this.$router.push({name: 'resource-catalog-manage'});
            }
        }
    }
</script>

<style scoped lang="less" type="text/less">
    .icon_lists{
        width: 100% !important;
        display: flex;
        flex-flow: row nowrap;
        margin-top: 1rem;
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
        cursor: pointer;
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
        -webkit-transition: font-size 0.25s ease-out 0s;
        -moz-transition: font-size 0.25s ease-out 0s;
        transition: font-size 0.25s ease-out 0s;

    }
    .icon_lists .icon:hover{
        font-size: 100px;
    }
</style>