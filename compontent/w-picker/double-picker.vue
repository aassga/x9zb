<template>
	<view class="w-picker-view">
		<picker-view class="d-picker-view" indicator-class="indicators" :indicator-style="itemHeight" :value="pickVal" @change="handlerChange">
			<picker-view-column>
				<view class="w-picker-item" v-for="(item,index) in options[0]" :key="index">{{item}}</view>
			</picker-view-column>
			<picker-view-column class="">
				<view class="w-picker-item" v-for="(item,index) in options[1]" :key="index">{{item}}</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>

<script>
	export default {
		props:{
			options:{
				type:[Array,Object],
				default(){
					return []
				}
			},
			value:{
				type:String,
				default:""
			},
			defaultType:{
				type:String,
				default:"label"
			},
			defaultProps:{
				type:Object,
				default(){
					return{
						label:"label",
						value:"value"
					}
				}
			}
		},
		data() {
			return {
				data:[
					["请选择年份", '1998', '1999', '2000'],
					["请选择日期", '11', '12', '13']
				],
				pickVal:[],
				itemHeight:`height: ${uni.upx2px(88)}px;color:red`,
			};
		},
		computed:{
			nodeKey(){
				return this.defaultProps.label;
			},
			nodeValue(){
				return this.defaultProps.value;
			},
			range(){
				return this.options
			}
		},
		watch:{
			value(val){
				if(this.options.length!=0){
					this.initData();
				}
			},
			options(val){
				this.initData();
			}
		},
		created() {
			if(this.options.length!=0){
				this.initData();
			}
		},
		methods:{
			initData(){
				let dVal=this.value||"";
				let data=this.range;
				let pickVal=[0];
				let cur=null;
				let label="";
				let value,idx;
				if(this.defaultType==this.nodeValue){
					value=data.find((v)=>v[this.nodeValue]==dVal);
					idx=data.findIndex((v)=>v[this.nodeValue]==dVal);
				}else{
					value=data.find((v)=>v[this.nodeKey]==dVal);
					idx=data.findIndex((v)=>v[this.nodeKey]==dVal);
				}
				pickVal=[idx!=-1?idx:0];
				this.$nextTick(()=>{
					this.pickVal=pickVal;
				});
				if(this.defaultType==this.nodeValue){
					this.$emit("change",{
						result:value?value[this.nodeKey]:data[0][this.nodeKey],
						value:dVal||data[0][this.nodeKey],
						obj:value?value:data[0]
					})
				}else{
					this.$emit("change",{
						result:dVal||data[0][this.nodeKey],
						value:value?value[this.nodeValue]:data[0][this.nodeValue],
						obj:value?value:data[0]
					})
				}
				
			},
			handlerChange(e){
				let arr=[...e.detail.value];
				
				let num1=[arr[1] || 0];
				// let data=this.range;
				let num2=[arr[0]];
				let data = this.options
				let value1 = data[0][num2]
				let value2 = data[1][num1]
				let ddd = {
					value1:data[0][num2],
					value2:data[1][num1]
				}
				this.$emit("change",{
					result:ddd,
					value:ddd,
					obj:ddd
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "./w-picker.css";
	.indicators {
		color: red !important;
		border: none !important;
	}
	picker-view-column {
		flex: 1;
		width: 50vw;
	}
	.w-picker-item {
		// flex: 1;
		// width: 50%;
	}
</style>
