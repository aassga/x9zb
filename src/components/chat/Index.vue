<template>
  	<div class="chat-list-item">
  		<img class="thumb-item" :src="chatItem.avatar">
  		<div class="chat-item-content">
			<h3>{{chatItem.nick}}</h3>
			<p>{{chatItem.last_message.txt}}</p>
			<span>{{chatItem.last_message_time}}</span>
			<span class="unread" v-show="chatItem.unread_message_count > 0">{{chatItem.unread_message_count}}</span>
  		</div>
  	</div>
</template>

<script>
export default {
  name: 'chat-item',
  props: {
    chatItem: {
      type: Object,
      default: {}
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.chat-list-item {
	height:50px;
	padding-left:60px;
	text-align:left;
	position:relative;
	margin-bottom:7px;
	.thumb-item{
		border:1px solid #f46fe0;
		width:50px;
		height:50px;
		position:absolute;
		left:0;
		border-radius:50px;
	}
	.chat-item-content{

		height:14px;
		font-size:12px;
		line-height:22px;
		color:#6c757d;
		.unread {
			display: inline-block;
			width: 35px;
			height: 30px;
			background: url('../../assets/my/ic-@3x.png') no-repeat center;
			line-height: 30px;
			text-align: center;
			background-size: 100% 100%;
			position: absolute;
			right: 80px;
			color: #fff;
		}
		h3,p{
			margin:0;
		}
		h3{
			font-size:12px;
			display:inline-block;
		}
		p{
			width:137px;
			color:#343a40;
			letter-spacing:0;
			font-size:14px;
			overflow:hidden;
			text-overflow:ellipsis;
			white-space:nowrap;
		}
		span{
			color:#6c757d;
			position:absolute;
			right:20px;
			top:14px;
		}
	}
}
</style>
