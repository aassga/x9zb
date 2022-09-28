<template>
  	<div class="chat-modal-container" >

  		<div class="chat-modal-content">
  			<div class="chat-modal-header">
  				{{$t('lang.private_letter_set')}}
  			</div>
  			<div class="cmh-choose-img">
  				<img :src="require(`@/assets/chat/model.png`)"/>
  				<div class="choose-media">{{$t('lang.video_or_photo')}}></div>
  			</div>
  			<div class="cmc-info">
  				<div class="cmc-amount">
					<img :src="require(`@/assets/chat/ic-money.png`)"/>
  					<input :placeholder="$t('lang.enter_amount')"> USD
  				</div>
  				<div class="cmc-content">
					<img :src="require(`@/assets/chat/ic-money.png`)"/>
  					<input :placeholder="$t('lang.enter_conversation')">
  				</div>
  			</div>
			<div class="cmc-footer">
				<a class="cmc-submit">{{$t('lang.submit_price')}}</a>
			</div>
  		</div>
  	</div>
</template>

<script>
export default {
  name: 'chat-item',
  data: function () {
    return {

    }
  },
  methods: {
  	goDetail () {
  		this.$router.push({ path: '/ChatDetails' })
  	}
  }
}
</script>
<style lang="scss" scoped>
.chat-modal-container{
	position:fixed;
	background:rgba(0,0,0,.6);
	height:100%;
	width:100%;
	z-index:9999;
	top:0;
	left:0;
	.chat-modal-content{
      width:270px;
      min-height:400px;
      background:#f5f4f4;
      position:absolute;
      left:50%;
      top:50%;
      transform:translate(-50%,-50%);
      .chat-modal-header{
      	height:38px;
      	line-height:38px;
      }
	}
	.cmc-footer{
		padding:16px;
		border-top:1px solid #ccc;
		.cmc-submit{
			background-image:linear-gradient(90deg,#f46fe0 0%,#f8a9ec 100%);
			border-radius:5px;
			padding:8px 20px;
			color:#fff;
			font-size:16px;
		}
	}
	.cmc-info{
		padding:16px 2px;
		.cmc-content{
			text-align:left;
			position:relative;
			img{
				width:40px;
				position:relative;
				display:inline-block;
				vertical-align: top;
			}
			input{
				height:34px;
				border-radius:4px;
				border:1px solid #ccc;
				width:145px;
				display:inline-block;
				border-radius:18p;
				border-radius:36px;
				padding:0 20px;
			}
		}
		.cmc-amount{
			text-align:left;
			position:relative;
			margin-bottom:10px;
			img{
				width:40px;
				position:relative;
				display:inline-block;
				vertical-align: top;
			}
			input{
				height:34px;
				border-radius:4px;
				border:1px solid #ccc;
				width:85px;
				display:inline-block;
				padding:0 20px;
			}
		}
	}
	.cmh-choose-img{
		width:100%;
		height:176px;
		position:relative;
		overflow:hidden;
		img{
			width:100%;
		}
		.choose-media{
			background:#6c757d;
			height:32px;
			position:absolute;
			bottom:0;
			color:#fff;
			font-size:12px;
			width:100%;
			line-height:32px;
		}
	}
}
.modal-container {

}
</style>
