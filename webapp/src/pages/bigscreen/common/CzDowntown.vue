<template>
    <ve-svgMap id="testtest" name="cz5" style="height:100%"></ve-svgMap>
</template>

<script>
    export default {
        // todo vue会识别这个name,当做是标签名,会有影响，具体原因不明
        name: "div",
        data(){
            return {
                mapData2: [
                    {name:'福州',value:95},
                    {name:'太原',value:90},
                    {name:'长春',value:80},
                    {name:'广州',value:80}
                ],
                mapData1: [
                    [{name:'广州'},{name:'福州'}],
                    [{name:'广州'},{name:'太原'}],
                    [{name:'广州'},{name:'长春'}]
                ]
            }
        }
    }
</script>

<style scoped>

</style>