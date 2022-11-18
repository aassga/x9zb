<template>
	<div class="main-page-footer">
		<div class="footer-info">
			<div class="inner">
				<div class="td flink">
					<h3>网站地图</h3>
					<div>
						<!-- /base-football base-basketball -->
						<a class="td" target="_blank" href="./football">比分直播</a>
						<!-- <a class="td" >足球比分</a> -->
						<a class="td" target="_blank" href="./anchor?type=1">足球直播</a>
						<a class="td" target="_blank" href="./base-football?id=45">欧洲杯赛程</a>
						<a class="td" target="_blank" href="./basketball">篮球比分</a>
						<a class="td" target="_blank" href="./anchor?type=2">篮球直播</a>
						<a class="td" target="_blank" href="./base-basketball?id=1">NBA赛程</a>
						<a class="td" target="_blank" href="./base-basketball?id=3">CBA排名</a>
						<a class="td" target="_blank" href="./base-football?id=45">欧洲杯</a>
						<a class="td" target="_blank" href="./base-football?id=46">欧冠杯</a>
						<a class="td" target="_blank" href="./base-football?id=82">英超排名</a>
						<a class="td" target="_blank" href="./base-football?id=129">德甲排名</a>
						<a target="_blank" class="td" href="./base-football?id=120">西甲排名</a>
						<a class="td" target="_blank" href="./base-football?id=108">意甲排名</a>
						<a class="td" target="_blank" href="./base-football?id=542">中超排名</a>
					</div>
				</div>
				<div class="vertical-line"></div>
				<div class="td anchor">
					<h3>主播帮助</h3>
					<div>
						<a class="td" href="/about-user">主播开播教程</a>
					<a href="/about-user" class="td" >直播规范</a>
					<a class="td" href="/about-user">直播协议</a>
					<a href="https://obsproject.com/download" target="_blank" class="td">直播工具下载</a></div>
				</div>
				<div class="vertical-line"></div>
				<!-- <div class="td app">
					<h3>官方微博</h3>
					<div>
						<div class="qrcode footer-down" style="padding: 0; background-color: transparent;">
							<div id="qrcode">
								<img alt="Scan me!" :src="system.weibo_qr_code" style="display: block;">
							</div>
						</div>
					</div>
				</div> -->
				<!-- <div class="td follow">
					<h3>公众平台</h3>
					<div>
						<div class="qrcode">
							<div class="lazyload-wrapper "><img
									:src="system.follow_us" alt=""
									width="184" height="184" title=""></div>
						</div>
					</div>
				</div> -->
				<div class="vertical-line"></div>
				<div class="td contact" style="width: 202px;">
					<h3>联系我们</h3>
					<div>
						<a class="td">申请主播QQ ： <span>{{system.apply_for_anchor}}</span></a>
						<a class="td">问题反馈QQ ：<span>{{system.feedback_qq}}</span></a>
						<a class="td">客服邮箱 ： <span>{{system.customer_service_email}}</span></a>
					</div>
				</div>
			</div>
		</div>
		<div class="horizontal-line"></div>
		<div class="td external-link" style="display: none;">
			<h3>友情链接</h3>
			<div class="link-box"><a target="_blank"
					class="td">高清直播</a><a href="" target="_blank" class="td">足球比分</a><a href="" target="_blank"
					class="td">篮球比分</a><a href="" target="_blank" class="td">赛程预告</a><a href="" target="_blank"
					class="td">体育资讯</a><a href="" target="_blank" class="td">体育社区</a><a href="" target="_blank"
					class="td">足球资料库</a><a href="" target="_blank" class="td">篮球资料库</a></div>
		</div>
		<div class="foot-copyright">
			<p class="agreement">
				<router-link tag="a" target="_blank" to="/about-user">
					<a>关于我们</a>|<a>用户协议</a>|<a>隐私政策</a>|
				</router-link>
			</p>
			<p v-if="$route.name === 'downLoad'" class="agreement" style="font-size: 12px;">软体名称:{{system.app_name}} | 开发者名称:{{system.app_company}} | 版本号:{{system.app_version}} | 更新时间:{{system.app_updatedate}}</p>
			<p class="agreement" style="font-size: 14px;">
				小9直播所有足球直播和NBA直播信号均由用户收集或从搜索引擎搜索整理获得，所有内容均
				来自互联网，我们自身不提供任何直播信号和视频内容，如有侵犯您的权益请通知我们，我们会第一时间处理。
			</p>
			<p class="copyright">
				<a href="https://beian.miit.gov.cn" target="_blank" rel="nofollow">{{system.site_icp}}</a>
				<b>|</b>
				<a href="https://beian.miit.gov.cn" target="_blank" rel="nofollow">{{system.site_gwa}}</a>
				<b>|</b>
				
				<a rel="nofollow">{{system.Value_added_business_license}}</a></p>
			<ul class="imgs">
				<li><a target="cyxyv" href="https://v.yunaq.com/certificate?domain=www.longya.tv&from=label&code=90020">
						<img src="./../../../assets/images/label_sm_90020.png"></a></li>
				<!-- <li><a id="_pingansec_bottomimagesmall_shiming" target="_blank" href="//si.trustutn.org/info?sn=113210607040628205301&certType=1"><img src="//v.trustutn.org/images/cert/bottom_small_img.png"/></a></li> -->
				<li>
					<a id="_pingansec_bottomimagesmall_shiming" target="_blank"
						href="//si.trustutn.org/info?sn=113210607040628205301&certType=1"><img
							src="./../../../assets/images/bottom_small_img.png" /></a>
				</li>

			</ul>
			<p class="right">Copyright @ 2019-2021 . ALL Rights Reserved</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'sidebar',
		computed: {
			key() {
				return this.$route.path
			},
			system(){
				return this.$store.state.system
			}
		}
	}
