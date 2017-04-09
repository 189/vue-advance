<template>
	<div class="wrap">
		<product-list></product-list>
		<hr>
		<h2>购物车</h2>
		<cart></cart>
	</div>
</template>
<script>

import cart from './cart.vue';
import productList from './product-list.vue';

export default {
	components : { cart, productList }
};

</script>


<style>
html,body,ul,li,div,ol,button,h2 { margin: 0; padding: 0; }
ol li { list-style-position: inside; }
li { height: 25px; line-height: 25px; }
button { -webkit-appearance:none; appearance:none; background: none; border: none; outline: none;  }
button { height: 25px; line-height: 25px; padding: 0 10px; border-radius: 5px; border:1px solid #ccc; }
.wrap { margin: 20px; }
.i-b { display: inline-block; margin-right: 10px; }
.space { margin-left: 20px; }
</style>