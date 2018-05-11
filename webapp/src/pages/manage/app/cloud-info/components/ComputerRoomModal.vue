<template>
    <Modal
            v-model="modal"
            title="机房信息维护"
            @on-ok="ok"
            @on-cancel="cancel">
        <div class="computer-room">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="自建机房" prop="selfBuiltMachineRoomNum">
                    <Input v-model="formValidate.selfBuiltMachineRoomNum" placeholder="自建机房个数"></Input>
                </FormItem>
                <FormItem label="托管机房" prop="trusteeshipRoomNum">
                    <Input v-model="formValidate.trusteeshipRoomNum" placeholder="托管机房个数"></Input>
                </FormItem>
                <FormItem label="租用云主机" prop="cloudServiceNum">
                    <Input v-model="formValidate.cloudServiceNum" placeholder="租用云主机个数"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </div>
    </Modal>

</template>

<script>
    export default {
        name: "",
        data () {
            return {
                modal: false,
                formValidate: {
                    selfBuiltMachineRoomNum: '',
                    trusteeshipRoomNum: '',
                    cloudServiceNum: '',
                    // todo 后台需要，前台无实际意义
                    // todo 该字段严谨手动改动
                    id: ''
                },
                ruleValidate: {
                    //todo async-validator无法验证数字的问题，用正则解决
                    selfBuiltMachineRoomNum: [
                        { required: true, pattern: /^\d+$/, message: '请输入自建机房个数（必须数值类型）', trigger: 'blur' },
                    ],
                    trusteeshipRoomNum: [
                        { required: true, pattern: /^\d+$/, message: '请输入托管机房个数（必须数值类型）', trigger: 'blur' },
                    ],
                    cloudServiceNum: [
                        { required: true, pattern: /^\d+$/, message: '请输入托管云主机个数（必须数值类型）', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$httpt.post('machineRoomController.do?saveOrUpdateMachineRoom', this.formValidate).then(({data}) => {
                            if(data.success){
                                this.$Notice.success({title: '保存成功!'});
                                this.modal = false;
                                // 修改成功通知父组件更新表格数据
                                this.$bus.$emit('updateComputerRoomInfo');
                            }else{
                                this.$Notice.error({title: '保存失败!'});
                            }
                        });
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            ok(){
                this.modal = false;
            },
            cancel(){
                this.modal = false;
            }
        },
        mounted(){
            this.$bus.$on('showUpdateComputerRoom', (row) => {
                this.modal = true;
                Object.assign(this.formValidate, row);
            })
        }
    }
</script>

<style scoped type="text/less" lang="less">
    .computer-room {
        height: 100%;
    }
</style>