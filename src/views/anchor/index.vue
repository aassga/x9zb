<!-- 直播 -->
<template>
	<div class="anchor-page-content-wrap">
		<div class="anchor-grid">
			<div class="anchor-grid-live-match" v-if="type==0 && AllMatchlist.length!=0">
				<div class="live-match-grid" style="width: 90%;">
					<div class="swiper swiper-container" style="">
						<swiper ref="mySwiper" :options="swiperOptions" style="width: 100%;height: 100%;">
							<swiper-slide v-for="(item,index) in AllMatchlist" :key="index" style="position: relative;padding-bottom: 0;">
								<div class="live-match-grid-item" style="height: 100%;width: 100%;">
									<img src="../../assets/images/main-mask.png" alt="">
									<div class="match-card" style="width: 100%;">
										<div>
											<div class="match-card-header" style="">
												<div style="width: 110px;">{{item.competition}}</div>
												<div class="match-card-header-icons">
													<!-- 是否已预约 -->
													<div class="match-card-reservation" v-if="item.status_id == 1&& item.reserve == 0"
														@click="getReserveMatch(item)"></div>
													<div class="match-card-reservation-already"
														@click="getReserveMatch(item)" v-if="item.reserve != 0"></div>
													<div class="match-card-header-img flex-start" v-if="item.anchor.length != 0 && AllMatchlist[0].anchor[0].avatar !== undefined ">
														<img :src="item.anchor[0].avatar"/>
													</div>
												</div>
											</div>
											<div class="match-card-header-text">
												<div class="text1">{{item.status_type == 1?'进行中':item.status_type == 2?'已结束':item.match_time}}</div>
											</div>
										</div>
										<div class="match-card-content">
											<div class="match-card-mask">
												<router-link tag="a" target="_blank" class="grid-header-right-more" :to="item.anchor.length === 0?'/score-live?type='+(item.type == 0?'football':item.type == 1?'basketball':item.type)+'&id='+item.sourceid+ '&vid=' + item.vid :'/live?router=live&type='+item.type+'&id='+item.sourceid + '&uid=' + item.anchor[0].id + '&vid=' + item.vid ">
													进入直播间
												</router-link>
											</div>
											<div class="match-card-content-row">
												<div class="team-logo-1"><img
														:src="item.home_team_logo?item.home_team_logo:require('../../assets/images/team.png')"
														alt="" width="64" height="64" title=""></div>
												<div class="team-name-1 ellipsis">{{item.home_team_name}}
												</div>
												<div class="team-score-1">{{item.home_scores}}</div>
											</div>
											<div class="match-card-content-row">
												<div class="team-logo-1"><img
														:src="item.away_team_logo?item.away_team_logo:require('../../assets/images/team.png')"
														alt="" width="64" height="64" title=""></div>
												<div class="team-name-1 ellipsis">{{item.away_team_name}}
												</div>
												<div class="team-score-1">{{item.away_scores}}</div>
											</div>
										</div>
									</div>
								</div>

							</swiper-slide>
							<!-- <div class="swiper-pagination" slot="pagination"></div> -->
						</swiper>
					</div>
					<aside class="live-match-grid-prev live-match-grid-aside" @click="prev()"></aside>
					<aside class="live-match-grid-next live-match-grid-aside" @click="next()"></aside>
					<div class="live-match-grid-saicheng"  style="width: 83px;top: 8px;bottom: auto;" @click="$router.push('./schedule?type=4')">
						<div class="live-match-grid-saicheng-img"></div>
						<div>全部赛程</div>
					</div>
				</div>
			</div>
			<div class="grid-header">
				<div class="grid-header-left"><img class="grid-header-left-icon"
						src="../../assets/images/main-hot-titme.png" alt="">
					<div class="grid-header-left-text">{{type==0?'全部直播':type==1?'足球':type==2?'篮球':(type==4?'电竞':'其它')}}</div>
				</div>
			</div>
			<div class="anchor-card-outter-box" style="min-height: 600px;">
				<div class="anchor-card-wrap" v-for="(item,index) in list" :key="index">
					<!-- <router-link tag="a" class="anchor-card" target="_blank" :to="'/live?router=live&type='+(item.type==0?'football':'basketball')+'&id='+item.match_id+'&uid=' + item.uid" > -->
					<router-link tag="a" class="anchor-card" target="_blank"
						:to="'/live?router=live&type='+ (item.type == 0?'football':item.type == 1?'basketball':item.type) + '&id='+item.match_id+'&uid=' + item.uid+'&vid=' + item.vid">
						<!-- <a href=""> -->
						<div class="anchor-content">
							<!-- <div class="anchor-content-title-wrap"><img
									src="/_next/static/images/img_jiaobiao2-e72a914e5a14c64e7e9034a63543d094.png"
									alt=""></div> -->
							<div class="lazyload-wrapper "><img :src="item.thumb"></div>
						</div>
						<div class="anchor-name">
								<img :src="item.avatar?item.avatar:require('../../assets/images/userLogo.png')" width="30" height="30">
								<img class="live-status"
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAA8CAYAAACZ1L+0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAYKADAAQAAAABAAAAPAAAAABU0H2EAAAS0klEQVR4Ae1bW29dx3VeM/tyyENStETTgmRBcGUlsSnHl0iJ29R1WMNtESQxCgRygQJ5LPrSP9CX0nxL0bf2oUBfi+bBRtG0gBuntyhI40sdpXEgUbGjynIti7FoiaZJ8XCfvfdMv2/NnsNDW4p8joRaQM4QZ8/suaxZ61trbmsPRUZhhMAIgRECIwRGCIwQGCEwQmCEwAiBEQIjBEYIjBAYITBCYITACIERAr8KCJhbLaT3fgfNxcXF3vvCNTp77vTpXvk1iv/fs44fOeKv1elik7mwsLCj3Biz4/1abX9ZXvrLCgcpi8BHwAk2wV04LnJiacXM4/3kxXUF++jRbcrH922nb4/UuR4bJ0+G5NH9U/5LSM7Pzfrnnn7aUElRIZBbKw2riFtifQQ/Aj8H0I8DdAHoBHx8/5bJLx80hz+FvCsdc2GtMAeUZZHl6e4t6b8hd8uifWu5onoBFA9Mt7zsGfdnfy7Snflf37k45qkQoTKeg5jNiOHIGEYJNz0CIvjR4mePrBhZXTdnL99lj+4Xsyxibesds3JljzGbpWlPO7PaqRT4sY6IGa9vKyX4TuJX864qsz2e+vc2S9q4n2pd8U7G/Nz+KXf28rg/vHrOzR6Z8jA40RGBqZajYVAl3LQCyCnBlzlYvqyYJVmx55dn7cTMJXs1u2Nq12b5564lT0lxZbdYYA3QATsfAonEXI34I6ak+JneMhLytD7qahuWs32sq7Saen15SqepxxbhPdAX0OdfmD6Qiv0hjnmkH+o0/Zk7r8gleb4z0/7TiZnl1fPLU+YuWXHzR8RhqhW5ztoRuL7+E5wPH6L167RDy5dZK1DAuxtXkmxyPMm7nb9Fnae2AWB3AawdAEHY7TohTZAUDAWrUYy2bdqzBeuwej9YyNOg7UOStFQDCinp7mwTiAS65IN/zIv1Is+kZo39t+69G18vNzr13sk9NQzOXZJZt3J61nM6GnQquukRsACmTgB8Wv4c+FsRSfMkS/JOddAn8jWMSUgCkRCpoBQega8xaBak7QnOgviulbREAdF2fHBEIOYehECRBmsFWnhhe3TKMu2bZazHd63Hmg3d0KpXPygexSiPT3LHxs77J/PlyQPmjuodGJq0J2dlft+6rgmypNUHesBihw9ceLnTmcJiO7fnoKHlp531JB2XzGflY17NONBXoTSJXMquAoUywhCgYHZI8amAhSrbwEUQG3CJHYGOIaYi+IptbMM+EQIvpA9e8B7bs78eH6zLQoQQsTBSL+9MbZJylLdk3cryIcNNR6g92HPoEQDmjSwuqvUflUNm+cq5pAWG0sKnxWaZ55k8qsKQ6SgYmiSHHxUzvVfqN38i/r23G2AD0wEApgM4bG/3f0bs3Z8W9+5b4s6fEjOxS9IHHgdNI9Wr3xFf1w19RCSgEDbtZw9Ievhh8UVHqh99TztJ7z8mZvddmo4As03/NOXfW5bqzGsNLdJFkj8Ea0yn3u0uFMakra3MpWPj7jxG/+WL6/7cKtfBWDPUv9FzaAVEwrT+8/vFTsiUTbaqZKsusiyXDOAdC5xTAA5gDjYv2W/+oWT3Py6dZxekXHk7WF8jnFotF2bUjBacPvBb0vryH0v3xX+QLShAOlel9dSfiJ3aLZsb70t96ofKSlBeGDXMYPvW731D8se+Jt0fPi/1j04oO9mTxyV78Iva5nqP8uX/kPrMT8EtGQuGHflx4k9J3TFJUqW2rOpkLK3vWbNmE9vt408KbHKRDRqJrtfDdv7QCmBHC9j5jMuWuWctN1emne2Ybjpt8tQVZtrncl/gIs7tQRgKEoOmkB3BI9tBULThutEIv6O+c1Ke/Bdpzf+BZMd+VxWglPtGmo6EJJPsc/PatHrpBTUCghl7L77zLalO/VeAiv2iZuTDra326jOPpSFGKvE/NalktkpLM9WyVjatTCdmTrACDhGGVgD74gn3AA5Z77besWNbu5Kkdkm35bPUu0cAQqJiRc4b5nqvKljIDML3KaqvrC+plQlu9co/qwLSBzEV5WNiiq0AGJQWjS994DfEtKfEvXdRqjd+gvyg0EjPLb8FK/9vzVWeYgFpaDooK2ZHTrG2nbKuSmzWSoyU1mxNmnerD8x6sWEuLHW2GQgNbvgcahEGCGYBpOfxS2cwHO2UtaZrJ/NuYopuWuv0Q4si++QJFoSnWjjjXoiWFcDRbFhyHCVsz9YaSAA/ltUXXpf64v+IAfjJZ6GEpo9AJTyzz/+ONitf+m6PBqeUHr2m1Y4+UKoDVB/knyRID4F9g0AyXZwpkwTGVdvOZmVNcXMHyaEUQH7UibZv3aRwLdh2hUPuFpaANCmNTY2rH1HGG0FUEhWGLWMg+NuAhPmWQiMVBUf7kN7ZhmCULz+vmfkxAM36DX3W9/m4pA8+puXdl7FQN80JZT+9kI+8ppyRljeV1BCQjm2Mlbdd7jbyGl6Hypt2085O7unXax+1GyeHVgD9PUvLW+YA/DlWCowAzIcA36ZZhq3CZxWRPsmiVfezFGwrKoIyMCfkUhFE5qPtUA7FVK9+FyfpWpK5XxePqaY/ZA8/jtHRkurn2MmswBlCOviLQGrdhje1kZjuEQEvyFMeohEhdml9pnLelInOdb3abuNKQ6GX9bETQ60BXIC/BLcD5/+VmY5tQQETZstWQvOv7/XO71KBwUZw1gYD2QlA5LmZ+1E3jIgAVARMQVBxthXFPP/BZamXXsGW9IuSf+4JKX/wT017K+nnsR1BKF+C9cdumNH30vrqNyR7/KvMVbBDAhPLG6ekePZvqPlw2GsKVI7ML6XWYOcLt0+GHIfYJliURA7PTPrDc5N+/viCf+aZZyK5G8ZDjYAFkJ3Hj/M/HWxmvWu3sjQxOJ14Xz8S4KbVITQWRNljPrPjWw8TLW/AbyoyoiJCIJIxJ8QlFmOGFLuhEJDPc8LcF8R3Cymx92f3rB0USWp8Q2hPir3jzvDbjbj5mQmOpqYeGofagS+XV0tiK2wvAH5lvc/xG9vweyehGRyD6R0dNAw8AiCIHsDoat47kRsL7+bmRolRkFiDGQEcP6wiA68IeoyjMpRJSKaQEiHWRSaF7ReY9ZgfQgMGiAV62IO89gMZ21yX5FPocvpOMe+/J+nRJ7BVTLFV/Z6eGXSVUSJoj74iveLZv5byP19AfwHcUAB7bCqowpAO7dGnNRvpdPFWXVqXmbqujHNXueWrMQK6uZ+7Tzx9coOGoUYAF2D6+ZO++d/UWIAdx6M8GId6ABOgEmRCG6VvuNTyD+URXAUYhQRH6zT1mR9UxFz8qhJA/7vSz45x2jGSxennxRf0XWtq/6SrcCKfIdDop8kc7fzD/aCuse5nlcOiY11d+AQuocS1fdd5uKwF3wz48eZ6X9NI9nphYAVw/ucCzI8sdgN7nrVxnM6xHcO2LLNuj/VyMHSm4ijowZoC0uGJGo2QjBRwAoKX7UWXlgnL6+NcLbgBMYJZvhSmoewLmIbumIWr4yFxqyvY47+qLQN9PEkbfz2KDZ1QKfSifDbKargPzLFt5pY8pn/M+XWepLX3qcO5HhqhK0JkHR9pFhGDx0BMCd/4MbAClCQOYJz/uf0yYzV2QTmUkFp4Gx6CaYB3gkk+ghjBjkO6n6UI4radB9C1JgECGDtaqWgNTZSxC/fmKXGX3pbk4Gck/+2va5vyFeyQegCTRmgTkIkUQ3vyGP8C3+Rwu0zLqZTcnfbO1l5qiIixILD+rcRzB1ThAw0/V/bL9nHTAykAQukBjPP/PeghkQ4sH6dBjoCkwtLksQBTQPzINFhSrhgzgR9LY9C6LGMGYwWtad+AoO1iOSo1ZEPd0IV0sdthyJ/A0ESomsNXoNuz+Y/0r9w0/Uf+2L7HIzNDQS3TV8+kmH58ndQ+DSPATXecwwLMT5VcgD/8wZ60bhQGXoQ5/9PpJD+DPzDHASzJbW4KK6W3WKge0g7BNIVXC9ZEEEplaTjKHv19Se89FqtrTMFZ3cPJVnz7LwFEUOeOQrwwl/VCioeyF+Cg+yNMEy14Wc/glPxmUxbqRSpKW9sJtqBfkfQ+eEr5HohpG766X7wj3W//Xe8dcr2ZJH6zNkmdCRZg75zzNUbBuKvXrId/0A8z/7OvgRXARjyAzU3TGGszgVNXtQXfVO7ztC7vj8Ko0H0SE/xeHjv+Nexc+LtGcFeWAcBfKakeNmyPHoNBcjFlOsSyeknq138MQI/q3j8qhuW9TxKxbtNf+mmcFfm7RqjeOC3df/xWTzEmrc6UQBxHMVg/PF7eYAG2rthMfTWd+aNYhBdB55kB53923Rtt1+DjI1mcguS5py22vMm7G69nY+muPLOdsdJKO6krzv9/H0AOQAXieBJFRZLp5p3UiQ9+2oaANq5o5vTym7YKdUMjljHeSZtEAz3SCqmgKO03lrFP8NFrz6qEQukhZmj6Ut7a3W/KzNXnMftsWGc3sPxuVu2xrUJa3bXL4+WFmU79fZl3OIBpr4HAx3sOtAZwB0QP6NnLG8qlOqIqp34ReOQ+6Fko+u6lIYgK2ghIq1TZGhlZj8KzjrZp+I4WzlfWZy3Gwap7L8jHn9II7Vkp0kKtEEibKZZh76JxUxT7Z56CHfPZAnn4ed8uXvMw9lTSykvirmIH5KTjZmXdcf7nAjzM/M+uBlJAw5tGH3FAlbICZl9WgZRxLpgqdqMMZgaQmtwgMLIJasgLUwoBDHnbI0FBZfumphLTNBFq2qNd7DPmacypSxv0KSsQQFsktDDWCe+hPtKZe9G2i1+gl6qoHKYfB3dQAQW03AXcH5rbN6YLcENu4GhoBUQH1Cb5TY2HIxonc/NnGNr0/673OGkEDMAR0CAa45BkSQC6KVJAQv0elSYRQKKyIh2qhD+2BcVAU7sI+WyodJEX2jGn4YN5sVogwMIQjGxI7v9V7vrgLzBb4XKQrzKAP5ZWdTsbq53O/7i0tTw19ALMjoZahBsWxbcSPz6Wugrn8qwucEKUNXwi+iYYbmO5GDfWt4zDDhoqwlkePnQclVXl0eIjpQBOfCMmMcT09WLWi2WxTX/84bIPv2t7ak4M1lbPD8xw9pguJtYCfrcOjlWbmLW6qZhu3cqqjcLjIJZjKHzgqst3+xMzHfk+iDwzxALMvodSAD1/GJv+fdmA3bSdK4va2rRO4amtTQVrMfBRW0jEVRtbJThyhZtUaAENb7sALjG146KLw3Eexwg4O+HxkcIldktqXyQpVrvSlXltyk5a1nXL1nvXJtxlzP8rp+e8HBlepIEVwAVnaWlJ5tZ2eTeN7fA65sOxqnZdfCO1ZeJg5M5YnNx1H1JjiOMLGRUNVzUMH9q4lhEOL8FNtoTzyoNdnG3xtQv7amxjKtwowKlGulJhsk/dFjgvXO67G11XjfuJqiupOz8tek9U9/+4FzqIC7qf5YHAoEHjdrA9tPucndk/lUwA2Hyrygpb5lldtRJXt+osbVl8k8KIzDH9ZNBAmmHqwdC2NcaJdo7J6LYIsAwGb7C9h5cN3zMc/OkVdzyYjMrE2gLzUtclSVF2y6KVZEXZMmUhVbVPDlUncCuO289Bb8OFXsNz4BEQTnwrmElm3bKcc7yWMV74ysIn18W9TwwBb1PBiIXHnA4ih90z9qiYhvDBDM0gkTSC9zPySaYNGKObE0sAuIWrAbsdeLbK2roSWimrruu22rZbdeqq3CjrfQfvrk+eOudXVg/p9IOd19Az68AjABdfDC/iyuo5XMKdSsZxGw5XEVPeFCPgRYUrG7agZw7fhm1icme7EAV1sEB4k3+SSF+jb96DzviBpS7h3ISbGYqgAujvgcuzamVSunXsM/CJoRqfqmcxRcX7oPOwfjiAhrqWHlkZeAQsouUcHE+8ms3bwffgbiTvSNIvnuCmWDe56pIqqybgoNvKTGLwwQyKsZh9sC6De/aMD9qRgU80xvaZcyIHpIf9c2/ruBuCt8EVSV1jy5mujdXVtIPl4zKuVp11uAHkTuMy7iIW34WbFGBgILgO8EQcb0TzUm4bt6J5RzLl7Th4SKEIzDldKy2sAIXDFbVxs9ml30hks8T7bRTamfVXwU87x3JcdLxvYZ4s4Gb2OSbTDlbdqbrCibeQKbcJg5vD1Mt/zsB/ZvibtX7CMPAIiNhxLYBnFCNBHG8Hnz11lz8808G6UFmLyVK/FeB7Ma+smE5hMjTU4T5xc/doYv+3Ku7iHzLIW9mpMIpzzwOWb+PIBT8/Xc34Dyr8QwZke+CSO7E8i8+Os/64hH9RulnrpwxDWWMcBSQw+pckojB8GEoB7I5KYMzpiDGtQb8V4JsIHXbzeOeHG0TS/095fL9dQ/8/5Z0Akzzz8EMLR/tiw3R0ut3MzqdffgWoP2PQdFREbNevkJjXH1NJ/e+fdDpsq3dyEcFmbgQ81rhVwEd6o3iEwAiBEQIjBEYIjBAYIfCricD/Ab2DqnTD+MIXAAAAAElFTkSuQmCC"
									alt="live-status">
								<span>{{item.user_nickname}}</span>
							</div>
						<div class="anchor-info">
							<div class="anchor-info-desc-wrap">
								<div class="anchor-info-up">
									<div class="anchor-info-title ellipsis" title="">
										{{item.title.split(' ').length === 2 ? item.title.split(' ').slice(1, item.title.split(' ').length).join() : item.title}}
									</div>
								</div>
								<div class="anchor-info-desc">
									<div class="anchor-info-desc-nickname ellipsis">
										{{item.title.split(' ').length === 2 ? item.title.split(' ')[0] : ''}}
									</div>
									<div class="anchor-info-heat"><img
											src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAAEXElEQVRYCa1XX2xTVRj/zr3tKCCsg21hcU50hoR/D84yjSaEgTywCCaGYELiBsnUwIMaEhMfFBPjg+/qQ+l07UYIWYwBEnwgaytiNDFL8GH+CTEGqRu4sSmdlNL2ns/vdLunp/fc9t4Nb9Kc7/t9f87v/PvOKcAyvuiZdHNsKP3MMkK1EENDPIChoXQICtaFBoNnPFx9mZdEABFZAaw4ILT39++Z9NWDh9OSCJyKp96nfC8zxq565PVt9k0glhg7yBicLGdm8IfvHjwcfREYHE5vQ4S4WAKRDwH/8cjr2+xJgDZd2OL8HBFYLbMia5PyAwqeBIqMJwCxU+2HIT6i6g8i1yVwKpE6QdN+QOuAQYeGLROoSSA6kuxCjh+55aWt8ER0dLzRzaZisUTqxXLdUEGH7EpABDELT9N2Czr8F1UMstz8C+62Cso5niwY1gcVRJdcCRQY/5A23WbdvYIgWG9VNF36bDgdoQF0MYQTg4lkt+6xgGgEoqcvbyfTm7UCJI4QiSbS/VJXhNFRNEsWjwqIBmJyhM+j4+Ous6kRYMXSpxQVUPLVFpF/MhhP7lQdREd/51IxMXobp428FSayx2xdbcuFxQZiI2N7eQku2bq/lhUZYAwMNsY4PEpF6jAC7NBiGUzDtnD765FIUbVVjRQtNkDMVbsPGYMUcRw4Hq8bidBq/JzdTwm/VJPKJaBpMijBXtX4f8t0KvY5c0oC8TPfdNLaNzkdlqt3tK+HA71PVYcjPl0NAMglKPHiBqexnk43I4RCDZDPF4l3ZfIDAQO2b+mAyJOPA13bEFoRhPz9hWWnkIedOSUB4MY6AO60a7pIuKOrEx7b2FpOzjmH27PzMD2ThUDQhI0dLWXcDmxevwb+nJorqwhsjY3brSRAO2DGq//Gtatg/74uWLVyhR0PhmFAa0tj+SfBGgKdlhmnSe6BYMmYchpVXUz57p1bqzpX7bXke/mCNNFrQutDEjhyZNcNBuwv6e0QWprXgvgt5ROdz879K0OoLP8glUVBEqANw8GAC04HW1/X9JAt+m5/+bX63coCcM4ZLAkIAzNwxOlg63fu5GzRVzs/fw9+nLiu+mb45vDXKiDkKgKvvvL8FWBw0ekk9OnbWbh7N+9m0rBc7j5cvHQVSiXlVBnme84yLAKrCJQBI/g2tdpwLYtD8vJPII5dvW/y5hyc/2ocsjQD8mPw/Wt9u1xnl/a2/sWGUy/Ra+gLKjCavSm8Gp7t3gRtG5roCC6YBbnM5Cxc++0mXL+hnbRMA5jdR4/23NJ7omV3AwUWjSeP0bn9WNznbj6maYCoC4Viqbw0SjFU3TOmafYO9PVMqKAq1yQgnAbjqT0W4Fmqtc1qkB+ZjvSVkBk62Nf33HQ9/7oERKD4X1AE/g4txhtEZGW9ZIu23w3G3h3o332WjnblkqgR6EnAjhNECib2Mo7iTt9Cz4Y2enyIykQjZFNUKb+jR8n5cKjn20OHmGXHebX/ATCvePe0TxYAAAAAAElFTkSuQmCC"
											alt="" width="10px" height="12px">{{item.heat}}</div>
								</div>
							</div>
						</div>
						<!-- </a> -->
					</router-link>
				</div>
				<el-empty v-if="list.length == 0" :image-size="300" :image="require('../../assets/images/qsy.png')"></el-empty>
			</div>
		</div>
		<ul class="ant-pagination" v-if="list.length != 0" unselectable="unselectable" style="text-align: center;">
			<el-pagination background @current-change="sizeChange" :page-size="60" layout="prev, pager, next" :total="base.total">
			</el-pagination>
		</ul>
	</div>
