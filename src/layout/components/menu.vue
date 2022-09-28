<template>
	<div class="anchor-home-left-nav">
		<ul class="live-group">
			<li class="live-group-list1">
				<ul>
					<li v-for="(item,index) in list" :key="index" @click="tabIndex = index">
						<a class="live-group-item" :class="index==tabIndex?'live-group-item-active':''" @click="$router.push(item.url)">
							<div class="live-group-item-saicheng live-group-item-icon" :class="item.css"></div><span
								class="live-group-item-text">{{item.name}}</span>
						</a>
					</li>
				</ul>
			</li>
			<li class="live-group-list3">
				<ul>
					<li class="download-box">
						<a href="/download">
							<span class="live-group-item-yellow"></span>
						</a>
					</li>
					<li class="live-group-anchor-box">
						<a href="/about-user">
							<div class="live-group-anchor"></div>
						</a>
						
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
	
	export default {
		data() {
			return {
				tabIndex:0,
				list:[
					{
						name:'赛程',
						url:'/schedule',
						num:3,
						css:'live-group-item-saicheng'
					},
					// {
					// 	name:'榜单',
					// 	url:'/rank',
					// 	num:3,
					// 	css:'live-group-item-bangdan'
					// },
					// {
					// 	name:'关注',
					// 	url:'/attention',
					// 	num:3,
					// 	css:'live-group-item-follow'
					// },
					{
						name:'预约',
						url:'/reserve',
						num:3,
						// show:true,
						css:'live-group-item-yuyue'
					},
					{
						name:'全部',
						url:'/anchor?type=0',
						num:2,
						css:'live-group-item-all'
					},
					{
						name:'足球',
						url:'/anchor?type=1',
						num:2,
						css:'live-group-item-football'
					},
					{
						name:'篮球',
						url:'/anchor?type=2',
						num:2,
						css:'live-group-item-basketball'
					},
					{
						name:'更多',
						url:'/anchor?type=3',
						num:3,
						show:true,
						css:'live-group-item-more'
					}
				]
			}
		},
		watch:{
			'$route.query'(e){
				let type = e.type
				this.setTabIndex(type,e)
				
			}
		},
		mounted() {
			let type = this.$route.query.type
			this.setTabIndex(type)
		},
		methods:{
			setTabIndex(type,e){
				console.log(type,e);
				if(type == 0){
					this.tabIndex = 4
				}else if(type == 1){
					this.tabIndex = 5
				}else if(type == 2){
					this.tabIndex = 6
				}else if(type == 3){
					this.tabIndex = 7
				}else if(type == 4){
					this.tabIndex = 0
				}else {
					this.tabIndex = null
				}
			}
		}
	}
</script>

