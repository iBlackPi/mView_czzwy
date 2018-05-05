<template>
    <div class="resource-manage">
        <aside class="resource-manage-common resource-manage-asider">
            <Card style="height: 100%;">
                <p slot="title" style="font-weight: normal;">资源概览</p>
                <a href="#" slot="extra" @click.prevent="getResource">
                    <Icon type="ios-loop-strong"></Icon>
                </a>
                <Input placeholder="输入资源名称">
                    <Button slot="append" icon="ios-search"></Button>
                </Input>
                <!--<Tree :data="treeData" show-checkbox></Tree>-->
                <Tree :data="treeData" @on-select-change="selectResource"></Tree>
            </Card>
        </aside>
        <section class="resource-manage-common resource-manage-main">
            <Card style="height: 100%;">
                <p slot="title" style="font-weight: normal;">资源详情</p>
                <!--todo 这里button中如果采用vue-awesome则无法垂直居中对齐，采用阿里巴巴图标库比较好-->
                <!--<Button type="primary" shape="circle" v-if="isSave" @click="save"><i class="iconfont icon-addition"></i></Button>-->
                <resource-detail :resourceDetailData="resourceDetailData" :disabled="disabled"></resource-detail>
            </Card>
            <div class="button-container">
                <!--编辑资源-->
                <template v-if="this.$store.state.validateInfo.resourceList.indexOf('changeResource') !== -1">
                    <Button type="primary" shape="circle" icon="edit" v-if="!isSave" @click="edit"></Button>
                    <Button type="warning" shape="circle" v-show="isSave" @click="cancelUpdate">取消</Button>
                    <Button type="primary" shape="circle" v-show="isSave" @click="save">保存</Button>
                </template>
                <!--增加资源-->
                <Button type="primary" shape="circle" icon="plus-round" @click="showAddModal"></Button>
                <!--删除资源-->
                <Button type="primary" shape="circle" icon="ios-trash-outline" @click="isShowDelete = true"></Button>
            </div>
        </section>
        <!--//todo 此处传递的值为向子组件传递的值 值里面有业务数据，也有控制模态框显示隐藏的标志位-->
        <!--//todo 传此值主要是为了用这种方法控制模态框，此方法不是最好的方法-->
        <add-resource-modal :modalInfo="modalInfo" @freshResource="freshResource"></add-resource-modal>
        <!--删除提示-->
        <Modal
                v-model="isShowDelete"
                title="确认提示"
                @on-ok="confirmDelete">
            <p>确定要删除 <span style="color: #f90;font-weight: bold; font-size: .9rem;">{{resourceDetailData ? resourceDetailData.title: ''}}<span v-if="resourceDetailData ? resourceDetailData.children : ''">及其子菜单</span></span> 么？</p>
        </Modal>
    </div>
</template>

