<template>
    <view class="myGrade">
        <view class="myGradeHead">
            <image src="/static/images/competition/detail-right.png" @click="back()"></image>
            <text>我的等级</text>
        </view>
        <view class="myGradeContent">
            <view class="myGradeContentTop">
                <view class="myGradeInfo">
                    <view class="myGradeInfoHead">
                        <view class="myGradeAvatar">
                            <image class="" :src="userInfo.avatar || '/static/images/home/userLogo.png'" mode="aspectFill"></image>
                        </view>
                        <view class="myGradeUser">
                            <view class="nickname">{{userInfo.user_nickname}}</view>
                            <view class="grade">财富等级：L{{userInfo.exp}}</view>
                        </view>
                    </view>
                    <view class="myGradeTips">
                        您当前等级为L{{userInfo.exp}}, 再获得{{userInfo.difference}}经验值即可升为L{{maxLevel > (parseInt(userInfo.exp) + 1) ? (parseInt(userInfo.exp) + 1) : maxLevel}}, 升到至尊L8会有神秘大礼包哦~
                    </view>
                </view>
                <view class="myGradeList">
					<view class="myGradeListItem" v-for="it in 7" :key="it">
						{{getGradeText(it)}}
					</view>
                </view>
            </view>
            <view class="myGradeContentBottom">
                <view class="myGradeBottomHead">
                    如何快速提升？
                </view>
                <view class="myGradeBottomList">
                    <view class="myGradeBottomListItem">
                        <image src="/static/images/grade/grade-icon-1.png"></image>
                        <view class="title">每日签到</view>
                        <view class="text">每日签到成功即可获得10经验值</view>
                    </view>
                    <view class="myGradeBottomListItem">
                        <image src="/static/images/grade/grade-icon-2.png"></image>
                        <view class="title">分享链接</view>
                        <view class="text">每次分享得5经验值, 每日上限为20经验值</view>
                    </view>
                    <view class="myGradeBottomListItem">
                        <image src="/static/images/grade/grade-icon-3.png"></image>
                        <view class="title">每日任务</view>
                        <view class="text">完成每日任务, 获取大量经验值</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                levelList: [],
            }
        },
        computed: {
            userInfo() {
				return this.$store.state.info;
            },
            is_login() {
                let result = false;
				if (localStorage.getItem('userInfo')) {
                    if (localStorage.getItem('userInfo') !== '{}') {
                        result = true;
                    }
                }
				if (JSON.stringify(this.$store.state.info) !== '{}') {
					result = true;
				}
                return result;
            },
			maxLevel() {
				let result = 0;
				if (this.levelList.length > 0) {
					result = this.levelList.length;
				}
				return result;
			}
        },
        created() {
            if (this.is_login) {
                this.$store.dispatch('getInfo', this.$u);
			    this.getLevelList();
            }
        },
        methods: {
			// 取得等級表
			getLevelList() {
                this.$u.get('/api/level/list').then(res => {
                    this.levelList = res;
                })
			},
			// 返回等級所需經驗文字
			getGradeText(it) {
				let string = "";
				if (this.levelList.length > 0) {
					string += `L${it} - L${it + 1}需经验值${this.levelList[it - 1].level_up}`
				}
				return string;
			},
            // 返回
            back() {
                this.$u.route({type:'back'});
            }
        },  
    }
</script>

<style lang="scss" scoped>
    .myGrade {
        min-height: 100%;
        position: relative;
        overflow: auto;
        background-color: #f4f4f4;
        .myGradeHead {
            position: fixed;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100rpx;
            box-sizing: border-box;
            background: #fefefe;;
            image {
                position: absolute;
                left: 0;
                width: 60rpx;
                height: 60rpx;
                transform: rotate(180deg);
            }
            text {
                color: #676767;
                font-size: 36rpx;
            }
        }
        .myGradeContent {
            height: 100%;
            padding-top: 100rpx;
            box-sizing: border-box;
            .myGradeContentTop {
                padding: 20rpx 20rpx 10rpx;
                margin-top: 4rpx;
                background: #fff;
                .myGradeInfo {
                    height: 320rpx;
                    background: url(../static/images/grade/grade-card.png) center top / 100% auto no-repeat;
                    background-color: #fffbf8;
                    .myGradeInfoHead {
                        display: flex;
                        align-items: center;
                        .myGradeAvatar {
                            padding: 30rpx 30rpx 0;
                            image {
                                width: 128rpx;
                                height: 128rpx;
                                border-radius: 50%;
                            }
                        }
                        .myGradeUser {
                            .nickname {
                                margin-bottom: 16rpx;
                                font-size: 36rpx;
	                            color: #80643E;
                            }
                            .grade {
                                font-size: 28rpx;
	                            color: #80643E;
                            }
                        }
                    }
                    .myGradeTips {
                        padding: 30rpx 30rpx 0;
                        font-size: 28rpx;
                        color: #80643E;
                    }
                }
                .myGradeList {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;
                    padding: 20rpx 0;
                    border-radius: 0 0 10px 10px;
                    background-color: #fffbf8;
                    .myGradeListItem {
                        width: 50%;
                        font-size: 28rpx;
                        text-align: center;
                        color: #80643E;
                    }
                }
            }
            .myGradeContentBottom {
                padding: 20rpx 20rpx 140rpx;
                margin-top: 20rpx;
                background: #fff;
                .myGradeBottomHead {
                    padding: 20rpx;
                    font-size: 32rpx;
                }
                .myGradeBottomList {
                    display: flex;
                    margin-top: 60rpx;
                    .myGradeBottomListItem {
                        flex: 1;
                        text-align: center;
                        image {
                            width: 100rpx;
                            height: 100rpx;
                        }
                        .title {
                            margin-bottom: 20rpx;
                        }
                        .text {
                            font-size: 24rpx;
                            color: #999;
                        }
                    }
                }
            }
        }
    }
</style>