<style>
	.anchor-home-left-nav {
	  position: fixed;
	  left: 0;
	  top: 60px;
	  z-index: 3;
	  width: 90px;
	  display: flex;
	  flex-direction: column;
	  justify-content: space-between;
	}
	.anchor-home-left-nav .live-group {
	  position: relative;
	  list-style: none;
	  width: 90px;
	  height: calc(100vh - 60px);
	  min-height: 720px;
	  padding-top: 27px;
	  background-color: #292a35;
	}
	.anchor-home-left-nav .live-group .live-group-header {
	  font-size: 15px;
	  color: #a6a6a6;
	  text-align: center;
	  font-weight: 600;
	  margin: 10px 0 12px 0;
	}
	.anchor-home-left-nav .live-group .live-group-anchor {
	  display: inline-block;
	  text-align: center;
	  cursor: pointer;
	  background-image: url(../../assets/images/nav-zuozhubo.png);
	  background-size: 100% 100%;
	  width: 64px;
	  height: 26px;
	}
	.anchor-home-left-nav .live-group .live-group-anchor:hover {
	  background-image: url(data:image/png;base64,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);
	}
	.anchor-home-left-nav .live-group .live-group-list1 li {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  margin-bottom: 23px;
	}
	.anchor-home-left-nav .live-group .live-group-list3 {
	  width: 78px;
	  position: absolute;
	  bottom: 20px;
	  left: 0;
	}
	.anchor-home-left-nav .live-group .live-group-item-yellow {
	  display: block;
	  width: 64px;
	  height: 26px;
	  margin: 23px auto 0 auto;
	  background-image: url(../../assets/images/nav-xiazai.png);
	  background-size: 100% 100%;
	}
	.anchor-home-left-nav .live-group .live-group-item-yellow:hover {
	  background-image: url(data:image/png;base64,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);
	}
	.anchor-home-left-nav .live-group .live-group-item {
	  display: flex;
	  flex-direction: column;
	  align-content: center;
	  justify-content: center;
	  cursor: pointer;
	  color: #d9ddec;
	}
	.anchor-home-left-nav .live-group .live-group-item:hover .live-group-item-anchor,
	.anchor-home-left-nav .live-group .live-group-item.live-group-item-active .live-group-item-anchor {
	  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABUUExURUdwTOnCjfTUreW9gN+zcOzIlu7Km9qsYunCi+7IkdyuZerFkPvgxPrewuG4efTUrujBi+W+hPbYtuzImOrFkd+0cvHRqN2xa+7LnuO7fvDOovrdv+7wtNYAAAAOdFJOUwC4m0PrVuX9fhqq1tXSIfRDSwAAAVRJREFUSMftlVmChCAMBdsFjTqDMtpu3P+ewyLyiNygm++qkJBEX6/v+ajTlb9a6z97xnFc1/U8z32f57kpRI4X2uKa8VZYlqXIxNfuXPyY8tNED6FEfnUXAD9NHRd+0viMV6qyWRBFj10QElqCQAY/pOxRyDzQfYEiUUsp3zUXLD82omQJqcMcLsQCzJOIBgp2grQ8CpCQe8PSCTfv4qPgWnYV4B+9GjAhz6MQO7aGLhHGfxth2zYUAn/ebe0Ky98FMCF2DOagwIQM36bC1YFUiAWkAozcLVQD40HAEYpF84TaRAj8Hp6V89YAIY4Q+Qd68G1yA4yoGw3WMcsnKeHONOTDq0M53ras9heggDu5wMj5+FTVTyHZSVaASZMMHxeoCXxmRI3Q+hXt44qW147FfFTSscdHoNvZjqUdo8yHDHZMTawDff5TOeTj1734/kg+8/wDmzNFM8H5GpkAAAAASUVORK5CYII=);
	}
	.anchor-home-left-nav .live-group .live-group-item:hover .live-group-item-saicheng,
	.anchor-home-left-nav .live-group .live-group-item.live-group-item-active .live-group-item-saicheng {
	  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAzUExURUdwTOe/hejCjOW+hPTQovLRqO7Km9ipXfPUrenDjeK5e+vHlt+0cu/Mn9yvaPLSqvfYtlV4WNEAAAAKdFJOUwA6//8VSVj+4d+a0MOdAAABZElEQVRIx+2Sy5KEIAxFEWjlIeL/f+3kgYokbc9iZjM1WZmqc+IlYMyfq1cIr6deVNj3cOtLCY/CDtX3BeqHhCkQykKlQhT4bEzOOU4yfBMqCaUWFjIJ1kYlCwrAssBhgEfBQulCbQL9oFAYEOxHoRx/uAT3JBDd0mdLglOEWr0JtQbjG5+9iRlO65GXQt3rzE9hJh4M6GOE3jlFwDDB46cPNB6Xz33UhFpRCbP3c+DxkD5H7IlPSQjHbTUaedoOVXKKUNp1HYbt+KT+oRzrPHEWUtIFhb/mC+H3q4+TRZwVShN63PIymU+qcOL5Pn/lEkJ/W7aPQ8a2jUJ7DWp84NdR6OY7O/KAb5rQXe5tPOKaMDy2Mz7zUjh4i+Ndf9x3wvnWbuvc2FiWQbDneCfTbMsboXvMt/nIK8KxfXfhHS8F9bYuXgj9+DTE14Rr+6uMrwlxOO44XwhTTPI1bBe+TOa/vl9fTcQmqs37M8gAAAAASUVORK5CYII=);
	}
	.anchor-home-left-nav .live-group .live-group-item:hover .live-group-item-bangdan,
	.anchor-home-left-nav .live-group .live-group-item.live-group-item-active .live-group-item-bangdan {
	  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABjUExURUdwTOa+g/TUrvHQpOO5e+vGlOK4efrWp+S7f+vDjOW8f/TUrevHlea+hOK5evncvPHPpfTVr+3JmuzIleK4eeS8gOa/h+3JmujCjPPTq/HPperEkO/NoPXWsuvHlfjaud+zcKhAVEIAAAAUdFJOUwCv2EZ94YoI3BxAb8hgydySrfUoI5DmLwAAAdBJREFUSMftlcu2oyAQRUFQBJX4AI2JGv//K7tARUwwbY96rbtuTTLIPif1ooLQb/xTZC8bo4ke4gExDEPXdXUWFNw++GHhuy4/FRzsV/9umuKvgv7oP03TMyBgjN0+0l/9QQBfH+u1+Y/bD6z5rPj0fD7v9zYvgv0J+Rv+3rYt9bK/VVW12RtBTbKVX+wxxrFOPYFpdLSUa+slqHH5gL1BqSeIXpUTPBae5V46VoC1dILyNUITIscXlo95Nq3pg4BpnTgBGUdiBTb/B/CV4VGxlQsCobXYhzCO5SIw7YF6DN+gJrb5LIJEK28U1RgZge0/SMtuqhvEHW/KlQr7g+t7jqKl/yXwXS1WvjU8CLhS3uAQ7/vMCmBaQ2x5lu88CAqluL8bVR+RyK1nTY68TkWq5GGZSO+v8xuvtFLHjMwoPD5HDPv+BlfJ+36TLHfPhRx4EEgqAg+IfKyn8xfBF8dqb/19f5WenI1y9b+/+c/JiYDXwXzUzM8uEw3zxekpg+4HePzl+Pn7s/Ep/3Yueb6s585L/v3AMnzoj8LsrzdZyN1fiktnvKHYTAvT5vrpTwLb9t8F83VBQSmV8yzho7jCC9P/La60lae7IOU/8u//D4TwUBzBlA3hAAAAAElFTkSuQmCC);
	}
	.anchor-home-left-nav .live-group .live-group-item:hover .live-group-item-follow,
	.anchor-home-left-nav .live-group .live-group-item.live-group-item-active .live-group-item-follow {
	  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABaUExURUdwTPbXs/HPpPjZuPbXtPLQpuC2denDju3IkOK3dufBieG2dvLPpPfZtuzHlt6ybufAiOS8geO5fOjCjeG3dt+zcPLRqe7LnuvHlfjauerFke3JmfDOo/XWsmDPozQAAAAQdFJOUwCqwlTofbxLF3Kh2y/H5PFbJC/CAAABeUlEQVRIx+2V25KDIAyGQUEOHmpVrNr6/q+5QWSFFLfdm53ZmeaS+ZL8ORgJ+di/t4qymdU0P15ynTVTo0Uar2ewFYxx98Kb2/0+TcuyZNUzn8+eX8eRSkIkvXm+b3txws8WB8sIyQ6+b9sWeUgWJhgfI+eOn3b+epWRA3U4FYLZBA+wg3cOOkrg4tv+ZI6/Yf7aSVTBavmK7jjw95jvFFYEhfJxPBwiHhyKwKG25eak8vKf4gMfOTDrsCU45YeuDBy2+dqCnZyEnm4YhjCDbb+U7BHqdwNov/kwQ72NK+YjPWAmrIGv4xr1Z9r5I74ZwrZWK+7ngvQbY6KNrVF8rB/4Il7WzSGM36P4Bq1rhhYCx0cJoIpYTx/Xa8xF4i9IJBfOxzeJz5qfDgBMpa6Afm6o53X6zOiz+PrsMPHkwNJ6nCnEmxc89KoBvPV6tn6Kn8+lLPaGDi5BIV9eWBXov6h3brIsPP9G+L2S0vKl+MXlV2WpPv+/P7QvzXVHPuh63dsAAAAASUVORK5CYII=);
	}
	.anchor-home-left-nav .live-group .live-group-item:hover .live-group-item-yuyue,
	.anchor-home-left-nav .live-group .live-group-item.live-group-item-active .live-group-item-yuyue {
	  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACEUExURUdwTOjBie7Km+jCi/HKm+jCi+rDi+3JmPvmq/HJl/bXtOa9guO5eunEj+a/hfjbud6ybN6xbO/MnfjbuvndvtioWt2xbN6xbPPSqvPSquG2d+fBit+0cunDjeS8geG3ePDOouvHlu7LnurFku3JmuO6fN2xbPHQp/nbvOa/hvPTrNiqXmRRQLwAAAAbdFJOUwBUrKEa6C1zBA+rQm+LxpbEp8vrzuffhOTY78Y5omIAAAIWSURBVEjH7ZVbu6ogEIZFRfFcWquDh1LT0v7//9sMCIqwL9b94rLe92OYmZ4s6+/84gTZ6XPKXP0L18nbPAn2H0fFB06B9l+g66tt2x5Hu3zOfz6h+EBE2ozve6zekQme0Br88PZ+v58326cVEhvwvq4TRThJ3gvneQb+2T27zvaoAXhZpoog+CCbOQ9C171erRNQAwSs3TCHxL3NIv8JONSfu8Qpy3JKtTeExCskn+cdw+kDsEecaZrUN7gF5d2r5O21PXWN6R3TrksWygg5rfX4luW/Fr4uU0KcSB+pv6kfBHYB8NPkm3bDLTbtYQLkw3MnrR52Epa/tGcRai40TWIQrtt2giBwyjc/Ou8p45IC54fB2/PEV8YFwpo/DEOs3ZAp410Fzj+OmhCKclj7QVjiKf94DLqQL/l8HajgxqnMf1QHkyDz+5pPikTJHXB6dMEW+WwdUtEVBHxVVXpJyZanr8UOgvEizlcXTUCinHW8TXqJ71wY9d0LlvxaaT+lGT8alsmW27nlef54NOxSZMpn9Y/j6Jn2297ly3jzBXRStYkH4e6aBcx+XXIdZP74YxQ8LOObbfnj+P2aDMZzYX0uE77UOO9fTTxeT4rVdtJyDiBohotLyHdIkCzbtvAXQg5fOGd1dKjmPIw8TkX9hxgocmSGuhwe1MN4tiYRimMUiUxu7GqKMfb//392OZ/R37/6L84/OJ5zJki8UooAAAAASUVORK5CYII=);
	}
	.anchor-home-left-nav .live-group .live-group-item:hover .live-group-item-all,
	.anchor-home-left-nav .live-group .live-group-item.live-group-item-active .live-group-item-all {
	  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABRUExURUdwTPHPpeC1c+O5euG1c+zJmOrEjvzyqvHQpuzHktmqXvndvuvFktqsYfzhxezIl+/Mn+K5e+W9gt+0cvXWsunEj9yvaefAifjbvPLRqdmqYFFG2cUAAAAPdFJOUwBwydFw9swDzR/Ly0n1bn/m/5QAAAHASURBVEjH7ZXJloMgEEVxotCYBlQ08f8/tItChML0kH1qF8+9zyfDiRCfeWPg6/agWW4VHI8q1Rkc3cn4KE0f8ceyLKqnR8rTpus6rZ3si/ycRwMDQRk1hmAYpZP8HV85/1yelRCVQY0owJGuZUJ8wcE/lRDKjFmDcZNM4DiOEMZkJQC27SIc/T1ungCmY8Q2XYWUj+mlMJXCcsZ7/m9hYfle0L8Kx3pG/B9C4snQhQAwWb4PZ/3Al4IYbcOEihXSXnBd/oLG8p0GlfXXpQBjY+vivPYq6xMEt+FMOBan7i/3oVIpXzsUIo9C08LrS5Sm+PHTrXtHCJVCHxx/PKf4AfOLSj3D3YZCxO2MU340FDwKJ0/CXCxr5XFvOE18EE56XteVb5wyhOsQj/W9EOLtYQxM6AJO8e4QEr76uTMh9fc0fi9Aqr+SsTMh4DodBxLmnL8IhLt4HLyQ9UG+FOLykGAtCWf+vr8Q3NnHBiHVCQZfpSyelkeI+exD+TtfJXmsT+TxPtYnHwy+DxXP9/ex5fzOd1rIPJ/uI9RrVmgfyisqab8OPvyh1Anfh8sVFa2M/ePhh3a4h+8dWvj8qb8z37dcRyNWJAhXAAAAAElFTkSuQmCC);
	}
	.anchor-home-left-nav .live-group .live-group-item:hover .live-group-item-football,
	.anchor-home-left-nav .live-group .live-group-item.live-group-item-active .live-group-item-football {
	  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAB4UExURUdwTOK4eOW9guvDi+jBivPIkuG2dP7aouzGkevEj/HPpOG2du/NoOjCivDNoO/NoO/MnvLSqOK4d/TTq96xbPbXs+vGlPDNofPSqurEkOjCi+3JmeC1dN6zb/DOo+G4eea/he7LnuvHleS7f/bXtPLRqd2wavTUrsj49vkAAAAZdFJOUwBo4hq4DYwFKDe4zWlKfNGkja1V49Dp7PA5oadFAAACSUlEQVRIx+2WV2KrMBBFhyqJ3gw2BCysAPvf4RskijAkfgvIfPFx7mU0RQDwFxgsvSVEPpE0DpxPeH77xrhRfKRx13VV+quESnyapnsO+R35vu/L8Gc+WPBpGDzwFN80ryXDU5D0WwmGYRFIvnm97Ou0vN1/GBLweuWP8bhUpBrfdUog+QeGfVGeA9+lKGg2vq6Nk+B24LsIko2vMTh9F0SSHxRfBQBOsvOc81Nx6bT7xxRYRCDY/bl5Lu1t848IiZrGs4CVqz93L059X+wZDsWcfsnAsZU/F/SqcbmHghRTqZbj4kmC2d502ZmOQszSihhYez1rHApmX9Dz1A1Dlc7vzateK6dvSbfQzazj1N3VebE8Sa+1q66xOoYthHiah/cMk2pXH0Gg85zbQJHG+HrqzV7a2/ceWHp7OTfAXQRfX5rgLgXztFkQr/5zfbgD5nPhW01QKRzTzyHS/IUNbPVvC00Q79sFbBsfLgRmpPi2bX1NkKx8UxJSrv4ocIgp7VEwZnpZ9+0Kwd5wkUGo0kF+1KtE921Mwdh4EUK2+KPgME7xti0mWDaG75sYhGz4WBxbvbfrsO/hxo/HJXWqtV0hUMYYpZblOASIv/LF2wZFCx8BXfKfy2kAW/jx/RYgseRtcEyJC9UtCq7i/dOKho9HaeKFlel86xPiy4Ss80qowxpccJWOaq8L1MVgP13HRGj+8ryYCvntws/ENs3yuNmnD0q453+ah+ucTN1/HD9+ssDw1+mcw/2fryJ1M79oi8LPDOvvH0HGP43TacDOmVT2AAAAAElFTkSuQmCC);
	}
	.anchor-home-left-nav .live-group .live-group-item:hover .live-group-item-basketball,
	.anchor-home-left-nav .live-group .live-group-item.live-group-item-active .live-group-item-basketball {
	  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACHUExURUdwTOrEj/PTq92xbPLQp+a+hPHQov7WneW8gPDKk+vGk/DMme3Jl+a+g/bXs/LRqO/JlfHQpvLRqOK4duK4d+G2dOK4eu7Mnd+zbuvHleG3d+/NoOrEjt+0ctywad+0ceO6feW9guG3eOa/h+jCjO/Nou7LnfHQp/PTrezJmOnEj+vGlPXWsgnz/H8AAAAedFJOUwCGZsVUtiwFNw/EGUN2yJIioeJlnVrUspLX683r+F99mhAAAAJVSURBVEjH7ZXXdqswEEUPVaKFju2QgMAGg+3//76rhm+IiZOV5+hRa087MyMBf+dXJzBTG4izOjW9H+D2y+12m0x42fk8DDubPMdDgd+maXJhD/yMY+0+wUl80/y0AzKOj/M8G18G8V4W/nw+uzCVwfXqe8/4SfHnGIH0f71eL/52DNeMXxZ+GDKg1vzl4mxaiEs31fwwujA0fzoV3pZ/0xSCmJofTdgLH275l/JnvGO24ucYruYjkMh5aICuNwbSQcrjgyj+jcDouvAhgC43BFVyHoCD4E8Gkq5jn0IEi/wD75hph4mqkgQ0NygibsCC9QRJvo7tZFPw4pWxcnUVT1lqL9qFUbzz/UMCw3eMnAq5SVkVqxbYasQSO64JdkrOBM7xeBTlygTpxhqIcRO1qvYGwqDrOgOUFZ9x16iV/GOKQMvvcYNO6kNe+75YF720d5wpbOlfGgiesQRR37avK4Ns4WvAl/5PR8INOM76PUj12aDWPA9AJc/LBSph0Pe9C/reWisDPQ6zAeJrvgKY4luLIG9Wsi7bxdscaf7oIFA8z3/P7/O1pnK7+C6GKv+jUlPzbZurdflwfOGfwH1T/rk8OUqm8bZp8ofnaL5G+MgzPnOab8R5aHTKxy78z3eMq3r33zTW1k4bKn3pX/X37v8xAB+8w2XxL+SMQBUvLfZbARwlp+J7XsI9n8bafGY8/54P6/kgWPd8rK+ePv/O9wW89+94UbbGe55RvvD7Zy8+rRTPVax0+vSbDyV0RLtKUCV/+ZMvq9xzVfaVVZTe3wf+u/MPR5Vl9QudcdIAAAAASUVORK5CYII=);
	}
	.anchor-home-left-nav .live-group .live-group-item:hover .live-group-item-more,
	.anchor-home-left-nav .live-group .live-group-item.live-group-item-active .live-group-item-more {
	  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABXUExURUdwTOG2denFj9yvZ+jBiuvGke3Jmu/Ik+zHlea+heW9gefAiPXWsOO6fPbXs/XVsOW+hOjCi+rFkt+0ceG3d+O6ffHQptywauzIl/XWsvPTrO7KnO/NoZ9ZIOIAAAAQdFJOUwCdS+HaLegWga5w8J7u3LfYWBY6AAABwElEQVRIx92W2bqDIAyEiyKIS1Xqru//nCcEUBY99bq58mv/mQ4hQl+vX62ser+r7DHOq2VZoSr+jM9XxMdx3PMHePJe0H9UtbPkW/hG48jvUFuTfQmPuOW3bZu3/HYp+bK4cZDf5nlmxX34w383/lBSShovhTfW/oyvBcDLrhNBLu7ZO3FmxKGor2jC+Ptpj4K2FZ7gPr7GQVCGgtVvj8sDDhUI4viKlgfeDp5gDdrjxVeKYYgEl920/kMsGK+X22k8/gXNszxnyFN4QBweKPr3vScwPGwOZ4pXe1ma7eIU+UgAcfB9ySEOThuBOPoT5AMBxtdfSyMQrRUovP94AuR3Bi9LxtR0QpKsBEGtItXIRwLVHiaEbk8pSIn9qQUxfCBQr9as+9l1tp+Dbg/igeAc5s7frYOfpkAw+8Ns+N7w06UgGoahH0ycaQoEdhjkMWyt9v/0lvcFzHtXoviqUk8g5EUeE8cIiH8IULvazrF3/Kc0PDbEOcyt6294Eh9/CQ2735/5r8/kojQCt/sKL24PY3LVHvLfvZIJZ3gQF99uroS69mny4A4q6o/NXzy8FIn+AcKfX7skTUn2s/8q/gDlYFTncc5ozwAAAABJRU5ErkJggg==);
	}
	.anchor-home-left-nav .live-group .live-group-item:hover .live-group-item-text,
	.anchor-home-left-nav .live-group .live-group-item.live-group-item-active .live-group-item-text {
	  color: #f0c682;
	}
	.anchor-home-left-nav .live-group .live-group-item .live-group-item-icon {
	  width: 24px;
	  height: 24px;
	  margin-bottom: 2px;
	  background-size: 100% 100%;
	  background-position: center center;
	}
	.anchor-home-left-nav .live-group .live-group-item .live-group-item-anchor {
	  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAnUExURUdwTNre7dre7d7j8dre7dre7dre7trd7dre7dzg79rf7tve79nd7J/eGo0AAAAMdFJOUwB69Bai54vVvEpcLt4djzAAAACkSURBVDjLY2AYycCk5gwcHO1CiHPqnEEGDnAJIxTxM8fgEj6oEmcMYBI1aBITGLYlgyXQxM8ImJ05glVCKubMUSSJKrhVQEceQpIQ4IxBaEKRYDDDJcGwHZcEgxAuCe4eHBIMHKRKcNdgl2DOgTsLVWLqGewSJmewSiRwxWCXCIT54UwMqgQCSNaguAopohh1TuCIWsNk/IkBZ/LBmeBwJtERCgBCCmbTq3M6jQAAAABJRU5ErkJggg==);
	}
	.anchor-home-left-nav .live-group .live-group-item .live-group-item-saicheng {
	  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAVUExURUdwTNrd7dzg7+Hh9Nrf7tre7dnd7NcbM/sAAAAGdFJOUwDhRRZZ+45lU7oAAAB9SURBVDjL7dM7CoAwEEXR+K0lQmrdgYILENyIKXz7X4IMozETUbAwWPiaCzlNmlEq3lot62asrBsgew+pAT0A4NpmgwQSlmqDIgDMr0BnbEbA9WBsdU7A3aEEaqV6Aq4HdhoMAdcDuRfg+WL86ocTFFeQhFAdhyPmDud7WwES48m3kn88eAAAAABJRU5ErkJggg==);
	}
	.anchor-home-left-nav .live-group .live-group-item .live-group-item-bangdan {
	  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAzUExURUdwTNvf79re7dre7dre7drd7d/h8dre7dre7e3u/tre7drf7tre7dve7tvf7d3i79nd7E9puFsAAAAQdFJOUwA/tMfzihvX4wiAZaRPcCl7fukbAAABRUlEQVRIx+2V2XLDIAxFWYVYbPT/X1tMYkcQy3GfOu1ULx6He4gkxLVS//GtWB0J4dZTIJAY4SeAGOMV0JYHeb4Q74WHzPpDt2Jl2aMphXfVLcMmrhTjWCXYYZaW06rORa+EB2DJjMCiop0BQ/YAPLnIgaY3TQUrA6IjfwCaSDMgdz2CWhjw0OyH0OnwakZp+qoqMuCRxR49vydQut5VBchrCL3O4+CIYAd822xrEwReNGyZvqK/7gJ80zegb6l4TqiRHdvU1m3RDsOkhxmY9c8fhyhsyfS2TuHn+dbp2BSXWW+TPrlAWp7TenrjomgCKNiGlwAvACD8hQPJmdI5kEUrO+l+77IcbN5eFcOVXcKbfQS4NthYRn2JHz1Zs0KsvmXjNTVPIWdSvW/9Xj6tXwHklLa7Ydsj39EvF/fy43gg/MnP/xdWyzQmu3SZzAAAAABJRU5ErkJggg==);
	}
	.anchor-home-left-nav .live-group .live-group-item .live-group-item-follow {
	  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURUdwTNre7dve7tre7dvf7tre7dzf7t/h8tre7dre7fr6/9re7dre7dre7d3h8Nnd7MNL1KIAAAAPdFJOUwDkU8xv+UATwKEEtPKHJSPTTZAAAAEeSURBVDjLY2AYEYBtYmCnFoixaIaoZAJCnK//////Hx0YGFjkgYzPD+ASOv9B4HcB+34wIwhuUDyY/99qBYT+qgCVKITw//+9D2Uch0rMBxqTdv4/AvyEiLPHgzTbI0n8LwBLMP3//4khG1n8vwNYYuX//xtYUMT/bwBLMP//r/AeVcIALMH4//+C+6gSAmAJ1v8fGfpRJQKgOv6Un8emA2jHGVTx/w1gCd7/GOACJKgwJaAhb48u/hkaVvroEp+gEhz/sdoNjEA0x/6BRyGaWfAYZEALQgdEapj/HzOaYCGPALOQExZS6P5FSXEsWG0AgUSYuBhaImWHxsiPAvTkywJOdV+9MBP2a5DEPmxJXvH/fyGseYHL2WTBkM3IAFF4p3SQR5f8AAAAAElFTkSuQmCC);
	}
	.anchor-home-left-nav .live-group .live-group-item .live-group-item-yuyue {
	  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA2UExURUdwTNre7dzf8Nre7dve7ePj9Nre7dre7fj7/9re7dve7trf7t3l8tre7d7f8dre7dre7dnd7GOm9ecAAAARdFJOUwCWNvRvDs2rBOpSdxfiJIa96+bseAAAAWNJREFUSMftlt22xBAMhf0LQ8n7v+wxU9oSNavXc7LW3LA/ErZ0GPuPB6G5kYYHOhE+E3ocFhHf4fw44d1nIoph/V2PaNtAW9LWidjvwZseSg7KRokoo1UlQ2gE7wBz6Lcm2Ae2gzAdIKtecxyC60pIuoOFzSAJs+2EITVYEO6UnagTH6KvIbiiD/HM/TyeckChEG64Is8BLvkoxl6XrAC4p1d6UQwAvmbeCPIekHoCJLwHME2AuAIi1QtcASiWJU8AWjZfA5wAeQ1YApgRCCpfDtp836EEiNSYTIDuGWDemmVuU0qDqyP3+gLQm/P0JWBOqhmeek/jKmZmsivAsm/eGELM/G2fbcCgexB9BWHaXbd4B8TwTF+IbVKzWxVNiarPZJtoanNiY1+qvTJ1pcukIc+6tz96N9PqcLpRb1XtrZ7eGodmE+GV8qKtuRNDFSq6y7MF2H+HlV30T7+B8Mt/AP4A4B47i9S4wQQAAAAASUVORK5CYII=);
	}
	.anchor-home-left-nav .live-group .live-group-item .live-group-item-all {
	  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAhUExURUdwTPj4/dre7dre7dre7dve7drf7N/f79rf7t3d7tnd7HzFvJgAAAAKdFJOUwAD99DHcG4gSR7Zf/uHAAAA7UlEQVQ4y2NgGLRAzGjVqkWmAgwMjMFaq1YpJ8LEOb1WgYA7A0PJqkVKSquWTIBKiIDFVy0RYPSyAGqTsHKESmRBJFYFsC4WEGBgFBReBpWwgkoYMK8A8yUWQyW0oBIKTAvBfMFFUAmo+KqFUgpQlXSU0EKTgLvKCk2CA+aPKFQJRuGlqGEFk0CEFbsXTAIYtqDQLYCFu6gRVAJMKQciRZUgCAgwgimUOMQhgcsohOXQqCzAcC6U4YjhQShjKUaQQBmLMQIRysCMWhiLjhKIBIfmKkQSRfMHIlFDGcswswFqWCFnHLCKCYSy2uADABopHV0RL1TAAAAAAElFTkSuQmCC);
	}
	.anchor-home-left-nav .live-group .live-group-item .live-group-item-football {
	  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA5UExURUdwTNre7eTn99re7dre7dre7dvf7u73/9re7d7h8dvg79re7dvf7tre7dvf7trf7tre7dre7dnd7G+hC6UAAAASdFJOUwDdD7zOsGkF9iIx6UKTVnqHpPzCjXYAAAGbSURBVEjH7VZZtsMgCHXGMRr3v9hnklah0eYtoHxxChcvY8rYT5r4whOcGiRlxJP7xmsT5ZrqVNNs+Qrxsl5iN7bZS+Vx7W9qF8lk13eYu0Ma/lUjQJVzhEb+dceAKmeJFOxfEwG0B+/lqd8A1dwAigIyZVit+wRkYm4BxU4Qt+I6ZGx98xmYseOnAGtONgPkszKed0CZZB1e4f01FDV4Jnoifta47TCXQeXI5EyNp/t4QI6NpcsRRT2HIqoyi36QCKflzaynf0SLSdOyvkk0Oy3/UR2jD2sgrOzol6EA2ettzQwgST/OkRgdRYDBW9AZsYL1XlgEGA3a6NRq5rvOp5OnWcSAjY2tUggw5swCWMwIwnQnDJ5KXefvmfmoJoze0NuVtI6j1JyWUirFeeCYH18cGEv2Pa6WVITBwkfvvXNOCGDAVxuU+6J4i6P61RV4hdJMcLr6ZXXLGtvA21rSaVUA1/a5+0qI+/G4KKYmy4OM2/zq/MP34WN/Zjfy68VsVX4QCPVjHx6fUPQm/0Nc1irYwNVu3O8/wil/FYA+FRzOjCkAAAAASUVORK5CYII=);
	}
	.anchor-home-left-nav .live-group .live-group-item .live-group-item-basketball {
	  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA8UExURUdwTNvg79re7tre7eTl9dre7dre7dre7e/5/9vf7tvg79re7dre7dzh79vf7tre7dre7dre7d7i8tnd7JZ0w7sAAAATdFJOUwAyb8gPlKW8BV08hfglTujQ2RnSjh2AAAABuklEQVRIx+1V2ZKtIAwMKPuimP//1xtFNg9zxrrP0y9aVtqkkyYA/OG/cBgZAcS2S7O+CI8KCQbWRA8vo/4ebne84APE/LawL+HaYYECSDfX/ZhkXbCBAS+vy/oiHgUcLd08B+Ouo2wA+28MQpA1KEBTJCZFMWNMoGetnJc+oY+zf1/VJAM1TECoVO3UxwBqGMjSWH2r0WdxzyyqVGKB5Tr2otrB4a/BDP7pJ8aNDVmlPphx90SOgWDyT8Wl+7MhYjvt1UPgJmLpneVCqiVRX5UUhp0z0CaJMUO2WDBi0UVPuOVHuAq0k2OwnZ2trjtuggPr5dOzrLpC1gasdyrqL/1JjqJ951LzIFBtPJurw1atfM+cUMUI0OlJ2FuCMnNfv9Lxsx73gVBM6kAX7t4Kpc5xEteDtzHjh/rLYdxMrKHWM3dNZttx4jS7T3dLDaGqJysYHBiPdYSevrEWT7Z1OCyFByTZLrZxoNfN8rnd37ZSnm9HRzs5/6mPp6LtsHQmCRTifJH9tGaGRbZ1pxbTi9UnYK0S1PpiGXcVCf1i3S/VeYv95UKx94WSl42Kr64sQV0RSb27sv4wwT/WODesMo9aZgAAAABJRU5ErkJggg==);
	}
	.anchor-home-left-nav .live-group .live-group-item .live-group-item-more {
	  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAtUExURUdwTNre7d/i8tre7dvf7tre7d3i8OP2+dre7dre7dvf7dnd7Nzf79ve7dnd7N8+yD0AAAAOdFJOUwDwF96AnCwHrtRtvFBGS2o56gAAAMpJREFUOMtjYKArYAs2TcAmzhT37t1TBUxxdsd3QCBSgCFx+B0Y2KCLZ7+Dgm2o4qrv4CAIWbxKDiHxcDlCnHfeOyTw8gLcoX3vUMALmKOV36EBI6hEH7rEC6iEHLrEQ6jEOwxAX4nHLnbv3k1xhDKQJMyBvnxZwCQHZiBLODCwvHvFwBAHZhAlIcaQ+O6xApsckKGIIvGwAxguooFARqsc3X2OXQJnROGMWozEMIlQ8sGZ4HAnUdyJGnc2wJ1xcGc1nJkTd3amHQAA5RnYAsmaLbIAAAAASUVORK5CYII=);
	}
	.anchor-home-left-nav .live-group .live-group-item .live-group-item-text {
	  font-size: 12px;
	  color: #d9ddec;
	}
	.anchor-home-left-nav .live-group .live-group-item .info-text {
	  font-size: 13px;
	  padding: 0 6px;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	  overflow: hidden;
	}
	.anchor-home-left-nav .live-group .live-group-list2 ul.live-group-class-ul {
	  max-height: 216px;
	  padding-bottom: 20px;
	}
	.anchor-home-left-nav .live-group .live-group-list2 ul.live-group-class-ul::-webkit-scrollbar {
	  width: 2px !important;
	}
	.anchor-home-left-nav .live-group .live-group-list2 .live-group-item {
	  margin: 12px 13px;
	  height: 26px;
	  border-radius: 2px;
	  background-color: #393a4a;
	}
	.anchor-home-left-nav .live-group .live-group-list2 .live-group-item:hover {
	  background-image: url(data:image/png;base64,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);
	  background-repeat: no-repeat;
	  background-position: center center;
	}
	.anchor-home-left-nav .live-group .live-group-list2 .live-group-item-active {
	  border-radius: 2px;
	  background-color: #393a4a;
	  background-image: url(/assets/image/img-xuanting@3x.dbef81ae73c45fa995ca6c8539ad7a4c.png);
	  background-repeat: no-repeat;
	  background-position: center center;
	}
	.anchor-home-left-nav .live-group .live-group-list3 {
	  width: 100%;
	}
	.anchor-home-left-nav .live-group .live-group-list3 .live-group-item {
	  height: 30px;
	}
	.anchor-home-left-nav .live-group .live-group-list3 .live-group-anchor-box {
	  display: flex;
	  justify-content: center;
	  margin-top: 12px;
	}
	.anchor-home-left-nav .live-group .live-group-line {
	  height: 1px;
	  width: 100%;
	  background-color: #252525;
	  margin: 15px 0;
	}
	.more-ul {
	  list-style: none;
	  display: flex;
	  flex-wrap: wrap;
	  width: 180px;
	}
	.more-ul li {
	  width: 70px;
	  height: 30px;
	  border-radius: 4px;
	  margin: 8px 9px;
	  background-color: #edf0fd;
	}
	.more-ul li a {
	  width: 100%;
	  color: #67728f;
	  font-size: 12px;
	  display: inline-block;
	  text-align: center;
	  line-height: 30px;
	}
	.more-ul li:hover,
	.more-ul .more-li-active {
	  background-image: linear-gradient(115deg, #ffead9 -2%, #d8ad66);
	}
	.more-ul li:hover a,
	.more-ul .more-li-active a {
	  color: #6d4117;
	}
	.download-box-popover .ant-popover-inner {
	  background-color: #f8faff;
	}

</style>
