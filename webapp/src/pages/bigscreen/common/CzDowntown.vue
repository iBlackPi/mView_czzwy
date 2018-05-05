<template>
    <ve-svgMap id="testtest" name="cz5" style="height:100%"></ve-svgMap>
</template>

<script>
    export default {
        // todo vue会识别这个name,当做是标签名,会有影响，具体原因不明
        name: "cz-map",
        data(){
            return {
                mapData: {}
            }
        },
        mounted(){
            let _this = this;
            this.$nextTick(() => {
                _this.$store.dispatch('czCloudInfo/getCloudInfo', {vm: _this});
            })
        }
    }
</script>

<style scoped>

</style>