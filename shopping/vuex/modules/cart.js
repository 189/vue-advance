
import * as types from '../types';
import Vue from 'vue';
import shop from '../../api/shop';

export default {
	state : {
		added : [],
		status : ''
	},

	getters : {
		cartPrice(state, getters, rootState){
			var { added } = state, ret = 0;
			
			added.forEach(({amount, price})=>{
				ret += (amount * price);
			})

			return ret;
		},

		cartAmount({ added }, getters, rootState){
			var ret = 0;

			added.forEach(({amount})=>{
				ret += amount;
			})

			return ret;
		}
	},
	
	mutations : {
		[types.ADD_TO_CART]({ added }, payload){
			let has = false;
			added.forEach((p)=>{
				let amount = p.amount || 1;
				if(p.id == payload.id){
					amount += 1;
					Vue.set(p, 'amount', amount);
					has = true;
				}
			});

			!has && added.push({ amount : 1, ...payload });
		},

		[types.DECREMENT_CART]({added}, payload){
			added.forEach((v, i)=>{
				if(v.id === payload.id && v.amount > 0){
					v.amount--;
				}
			})
		},

		[types.INCREMENT_CART]({added}, payload){
			added.forEach((v, i)=>{
				if(v.id === payload.id && v.amount > 0){
					v.amount++;
				}
			})
		},

		[types.DELETE_PRODUCT_FROM_CART]({added}, payload){
			var index;
			
			added.forEach((v, i)=>{
				if(v.id === payload.id){
					index = i;
				}
			})

			if(index > -1){
				added.splice(index, 1);
			}

		},

		[types.CART_CHECKOUT_PROGRESS](state, payload){
			state.status = '结账中...';
		},

		[types.CART_CHECKOUT_SUCCESS](state, payload){
			state.status = '结账成功!';
		},

		[types.CART_CHECKOUT_FAIL](state, payload){
			state.status = '结账失败!';
		}
	},

	actions : {
		checkout(context, payload){
			context.commit(types.CART_CHECKOUT_PROGRESS);

			return shop.checkout().then(
				()=> {
					context.commit(types.CART_CHECKOUT_SUCCESS)
				},
				()=> {
					context.commit(types.CART_CHECKOUT_FAIL);
				}
			)
		}
	}
};




