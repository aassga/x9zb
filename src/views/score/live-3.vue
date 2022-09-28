<template>
	<div role="tabpanel" tabindex="0" aria-hidden="false" style="" class="ant-tabs-tabpane ant-tabs-tabpane-active"
		id="rc-tabs-0-panel-4" aria-labelledby="rc-tabs-0-tab-4">
		<div class="statistic-match-wrap">
			<div class="team-lineup-view">
				<div class="list-main">
					<div class="list-container">
						<div class="list-panel">
							<div class="team-logo">
								<div class="lazyload-wrapper">
									<img
										:src="item.home_team_log" />
								</div>
							</div>
							<div class="team-info">{{item.home_team_name_zh}}({{list.home_formation}})</div>
							<div class="items-panel">
								<!-- 场上主队 -->
								<div class="item flex-end" v-for="(item1,index) in home_list">
									<span class="name">{{item1.name}}</span><span class="number">{{item1.shirt_number}}</span><span
										class="role">{{getStatus(item1)}}</span>
									<div class="img-box-wrapper">
										<img class="icon"
											:src="item1.logo" />
									</div>
								</div>
								
								<div class="item sub-title text-right">
									替补阵容
								</div>
								<!-- 主队替补 -->
								<div class="item flex-end" v-for="(item1,index) in list.home_player">
									<span class="name">{{item1.name}}</span><span class="number">{{item1.shirt_number}}</span><span
										class="role">{{getStatus(item1)}}</span><img class="icon"
											:src="item1.logo" />
								</div>
								
							</div>
						</div>
						<div class="empty"></div>
						<div class="list-panel">
							<div class="team-logo">
								<div class="lazyload-wrapper">
									<img
										:src="item.away_team_log" />
								</div>
							</div>
							<div class="team-info">{{item.away_team_name_zh}}({{list.away_formation}})</div>
							<div class="items-panel" >
								<div class="item flex-start" v-for="(item1,index) in away_list">
									<div class="img-box-wrapper">
										<img class="icon left-item-icon"
											:src="item1.logo" />
									</div>
									<span class="role">{{getStatus(item1)}}</span><span class="number">{{item1.shirt_number}}</span><span
										class="name">{{item1.name}}</span>
								</div>
								
								<div class="item sub-title text-left">
									替补阵容
								</div>
								<!-- 客队替补 -->
								<div class="item flex-start" v-for="(item1,index) in list.away_player">
									<img class="icon"
										:src="item1.logo" /><span
										class="role">{{getStatus(item1)}}</span><span class="number">{{item1.shirt_number}}</span><span class="name">{{item1.name}}</span>
								</div>
								
							</div>
						</div>
					</div>
					<div class="lineup-panel">
						<div class="lineup-container">
							<div class="host-coach" v-if="list.home_manager">主教练：{{list.home_manager.name_zh}}</div>
							<div class="lineup-list host">
								<div class="logo-bg">
									<img :src="item.home_team_log" />
								</div>
								<div class="host-player" v-for="(item1,index1) in home_player" :key="index1">
									<div class="host-player-item4" v-for="(item2,index2) in item1" :key="index2">
										<div class="item">
											<div class="player-records">
												<div class="left">
													<!-- {{item2.incidents}} -->
													<div v-for="(item3,index3) in item2.incidents" v-if="item3.type == 3">
														<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAVUExURUdwTO3TGurMEuzPFujMEO7bWOzVOIdoDjQAAAAEdFJOUwAdVSkiE2fEAAAAc0lEQVQoz6XTwQmAQAxEUcEKPNiAFViDpgKNKUDSfw2CrhjXv7DgPz7mOk1Tqgvd1m+hlXAh3P/hVItGqNXohAJohErohAJohEoogEaohAJohA54DnNUwGuYoQOm4RsdUAVQAB3Q5IvBHgwmc8J2CI2ltxwuz5bFii1DPAAAAABJRU5ErkJggg=="
															width="24" />
													</div>
													<div  v-for="(item3,index3) in item2.incidents" v-if="item3.type == 17">
														<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAEsUExURUdwTONZV/S6uudaWvbJyf///+JYV+JaWf/Ly/+2tuRZWf3y8vri4uNZV//8/OJXVv/+/v///////+FXVuJYVuJYVuJYV+lfX+VnZuNaV+JYV+NZV//8/OJZWP/////7+/nW1f/6+uySkf///+qNjOJYVv709P719fKzs+VnZv////////zn5+qFhfrc3P7x8f/////////+/v719fzt7e6Yl//+/vO6ufGvr////++mpPfT0/ng3ud6evbIx/nc3PCqqvGsrP////rj4+FXVv/////+/uNfXv/////6+v309PKysvjW1uuOjed1dPfR0fCqquqIh/vm5uJZWP74+Pnc3O+lpOl/fu2ame+goOh6eemDg/zu7uRkY/XBweVsa+yTkvGtreZvbuZxcAPln9YAAABEdFJOUwBW/Rb+JtbDAQYxz8RuYcy1eYP3hLHgDf09eo7h/VfRsnGYD/eb5NzI7TIU99b005Sk5Z7J4fHd8UK0heP33tq+XL7huFeHbAAAAsRJREFUOMuFlGdT4zAQhp1u0hNIAZIQuIHQ4Rjqde5W8sSxk9gpTq///z+cJNuKDMfc+8FjaZ7VrnZXK0mC5GgiclYsK8XvD6eHIekDyYW9/JXf1MGWsvhxuPUvbmsn/KuLEOqOwJX1rSK/43ZTR4+IaTLnZGeY/vSG80W+YuSopzjcvLG0ap5Q5QR8QRu1OvQ0o0VMZ6MTkUwALAUQ+WHaNxFzoTVrG+/RbYCBCHab9Y3RIu3eqJAnnsYi2BoKC32WdMA9GvhKBPtB8fj1iZ3PwDbLrwhaqrhqLDMM3LFzoYohIk/E8xoDwzbYc/dxcDzCHrLvpymKOkUYa3Zd2kWyGnpBPeNeRRlOeroVxC29Y9v5BW4G0zQBjwGmSxVhjMyBsqlyi3Masf1JwEj+iGd3ykFQTGfPpJtBAqbkDDdebUBYqUg1MVLXdDEjmUxJhxzkragQ6dhYY82gvx0/qWJEqnDQcEGWHhXcAhnPNEbpnIMLDg6aI92Csa6Pms1mffxEwcAFB4ccHHf6Daa2vgJkVQm475MOXHDJQWPOCzVU0Ij2j+9Y4tduC645OJijMe3dQlgKuSWwGobyFkQDCz+wpsiljk979KE2DPLFPQrjvg3iyUTrNHqv9kNlJVsvFnqd9w8Hp7Ca4WenwyPwptEI4IC0BVC3ms1W2JFlGxT6Hw/nqivzOha7+yz2eEMAdfAoboOy7Vx4sdg0J2qXSr2sHcQ5GGDPweDchDF1WvF6vY4PIH7r3CeQIuCZ+1JUrWVLu7z+EyuhGNxn3WFRyAFsh9I2WPTEd4ru4SYjzLM8BKTzLK275ur6JhYjJ8ahlNwMNLmwH96PSlLoqO3oqZq9ZR6qZfziHbq+XDi3wwYHMCNJvqvF7+NnV+ji3YCO+hJ7Cd9uwFnfxgDKV3fpj+Y+H90vuFR6RL8vpP9JTiaTlXP69xdRbTcFssd+OQAAAABJRU5ErkJggg=="
															width="24" />
													</div>
												</div>
												<div class="number">{{item2.shirt_number}}</div>
												<div class="right">
													<div>
														<div v-for="(item3,index3) in item2.incidents" v-if="index3 == 0">
															<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACBUExURUdwTJVXV6E/P202NppNTX5ERKlcXE4rKyEWFrhqaqZfX7FkZLFVVapLS4k7O7NLS6RfX59cXK1kZP+Dg/6Skv94eP+IiP+Li/9+fv+Ojv9xcdZ7e9R0dP+NjctdXdtgYMJtbeGAgOd0dLphYfZ1dfWLi7xWVvSFhepnZ79KSvloaH23I8EAAAATdFJOUwBbgyNtNK8TCPue5um6RfCTes7hg4CpAAAAwklEQVQoz6WR2RKDIAxFUVQQtS7FtoKK+/b/H1haHVee2jPMEHJnQnIDwE8EFtwe0ArWOOIFQXOISMGjVdA4Le0QA4BDu6RcWwVsU0q5o2kOl4GNt7qklIk2TVt5lWT3u1lkSSZPIinMfV9O/1zonUPDRvpYSI2DgOr7Qo2OM1rVnK+s0/Bm/vqSm2db3CaWNO7FL0N8BGFcBNSxOGYdulrsDYwNnsL7W85YflMI2J8mH6vWpQuhK/cIxxGqN6zr4B/e5LoOQcMFYpgAAAAASUVORK5CYII="
																width="24" /><span >{{item3.minute}}'</span>
														</div>
													</div>
													<div v-for="(item3,index3) in item2.incidents" v-if="item3.type == 1">
														<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABvUExURUdwTP///////////////////////////////////////////////////////////zMzM2RkZNvb2/T09O3t7VdXVzg4OHFxcUlJSeXl5dLS0oiIiMPDw6ysrH19fba2tqKiopeXlz8/P83NzcfHx/aeaG0AAAAPdFJOUwAW0yMLUuj1f6hyv9mCg7zH0+wAAAI6SURBVDjLhVXZgqMgECTHxBiTaRAQQfGc///G5VLaTHa3n0gsbKiqLgk51OVRVs+ieFbl40L+WqfXGQC06ftVu8X5dfoIu94L0JOSLfW1MMuhuF9/475uYAZmBeiFxmpUDbevd9wdeOce+FobukE7Dvdj2xJW2UOqke5IuUKJ25cwtgL2miOsnYR220vcd6QLoBocTIUOnI25+xcYdyyOgEXb6bTk0kC60fUmPCU1fqXMSy357Zoa+060RzgzoB/jEJufijoc3aJn04hfz+rCa/QNKgBn9EhpDOwHeDngWUSCUTfTwqGkPju/gI2syUQkt5LS6QCcLVzIA1jAKcsGd/G6i1IfrtYoeDhRFi+qJ+eHKbaJt2S2dOvUKEnF6TJv8nW7ynSXlLuTUF2Rp1FZkykDKUt/B07qJyl6xItFQCf2WmsRm6wFKVYEHDFQzt2gZFz3BXnWXQauGGjCCeNkmCeptMrAGuE63IRXjh7slIxbtit6xjw9D1CZMpGBuy20U5g5wp2Eu16cdSxNFjsMhpeQnHXbWeMbCeaEcyw4cIPsw9tGOFOQV/StVJMbue32EnvCqmCzzbgHox0MmYy7jcLhXBb5zKZRcMOVWEV2FXmTkCINVxpXiie2buQk0pZ9XEMABOR+sDC/jY8ALkccPyX0HvkDSI1wmNkFRfkWUm2e2Ozf9i2kYuw13bsrf8VeDNJasUnDdjPaDOZDkMZo5pZJFbhalNvzMZq9Rt8h7Ne+N/8K+/98Pv4AiihWVxyQ2Z8AAAAASUVORK5CYII="
															width="24" />
													</div>
												</div>
											</div>
											<div class="name">
												{{item2.name}}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="referee-name" v-if="list.away_manager"></div>
							<div class="lineup-list guest">
								<div class="logo-bg">
									<img :src="item.away_team_log" />
								</div>
								<div class="guest-player" v-for="(item1,index1) in away_player">
									<div v-for="(item2,index2) in item1">
										<div class="item">
											<div class="player-records">
												<div class="left">
													<!-- {{item2.incidents}} -->
													<div v-for="(item3,index3) in item2.incidents" v-if="item3.type == 3">
														<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAVUExURUdwTO3TGurMEuzPFujMEO7bWOzVOIdoDjQAAAAEdFJOUwAdVSkiE2fEAAAAc0lEQVQoz6XTwQmAQAxEUcEKPNiAFViDpgKNKUDSfw2CrhjXv7DgPz7mOk1Tqgvd1m+hlXAh3P/hVItGqNXohAJohErohAJohEoogEaohAJohA54DnNUwGuYoQOm4RsdUAVQAB3Q5IvBHgwmc8J2CI2ltxwuz5bFii1DPAAAAABJRU5ErkJggg=="
															width="24" />
													</div>
													<div  v-for="(item3,index3) in item2.incidents" v-if="item3.type == 17">
														<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAEsUExURUdwTONZV/S6uudaWvbJyf///+JYV+JaWf/Ly/+2tuRZWf3y8vri4uNZV//8/OJXVv/+/v///////+FXVuJYVuJYVuJYV+lfX+VnZuNaV+JYV+NZV//8/OJZWP/////7+/nW1f/6+uySkf///+qNjOJYVv709P719fKzs+VnZv////////zn5+qFhfrc3P7x8f/////////+/v719fzt7e6Yl//+/vO6ufGvr////++mpPfT0/ng3ud6evbIx/nc3PCqqvGsrP////rj4+FXVv/////+/uNfXv/////6+v309PKysvjW1uuOjed1dPfR0fCqquqIh/vm5uJZWP74+Pnc3O+lpOl/fu2ame+goOh6eemDg/zu7uRkY/XBweVsa+yTkvGtreZvbuZxcAPln9YAAABEdFJOUwBW/Rb+JtbDAQYxz8RuYcy1eYP3hLHgDf09eo7h/VfRsnGYD/eb5NzI7TIU99b005Sk5Z7J4fHd8UK0heP33tq+XL7huFeHbAAAAsRJREFUOMuFlGdT4zAQhp1u0hNIAZIQuIHQ4Rjqde5W8sSxk9gpTq///z+cJNuKDMfc+8FjaZ7VrnZXK0mC5GgiclYsK8XvD6eHIekDyYW9/JXf1MGWsvhxuPUvbmsn/KuLEOqOwJX1rSK/43ZTR4+IaTLnZGeY/vSG80W+YuSopzjcvLG0ap5Q5QR8QRu1OvQ0o0VMZ6MTkUwALAUQ+WHaNxFzoTVrG+/RbYCBCHab9Y3RIu3eqJAnnsYi2BoKC32WdMA9GvhKBPtB8fj1iZ3PwDbLrwhaqrhqLDMM3LFzoYohIk/E8xoDwzbYc/dxcDzCHrLvpymKOkUYa3Zd2kWyGnpBPeNeRRlOeroVxC29Y9v5BW4G0zQBjwGmSxVhjMyBsqlyi3Masf1JwEj+iGd3ykFQTGfPpJtBAqbkDDdebUBYqUg1MVLXdDEjmUxJhxzkragQ6dhYY82gvx0/qWJEqnDQcEGWHhXcAhnPNEbpnIMLDg6aI92Csa6Pms1mffxEwcAFB4ccHHf6Daa2vgJkVQm475MOXHDJQWPOCzVU0Ij2j+9Y4tduC645OJijMe3dQlgKuSWwGobyFkQDCz+wpsiljk979KE2DPLFPQrjvg3iyUTrNHqv9kNlJVsvFnqd9w8Hp7Ca4WenwyPwptEI4IC0BVC3ms1W2JFlGxT6Hw/nqivzOha7+yz2eEMAdfAoboOy7Vx4sdg0J2qXSr2sHcQ5GGDPweDchDF1WvF6vY4PIH7r3CeQIuCZ+1JUrWVLu7z+EyuhGNxn3WFRyAFsh9I2WPTEd4ru4SYjzLM8BKTzLK275ur6JhYjJ8ahlNwMNLmwH96PSlLoqO3oqZq9ZR6qZfziHbq+XDi3wwYHMCNJvqvF7+NnV+ji3YCO+hJ7Cd9uwFnfxgDKV3fpj+Y+H90vuFR6RL8vpP9JTiaTlXP69xdRbTcFssd+OQAAAABJRU5ErkJggg=="
															width="24" />
													</div>
												</div>
												<div class="number">{{item2.shirt_number}}</div>
												<div class="right">
													<div>
														<div v-for="(item3,index3) in item2.incidents" v-if="index3 == 0">
															<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACBUExURUdwTJVXV6E/P202NppNTX5ERKlcXE4rKyEWFrhqaqZfX7FkZLFVVapLS4k7O7NLS6RfX59cXK1kZP+Dg/6Skv94eP+IiP+Li/9+fv+Ojv9xcdZ7e9R0dP+NjctdXdtgYMJtbeGAgOd0dLphYfZ1dfWLi7xWVvSFhepnZ79KSvloaH23I8EAAAATdFJOUwBbgyNtNK8TCPue5um6RfCTes7hg4CpAAAAwklEQVQoz6WR2RKDIAxFUVQQtS7FtoKK+/b/H1haHVee2jPMEHJnQnIDwE8EFtwe0ArWOOIFQXOISMGjVdA4Le0QA4BDu6RcWwVsU0q5o2kOl4GNt7qklIk2TVt5lWT3u1lkSSZPIinMfV9O/1zonUPDRvpYSI2DgOr7Qo2OM1rVnK+s0/Bm/vqSm2db3CaWNO7FL0N8BGFcBNSxOGYdulrsDYwNnsL7W85YflMI2J8mH6vWpQuhK/cIxxGqN6zr4B/e5LoOQcMFYpgAAAAASUVORK5CYII="
																width="24" /><span >{{item3.minute}}'</span>
														</div>
													</div>
													<div v-for="(item3,index3) in item2.incidents" v-if="item3.type == 1">
														<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABvUExURUdwTP///////////////////////////////////////////////////////////zMzM2RkZNvb2/T09O3t7VdXVzg4OHFxcUlJSeXl5dLS0oiIiMPDw6ysrH19fba2tqKiopeXlz8/P83NzcfHx/aeaG0AAAAPdFJOUwAW0yMLUuj1f6hyv9mCg7zH0+wAAAI6SURBVDjLhVXZgqMgECTHxBiTaRAQQfGc///G5VLaTHa3n0gsbKiqLgk51OVRVs+ieFbl40L+WqfXGQC06ftVu8X5dfoIu94L0JOSLfW1MMuhuF9/475uYAZmBeiFxmpUDbevd9wdeOce+FobukE7Dvdj2xJW2UOqke5IuUKJ25cwtgL2miOsnYR220vcd6QLoBocTIUOnI25+xcYdyyOgEXb6bTk0kC60fUmPCU1fqXMSy357Zoa+060RzgzoB/jEJufijoc3aJn04hfz+rCa/QNKgBn9EhpDOwHeDngWUSCUTfTwqGkPju/gI2syUQkt5LS6QCcLVzIA1jAKcsGd/G6i1IfrtYoeDhRFi+qJ+eHKbaJt2S2dOvUKEnF6TJv8nW7ynSXlLuTUF2Rp1FZkykDKUt/B07qJyl6xItFQCf2WmsRm6wFKVYEHDFQzt2gZFz3BXnWXQauGGjCCeNkmCeptMrAGuE63IRXjh7slIxbtit6xjw9D1CZMpGBuy20U5g5wp2Eu16cdSxNFjsMhpeQnHXbWeMbCeaEcyw4cIPsw9tGOFOQV/StVJMbue32EnvCqmCzzbgHox0MmYy7jcLhXBb5zKZRcMOVWEV2FXmTkCINVxpXiie2buQk0pZ9XEMABOR+sDC/jY8ALkccPyX0HvkDSI1wmNkFRfkWUm2e2Ozf9i2kYuw13bsrf8VeDNJasUnDdjPaDOZDkMZo5pZJFbhalNvzMZq9Rt8h7Ne+N/8K+/98Pv4AiihWVxyQ2Z8AAAAASUVORK5CYII="
															width="24" />
													</div>
												</div>
											</div>
											<div class="name">{{item2.name}}</div>
										</div>
									</div>
								</div>
							</div>
							<div class="guest-coach" v-if="list.away_manager">主教练：{{list.away_manager.name_zh}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['item','list'],
		data() {
			return {
				home_player:[],
				away_player:[],
				home_list:[],
				away_list:[],
				away_zhu_list:[]
			}
		},
		watch:{
			list(e){
				console.log(e)
				let _this = this
				let home_list = e.home_player
				let away_list = e.away_player
				
				this.away_zhu_list = away_list.reverse()//客队场上倒序
				// 处理站位问题
				this.home_player =  e.home_player_first
				// .forEach(item=>{
				// 	item.forEach(item1=>{
				// 		item1.incidents.forEach((item2,index)=>{
				// 			if(item2.type == 101){//换下场
				// 				item1.type1 = 1
				// 			}else if(item2.type == 100){//换上场
				// 				item1.type2 = 2
				// 			}else if(item2.type == 17){//乌龙球
				// 				item1.type3 = 3
				// 			}else if(item2.type == 4){//红牌
				// 				item1.type4 = 4
				// 			}else if(item2.type == 3){//黄牌
				// 				item1.type5 = 5
				// 			}else if(item2.type == 1){//进球
				// 				item1.type6 = 6
				// 			}
				// 			// return item1.minute = item2.minute
							
				// 		})
				// 	})
				// })
				// console.log(this.home_player)
				this.away_player = e.away_player_first
				
				// 获取上场人员列表 主队
				e.home_player_first.forEach(item=>{
					item.forEach(item1=>{
						_this.home_list.push(item1)
					})
				})
				// 获取上场人员列表 客队
				e.away_player_first.forEach(item=>{
					item.forEach(item1=>{
						_this.away_list.push(item1)
					})
				})
				
			}
		},
		methods:{
			getStatus(type){
				if(type.position  == 'F'){
					return '前锋'
				}else if(type.position == 'M'){
					return '中场'
				}else if(type.position == 'D'){
					return '门将'
				}else {
					return ' '
				}
				// item.position == 'F'?'前锋':item.position == 'M'?'中场':item.position == 'D'
			}
		}
	}
</script>

<style>
</style>
