import Vue from "vue";
import App from './views/App';
import store from './vuex/store';
import router from './router/router';

const app = new Vue({
    el : '#app',
    render: h => h(App),
    store,
    router
}).$mount('#app');