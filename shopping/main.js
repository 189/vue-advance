// import 'babel-polyfill';
import Vue from 'vue';
import App from './components/app.vue';
import store from './vuex/store';

const app = new Vue({
	components : { App },
	store
});

app.$mount('#app');

