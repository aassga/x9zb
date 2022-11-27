<!-- 下载 -->
<template>
	<div id="qrcode" ref="qrcode"></div>
</template>

<script>
import QRCode from 'qrcodejs2';
	export default {
		components:{QRCode},
		data() {
			return {
				appUrl: location.protocol + "//" + window.location.host + "/m/#/pages/download",
				channel: localStorage.getItem("channel")
			}
		},
		mounted() {
			this.showQRcode()
		},
		methods: {
      qrcode(qWidth,qHeight,qText,qRender) {
				let qrcode = new QRCode("qrcode",{
					width: qWidth,
					height: qHeight,
					text: qText,
					render: qRender
				})
			},
			showQRcode() {
				const appUrl = this.channel ? this.appUrl + '?channel_code=' + this.channel : this.appUrl 
				this.$refs.qrcode.innerHTML = "";
				this.$nextTick(()=>{
					this.qrcode(124,124,appUrl,"canvas")
				})
			}
		}
	}
</script>

<style>

</style>
