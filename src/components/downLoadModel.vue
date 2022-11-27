<template>
	<div @click.stop="onHandleClose" class="donwnload-modal" >
			<div @click.stop="()=>{}" class="dialog-context">
				<img @click.stop="onHandleGoDownLoadPage" class="dialog-context-img" src="@/assets/images/download/download-card-PC.gif" />
				<img @click.stop="onHandleClose" class="dialog-context-icon" src="@/assets/images/daily/close.png" />
			</div>
	</div>
</template>

<script>
	export default {
		name: 'downLoadModel',
		data() {
			return {
            }
		},
		computed: {
			
		},
		watch: {
		},
		mounted() {

		},
		methods: {
			onHandleClose(){
				this.$emit('close');
			},
			onHandleGoDownLoadPage(){
				this.$emit('close');
				this.$router.push('/downLoad')
			}
		}
	}
</script>

<style lang="scss" scoped >
.donwnload-modal{
	overflow: hidden;
	z-index: 999999;
    position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.2);
    .dialog-context{
		position: relative;
		width: 717px;
		height: 538px;
        .dialog-context-img{
		width: 717px;
		height: 538px;
        }
        .dialog-context-icon{
			cursor: pointer;
			overflow: hidden;
			position: absolute;
			right: -40px;
			top: -40px;
			width: 40px;
			height: 40px;
        }
    }
}

</style>