<script>
    import ResourceDetail from './ResourceDetail';
    import AddResourceModal from './AddResourceModal';
    import { buildTree } from "../../../../../assets/util/utils.js";
    export default {
        name: "resource-manage",
        data() {
            return {
                isShowDelete: false,
                modalInfo: {},
                disabled: true,
                isSave: false,
                resourceDetailData: {},
                treeData: [],
                rawData:[],
            }
        },
        components: {
            ResourceDetail,
            AddResourceModal
        },
        watch: {
            /*监听路由的变化(前进后退),更改菜单选择状态*/
            '$route'(to, from) {
                this.getResource();
            }
        },
        mounted(){
            this.getResource();
        },
        methods: {
            //获取资源菜单数据
            getResource(){
                const _this = this;
                this.$nextTick(() => {
                    this.$http.get('/resourceController.do?m=findResource').then((res) => {
                        if(res.data.success){
                            this.rawData = res.data.data;
                            let data = buildTree(res.data.data, "type", item => {
                                let menuItem = {
                                    id: item.id,
                                    title: item.title, //显示的资源名称
                                    icon: item.icon,
                                    parentId: item.parentId,
                                    location: item.location,
                                    type: item.type,
                                    // expand: true //打开所有资源目录
                                };
                                if(item.type === 'menuGuard'){
                                    menuItem.disabled = true;
                                    menuItem.expand = true;
                                    //让菜单守卫置灰并且无响应，尽量提升用户体验
                                    //不能随意添加属性，按照开发规范编码
                                    //todo 不用置灰，正常显示效果更好点，不突兀
                                    menuItem.render = (h) => {
                                        return h('span', {
                                            style: {
                                                display: 'inline-block',
                                                width: '100%',
                                                color: '#ddd',
                                            }
                                        }, [
                                            h('span', {
                                                style: {
                                                    'padding-left': '4px'
                                                }
                                            }, '菜单守卫')
                                        ]);
                                    }
                                }
                                return menuItem;
                            });
                            //打开根资源目录
                            data[0].expand = true;
                            data[0].selected = true;
                            _this.treeData = data;
                            _this.resourceDetailData = data[0];
                        }else{
                            throw new Error('未获取到资源数据');
                        }

                    })
                });
            },
            freshResource(){
                this.getResource();
            },
            //点击资源菜单，显示该资源的详细信息
            selectResource(detail){
                //该方法，点击一次选中，resourceDetailData有值；再次点击，取消选中，resourceDetailData无值
                this.resourceDetailData = detail[0];
            },
            //编辑资源详情
            edit(){
                this.isSave = true;
                this.disabled = false;
            },
            //保存资源详情
            save(){
                this.isSave = false;
                this.disabled = true;
                //todo 如果父组件环境中想让子组件做某些操作，可用事件总线
                this.$bus.$emit('updateResourceInfo');
            },
            cancelUpdate(){
                this.isSave = false;
                this.disabled = true;
            },
            //显示增加资源的modal
            showAddModal(){
                this.$bus.$emit('showModal', this.resourceDetailData.id);
                // this.modalInfo= {
                //     isShowModal: true
                // };
            },
            // 确认删除
            confirmDelete(){
                //如果删除一个资源，那么它下面挂载的子菜单也全部被删除
                let ids = [];
                //将当前选中的菜单id也放入数组
                //把选中的元素id放在数组第一位，方便数据库识别
                ids.push(this.resourceDetailData.id);
                //从原始数据中筛选出所选菜单的所有子菜单对象
                //遍历子对象，将id放到ids数组中
                this.rawData.filter((item)=>{
                    return item.parentId === this.resourceDetailData.id;
                }).forEach(item => {
                    ids.push(item.id);
                });
                this.$http.post('/resourceController.do?m=deleteResource', {
                    where: {id: ids},
                    currentResource: this.resourceDetailData
                }).then((res) => {
                    if(res.data.success){
                        this.$Notice.success({
                            title: '删除资源成功！'
                        });
                        // 刷新资源树
                        this.getResource();
                        //同时更新页面左侧菜单
                        if(this.resourceDetailData.type === 'leaf'){
                            this.$store.dispatch('menu/getMenu', this);
                        }
                    }else{
                        this.$Notice.error({
                            title: '删除资源失败！'
                        })
                    }
                }).catch((e) => {
                    throw new Error(e);
                });
            }
        }
    }
</script>

<style scoped lang="less" type="text/less">
    //todo 有时候想在组件内部使用scoped，但是又想覆盖默认组件的样式，但是组件的样式在外面
    .resource-manage {
        display: flex;
        width: 100%;
        height: 99%;
        margin-top: -5px;
        flex-flow: row nowrap;
        justify-content: space-between;
    }
    .resource-manage-common {
        background-color: #fff;
        flex-grow: 1;
    }
    .resource-manage-asider {
        flex-basis: 20%;
    }
    .resource-manage-main {
        margin-left: .5rem;
        flex-basis: 80%;
        .button-container {
            position: absolute;
            right: 17px;
            top: 8px;
        }
    }
</style>