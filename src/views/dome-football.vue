<template>
	<!-- <div class=""> -->

	<!-- <div class="list-view" :style="{
			height: `${height}px`
		}" @scroll="handleScroll">
			<div class="list-view-phantom" :style="{
				height: contentHeight
			}">
			</div>
			<ul ref="content" class="list-view-content">
				<li class="list-view-item" :style="{
						height: itemHeight + 'px'
					}" v-for="(item, index) in visibleData" :key="item.id">
					{{ item.competition_name_zh }} - {{item.match_str}}

				</li>
			</ul>

		</div> -->

	<!-- </div> -->
	<article class="football-score-container list-view" :style="{ height: `${height}px` }" @scroll="handleScroll">
		<section class="container-section " style="box-shadow: rgb(238, 238, 238) 0px 1px 0px 0px inset;">
			<!-- <div class="title" style="display: flex;"><img alt="b"
					src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAAXNSR0IArs4c6QAAAVlQTFRFAAAA/4AA/6oA/4AA/44A/38A7ogA74AA8IcP8YAO8oYN8oAN84sM9IUL9YUK9oQJ8oMN84UM8YYO8oQN7oYN8IUP8YUO8YcO8IYN8IYP7oUO74UO74UO74UO8IUN7oYP7oUP7oYP74UO74YO8IUO7oYN7oUP7oYP7oUP7oYP74YO74UO74YO74UO74YO74YO74UO74UP74YP74UO74YO7oYO74UP74YP74YP74UP74YP74UP74YO7oYO7oYO7oUO74YP74UP74YP74UP7oUP7oYO7oUO74UO74UO74YP7oUP7oYO7oUO74UO74YO7oYP7oUP7oUP7oYP7oUP7oYP7oUO74YO74YO74UO74YO74YP8I0e8ZUt8pw886RL9Kxa9bNo9bNp9rp39rt498KG98OH+MqV+MqW+dGk+dKl+tmz+tm0++HC++HD/OjR/fDh/vfv/vjw////Tgh1UgAAAFp0Uk5TAAIDBgkODxAREhMUFhcZGycsNzo9RVhZY2drbW9xdXh5eoKDhIeIiYqLjY6PkJGTlJueoaSorK+7vL/BwsTGx87P0NHT19ja3N/k5ebo6vDx8/T19vf4+v3+15fz0AAAAbBJREFUGBmFwWlbEmEUBuBHWrQkyPZsszIrKioqrRRsNS3NxKB6GEaIBmKZlvP/PyRc5x3eAYbuG2FHz6aWXm1vv1xKnTmCSMkbr2l5cT2OURL3ixywe2saQy5xlM/nEBZ7zAgPYrBM5hhpeRKBiRzHyE7AyHCsh1Cz/I/z6JnK0+JU6p3Oj0qJlvwhdKXZV26Jajnsu4l9yS8MeGL5zkDhGIAUA00J+cnAPIANGp4MqNF4A8zQKIva2xPl0EjgKg1flOuKatG4gEUqRwzXFaNE9QhZqpoYritGleoZ1qkaYriuGB7VW+xQ+WK4zm9RbapPyFP5YtRI76/0+FQ7WKdqSKDj0GlKl0f1DlmqqljqJbq+iFSplrFI5YjtT4UUEYfqCeZotCXkV12kTeMyZmiUZYhD4zjwgYYnAzwaGwDuMdCUkCYDCwASRQY8sXgM7E5j3zz7ym1Rfpl9c+g6+JEWp9rw2161RMvmAfSc/saxvp6CusaxriDwnGM8Rd/UCiOtHIYllmGETAxhFwscoTCLIfF0kQMKd+MYJXl7k5b3CwlEOpleXdsit9Zyd04g5B8K69V7j7vWnQAAAABJRU5ErkJggg=="
					class="icon">
				<div class="container-section-field">进行中的比赛</div>
			</div> -->
			<div class="list-view-phantom" :style="{
				height: contentHeight
			}">
			</div>
			<ul ref="content" class="list-view-content">
				<template v-for="(item, index) in visibleData">
					<li data-index="0" data-id="3721444" data-list="arrList1" :style="{
						height: itemHeight + 'px'
					}" class="football-score-item" style="position: relative;" v-if="!item.type">
						{{item.competition_name_zh}}
					</li>
					<li data-index="0" data-id="3721444" data-list="arrList1" :style="{
					height: itemHeight + 'px'
				}" class="football-score-item" style="position: relative;" v-else>
						<!---->
						<div class="gou width40">
							<div
								style="display: inline-block; max-width: 100%; overflow: hidden; position: relative; box-sizing: border-box; margin: 0px;">
								<div style="box-sizing: border-box; display: block; max-width: 100%;"><img alt=""
										src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAAXNSR0IArs4c6QAAAGZQTFRFAAAA////zMzMyMjIzMzMzs7OzMzMy8vLzs7Ozc3Nzc3NzMzMzMzMzc3NzMzMzMzMzc3NzMzMzMzMzMzMzMzMzc3Nz8/P09PT1tbW2dnZ4eHh4uLi8vLy9fX1+Pj4/Pz8/f39////dzfHAgAAABR0Uk5TAAIPHB4fMjtDcI6pv8Db4Ovw+vvX3ilpAAAA5klEQVQ4y9WUSQ6DMBAE2cNuMM1uA/7/JyNFyAnLSJNbUueSsZuZdpx/w/XjNK+krPI09l3aC7NSYkeWWUhoXlKjG2alt02reehQJ96dFxRNO+nV7Kx6apsiuHqRQK/MAdVDRJfzBMbFnFhGiNOZXoHR3DCiON4zafrlTlz6JjnkUrfK3KLa+iMlN8NkCCZk7+T9stOUqLvSt2Ish5US10HGVkwxG5IZqRVzKFpUyK1YQdOiRmVFiY0WN8jvRfan2Y9hx8MOnP0L2UPBHjP+4PJXgb1c/HXlFwC/Uvgl9aq9B6v2fpQnYaFdIBuWEYsAAAAASUVORK5CYII=">
								</div>
							</div>
						</div>
						<div class="match-field width93">
							<div class="football-league-name-container false" style="height: 44.5px;">
								<div class="football-league-color-block" style="background: rgb(227, 172, 114);">
								</div>
								<div class="football-league-logo"><img
										src="https://cdn.sportnanoapi.com/football/competition/ecf1c03806a37fee50b828b5fdbdfa6d.png"
										width="56" height="56" class="football-league-logo-img"></div>
								<div class="league-name ellipsis search-by-team-name">{{item.competition_name_zh}}</div>
							</div>
						</div>
						<div class="time width32 text-center">15:00</div>
						<div class="match-status width40 football-all-status"><span class="point-animation"
								style="color: rgb(255, 67, 67);">中</span></div>
						<div class="teamName-and-vs football-score-item-teamRank width420">
							<div class="team-info host-container width189 "><img
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAQAAADYBBcfAAAAAXNSR0IArs4c6QAAAvNJREFUOMutlFlIFWEUxz8qsMV2zVa1293vde69M2NmN0qjiCtkiwhREKElREH1UEgRvRQtRkW0YbQgmUISUaIJgdhCQrTYRkXaYkRaaqnd3PLXg9M0UxI9dObpfOf7Mef8v3OOEP/TlCj/orFbhu8bvjt6nXWONeIfEE9kMFUuCrR5OcllLnGMjaS88+ZJshj4F8wfL1f42hQc5PHTevjADKRG5bh/VP/UQHW+3ODHgws/9RitCAcy06umxvXDueZbWibgJIMjVFJA2AC2MhcHMs57wdjfsAmxwabNnOOVdvUhO9jKYYqo4B4POUY6blxYyjYNMao4NPrqLb4b/tFDKjbceHBjJUQLX3lJCavw7jSA0+bmhk1FUUoMiv75eKOd9xKsHfwrXV/xIxPWwXLcBtBNmR672GNfqWGWkWkdX3hAux58ihPVBK7VY7UkV2T2vWlM+gFOEEU23UAnD9hDrAn046BRA8Ms+TreLYQQwpq7EReJTCaLW5zlIu/Jx4JPwyScpFJAPdBMCcl4Mvo03S8ho6Bi4wqfNXWv4cRDIvEkcp5m6imkiDRsBEjMEUIIIe/7mZKLJwaJ7pCEjVya9JMQdlQU1GwhhBBJGwIa6OWFSd0artNj8Jfi6as5TQghxMzZAb2aNybwKY8NXi/zSEBBbpAm94kToX6UkXCSQIMJvM8z0+vOREJBLtAbQD40iyWsYT1P6DWl+trgNeEkAblTXqCD0f7VH9vpooVCSunULr5nJ7d1rJ0LrCCFhJrkMb+adcCwU/maDOUU00gNW5GYhI2DNNPNM/Kp5hs5XVOWmcbKMtJfVa3NRR3bsePGh0IAByFOU8onejnE1F1/DPLgeOvdSrq0aXQZ2s3ODSDMAcaVJI3oZweMjlXLthEG3iLpoJOjwEuyOyfu7RcTQoiUyPgds+sKu5+zUENlVG6S1+F9FJ0pBvx1QY6Kc2QFy5NbAxo4vX7GmbiQPeqfFnLKIJ9HWSznBLLUkNYl/89+AM88AVY3MqEdAAAAAElFTkSuQmCC"
									alt="goal" class="score-item-ball-left">
								<!---->
								<div class="card yellow-card"> 1 </div>
								<div class="name ellipsis search-by-team-name">阿尔斯兰古德</div>
							</div>
							<div class="hover-box">
								<div slot="reference" class="vs width42 bf"><span
										style="color: rgb(255, 67, 67);">1</span><span data-a="0" data-b="2"
										style="color: rgb(255, 67, 67);">-</span><span
										style="color: rgb(255, 67, 67);">1</span></div>
								<div class="components-box">
									<!---->
								</div>
							</div>
							<div class="team-info guest-container width189 ">
								<div class="name ellipsis search-by-team-name">松科鲁德</div>
								<div class="card yellow-card"> 1 </div>
								<div class="card red-card"> 1 </div><img
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAQAAADYBBcfAAAAAXNSR0IArs4c6QAAAvNJREFUOMutlFlIFWEUxz8qsMV2zVa1293vde69M2NmN0qjiCtkiwhREKElREH1UEgRvRQtRkW0YbQgmUISUaIJgdhCQrTYRkXaYkRaaqnd3PLXg9M0UxI9dObpfOf7Mef8v3OOEP/TlCj/orFbhu8bvjt6nXWONeIfEE9kMFUuCrR5OcllLnGMjaS88+ZJshj4F8wfL1f42hQc5PHTevjADKRG5bh/VP/UQHW+3ODHgws/9RitCAcy06umxvXDueZbWibgJIMjVFJA2AC2MhcHMs57wdjfsAmxwabNnOOVdvUhO9jKYYqo4B4POUY6blxYyjYNMao4NPrqLb4b/tFDKjbceHBjJUQLX3lJCavw7jSA0+bmhk1FUUoMiv75eKOd9xKsHfwrXV/xIxPWwXLcBtBNmR672GNfqWGWkWkdX3hAux58ihPVBK7VY7UkV2T2vWlM+gFOEEU23UAnD9hDrAn046BRA8Ms+TreLYQQwpq7EReJTCaLW5zlIu/Jx4JPwyScpFJAPdBMCcl4Mvo03S8ho6Bi4wqfNXWv4cRDIvEkcp5m6imkiDRsBEjMEUIIIe/7mZKLJwaJ7pCEjVya9JMQdlQU1GwhhBBJGwIa6OWFSd0artNj8Jfi6as5TQghxMzZAb2aNybwKY8NXi/zSEBBbpAm94kToX6UkXCSQIMJvM8z0+vOREJBLtAbQD40iyWsYT1P6DWl+trgNeEkAblTXqCD0f7VH9vpooVCSunULr5nJ7d1rJ0LrCCFhJrkMb+adcCwU/maDOUU00gNW5GYhI2DNNPNM/Kp5hs5XVOWmcbKMtJfVa3NRR3bsePGh0IAByFOU8onejnE1F1/DPLgeOvdSrq0aXQZ2s3ODSDMAcaVJI3oZweMjlXLthEG3iLpoJOjwEuyOyfu7RcTQoiUyPgds+sKu5+zUENlVG6S1+F9FJ0pBvx1QY6Kc2QFy5NbAxo4vX7GmbiQPeqfFnLKIJ9HWSznBLLUkNYl/89+AM88AVY3MqEdAAAAAElFTkSuQmCC"
									alt="goal" class="score-item-ball-right">
							</div>
						</div>
						<div class="variable width554">
							<div class="immediate">
								<div class="model-one width180">
									<div class="half width66 text-center"><span>1-1</span></div>
									<div class="corner width48 text-left"><span>1-1</span></div>
									<div class="live">
										<div class="football-score-item-live"><a
												href="/score-live?type=football&amp;id=3721444&amp;competainId=2"
												class="" target="_blank">
												<div class="left"><img
														src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqxJREFUWAntVk1oE0EUfm/SWLqHNhtREZSiBxGkoODJXqLFiyB4qgc9eLFNiiIK+TE5mIOB/CBUpEmkh+LFQ85evIjiQbGignch/iCCZmNsYtom83xjs4fSZtndhFx0YHZ237z3fd+8fTuzAP96QyqVPMbrpzEkukxA44NICAKWCXFRPx5Ie64d2BUHkreZ2DcI8g4Hc9Gp5tfymlArHyDxJirFLQaV9k3MnQfFLbab6GZDRMn9GXejm49TuzMBABk9Wwh4NO0QAD50SradvyMBQPBWgYwm73z35woX+PYs9y/K5rY5E9BhMcLBpdrNK4f9ueIjEGNHAGFxoAIA8US71X5XCYfi+shI3Z8tzggPTHFtfHAqxFUGFAlX8DBfU9X6t2UjFjzmSxef+LQ9Eyxinru0K8S1AJOAhRwFia+q0VAK/D/aXKTXGXSSX8tP08dq7FmAAieiISkpXv3cekHJpDaWLbzk7XbJitic64sABcZpfy7Iex6TyUY1FtJZ1kmTxGocspq0NYe4wvRRX2ahwCLIiITOcTbyXCR77cT3JgDxMeCOGX/m7sdfmtxdiQTv8euYtkNs+rgSQAAVXu0lLrgHCqgSDV1sNWCei2GnCWx3dCVA1/A0JvMrjcjVfU1Yvw+SzrAoV82ZAISNFd5aqFd/w2xTtrLMOuqKuROElXDQtnhOu4FAeUkQ4PjJXojNWEcZ4ALTWW3CDO7HKHjDWO0HkBsMxS0IYdlNcD9iFLfwCLzBG0mtH4DOMLCmuFEFNRJz+1fX5TQQjjsDcemNVB72ipKWyn9yidC/sL8Z6AbHh8pB2aYICuHt5mNl569mTQjI+dKFrj8q1p8h4RSfarMkbf9fbNVD4g0buwqwzACvAI3E3ISQ4CoDUsC6nsq/V6fkVmX/LRsZ+APOsdzYLi53OgAAAABJRU5ErkJggg=="
														alt="videoIcon"></div>
											</a>
											<!---->
										</div>
									</div>
								</div>
								<div class="h45-w1-border"></div>
								<div class="model-two width224" style="height: 42px;">
									<div class="football-score-item-odds">
										<div class="odds-handicap" style="display: flex;">
											<div class="left football"> 0.825 </div>
											<div class="middle football"> 0.5 </div>
											<div class="right football"> 0.975 </div>
										</div>
										<div class="odds-dx" style="display: flex;">
											<div class="left football"> 0.825 </div>
											<div class="middle football"> 4.0 </div>
											<div class="right football"> 0.975 </div>
										</div>
										<!---->
									</div>
								</div>
								<div class="data width87" style="justify-content: space-around;">
									<div><a href="/score-detail?type=football&amp;id=3721444" class=""
											target="_blank">指数</a></div>
									<div><a href="/score-detail?type=football&amp;tabIndex=4&amp;id=3721444" class=""
											target="_blank">分析</a></div>
								</div>
								<div class="match width74">
									<div class="football-score-item-operation"><img
											src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAAXNSR0IArs4c6QAAAYNQTFRFAAAA////////////v7//zMzM1dXVttvbv7/fzMzMudHRuMLMusTOucHTu8PMvb3OusHPu8HNuL7Qur/PuL3Mt8DOt7/Lub3Nt77OuL/OubzLt77Nub3Ot77LuL7Mub/Ntr3Nt77OuL7Lt77NtrzLuL7Nub/Nt7zOtr/Nt7zNuL3OuL7Lt73NuL3Ntr7OuL3MuL3Nt77Nt7zLuL3Mt77MuL3Lt77MuLzMt77NuLzLt73Mt77Mtr3Lt73MuL7Mt73Mtr7LuL3Mtr7Nt7zLt73Mt7zMt73NuL3Ltr3Mt7zMt73Mtr3Nt7zMt73MtrzMt7zMtr3MtrzLt73Mtr3Mtr3Lt7zMt73Mt73Mt73Lt73Mt7zMt73Lt7zLt73Mt7zLtrzLt73Mt7zLt73Mt73Mtr3Lt73MtrzMt73Mt73LtrzLt73MtrzLt7zLt73Mtr3Mt7zLt73Ltr3Mtr3Lt7zMt73Mtr3Mtr3Mtr3Lt73Lt7zMtrzMt73Mt73LtrzLtrzMt73MtrzL7eI62AAAAIB0Uk5TAAECAwQFBgcICgsZGh0eHyUpKzAyOUBCQ0RFR0lKS0xNTk9SVFZXWFtcXV5gYWJkZWZnaGpsbm91dnh5e3yBg4WIiYqLjY6PkJGSk5WboaSlqK6vtri5vsDCw8XGycrLzM7Q0dPV1tfY2dzd3t/g4uPk5+nq7u/29/j5+vv8/f6qjIkDAAABVElEQVQYGe3B5z8CcQAH4O+pZGfvmZEQUvZeWdkr84yMItuR+f3TXfHijt+nvOd58O9Ty8ldB36h/J18tyIuyc/JMR5LiKeSO8AWqxHPNq1AOWXEkc8jCcAhixDbGhugsnEdsaTaGTJCZQjSkQ6hTNvw6i1JN6KcJBXfdEsu9NJ8VL0FFnuSEGXunve/UCVboLVEZdadlwKdxJxGzx2XoXXDBgjZeQ0tmRMQ8nIXWsVv7IfAIF8LoFP/yiH8MMKXWnxT88xxfOPhczV+qArTK0FDmuFTJQRKHuiEhoOPpRCaoxUaFVyA2B4t0MjgPoSMYQU6StgAkWz6oLPBLIjUcwoRJpfbhAgv6yAySgcAQ9M5GWoyAGjjEERWWIgEW4A8C5KntRLKuAyRJfra/eSl02RsvSIPXJtchEgzVTcdZqjMnbdU2SHUdyF3JeNLSu/R/QD+ug9jeVZwFWlvUAAAAABJRU5ErkJggg=="
											class="collect"><img
											src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAAXNSR0IArs4c6QAAAMZQTFRFAAAAAAAAqqqqzMzMtra2xsbGs7PMs7Pmubm5scTEtrbIrrzJs7/Mv7/ZuLjMt7/PvLzSt7zNtbrKuLzMtr3Mtr3Qt77Lt73JuL3LtrvLt7zLt7zLt77Mt73MuLzNub3LtbvKtrzLtrzMt73Mt7zMtr3Mt7zMtrzNtr3Ktr3LtrzLtr3Mt73Lt73Mt77Nt73Mtr3Lt73Mt73MtbvKtrzMtrzLt7zLt73Mt73MtrzMtrzMtbzLtrzMtrzLtrzLtrzLtrzMtrzL+pzksgAAAEF0Uk5TAAEDBQcJCgoLDQ4TFBQZICIuMEFGRkpRXWJjZ2p4enuDhZCSlZqbnaWqrK6xubu9wc7V3uDo7O3w8/T2+Pn7/P0UbugzAAAA9ElEQVQ4y+3T2xaBQBQG4ORQkRwjZyJGcgo5Zdjv/1J0MauYGpa13GDftP+9vrv+4bifHmkKITOV3ocfnFjVtquxF1x9D7CvP5dl51CrHZzyM1faQDMeb8KmxHbF9bHlfVvHdZHl8ivoJrwl0YVVPtrllm6P7D13mYtymcXFSJKQNC6LTISb4RHvR36EZ6GSN/E4HTykx9jkaScOzxPh/iRMzkORgm13nn28Zedum4I7sBBCjRTJKc1AyIItBQfY699JI1k7eRn36TLIiqKo0CG5A+rtIEeUoxCEBcYv/DKok1VnQsHx374jsCpesYmzK9x/uCtxeixP9e3RcgAAAABJRU5ErkJggg=="
											class="arrow-top"></div>
								</div>
							</div>
						</div>
					</li>
				</template>

			</ul>
		</section>
			<div class="btn" @click="getList()">
				点击我
			</div>
	</article>
