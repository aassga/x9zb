<template>
	<div class="main-page-footer">
		<div class="footer-info">
			<div class="inner">
				<div class="td flink">
					<h3>网站地图</h3>
					<div><a target="_blank" href="/score/football" class="td">比分直播1</a><a target="_blank"
							href="/score/football" class="td">足球比分</a><a target="_blank" href="/anchor/home?type=1"
							class="td">足球直播</a><a target="_blank" href="/database/football/1/2/232396"
							class="td">欧洲杯赛程</a><a target="_blank" href="/score/basketball" class="td">篮球比分</a><a
							target="_blank" href="/anchor/home?type=2" class="td">篮球直播</a><a target="_blank"
							href="/database/basketball/580/1/234147" class="td">NBA赛程</a><a target="_blank"
							href="/database/basketball/673/1/233597" class="td">CBA排名</a><a target="_blank"
							href="/database/football/1/2/232396" class="td">欧洲杯</a><a target="_blank"
							href="/database/football/2/2/237581" class="td">欧冠杯</a><a target="_blank"
							href="/database/football/9/1/232894" class="td">英超排名</a><a target="_blank"
							href="/database/football/21/1/232739" class="td">德甲排名</a><a target="_blank"
							href="/database/football/3/1/233055" class="td">西甲排名</a><a target="_blank"
							href="/database/football/15/1/233095" class="td">意甲排名</a><a target="_blank"
							href="/database/football/227/1/232860" class="td">中超排名</a></div>
				</div>
				<div class="vertical-line"></div>
				<div class="td anchor">
					<h3>主播帮助</h3>
					<div><a class="td" target="_blank" href="/help/about-anchor/tab1">主播开播教程</a><a class="td"
							target="_blank" href="/help/about-anchor/tab5">小九直播规范</a><a class="td" target="_blank"
							href="/help/about-anchor/tab4">小九直播协议</a><a href="https://obsproject.com/download"
							target="_blank" class="td">直播工具下载</a></div>
				</div>
				<div class="vertical-line"></div>
				<div class="td app">
					<h3>体育APP</h3>
					<div>
						<div class="qrcode footer-down">
							<div id="qrcode" ><canvas width="88" height="88"
									style="display: none;"></canvas><img alt="Scan me!"
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAAXNSR0IArs4c6QAABRpJREFUeF7tndl2wjAMRMn/fzQ9pAQcIvlq5BgOrfpYO17Go9HiNF0ul8v1csLP9dofZlmWxyxb3/Z37RKiY7X9aHyv7zYvtWchuu26AL6B0BDEO/gMyA+AiTXW4BZrbv2iC6RNjbZ7gFgWZM2VweR1/wXw/RQK4EbDR3Xz4wwmE6cFkpxYALXPROf3JOCs50miPMfczm9KRHSBngYXwM+I6W0AE0NJA+nQlTBv60tO+qsYXAALcWBGgwvgNwIc1WjF7JVM7s9LRAFsxJwWm5QogtJMcmKUVX0VgwmMqIlRqqrostVXKfZk5IYONRKHfyRVthZuMdjb4Nb3qwCOsjbCygwAShxMUcxZ849ishZ+ZpQrz9qgwtAZB1QAG0X8tlw4ekCnAHzNKnlndovBtFiKSDJRhpIK0/qy7UsBnIUu9lwBHMMp3SsMMJmokogoIVkv6yONJVRIQjKx8+2Z3bqiElEA67fmq8O1AI6Cma2XUiYYZR4xeJSho88XwM1JUnZJZHKzzmLwL8rTAR6tRpFDGB0/y6CekyQpovZICvHQ4FEACmD7OApgommnXWIwzUOpbPv87GIPrXVrJ1mhcShKoefdKIJ0i06uAH4i2C24e/FwtB7r6TLF2db4xJbooXvjULkzY6Erg7d6MIUpFljZQLwAvqNZDLbT46gE7jR4tABDJmyZmPIMWRC1k8NTLJicqFnsKYCPbI1K2cpU73ZlS5UL4EkAW5eeGXNRTHTrSxrvScgoGaJXWooTdyOmAtj3BKcAHC24ZxwSLVDJlDKspexT0dhs8hW+MiqAjwjQAUqpcgE8AWA6ITIxOhSKTT3HQeNaTnRGKhxx0l2JKICfoRvVy90ooufkCuA3AmyZpVLBotiaTFiRI2VdvX0RwSJxelgiCuD438y3B2O+vpqp91ImRwdEbKF2KiaRQx21MJfNvUyOEgVv0GjBPJtoZCSgAHaqURRyUYZFpUWrneaM1jLcRIMGiBacyQIUBlsSQKwkC/NkhSyEDtWsB9MGqJ3iRCVKoA3SAVMiougtjYVs77065W2UNhh1kv+Cwb1LT/LMZIIkEVF23PoRq5W1jjrhqK6vGlwA+8dMGk/tLsDk5BTmWRpFMTHqGnxehuYka6DaM7XvrMlicAH8/GJJVA5cf1UAH+2JGErtOwZHo4jRMEyKHe8SoEQxGdmiZyL1XpSzAtiHuQCG72USQ6l9OsDtAjKZmFLDpc1aa6E4mxKZbIVOyQTDf8ZVAB+/HuslNzusMi+eRDOhDCvX4Dz4SRtvfErllXVlYnYzDvbkoOclCQhlI5GsyIpJe9GJMmZ2rZTUdG80yAQK4CdCHhZT3uyJZoKKk/EOu5dpKSnxaF/X4c54N60Abq77C+BfG5jG4JkfRaI4mhwr+QBqp0RhNI6m+deIqAA+MpjCPCnRiBbce+HQq4kp1SYlPHrtSwwkC1GcLO3JjSIKYF2De5HLgQQF8AcApgQiems8aqJkwuTESH5on97zFHHsnF/vRoMmmK2BBTB82rAY7Fzbk+mQRJBpKhHJ6Fi95+lK6gwL/si/eSiAg/XYMzVSiTPJydBY2wFHLXXNyODtT4/tUxmseHkCRdkgjVUA3xGgOzWXNYNv/lAiQRaEYVrUsRCrqJ3moTCQnBS1K07M6hsBOvzyX8YxFcDC25UF8BEBicFkrtQulfBO0kgvkSEnR+2WE6QLVK99Sj14dIFRL18An5hKKxZEDKX2UYK04/8A9Lsk4/1A28QAAAAASUVORK5CYII="
									style="display: block;"></div><img class="footer-logo"
								src="data:image/png;base64,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"
								alt="erweim-logo">
						</div>
					</div>
				</div>
				<div class="td follow">
					<h3>关注我们</h3>
					<div>
						<div class="qrcode">
							<div class="lazyload-wrapper "><img
									src="/assets/image/weixinqrcode.14d46257c1e51c37ecc3c0b6768e0399.png" alt="微信公众号"
									width="184" height="184" title="微信公众号"></div>
						</div>
					</div>
				</div>
				<div class="vertical-line"></div>
				<div class="td contact">
					<h3>联系我们</h3>
					<div><a class="td" href="https://tb.53kf.com/code/client/e7a871e88c04be5b1a68ad410516ccaf7/1">申请主播QQ
							： <span>123456</span></a><a class="td"
							href="https://tb.53kf.com/code/client/e7a871e88c04be5b1a68ad410516ccaf7/1">问题反馈QQ
							：<span>123456</span></a><a class="td" href="mailto:123456.com">客服邮箱 ：
							<span>123456.com</span></a></div>
				</div>
			</div>
		</div>
		<div class="horizontal-line"></div>
	<!-- 	<div class="td external-link" style="display: none;">
			<h3>友情链接</h3>
			<div class="link-box"><a href="https://www.dqty.com/anchor/home?type=0" target="_blank"
					class="td">高清直播</a><a href="https://www.dqty.com/score/football" target="_blank"
					class="td">足球比分</a><a href="https://www.dqty.com/score/basketball" target="_blank"
					class="td">篮球比分</a><a href="https://www.dqty.com/anchor/schedule" target="_blank"
					class="td">赛程预告</a><a href="https://www.dqty.com/news?activeId=9999" target="_blank"
					class="td">体育资讯</a><a href="https://www.dqty.com/community/circle-list?circleId=9999"
					target="_blank" class="td">体育社区</a><a href="https://www.dqty.com/database/football/9/1/232894"
					target="_blank" class="td">足球资料库</a><a href="https://www.dqty.com/database/basketball/580/1/234147"
					target="_blank" class="td">篮球资料库</a></div>
		</div> -->
		<div class="foot-copyright">
			<p class="agreement"><a target="_blank" href="/help/contact-us/tab1">关于我们</a>|<a target="_blank"
					href="/help/about-user/tab4">用户协议</a>|<a target="_blank" href="/help/about-user/tab5">隐私政策</a>|</p>
			<p class="copyright"><a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank"
					rel="nofollow">桂ICP备19009876号</a><b>|</b><a href="/help/contact-us/tab3" target="_blank"
					rel="nofollow">桂网文（2019）5333-055号</a><b>|</b><a href="/help/contact-us/tab2" target="_blank"
					rel="nofollow">增值电信业务经营许可证:桂B2-20200107</a></p>
			<ul class="imgs">
				<li><a target="cyxyv" href="https://v.yunaq.com/certificate?domain=www.longya.tv&from=label&code=90020"> <img src="./../../../assets/images/label_sm_90020.png"></a></li>
				<li><a id="_pingansec_bottomimagesmall_shiming" target="_blank" href="//si.trustutn.org/info?sn=113210607040628205301&certType=1"><img src="./../../../assets/images/bottom_small_img.png" /></a></li>
			</ul>
			<p class="right">Copyright @ 2019-2021 体育. ALL Rights Reserved</p>
		</div>
	</div>
</template>

<script>
	export default {
	  // name: 'footer',
	  computed: {
	    key() {
	      return this.$route.path
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
	.main-page-footer .copyright > b {
	  color: #808392;
	}
	.main-page-footer .copyright > a {
	  display: inline-block;
	  margin: 0 10px;
	  color: #808392;
	}
	.main-page-footer .copyright > a:hover {
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
