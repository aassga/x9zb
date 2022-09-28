<!-- 我的等级 -->
<template>
	<div class="i-tabs-container">
		<div class="header-nav"><a href="/personal/grade?choose=0">
				<div class="item first-item ">财富等级</div>
			</a></div>
		<div class="tab-pane-item" name="财富等级" style="padding-left: 35px;">
			<div class="grade-wealth-level-container">
				<aside>您目前财富经验值为{{infos.current_exp}}， 再有{{infos.difference}}财富经验值就能获得直播间特有的财富等级及标识，等你哦！<div class="icon_tishi" style="display: flex;"><img
							src="data:image/png;base64,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"
							style="max-width: 100%;">
						<div class="hoverText">
							<div>在直播间消费钻石可获得财富经验值<br>1钻石=1财富经验值 , 最小单位为0.1</div>
						</div>
					</div>
				</aside>
				<nav>
					<div class="navTitle">如何快速升级</div><img
						src="data:image/png;base64,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"
						alt="" style="width: 50px;">
					<div class="line"></div>
				</nav>
				<section style="justify-content: flex-start;">
					<div class="content">
						<div class="contImg"><img
								src="../../assets/images/grade-2.png" alt="">
						</div>
						<div class="contText"><span class="contTextTitle">赠送礼物</span><span class="contTextContent">狂刷礼物
								嗨飙经验</span></div>
					</div>
					<!-- <div class="content">
						<div class="contImg"><img
								src="../../assets/images/grade-1.png" alt="">
						</div>
						<div class="contText"><span class="contTextTitle">充值钻石</span><span class="contTextContent">充值不停
								快感不止</span></div>
					</div> -->
					<!-- <div class="content">
						<div class="contImg"><img
								src="../../assets/images/grade-3.png"
								alt=""></div>
						<div class="contText"><span class="contTextTitle">购买贵族</span><span class="contTextContent">贵族尊享
								经验加倍</span></div>
					</div> -->
					<!-- <div class="content">
						<div class="contImg"><img
								src="../../assets/images/grade-4.png" alt="">
						</div>
						<div class="contText"><span class="contTextTitle">贵族礼物</span><span class="contTextContent">钻石礼物
								增值经验</span></div>
					</div> -->
					<!-- <div class="content">
						<div class="contImg"><img
								src="../../assets/images/grade-5.png" alt="">
						</div>
						<div class="contText"><span class="contTextTitle">购买定制礼物</span><span
								class="contTextContent">贵族专属 无与伦比</span></div>
					</div> -->
					<div class="content">
						<div class="contImg"><img
								src="../../assets/images/grade-6.png"
								alt=""></div>
						<div class="contText"><span class="contTextTitle">赠送定制礼物</span><span
								class="contTextContent">拉风炫酷 闪亮全场</span></div>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		computed:{
			infos(){
				return this.$store.state.infos
			}
		}
	}
</script>

<style>
</style>
