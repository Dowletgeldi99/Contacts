<template>
    <div id = "app">
        <header>
            <router-link to="/">Home</router-link>
        </header>
        <keep-alive>
            <router-view>
                
            </router-view>
        </keep-alive>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang = 'scss'>
    * {
        box-sizing: border-box;
        margin: 0; 
        padding: 0;
    }

    html,
    body {
        height: 100%;
        font-family: sans-serif;
    }

    header {
        width: 100%;
        height: 50px;
        background-color: #000;
        text-align: center;
    }
</style>