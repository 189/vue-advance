
const products = [
	{
		name : 'Ipad Mini',
		price : 10,
		id : 1
	},
	{
		name : 'Ipad Mini2',
		price : 20,
		id : 2
	},
	{
		name : 'iphone 5s',
		id : 3,
		price : 30
	},
	{
		name : 'imac',
		id : 4,
		price : 40
	},
	{
		name : 'Galaxy S5',
		id : 5,
		price : 50
	}
];


export default {
	getAllProducts(){
		return new Promise((resolve, reject)=>{
			setTimeout(()=>{
				resolve(products);
			}, 1000)
		});
	},

	checkout(params){
		return new Promise(function(resolve, reject){
			setTimeout(()=>{
				var n = Math.random() * (10 - 0) + 0;
				if(n >= 5){
					resolve();
				}
				else {
					reject();
				}
			}, 1000)
			return this;
		})
	}
};





