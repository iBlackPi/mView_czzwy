<template>
    <div id="app" class="app">
        <!-- 将路由视口放入body中，加载Main组件-->
        <router-view></router-view>
    </div>
</template>

<style>
    html,body{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .app{
        width: 100%;
        height: 100%;
    }
</style>