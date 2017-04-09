<template>
	<div class="space">
		<div>
			<div class="i-b">数量：{{ counter }} </div>
			<div class="i-b">总价：${{ price }}</div>
		</div>
		<ol>
			<li v-for='n in list'>
				<div class="i-b">名称：{{ n.name }}</div>
				<div class="i-b">价格：{{ n.price  }}</div>
				<div class="i-b">
					<span>数量：x{{ n.amount }}</span>
					<button v-on:click='increment(n.id)'>加一</button>
					<button v-on:click='decrement(n.id)'>减一</button>
					<button v-on:click='remove(n.id)'>删除</button>
				</div>
			</li>
		</ol>
		<button @click='checkout'> 结账 </button> {{ status }}
	</div>
</template>

<script>

import * as types from '../vuex/types';
import { mapActions, mapGetters } from 'vuex';

export default {
	computed : {
		list(){
			return this.$store.state.cartModule.added
		},

		...mapGetters({
			counter : "cartAmount",
			price : "cartPrice"
		}),

		status(){
			return this.$store.state.cartModule.status;
		}

	},

	methods : {
		increment(id){
			this.$store.commit(types.INCREMENT_CART, {
				id
			});
		},
		decrement(id){
			this.$store.commit(types.DECREMENT_CART, {
				id
			});
		},
		remove(id){
			this.$store.commit(types.DELETE_PRODUCT_FROM_CART, {
				id
			});	
		},

		checkout(){
			this.$store.dispatch('checkout');
		}
	}
};
</script>