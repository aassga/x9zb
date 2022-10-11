<template>
	<div id="anchorLiveContainer" class="">
		<div style="width: 100%; padding-top: 56.28%;"></div>
		<!-- 0为开播 2已结束 -->
		<!-- {{danmus}} -->
		<div class="anchor-live-player-no-vedio" v-if="islive != 1 || iserr">
			<div class="layout-anchor-nostart-content">
				<!--  -->
				<div>
					<img src="../../assets/images/live-none.png" style="width: 64px;height: 64px;margin: 0 auto;display: block;">
					<div style="font-size: 20px;text-align: center;color: #666;padding: 10px 0;margin-bottom: 40px;">
						主播暂未开播
					</div>
				</div>
				<div class="live-reserve-box" v-if="JSON.stringify(reserve) !== '{}' && path !== 'main' && path != 'tv'">
					<div class="live-reserve-left">
						<p class="live-reserve-name">下一场直播：{{reserve.title}}</p>
						<p>{{reserve.match_time}}</p>
					</div>
					<div class="live-reserve-right"><span class="live-reserve-host">{{reserve.home_name}}</span><span
							class="live-reserve-vs">VS</span><span
							class="live-reserve-guest">{{reserve.away_name}}</span></div>
				</div>
				<div class="recommd-list">
					<div class="recommd-list-item" v-for="(item,index) in liveList" :key="index" v-if="index<5">
						<div>
							<div :style="{backgroundImage:'url('+item.thumb+')'}">
								<div class="footer">
									<div class="title">{{item.title}}</div>
									<div class="status">直播</div>
								</div>
								
								<a class="mark" @click="setUrl(item)">
								<!-- <router-link class="mark" tag="a" target="_blank"
									:to="'/live?router=live&type='+(item.type==0?'football':'basketball')+'&id='+item.match_id+'&uid=' + item.uid"> -->
									<img
										src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAhFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8g2+bRAAAAK3RSTlMA+g400D/HfWTgWusi9gvx7dSn3alXSy+OGBSQhsG3npZwUAewgUY6bOZHJ9ipHQAAA1lJREFUaN6s1+lysjAUBuCXQNmhQNncl1bbb3L/9/dNTqCZMhoT4PnR6ox6krMkCjPMjW+170WJ4ySR59e32GVYC2t7jz/g9e0KQVh4cPhTziFcFqOtM/5CVreYKy6nCy6isoyK6ZbKGHOEH1yJqqDpcgzyrgmqiCsfIWx9q7q+V2GKB9KwelcV/4aN7ek3K8cmx1N5c/zN12kLY9diXPx+gxc2+3EbxRVmPnsuJQGDARYkXOo/YSD1h+TsGAyx3ZAoP8VLbjK8toOFzh827eKFeyaXf4Gli9xEdodW7Mi+dmHN/ZBLi7Wfz8kXwwzsixNNhLtc/xkzneUe7k83KfMfYLZA1sF90p+yf36wwI/spfThfPlq/Uv34D+auJ0m/9Z16B+cP7J/sJjspSsmtgX1/xqXLM1DMT1bT9RgLlbgUrOfJvcLFy5YxYULf28gj2qPlVA/eoASUoI6rKSjJIVQqC47rGZHHTM54xKG1bDk76lXakZ4wUCXGLR0vzOsiNE3gRZSLZ7ssaq9+Mx6iJaJFtpAJ93CzkY0UsZUjx61r/Y49++wclSdehAPG2h4nNbgwkIj3nKgDDmixLkuP3xQpzCWizI7bOyhChpvfOScNzBVjX3UU7L0AZRsz2CGStuPCU6NApDiksNEOpx4TPyPYBiA/Athgn6hMLhUAvMApLyaFsGVB11gE4D4b2bnUYwbTYFtABoLk0m4yYOosw1AqhQ6HY2OvN5yqwCGY5FTKqlLHdgGUGOhWZtDfRqJ1rYOoHhbPFPQACT0d34AXmkHIaF9lLMDaFdXUvYXBzjoAyxOUfa/WWtJQRiGgiNRKhKr4qa2StEoWu9/QBHBbea9MDQ3KE0y/1XmFxUe8uGJzCEXXdNpnZC5piUPbd+0yD40P1Rszz0IqPCC3WI8gQI7J1zfI0i4dhHOJYAmHAdlLt8wUKaZ9I8bwED6VtkyvRJMsoUSXuGfPzYtjMKLko7Y/S5+18MsHTnxe/t+wxhhF7+kfEd4XCM88p02IIDPgMgtlN4E6m2s3ojrowR9GKKPc/SBlD5S04eC+lgT6ATBrDBaVofj6nhfXVCoKxZ1SaSuudRF3fxVI5AGb1k6pDrqXndhXVPlbh8N1Dh74IcbNU9P9OOZ8vnPBxkKMfzzjMchAAAAAElFTkSuQmCC">
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="video-wrap" style="background: rgb(0, 0, 0);" v-else>
			<div class="dplayer-modal" style="display: none;">
				<div class="detect-login-modal-mask">
					<div class="detect-login-modal">
						<p>当前为高清画质，不登录将降为普通画质</p>
						<p>登录继续畅享 <span>超/高清</span> 画质</p>
						<div>立即登录</div><img
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAFVBMVEUAAADNzc3Pz8/Nzc3Nzc3MzMzMzMwyJg68AAAABnRSTlMAbh68ODebBPCRAAAAgElEQVQoz73SsQ2AIBRFUTTQU1kzhTUjsAIxefuPYAFykYTQQeOTf4gI3+wcNpDPVMOdmbye8nSS/+YOKZYVUm5QCi35CqkTKZOp8gKEAqHAngI7CoRKQCgQChwml8v50HJLbH71mxzICKHTQyZDx4ubX7H9N0Oat41xfYNFs3G8oTE3QbJKVHkAAAAASUVORK5CYII="
							alt="x">
					</div>
				</div>
			</div>
			<!-- dplayer dplayer-live dplayer-playing -->
			<div id="dplayer" style="right: 0px; top: 0;" class="dplayer dplayer-live dplayer-playing">
				<div id="" style="height: 100px;width: 100%;position: absolute;top: 10px;z-index: 99;" :style="{opacity:danmakuSystem.opacity / 100}"  v-if="danmakuSystem.show">
					<vue-danmaku ref="danmaku" class="demo" :danmus="danmus" v-bind="config" :style="{fontSize:danmakuSystem.size == 1?'10px':danmakuSystem.size == 2?'20px':'30px'}">
						<!-- 容器slot :style="{height:danmakuSystem == 1?'20%':danmakuSystem == 2?'50%':'100%'}"-->
						<div :style="{height:danmakuSystem.area == 3?'10vh':danmakuSystem.area == 2?'30vh':'60vh'}"></div>
						<!-- 弹幕slot -->
						<template v-slot:dm="{ index, danmu }" >
							<div class="danmu-item xuan-bg">
								<span>{{danmu.messageForShow}}</span>
							</div>
						</template>
					</vue-danmaku>
				</div>
				<video-player v-if="islive == 1" class="video-player vjs-custom-skin" :playsinline="true" width="100%"
					height="100%" ref="videoPlayer" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)"
					@statechanged="playerStateChanged($event)" @ready="playerReadied($event)"
					style="position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 19;"
					:options="playerOptions || {}">
					<!-- :options="info.pull | videoOption"> -->
				</video-player>
				<!-- <router-link v-if="path == 'main'" style="z-index: 99;" class="anchor-home-page-top-play-area-enter-button" :to="setUrl(info)" tag="a" target="_blank">
					
				</router-link> -->
				<a  v-if="path == 'main'&&info" style="z-index: 99;" class="anchor-home-page-top-play-area-enter-button" @click="setUrl(info)">
					进入直播间
				</a>
				<div style="z-index: 999;width: 100%;height: 100%;">
					<div class="dplayer-mask"></div>
					<div class="dplayer-video-wrap " style="background-image:url();width: 100%;height: 100%">
						<div class="dplayer-videomuted-warp flex" v-if="value1 == 0  && path != 'tv'"  style=";z-index: 9999;display: flex;">
							<div class="dplayer-videomuted-horn"></div>
							<div class="dplayer-videomuted-text" @click.stop="value1 = 80">点击取消静音</div>
						</div>
						<div class="dplayer-danmaku">

						</div>
					</div>
					<div class="dplayer-controller-mask" style="z-index: 99;"></div>
					<div class="dplayer-controller" style="z-index: 99;">

						<div class="dplayer-icons dplayer-icons-left flex-start">
							<!-- 播放 -->
							<button class="dplayer-icon dplayer-play-icon" @click="playVideo(false)">
								<span class="dplayer-icon-content">
									<svg v-if="play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
										<path fill="#FFF"
											d="M13 0c-.91.022-1.644.777-1.667 1.715v12.572c.003.949.752 1.716 1.672 1.713.917-.003 1.659-.768 1.662-1.713V1.714C14.643.776 13.91.022 13 0zM3 0c-.91.022-1.644.776-1.667 1.714v12.569C1.333 15.23 2.08 16 3 16s1.667-.769 1.667-1.717V1.713C4.642.776 3.909.023 3 0z">
										</path>
									</svg>
									<svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
										<g fill="#FFF">
											<path d="M0.142 1.538L0.142 13.8 9.338 7.669z"
												transform="translate(2.667 .667)"></path>
											<path d="M0.908 1.538L0.908 13.8 10.105 7.669z"
												transform="translate(2.667 .667)"></path>
											<path d="M2.494 0.242L2.494 12.497 11.768 6.427z"
												transform="translate(2.667 .667)"></path>
											<path
												d="M2.517 2.84l-.023 12.255 9.22-6.124-9.197-6.13zM.142 1.538c-.003.846.681 1.534 1.528 1.537.846.003 1.535-.681 1.537-1.528v-.01C3.21.692 2.526.004 1.68 0 .833-.003.144.681.142 1.528v.01z"
												transform="translate(2.667 .667)"></path>
											<path
												d="M10.871 6.136c-.843 0-1.533.69-1.533 1.533s.69 1.502 1.533 1.532c.866.031 1.54-.674 1.533-1.532-.008-.843-.69-1.533-1.533-1.533zm-9.197 6.13c-.843 0-1.532.69-1.532 1.534 0 .843.69 1.502 1.532 1.532.805.031 1.51-.674 1.533-1.532.023-.843-.69-1.533-1.533-1.533z"
												transform="translate(2.667 .667)"></path>
										</g>
									</svg>
								</span>
							</button>
							<!-- 重载 -->
							<div class="dplayer-icon dplayer-retry-icon" @click="doRest()" aria-label="重新加载"
								data-balloon="重新加载" data-balloon-pos="up">
								<span class="dplayer-icon-content"><svg xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 16 16">
										<path fill="#FFF"
											d="M13.46 2.404C12.01.867 9.99-.003 7.877 0 3.54 0 0 3.606 0 8c0 4.416 3.54 8 7.877 8 3.268 0 6.74-1.826 7.489-5.55.068-.346-.204-.53-.476-.53h-1.612c-.34 0-.634.322-.658.554 0 .046 0 .07-.022.07-.727 2.172-2.385 2.704-4.721 2.704-2.838 0-5.153-2.358-5.153-5.248S5.04 2.774 7.877 2.774c1.428 0 2.7.6 3.676 1.572L9.305 6.612c-.02 0-.02.024-.044.024-.454.508-.272.856.25.856h5.67c.501 0 .819-.348.819-.856V.764c-.02-.44-.316-.604-.816-.21l-1.724 1.85z">
										</path>
									</svg></span>
							</div>
							<!-- 进度 -->
							<span class="dplayer-time">
								<span class="dplayer-ptime">{{time}}</span> /
								<span class="dplayer-dtime">0:00</span>
							</span>
							<!---->
							<!--<span class="dplayer-live-badge"><span class="dplayer-live-dot" style="background: #d8ad66;"></span>直播</span>-->
							<!---->
						</div>
						<!-- 设置画质 -->
						<div class="dplayer-icons dplayer-icons-right">
							<div class="dplayer-volume">
								<button class="dplayer-icon dplayer-volume-icon">
									<span class="dplayer-icon-content"><svg xmlns="http://www.w3.org/2000/svg"
											version="1.1" viewBox="0 0 21 32">
											<path
												d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z">
											</path>
										</svg></span>
								</button>
								<div class="dplayer-volume-bar-wrap" data-balloon-pos="up">
									<div class="dplayer-volume-bar">
										<!-- <input type="text" id="VolumeSlider" style=""> -->
										<div class="rs-container" style="width: 60px;position: relative;">
											<el-slider class="slider" :input-size="size" v-model="value1"></el-slider>
										</div>
									</div>
								</div>
							</div>
							<!-- 设置清晰度 -->
							<div class="dplayer-quality" v-if="path != 'main' && path != 'tv'">
								<button class="dplayer-icon dplayer-quality-icon">{{quality[qualityIndex]}}</button>
								<div class="dplayer-quality-mask">
									<div class="dplayer-quality-list">
										<div class="dplayer-quality-item" v-for="(item,index) in quality"
											@click="qualityIndex = index" :data-index="index" :key="index">{{item}}
										</div>
									</div>
								</div>
							</div>
							<!-- 设置弹幕 -->
							<div class="dplayer-danmaku-controller" v-if="path != 'main' && path != 'tv'">
								<button class="dplayer-icon dplayer-danmaku-controller-icon dplayer-danmaku-controller-icon-hover"
									:class="danmakuSystem.show?'active':''" @click="setdanmakuShow('show','')"></button>
								<div class="dplayer-danmaku-controller-pop" style="opacity: 0.8; display: none;">
									<div class="dplayer-operator-item">
										<div class="title">弹幕区域</div>
										<div class="dplayer-operator-panel">
											<div class="dplayer-full-screen screen-mode" :class="danmakuSystem.area == 1?'active':''" @click="setdanmakuShow('area',1)">
												<div class="icon"></div>
												<div class="text">全屏</div>
											</div>
											<div class="dplayer-half-screen screen-mode" :class="danmakuSystem.area == 2?'active':''" @click="setdanmakuShow('area',2)">
												<div class="icon"></div>
												<div class="text">半屏</div>
											</div>
											<div class="dplayer-top-screen screen-mode" :class="danmakuSystem.area == 3?'active':''" @click="setdanmakuShow('area',3)">
												<div class="icon"></div>
												<div class="text">上方</div>
											</div>
										</div>
									</div>
									<div class="dplayer-font-size-choose dplayer-operator-item">
										<div class="title">弹幕字号</div>
										<div class="dplayer-operator-panel ">
											<div class="dplayer-font-size-small checkbox-item danmaku-fontsize" :class="danmakuSystem.size == 1?'active':''" @click="setdanmakuShow('size',1)">
												<div class="checkbox checked"></div>
												<label>小</label>
											</div>
											<div class="dplayer-font-size-medium checkbox-item danmaku-fontsize" :class="danmakuSystem.size == 2?'active':''" @click="setdanmakuShow('size',2)">
												<div class="checkbox"></div>
												<label>中</label>
											</div>
											<div class="dplayer-font-size-large checkbox-item danmaku-fontsize" :class="danmakuSystem.size == 3?'active':''" @click="setdanmakuShow('size',3)">
												<div class="checkbox"></div>
												<label>大</label>
											</div>
										</div>
									</div>
									<div class="dplayer-transparency-choose dplayer-operator-item">
										<div class="title">弹幕透明度</div>
										<div class="dplayer-operator-panel" style="justify-content: space-between">
											<div style="position:relative;width: 100%;">
												<el-slider class="slider" :input-size="size" v-model="$store.state.danmakuSystem.opacity"></el-slider>
											</div>
											<label id="dplayer-danmaku-trans-percent">{{danmakuSystem.opacity}}%</label>
										</div>
									</div>
								</div>
							</div>

							<div class="dplayer-setting" style="display:none">
								<button class="dplayer-icon dplayer-setting-icon" aria-label="设置" data-balloon="设置"
									data-balloon-pos="up">
									<span class="dplayer-icon-content"><svg xmlns="http://www.w3.org/2000/svg"
											version="1.1" viewBox="0 0 32 28">
											<path
												d="M28.633 17.104c0.035 0.21 0.026 0.463-0.026 0.76s-0.14 0.598-0.262 0.904c-0.122 0.306-0.271 0.581-0.445 0.825s-0.367 0.419-0.576 0.524c-0.209 0.105-0.393 0.157-0.55 0.157s-0.332-0.035-0.524-0.105c-0.175-0.052-0.393-0.1-0.655-0.144s-0.528-0.052-0.799-0.026c-0.271 0.026-0.541 0.083-0.812 0.17s-0.502 0.236-0.694 0.445c-0.419 0.437-0.664 0.934-0.734 1.493s0.009 1.092 0.236 1.598c0.175 0.349 0.148 0.699-0.079 1.048-0.105 0.14-0.271 0.284-0.498 0.432s-0.476 0.284-0.747 0.406-0.555 0.218-0.851 0.288c-0.297 0.070-0.559 0.105-0.786 0.105-0.157 0-0.306-0.061-0.445-0.183s-0.236-0.253-0.288-0.393h-0.026c-0.192-0.541-0.52-1.009-0.982-1.402s-1-0.589-1.611-0.589c-0.594 0-1.131 0.197-1.611 0.589s-0.816 0.851-1.009 1.375c-0.087 0.21-0.218 0.362-0.393 0.458s-0.367 0.144-0.576 0.144c-0.244 0-0.52-0.044-0.825-0.131s-0.611-0.197-0.917-0.327c-0.306-0.131-0.581-0.284-0.825-0.458s-0.428-0.349-0.55-0.524c-0.087-0.122-0.135-0.266-0.144-0.432s0.057-0.397 0.197-0.694c0.192-0.402 0.266-0.86 0.223-1.375s-0.266-0.991-0.668-1.428c-0.244-0.262-0.541-0.432-0.891-0.511s-0.681-0.109-0.995-0.092c-0.367 0.017-0.742 0.087-1.127 0.21-0.244 0.070-0.489 0.052-0.734-0.052-0.192-0.070-0.371-0.231-0.537-0.485s-0.314-0.533-0.445-0.838c-0.131-0.306-0.231-0.62-0.301-0.943s-0.087-0.59-0.052-0.799c0.052-0.384 0.227-0.629 0.524-0.734 0.524-0.21 0.995-0.555 1.415-1.035s0.629-1.017 0.629-1.611c0-0.611-0.21-1.144-0.629-1.598s-0.891-0.786-1.415-0.996c-0.157-0.052-0.288-0.179-0.393-0.38s-0.157-0.406-0.157-0.616c0-0.227 0.035-0.48 0.105-0.76s0.162-0.55 0.275-0.812 0.244-0.502 0.393-0.72c0.148-0.218 0.31-0.38 0.485-0.485 0.14-0.087 0.275-0.122 0.406-0.105s0.275 0.052 0.432 0.105c0.524 0.21 1.070 0.275 1.637 0.197s1.070-0.327 1.506-0.747c0.21-0.209 0.362-0.467 0.458-0.773s0.157-0.607 0.183-0.904c0.026-0.297 0.026-0.568 0-0.812s-0.048-0.419-0.065-0.524c-0.035-0.105-0.066-0.227-0.092-0.367s-0.013-0.262 0.039-0.367c0.105-0.244 0.293-0.458 0.563-0.642s0.563-0.336 0.878-0.458c0.314-0.122 0.62-0.214 0.917-0.275s0.533-0.092 0.707-0.092c0.227 0 0.406 0.074 0.537 0.223s0.223 0.301 0.275 0.458c0.192 0.471 0.507 0.886 0.943 1.244s0.952 0.537 1.546 0.537c0.611 0 1.153-0.17 1.624-0.511s0.803-0.773 0.996-1.297c0.070-0.14 0.179-0.284 0.327-0.432s0.301-0.223 0.458-0.223c0.244 0 0.511 0.035 0.799 0.105s0.572 0.166 0.851 0.288c0.279 0.122 0.537 0.279 0.773 0.472s0.423 0.402 0.563 0.629c0.087 0.14 0.113 0.293 0.079 0.458s-0.070 0.284-0.105 0.354c-0.227 0.506-0.297 1.039-0.21 1.598s0.341 1.048 0.76 1.467c0.419 0.419 0.934 0.651 1.546 0.694s1.179-0.057 1.703-0.301c0.14-0.087 0.31-0.122 0.511-0.105s0.371 0.096 0.511 0.236c0.262 0.244 0.493 0.616 0.694 1.113s0.336 1 0.406 1.506c0.035 0.297-0.013 0.528-0.144 0.694s-0.266 0.275-0.406 0.327c-0.542 0.192-1.004 0.528-1.388 1.009s-0.576 1.026-0.576 1.637c0 0.594 0.162 1.113 0.485 1.559s0.747 0.764 1.27 0.956c0.122 0.070 0.227 0.14 0.314 0.21 0.192 0.157 0.323 0.358 0.393 0.602v0zM16.451 19.462c0.786 0 1.528-0.149 2.227-0.445s1.305-0.707 1.821-1.231c0.515-0.524 0.921-1.131 1.218-1.821s0.445-1.428 0.445-2.214c0-0.786-0.148-1.524-0.445-2.214s-0.703-1.292-1.218-1.808c-0.515-0.515-1.122-0.921-1.821-1.218s-1.441-0.445-2.227-0.445c-0.786 0-1.524 0.148-2.214 0.445s-1.292 0.703-1.808 1.218c-0.515 0.515-0.921 1.118-1.218 1.808s-0.445 1.428-0.445 2.214c0 0.786 0.149 1.524 0.445 2.214s0.703 1.297 1.218 1.821c0.515 0.524 1.118 0.934 1.808 1.231s1.428 0.445 2.214 0.445v0z">
											</path>
										</svg></span>
								</button>

								<div class="dplayer-setting-box">
									<div class="dplayer-setting-origin-panel">
										<div class="dplayer-setting-item dplayer-setting-speed">
											<span class="dplayer-label">速度</span>
											<div class="dplayer-toggle"><svg xmlns="http://www.w3.org/2000/svg"
													version="1.1" viewBox="0 0 32 32">
													<path
														d="M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z">
													</path>
												</svg></div>
										</div>
										<div class="dplayer-setting-item dplayer-setting-loop">
											<span class="dplayer-label">洗脑循环</span>
											<div class="dplayer-toggle">
												<input class="dplayer-toggle-setting-input" type="checkbox"
													name="dplayer-toggle">
												<label for="dplayer-toggle"></label>
											</div>
										</div>
										<div class="dplayer-setting-item dplayer-setting-showdan">
											<span class="dplayer-label">显示弹幕</span>
											<div class="dplayer-toggle">
												<input class="dplayer-showdan-setting-input" type="checkbox"
													name="dplayer-toggle-dan">
												<label for="dplayer-toggle-dan"></label>
											</div>
										</div>
										<div class="dplayer-setting-item dplayer-setting-danmaku">
											<span class="dplayer-label">弹幕透明度</span>
											<div class="dplayer-danmaku-bar-wrap">
												<div class="dplayer-danmaku-bar">
													<div class="dplayer-danmaku-bar-inner">
														<span class="dplayer-thumb"></span>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="dplayer-setting-speed-panel">
										<div class="dplayer-setting-speed-item" data-speed="0.5">
											<span class="dplayer-label">0.5</span>
										</div>
										<div class="dplayer-setting-speed-item" data-speed="0.75">
											<span class="dplayer-label">0.75</span>
										</div>
										<div class="dplayer-setting-speed-item" data-speed="1">
											<span class="dplayer-label">正常</span>
										</div>
										<div class="dplayer-setting-speed-item" data-speed="1.25">
											<span class="dplayer-label">1.25</span>
										</div>
										<div class="dplayer-setting-speed-item" data-speed="1.5">
											<span class="dplayer-label">1.5</span>
										</div>
										<div class="dplayer-setting-speed-item" data-speed="2">
											<span class="dplayer-label">2</span>
										</div>
									</div>
								</div>
							</div>
							<div class="dplayer-full">
								<button @click="fullScreenHandle()" class="dplayer-icon dplayer-full-icon" id="fullSpan"
									aria-label="全屏" data-balloon="全屏" data-balloon-pos="up"
									style="display: inline-block;">
									<span class="dplayer-icon-content"><svg xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 16 16">
											<path fill="#FFF"
												d="M1.973 5.263H0V1.316C0 .59.589 0 1.315 0h3.948v1.977H2.971c-.306.025-.542.12-.708.286-.166.165-.262.401-.29.708v2.292zm11.845 0h1.973V1.316C15.791.59 15.203 0 14.476 0h-3.948v1.977h2.292c.306.025.542.12.708.286.166.165.263.401.29.708v2.292zM1.973 10.535H0v3.948c0 .726.589 1.316 1.315 1.316h3.948v-1.977H2.971c-.306-.026-.542-.121-.708-.286-.166-.167-.262-.402-.29-.708v-2.293zm11.873.039h1.973v3.947c0 .727-.59 1.316-1.315 1.316h-3.948V13.86h2.292c.306-.025.542-.12.708-.286.166-.165.262-.402.29-.708v-2.292z">
											</path>
										</svg></span>
								</button>
								<button class="dplayer-icon dplayer-full-icon" id="fullWebSpan" aria-label="退出全屏"
									data-balloon="退出全屏" data-balloon-pos="up" style="display: none;">
									<span class="dplayer-icon-content"><svg xmlns="http://www.w3.org/2000/svg"
											version="1.1" viewBox="0 0 32 33">
											<path
												d="M24.965 24.38h-18.132c-1.366 0-2.478-1.113-2.478-2.478v-11.806c0-1.364 1.111-2.478 2.478-2.478h18.132c1.366 0 2.478 1.113 2.478 2.478v11.806c0 1.364-1.11 2.478-2.478 2.478zM6.833 10.097v11.806h18.134l-0.002-11.806h-18.132zM2.478 28.928h5.952c0.684 0 1.238-0.554 1.238-1.239 0-0.684-0.554-1.238-1.238-1.238h-5.952v-5.802c0-0.684-0.554-1.239-1.238-1.239s-1.239 0.556-1.239 1.239v5.802c0 1.365 1.111 2.478 2.478 2.478zM30.761 19.412c-0.684 0-1.238 0.554-1.238 1.238v5.801h-5.951c-0.686 0-1.239 0.554-1.239 1.238 0 0.686 0.554 1.239 1.239 1.239h5.951c1.366 0 2.478-1.111 2.478-2.478v-5.801c0-0.683-0.554-1.238-1.239-1.238zM0 5.55v5.802c0 0.683 0.554 1.238 1.238 1.238s1.238-0.555 1.238-1.238v-5.802h5.952c0.684 0 1.238-0.554 1.238-1.238s-0.554-1.238-1.238-1.238h-5.951c-1.366-0.001-2.478 1.111-2.478 2.476zM32 11.35v-5.801c0-1.365-1.11-2.478-2.478-2.478h-5.951c-0.686 0-1.239 0.554-1.239 1.238s0.554 1.238 1.239 1.238h5.951v5.801c0 0.683 0.554 1.237 1.238 1.237 0.686 0.002 1.239-0.553 1.239-1.236z">
											</path>
										</svg></span>
								</button>
							</div>
						</div>
						<div class="dplayer-bar-wrap">
							<div class="dplayer-bar-time hidden">00:00</div>
							<div class="dplayer-bar-preview"></div>
							<div class="dplayer-bar">
								<div class="dplayer-loaded" style="width: 0%;"></div>
								<div class="dplayer-played" style="width: 0%; background: rgb(216, 173, 102);">
									<span class="dplayer-thumb" style="background: #d8ad66"></span>
								</div>
							</div>
						</div>
					</div>

					<div class="dplayer-menu">

						<div class="dplayer-menu-item">
							<a href="javascript:void(0);">视频统计信息</a>
						</div>

					</div>
					<div class="dplayer-notice" style="opacity: 0;">音量 0%</div>
				</div>
    <el-image class="video_bottom_logo" :src="require('@/assets/images/logo.png')" alt="" srcset="" />

			</div>

		</div>
		<!-- 只是为了触发 -->
		<!-- {{item}} -->
	</div>