</template>

<script>
	import {
		getLiveList,
		getAllMatch,
		reserveMatch2
	} from '../../api/user.js'
	import 'swiper/dist/css/swiper.css'
	import {
		swiper,
		swiperSlide
	} from 'vue-awesome-swiper'
	export default {
		components: {
			swiper,
			swiperSlide
		},
		data() {
			return {
				page: 1,
				num: 0,
				type: 0,
				AllMatchlist: [], //全部赛程
				list: [], //直播列表
				base: {}, //存放分页总数
				swiperOptions: {
					width: 803,
					autoplay: {
						delay: 5000,
						disableOnInteraction: false
					},
					slidesPerView: 3,
					spaceBetween: 10,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					navigation: {
						nextEl: '.live-match-grid-next',
						prevEl: '.live-match-grid-prev'
					},
				}
			}
		},
		watch: {
			'$route.query.type'(e) {
				this.type = e
				this.getLiveList(e)
			},

		},
		computed: {
			infos() {
				return this.$store.state.infos
			}
		},
		mounted() {
			// if(this.type == )
			this.getAllMatch()
			let type = this.$route.query.type //进入界面监听足球、篮球、全部
			this.getLiveList(type)
		},
		methods: {
			// 预约赛事
			getReserveMatch(item) {
				if (JSON.stringify(this.infos) === '{}') {
					return this.$store.state.user.showLoginMask = true
				}
				reserveMatch2({
					type: item.type,
					match_id: item.sourceid
				}).then(res => {
					if (item.reserve == 0) {
						item.reserve = 1
					} else {
						item.reserve = 0
					}
					this.$message.success('预约成功！')
				}).catch(res => {

				})
			},

			// 获取全部赛程
			getAllMatch() {
				getAllMatch().then(res => {
					// res.data.data.forEach(item=>{
					// 	item.anchorList = {}
					// 	if(item.anchor.length != 0) {
					// 		item.anchorList = item.anchor[0]
					// 	}
					// })
					// res.data.data.forEach((item, index) => {
					// 	if (index > 50) return
						
					// })
					this.AllMatchlist = res.data.data
				}).catch(res => {
			
				})
			},
			// 全部的左右切换
			prev() {
				if (this.num < 0) {
					this.num += 1;
				}
			},
			next() {
				if (this.num > -(this.AllMatchlist.length + this.num)) {
					this.num -= 1;
				} else if (this.num < -(this.AllMatchlist.length + this.num) && -(this.AllMatchlist.length + this.num) != - 0) {
					this.num -= 1;
				}
			},
			// 监听分页
			sizeChange(e) {
				this.page = e
				this.getLiveList()
			},
			// 获取直播列表
			getLiveList(type) {
				let data = {
					page: this.page,
					type: null, //-1全部 0足球 1篮球 2其他
					isweb: 1
				}
				if (type == 1) {
					data.type = 0
				} else if (type == 2) {
					data.type = 1
				} else if (type == 3) {
					data.type = 2
				} else if (type == 4) {
					data.type = 3
				} else {
					data.type = -1
				}
				getLiveList(data).then(res => {
					this.list = res.data.data
					res.data.data = []
					this.base = res.data
				}).catch(res => {})
			}
		}

	}
</script>

<style scoped>
	
	/* @import url("../../styles/anchor.css"); */
</style>
