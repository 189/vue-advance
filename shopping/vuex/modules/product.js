
import * as types from '../types';
import shop from '../../api/shop';

export default {
	state : {
		list : []
	},
	
	getters : {
		// 商品总量
		[types.PRODUCTS_COUNTER](state, getters, rootState){
			return state.list.length;
		},

		// 商品总价
		[types.PRODUCTS_PRICE](state, getters, rootState){
			var price = 0;
			state.list.forEach((p)=>{
				price += p.price;
			})
			return price;
		}
	},

	mutations : {
		[types.RECEIVE_RPODUCTS](state, payload){
			state.list = payload.products;
		}
	},

	actions : {
		getAllProducts(context, payload){
			shop.getAllProducts().then((products)=>{
				context.commit(types.RECEIVE_RPODUCTS, {
					products
				});
			});
		}	
	}
};




