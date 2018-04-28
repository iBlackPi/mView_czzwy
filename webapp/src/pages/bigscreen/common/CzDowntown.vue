<template>
    <ve-svgMap id="testtest" name="cz5" style="height:100%"></ve-svgMap>
</template>

<script>
    export default {
        name: "map",
        data(){
            return {
                mapData2: [
                    {name:'福州',value:95},
                    {name:'太原',value:90},
                    {name:'长春',value:80},
                    {name:'广州',value:80}],
                mapData1: [
                    [{name:'广州'},{name:'福州'}],
                    [{name:'广州'},{name:'太原'}],
                    [{name:'广州'},{name:'长春'}]]
            }
        }
    }
</script>

<style scoped>

</style>