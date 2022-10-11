<!-- 前瞻 -->
<template>
	<div class="foresight">
		<list></list>
	</div>
</template>

<script>
	import list from './list.vue'
	export default {
		components:{list},
		data() {
			return {
				options: [{
				  value: '选项5',
				  label: '测试'
				}],
				value: ''
			}
		},
		methods: {
			handleChange(val) {
			   // console.log(val);
			}
		},
	}
</script>

<style lang="scss">
	
	.select {
	    margin-top:  -50px ;
	}
	.foresight {
		z-index: 0;
		width: 1200px;
		// overflow: hidden;
		margin: 60px auto;
		.title {
			padding: 15px 0;
		}
	}
	
	
</style>