</script>

<style scoped lang="scss">
	.main-page-footer {
		width: 100%;
		background-color: #2a2b33;
		// background-image: url(/assets/image/foot-bg@2x.baaac31635516554dd6057462bfd7fca.png);
		background-size: contain;
		background-position: center;
		position: relative;
		z-index: 999;
	}

	.main-page-footer p {
		margin: 0;
	}

	.main-page-footer .footer-info {
		padding-top: 25px;
	}

	.main-page-footer .foot-copyright {
		background-color: #25262e;
	}

	.main-page-footer .inner {
		width: 1200px;
		margin: 0 auto;
		height: 132px;
		font-size: 0;
		display: flex;
		justify-content: space-between;
	}

	.main-page-footer .inner img {
		max-width: 100%;
		vertical-align: middle;
	}

	.main-page-footer .inner .follow img {
		width: 100%;
		height: 100%;
	}

	.main-page-footer .inner .contact {
		width: 195px;
	}

	.main-page-footer .inner .contact .footer-icon a {
		display: inline-block;
	}

	.main-page-footer .inner .contact .cl {
		width: 47px;
		height: 47px;
		margin-top: 10px;
	}

	.main-page-footer .inner .contact .cr {
		width: 47px;
		height: 47px;
		margin-top: 10px;
		margin-left: 45px;
	}

	.main-page-footer .inner .contact .td {
		font-size: 12px;
		margin-bottom: 8px;
		color: #8d93a1;
		letter-spacing: 0;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: all 0.3s;
	}

	.main-page-footer .inner .follow {
		width: 105px;
		margin-left: 40px;
		margin-right: 22px;
	}

	.main-page-footer .inner .follow .qrcode {
		width: 95px;
		height: 95px;
		position: relative;
	}

	.main-page-footer .inner .follow .qrcode .logo {
		position: absolute;
		width: 25px;
		height: 25px;
		border-radius: 50%;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background: #fff;
	}

	.main-page-footer .inner .follow .td {
		width: 100px;
		font-size: 12px;
		margin-bottom: 8px;
		color: #8d93a1;
		letter-spacing: 0;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: all 0.3s;
	}

	.main-page-footer .inner .app {
		width: 105px;
	}

	.main-page-footer .inner .app .td {
		width: 100px;
		font-size: 12px;
		margin-bottom: 8px;
		color: #8d93a1;
		letter-spacing: 0;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: all 0.3s;
		cursor: pointer;
	}

	.main-page-footer .inner .app .qrcode {
		width: 95px;
		height: 95px;
		position: relative;
	}

	.main-page-footer .inner .app .qrcode .footer-logo {
		position: absolute;
		width: 15px;
		height: 15px;
		border-radius: 50%;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background: #fff;
	}

	.main-page-footer .inner .app .footer-down {
		padding: 6px;
		background-color: white;
	}

	.main-page-footer .inner .anchor {
		width: 112px;
		/*margin-left: 45px;*/
	}

	.main-page-footer .inner .anchor .td {
		width: 195px;
		font-size: 12px;
		margin-bottom: 8px;
		color: #8d93a1;
		letter-spacing: 0;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: all 0.3s;
	}

	.main-page-footer .inner .td {
		display: block;
		font-size: 12px;
		letter-spacing: normal;
		word-spacing: normal;
		white-space: nowrap;
	}

	.main-page-footer .inner .td h3 {
		font-size: 15px;
		color: #dedfe5;
		letter-spacing: 0;
		text-align: left;
		margin-bottom: 10px;
		display: flex;
		align-items: center;
	}

	.main-page-footer .inner .td h3::before {
		content: '';
		display: inline-block;
		width: 2px;
		height: 14px;
		border-radius: 1.5px;
		background-color: #eecfb5;
		margin-right: 8px;
	}

	.main-page-footer .inner .vertical-line {
		width: 1px;
		height: 129px;
		opacity: 0.9;
		box-shadow: 1px 0 0 0 #33343d;
		background-color: #22232a;
		margin: 0 40px;
		margin-top: 5px;
	}

	.main-page-footer .inner .flink {
		width: 352px;
		font-size: 0;
	}

	.main-page-footer .inner .flink .td {
		font-size: 12px;
		margin-bottom: 8px;
		color: #808392;
		letter-spacing: 0;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: all 0.3s;
		width: 88px;
		float: left;
	}

	.main-page-footer .inner .td:hover {
		color: #f0c682;
	}

	.main-page-footer .horizontal-line {
		width: 1200px;
		height: 1px;
		opacity: 0.9;
		margin: 18px auto 14px;
		box-shadow: 0 1px 0 0 #33343d;
		background-color: #22232a;
	}

	.main-page-footer .external-link {
		width: 1200px;
		min-height: 75px;
		margin: 0 auto;
	}

	.main-page-footer .external-link .td {
		font-size: 12px;
		color: #808392;
		letter-spacing: 0;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: all 0.3s;
		float: left;
		padding-right: 15px;
		border-right: 1.5px solid #4a4c55;
		line-height: 1;
		margin: 3px 15px 11px 0;
	}

	.main-page-footer .external-link .td:hover {
		color: #f0c682;
	}

	.main-page-footer .external-link .link-box {
		overflow: hidden;
		padding-bottom: 14px;
	}

	.main-page-footer .external-link h3 {
		font-size: 15px;
		color: #dedfe5;
		letter-spacing: 0;
		text-align: left;
		margin-bottom: 10px;
		display: flex;
		align-items: center;
	}

	.main-page-footer .external-link h3::before {
		content: '';
		display: inline-block;
		width: 2px;
		height: 14px;
		border-radius: 1.5px;
		background-color: #eecfb5;
		margin-right: 8px;
	}

	.main-page-footer .copyright {
		padding-top: 8px;
		font-size: 12px;
	}

	.main-page-footer .copyright>b {
		color: #808392;
	}

	.main-page-footer .copyright>a {
		display: inline-block;
		margin: 0 10px;
		color: #808392;
	}

	.main-page-footer .copyright>a:hover {
		color: #f0c682;
	}

	.main-page-footer footer {
		text-align: center;
	}

	.main-page-footer .agreement {
		padding: 15px 0 0 0;
		cursor: default;
		-ms-user-select: none;
		user-select: none;
		margin-bottom: 3px;
	}

	.main-page-footer .agreement a {
		color: #808392;
		padding: 0 10px;
		font-size: 12px;
	}

	.main-page-footer .agreement a:hover {
		color: #f0c682;
	}

	.main-page-footer .imgs {
		font-size: 0;
		text-align: center;
		margin: 16px 0;
		min-width: 800px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: nowrap;
	}

	.main-page-footer .imgs li {
		vertical-align: bottom;
		display: inline-block;
		margin-right: 22px;
		border-radius: 3px;
		background-color: #4e5057;
		width: 61px;
		height: 24px;
	}

	.main-page-footer .imgs li img {
		width: 100%;
		height: 100%;
		vertical-align: middle;
	}

	.main-page-footer .imgs li:last-child {
		margin-right: 0;
	}

	.main-page-footer p {
		font-weight: normal;
		font-style: normal;
		font-stretch: normal;
		line-height: normal;
		letter-spacing: normal;
		text-align: center;
		color: #808392;
	}

	.main-page-footer p.mention {
		width: 970px;
		margin: 0 auto;
		font-size: 14px;
		line-height: 1.43;
		padding-bottom: 12px;
		padding-top: 26px;
	}

	.main-page-footer p.right {
		color: #4a4c55;
		font-size: 12px;
		padding-bottom: 16px;
	}
</style>
