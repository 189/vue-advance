
import Vue from 'vue';
import Vuex from 'vuex';
import cartModule from './modules/cart';
import productModule from './modules/product';

Vue.use(Vuex);

export default new Vuex.Store({
	modules : { 
		cartModule, 
		productModule 
	}
});




