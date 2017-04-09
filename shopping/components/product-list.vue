<template>
	<div>
		<h2>产品列表</h2>
		<div>
			<span>仓库商品数量：{{ counter }}件</span>
			<span>仓库资产总价：{{ priceTotal }}元</span>
		</div>
		<ol class="space">
			<li v-for='p in productList' :key='p.id' >
				<div class="i-b">{{ p.name }}</div>
				<div class="i-b">价格: ${{ p.price  }} </div>
				<button class="i-b" v-on:click='add(p)'>Add to cart</button>
			</li>
		</ol>
		
	</div>
</template>
<script>
	import * as types from '../vuex/types';
	import { mapActions, mapGetters } from 'vuex';

	export default {
		computed : {
			productList(){
				var { state } = this.$store; 
				return state.productModule.list;
			},

			counter(){
				return this.$store.getters['products/PRODUCTS_COUNTER'];
			},

			...mapGetters({
				priceTotal : 'products/PRODUCTS_PRICE' 
			})
		},

		methods : {
			
			add(product){
				this.$store.commit(types.ADD_TO_CART, product);
			},

			...mapActions(['getAllProducts'])
		},

		mounted(){
			this.getAllProducts();
		}
	};
</script>