</template>
<script>
	import {
		match_filter,
		football_match,
		footballOddsList,
		getfootballDetail
	} from "@/api/football.js";
	export default {
		name: 'ListView',
		props: {
			data: {
				type: Array,
				default: function() {
					const list = []
					for (let i = 0; i < 1000000; i++) {
						list.push('列表' + i)
					}
					return list
				}
			},
			height: {
				type: Number,
				default: 600
			},
			itemHeight: {
				type: Number,
				default: 30
			},
		},
		computed: {
			contentHeight() {
				return this.list.length * this.itemHeight + 'px';
			}
		},
		mounted() {
			this.getList();
		},
		data() {
			return {
				visibleData: [],
				list: []
			};
		},
		methods: {
			getList() {
				football_match({
						type: 0,
						is_web: 1,
						company_id: this.id
					})
					.then((res) => {
						// return
						this.list = []
						this.allList = res.data.data
						// this.list3 = res.data.data.filter(obj => {
						// 	return obj.status === 8
						// })
						let list1 = []
						let list2 = []
						let list3 = []
						let list4 = []
						let list5 = []
						let arr = []
						res.data.data.forEach(obj => {
							if (obj.status === 8) { //完场
								obj.type = 3
								list3.push(obj)
							} else if (obj.status == 2 ||
								obj.status == 3 ||
								obj.status == 4 ||
								obj.status == 5 ||
								obj.status == 6 ||
								obj.status == 7) { //进行中
								let obj1 = {
									eu: {
										scram: {
											win: 0,
											draw: 0,
											fail: 0
										},
										initial: {
											win: 0,
											draw: 0,
											fail: 0
										},
										immediate: {
											win: 0,
											draw: 0,
											fail: 0
										},
									},
									bs: {
										scram: {
											win: 0,
											draw: 0,
											fail: 0
										},
										initial: {
											win: 0,
											draw: 0,
											fail: 0
										},
										immediate: {
											win: 0,
											draw: 0,
											fail: 0
										},
									},
									asia: {
										scram: {
											win: 0,
											draw: 0,
											fail: 0
										},
										initial: {
											win: 0,
											draw: 0,
											fail: 0
										},
										immediate: {
											win: 0,
											draw: 0,
											fail: 0
										},
									},

								}
								obj.type = 1
								obj = Object.assign(obj, obj1);
								list1.push(obj)
							} else if (obj.status === 1) { //未开始
								obj.type = 2
								list2.push(obj)
							} else if (obj.status == 9 ||
								obj.status == 10 ||
								obj.status == 11 ||
								obj.status == 12 ||
								obj.status == 13) { //异常
								obj.type = 4
								list5.push(obj)
							} else {
								obj.type = 5
							}
							arr.push(obj.competition_id)
						})
						// // console.log(list1[0]);
						let id1 = list1[list1.length - 1].id
						// console.log(id1);
						// // console.log(list2[0]);
						let id2 = list2[list2.length - 1].id
						// console.log(id2);
						// // console.log(list3[0]);
						let id3 = list3[list3.length - 1].id
						// console.log(id3);
						// // console.log(list5[0]);
						let id4 = list5[list5.length - 1]
						// console.log(id4);
						let arrList = this.list.concat(list1).concat(list2).concat(list3).concat(list5)

						// let indexArr = [id1,id2,id3,]
						// 添加标题
						arrList.forEach((item, index) => {
							let obj = {
								competition_name_zh: ''
							}
							if (item.id == id1) {
								obj.competition_name_zh = '未开始'
								arrList.splice(index + 1, 0, obj)
							} else if (item.id == id2) {
								obj.competition_name_zh = '已结束'
								arrList.splice(index + 1, 0, obj)
							} else if (item.id == id3) {
								obj.competition_name_zh = '异常'
								arrList.splice(index + 1, 0, obj)
							}

						})
						arrList.splice(0, 0, {
							competition_name_zh: '进行中'
						})
						// indexArr.forEach(item=>{
						// 	let obj = {
						// 		competition_name_zh:'标题---------------'
						// 	}
						// 	// console.log(item);
						// 	arrList.splice(item,0,obj)
						// })
						this.list = arrList
						// console.log(this.list);
						this.updateVisibleData()
					})
					.catch((res) => {});
				// }
			},


			updateVisibleData(scrollTop) {
				scrollTop = scrollTop || 0;
				const visibleCount = Math.ceil(this.$el.clientHeight / this.itemHeight); // 取得可见区域的可见列表项数量
				const start = Math.floor(scrollTop / this.itemHeight); // 取得可见区域的起始数据索引
				const end = start + visibleCount; // 取得可见区域的结束数据索引
				this.visibleData = this.list.slice(start, end); // 计算出可见区域对应的数据，让 Vue.js 更新
				this.$refs.content.style.webkitTransform =
					`translate3d(0, ${ start * this.itemHeight }px, 0)`; // 把可见区域的 top 设置为起始元素在整个列表中的位置（使用 transform 是为了更好的性能）
			},
			handleScroll() {
				const scrollTop = this.$el.scrollTop;
				this.updateVisibleData(scrollTop);
			}
		}
	}
</script>
<style lang="scss" scoped>
	.list-view {
		overflow: auto;
		position: relative;
		border: 1px solid #aaa;
		// width: 200px;
		margin-top: 100px;
	}
	.btn {
		position: fixed;
		bottom: 67px;
		z-index: 999;
	}

	.list-view-phantom {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		z-index: -1;
	}

	.list-view-content {
		left: 0;
		right: 0;
		top: 0;
		position: absolute;
	}

	.list-view-item {
		padding: 5px;
		color: #666;
		line-height: 30px;
		box-sizing: border-box;
	}

	.immediate,
	.width180 {
		display: flex;
	}
</style>