</template>

<script>
	import "videojs-contrib-hls"
	import vueDanmaku from "../../components/vue-danmaku.vue"
	import {getLiveList} from '../../api/user.js'
	import {
		mapState
	} from 'vuex'
	import {
		getInfo
	} from "@/api/basketball.js";
	export default {
		components: {
			vueDanmaku
		},
		props: {
			islive: {
				type: Number,
				default: 0,

			},
			reserve: {
				type: Object | Array,
				default: {},
			},
			// liveList: {
			// 	type: Array,
			// 	default: [],
			// },
			info: {
				type: Object,
				default: {},
			},
			path:{
				type: String,
				default: "",
			}
		},
		data() {
			return {
				iserr:false,
				danmus: [],
				config: {
					channels: 3, // 轨道数量，为0则弹幕轨道数会撑满容器
					useSlot: true, // 是否开启slot
					loop: false, // 是否开启弹幕循环
					speeds: 50, // 弹幕速度，实际为每秒弹幕走过的像素距离
					fontSize: 20, // 文本模式下的字号
					top: 10, // 弹幕轨道间的垂直间距
					right: 0, // 同一轨道弹幕的水平间距
					debounce: 100, // 弹幕刷新频率（多少毫秒插入一条弹幕，建议不小于50）
				},
				msg: '',
				size: '',
				value1: 0,
				qualityIndex: 3,
				quality: [],
				danActive: false, //弹幕切换状态
				// 'http://kbs-dokdo.gscdn.com/dokdo_300/_definst_/dokdo_300.stream/playlist.m3u8' 测试地址
				time: '', //已播放时常
				play: true, //视频播放状态
				ishowMask: false ,//无用
				liveList:[],
			}
		},
		created(){
			// console.log(888888888888888888888888888)
			let query = this.$route.query;
			this.query = {
				...this.query,
				...query
			};
			this.getDetail(query.type, query.id);
		},
		computed: {
			danmakuSystem(){//弹幕配置
			
				let system = this.$store.state.danmakuSystem
				
				
				this.config.channels = system == 3?3:system == 2?6:10
				return this.$store.state.danmakuSystem
			},
			// ...mapState(['messageList']),
			item() {
				
				
				// list.forEach(item => {
				// 	item = item.messageForShow
				// })
				// return messageList
			},
			infos(){
				return this.$store.state.infos
			},
			playerOptions() { // 使用计算属性
				//如果info为空则已结束
				if (JSON.stringify(this.info) == "{}") return
				console.log(this.info)
				const playerOptionsObj = {
					live: false,
					muted:true,
					preload: "auto",
					autoplay: true,
					language: "zh-CN",
					aspectRatio: "16:9",
					fluid: true,
					sources: [{
						src: this.info.pull||this.info.pushurl1,//'http://yun-live.oss-cn-shanghai.aliyuncs.com/record/yunlive/record/yunlive/meeting_1070/2020-11-25-09-27-59_2020-11-25-09-35-52.m3u8'//this.info.pull//'http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8' //url地址 ||this.info.pull
					}],
					loop: true,
					playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
					poster: this.info.thumb,
					notSupportedMessage: '未开播', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
					controlBar: {
						timeDivider: true,
						durationDisplay: true,
						remainingTimeDisplay: true,
						fullscreenToggle: true //全屏按钮
					},
					flash: {
						hls: {
							withCredentials: false
						}
					}
				}
				// console.log(this.info)
				return playerOptionsObj
			}

		},
		watch: {
			info(e){
				this.iserr = false
				// console.log(e+'0000000000000000000');
			},
			// 设置视频的音量0-1
			value1(e) {
				let video = this.$refs.videoPlayer.player
				video.volume(e / 100)
				video.muted(false)
			},
			'$store.state.item'(e) {
				let list = this.$store.state.item
				if(this.$refs.danmaku == null) return
				console.log(list);
				this.$refs.danmaku.push(list)
			},
			qualityIndex(e){//切换画质
			
				if(JSON.stringify(this.infos) == '{}'){//判断是否为空 判断是否登录
					return this.$store.state.user.showLoginMask = true
				}
				if(JSON.stringify(this.info.clarity) !== '{}'){//判断是否为空
					if(e == 0){
						this.doRest(this.info.pull)
					}else if(e == 2){
						this.doRest(this.info.clarity.smooth)
					}else if(e == 1){
						this.doRest(this.info.clarity.sd)
					}else if(e == 0){
						this.doRest(this.info.clarity.hd)
					}
				}
			}
		},
		mounted() {
			// 监听是否有直播
			// console.log(
			// 'islive:',this.islive,
			// 'reserve:',this.reserve,
			// 'liveList:',this.liveList,
			// 'info:',this.info,
			// 'path:',this.path
			// )
			// if(JSON.stringify(this.info) == "{}")
			this.$nextTick(res=>{
				if(JSON.stringify(this.info.clarity) == '{}'){
					this.quality = ['原画']
				}else{
					this.quality = ['高清', '标清', '流畅','原画']
				}
				
			})
			
			
		},
		methods: {
			getDetail(type, id) {
				// console.log(22222222222222222222222222222)
				let data = {
					id: id,
				};
				if (type == "basketball") {
					//篮球
					getInfo(data)
						.then((res) => {
							this.info = res.data.info;	
							// console.log(this.info)
						})
						.catch((res) => {});
				}
			},
			// 开关弹幕
			setdanmakuShow(type,value){
				if(type == 'show'){
					this.$store.state.danmakuSystem.show = !this.$store.state.danmakuSystem.show
				}else if(type == 'area'){
					this.$store.state.danmakuSystem.area = value
				}else if(type == 'size'){
					this.$store.state.danmakuSystem.size = value
				}
			},
			
			// 获取相关直播
			getLiveList() {
				let data = {
					page: 1,
					type: -1, //-1全部 0足球 1篮球 2其他
					isweb: 1
				}
				getLiveList(data).then(res => {
					res.data.data.filter(res=>{
						return this.info.uid  != res.uid
					})
					this.liveList = res.data.data
					// res.data.data.forEach(item=>{
					// 	if(this.info.uid  === item.uid) return
					// 	this.liveList.push(item)
					// })
				}).catch(res => {})
			},
			// 设置首页播放的按钮
			setUrl(item){
				// localStorage.setItem('index',2)
				let url = '/live?router=live&type='+(item.type==0?'football':'basketball')+'&id='+item.match_id+'&uid=' + item.uid+'&vid=' + item.vid
				// return url
				// localStorage.setItem('index', type)
				// this.$router.push('/schedule')
				// console.log(url,type);
				// return
				let routeData = this.$router.resolve({ path:url})
				window.open(routeData.href,'_blank')
			},
			
			
			// 移入
			mouseover(e) {
				this.ishowMask = true
			},
			// 移出
			mouseleave(e) {
				this.ishowMask = false
			},
			// 播放
			playVideo() {
				let video = this.$refs.videoPlayer.player
				if (this.play) {
					video.pause()
				} else {
					video.play()
				}
			},
			// listen event
			onPlayerPlay(player) {
				
				this.play = true
				this.value1 = 0
				// let video = this.$refs.videoPlayer.player
				// video.muted(false)
				console.log('player play!-----------------------------------------', player.el_.innerText)
			},
			onPlayerPause(player) {
				this.play = false
				console.log('player pause!', player)
			},
			// 全屏按钮
			fullScreenHandle() {
				let myPlayer = this.$refs.videoPlayer.player
				if (!myPlayer.isFullscreen()) {
					myPlayer.requestFullscreen()
				} else {
					myPlayer.exitFullscreen()
				}
			},
			// ...player event

			// or listen state event 播放进度
			playerStateChanged(playerCurrentState) {
				// console.log(playerCurrentState);
				if (playerCurrentState.timeupdate == undefined) {
					return
				}
				this.time = this.secondsFormat(playerCurrentState.timeupdate)
				// console.log('player current update state', this.time)
			},
			// 重置视频
			doRest(url) {
				console.log('重置视频');
				// let video = this.$refs.videoPlayer.player
				// video.src(this.url)
				// let url = this.info.pull
				let video = this.$refs.videoPlayer.player
				video.pause()
				// console.log(video);
				video.src({src:url})
				video.load({src:url})
				video.play()	
				// require(`src`)
			},

			// player is ready
			playerReadied(player) {
				// code == 4无法播放 监听如果视频播放失败时需要请求直播列表
				// console.log('the player is readied--------------------------------------', player)
				// return
				setTimeout(res=>{
					if (player.error_ == null) {
						return
					}else{
						// console.log(player.error_,'**************************')
						this.iserr = true
						this.getLiveList()
					}
					
				},1000) 
				// debugger
				

				// you can use it to do something...
				// player.[methods]
			},
			secondsFormat(s) {
				var day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整 
				var hour = Math.floor((s - day * 24 * 3600) / 3600).toString().padStart(2, '0');
				var minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60).toString().padStart(2, '0');
				var second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
				return hour + ":" + minute + ":" + second.toFixed(0);
			},
			plays(type) {
				switch (type) {
					case 'play':
						this.$refs.danmaku.play()
						break
					case 'pause':
						this.$refs.danmaku.pause()
						break
					case 'stop':
						this.$refs.danmaku.stop()
						break
					case 'show':
						this.$refs.danmaku.show()
						break
					case 'hide':
						this.$refs.danmaku.hide()
						break
					case 'reset':
						this.$refs.danmaku.reset()
						break
					default:
						break
				}
			},
		}
	}
