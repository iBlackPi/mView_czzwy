<template>
    <div id="app" class="app">
        <!-- 将路由视口放入body中，加载Main组件-->
        <router-view></router-view>
    </div>
</template>

<style>
    @font-face {
        font-family: fationblack;
        src: url(../assets/font/technology.ttf);
    }
    @font-face {
        font-family: led;
        src: url(../assets/font/UnidreamLED.ttf);
    }
    html, body {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .app {
        width: 100%;
        height: 100%;
    }
</style>