</script>

<style>
	.video-js .vjs-icon-placeholder {

		width: 100%;

		height: 100%;

		display: block;

	}

	.video-js .vjs-big-play-button {
		width: 72px;
		height: 72px;
		border-radius: 100%;
		z-index: 100;
		display: none !important;
		background-color: #ffffff;
		border: solid 1px #979797;
	}

	.video-js .vjs-control-bar {
		display: none;
	}

	#dplayer {
		position: relative;
	}

	#dplayer .video_bottom_logo{
		z-index: 99;
		  position: absolute;
  left: 20px;
  bottom: 30px;
  width: 120px;
	}

	.slider {
		position: absolute;
		top: -15px;
		left: -5px;
		right: 0;
		transform: scale(.9);
	}

	.el-slider__button {
		width: 10px;
		height: 10px;
	}
	.vjs-loading-spinner {
		border-radius: 50% !important;
	}
	.laba-bg {
		color: white;
		height: 40px;
		padding: 0 40px;
		line-height: 40px;
		border-image: url('../../assets/images/notice.png') 0 148 0 146 fill / 1px 100px stretch;
	}
	.xuan-bg {
		color: white;
		height: 40px;
		padding: 0 40px;
		line-height: 40px;
		/* border-image: url('../../assets/images/living_xcdm_vip1.png') 0 148 0 146 fill / 1px 100px stretch; */
	}
	/* .live-foot {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 40px;
		z-index: 99;
		background-color: rgba(255,255,255,0.3);
	} */
	.vjs-modal-dialog-content {
		/* opacity: 0 !important; */
		display: none !important;
	}
</style>
