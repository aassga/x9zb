<template>
    <view class="dailyMission">
        <view class="dailyMissionHead">
            <image src="/static/images/competition/right.png" @click="back()"></image>
        </view>
        <view class="dailyMissionTop">
            <view class="dailyMissionMessage">
                <image class="dailyMissionMessageIcon" src="/static/images/daily/diamond.png"></image>
                <view class="dailyMissionMessageText">已獲得{{is_login ? parseInt(userInfo.balances) : 0}}钻石</view>
                <image class="dailyMissionMessageSignIn" src="/static/images/daily/sign-in.png" @click="signIn(0)"></image>
            </view>
            <view class="dailyMissionTitle">每日任务</view>
        </view>
        <view class="dailyMissionList">
            <view class="dailyMissionListItem" v-for="it in missionList" :key="it.id">
                <image class="dailyMissionListItemIcon" :src="it.icon"></image>
                <view class="dailyMissionListItemText">
                    <view class="dailyMissionListItemTextTitle">{{it.name}}</view>
                    <view class="dailyMissionListItemTextContent">{{it.description}}</view>
                </view>
                <view class="dailyMissionListItemButton" :class="{'disabled': it.user.progress_status !== 2}" @click="receiveAward(it)">{{it.user.progress_str}}</view>
            </view>
        </view>

        <view class="dialyCalendar" v-if="showCalendar">
            <view class="dialyCalendarTop">
                <view class="dialyCalendarTopTitle">
                    <view>签到</view>
                    <image class="closeButton" src="/static/images/daily/close.png" @click="showCalendar = false"></image>
                </view>
                <view class="dialyCalendarTopHead">
                    <image class="buttonLeft" src="/static/images/competition/right.png" @click="lastMonth()"></image>
                    <view>{{year}}年{{month}}月</view>
                    <image class="buttonRight" src="/static/images/competition/right.png" @click="nextMonth()"></image>
                </view>
            </view>
            <view class="dialyCalendarCenter">
                <view class="dialyCalendarWeek">
                    <view class="weekItem">日</view>
                    <view class="weekItem">一</view>
                    <view class="weekItem">二</view>
                    <view class="weekItem">三</view>
                    <view class="weekItem">四</view>
                    <view class="weekItem">五</view>
                    <view class="weekItem">六</view>
                </view>
                <view class="dialyCalendarDays">
                    <view class="dayItem" v-for="(it, index) in days" :key="index">
                        <view class="dayItemText" :class="{'isSignedIn': signedInNum.indexOf(it) !== -1, 'isSelected': selectDateNum === it}" @click="selectDate(it)">{{it}}</view>
                    </view>
                </view>
            </view>
            <view class="dialyCalendarBottom">
                <view class="tips">
                    连续打卡签到30天即可抽取世界杯门票
                </view>
                <view class="tipsMini">
                    小提示: 选中日期点击补签即可成功补签<br/>
                    补签需花費50钻石, 每月补签次数上限為3次。
                </view>
                <view class="remainingTimes">
                    剩余次数: {{amended}}次
                </view>
                <view class="signInButton" @click="signIn(1)">
                    补签
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                showCalendar: false,
                year: null,
                month: null,
                days: [],
                daynum: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                selectDateNum: null, // 選中號碼
                signedInMap: {}, // 簽到表
                amended: 0, // 剩餘補簽次數
                missionList: [],
                isTodaySignIn: false, // 今天有簽到過
                isShowAllCompleted: false,
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
            signedInNum() {
                let result = [];
                if (this.signedInMap[this.year]) {
                    if (this.signedInMap[this.year][this.month]) {
                        result = this.signedInMap[this.year][this.month];
                    }
                }
                return result;
            }
        },
        created() {
            if (this.is_login) {
                this.$store.dispatch('getInfo', this.$u);
            }
            this.initCalendar();
            this.getMission();
            this.getSignInRecord();
            this.getAmended();
        },
        mounted() {
        },
        methods: {
            // 初始化簽到表
            initCalendar() {
                let now = new Date();
                this.year = now.getFullYear();
                this.month = now.getMonth() + 1;
                this.checkYear();
                this.checkMonth();
            },
            // 顯示簽到表
            showCalendarClick() {
                this.initCalendar();
                this.selectDateNum = null;
                this.showCalendar = true;
            },
            // 判斷平年閏年
            checkYear() {
                let year = this.year;
                if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
                    this.daynum[1] = 29;
                } else {
                    this.daynum[1] = 28;
                }
            },
            // 判斷當月多少天
            checkMonth() {
                let length = this.daynum[this.month - 1];
                this.days.splice(0); // 清空
                for(let i = 0; i < length; i++) {
                    this.days.push(i + 1);
                }

                // 當月1號是星期幾
                let times = new Date(this.year, this.month - 1, 1).getDay();
                for (let f = 0; f < times; f++) {
                    this.days.unshift(" ");
                }
            },
            // 上個月
            lastMonth() {
                if (this.month == 1) {
                    this.month = 12;
                    this.year--;
                    this.checkYear();
                } else {
                    this.month--;
                }
                this.checkMonth();
                this.selectDateNum = null;
            },
            // 下個月
            nextMonth() {
                if (this.month == 12) {
                    this.month = 1;
                    this.year++;
                    this.checkYear();
                } else {
                    this.month++;
                }
                this.checkMonth();
                this.selectDateNum = null;
            },
            // 選擇日期
            selectDate(it) {
                let now = new Date();
                let nowYear = now.getFullYear();
                let nowMonth = now.getMonth() + 1;
                let nowDate = now.getDate();
                if (this.year != nowYear || this.month != nowMonth) {
                    return;
                }
                if (this.month === nowMonth && it > nowDate) {
                    return;
                }
                if (it === " ") {
                    return;
                }
                if (this.selectDateNum === it) {
                    this.selectDateNum = null;
                    return;
                }
                if (this.signedInNum.indexOf(it) === -1) {
                    this.selectDateNum = it;
                }
            },
            // 取得任務列表
            getMission() {
                const userInfo = JSON.parse(localStorage.getItem("userInfo"));
				let user_id = userInfo ? userInfo.id : localStorage.getItem("userid");
                this.$u.get('/api/task/list', {
                    user_id: user_id
                }).then(res => {
                    this.missionList = res;

                    let checkin_status = this.missionList.filter(it => it.code === "checkin")[0].user.progress_status;
                    if(checkin_status === 2 || checkin_status === 3) {
                        this.isTodaySignIn = true;
                    }

                    if (!this.isShowAllCompleted) {
						let allCompleted = true;

						for(let i = 0; i < this.missionList.length; i++) {
							let it = this.missionList[i];
							if (it.user.progress_status !== 2 && it.user.progress_status !== 3) {
								allCompleted = false;
							}
						}

						if (allCompleted) {
							this.$u.toast('您已完成了所有任务!');
							this.isShowAllCompleted = true;
						}
					}
                })
            },
            // 取得簽到記錄
            getSignInRecord() {
                const userInfo = JSON.parse(localStorage.getItem("userInfo"));
				let user_id = userInfo ? userInfo.id : localStorage.getItem("userid");
                this.$u.get('/api/task/show/code/checkin', {
                    user_id: user_id
                }).then(res => {
                    let record = res.map(it => it.date);
                    let signedInMap = {};
                    for (let i = 0; i < record.length; i++) {
                        let it = record[i];
                        let y = parseInt(it.split('-')[0]);
                        let m = parseInt(it.split('-')[1]);
                        let d = parseInt(it.split('-')[2]);
                        if (signedInMap[y]) {
                            if (signedInMap[y][m]) {
                                if (signedInMap[y][m].indexOf(d) === -1) {
                                    signedInMap[y][m].push(d);
                                }
                            } else {
                                signedInMap[y][m] = [];
                                signedInMap[y][m].push(d);
                            }
                        } else {
                            signedInMap[y] = {};
                            signedInMap[y][m] = [];
                            signedInMap[y][m].push(d);
                        }
                    }
                    this.signedInMap = signedInMap;
                })
            },
            // 取得補簽過的次數
            getAmended() {
                const userInfo = JSON.parse(localStorage.getItem("userInfo"));
				let user_id = userInfo ? userInfo.id : localStorage.getItem("userid");
                this.$u.get('/api/task/show/code/amended', {
                    user_id: user_id
                }).then(res => {
                    // res = 當月補簽過次數
                    this.amended = (3 - res) < 0 ? 0 : (3 - res);
                }).catch(res => {
                    this.amended = 0;
                })
            },
            // 0: 簽到, 1: 補簽
            signIn(type = 0) {
                if (!this.is_login) {
                    return this.$u.toast('请先登录');
                }
                const userInfo = JSON.parse(localStorage.getItem("userInfo"));
                let user_id = userInfo ? userInfo.id : localStorage.getItem("userid");
                let data = {
                    user_id: user_id
                }
                if (type === 0) {
                    this.showCalendarClick();
                    this.getSignInRecord();
                    if (this.isTodaySignIn) {
                        return;
                    }
                }
                if (type === 1) {
                    if (this.selectDateNum === null) {
                        return this.$u.toast('尚未选择日期');
                    }
                    if (this.amended <= 0) {
                        return this.$u.toast('补签剩余次数不足');
                    }
                    let balance = this.is_login ? parseInt(this.userInfo.balances) : 0;
                    if (balance < 50) {
                        return this.$u.toast('钻石余额不足');
                    }
                    data['date'] = `${this.year}-${this.month}-${this.selectDateNum}`;
                }
                this.$u.get('/api/task/update/code/checkin', data).then(res => {
                    this.getSignInRecord();
                    this.$u.toast(`${type === 0 ? '签到' : '补签'}成功`);
                    if (type === 0) {
                        this.getMission();
                        this.isTodaySignIn = true;
                    }
                    if (type === 1) {
                        this.$store.dispatch('getInfo', this.$u);
                        this.getAmended();
                        this.selectDateNum = null;
                    }
                }).catch(res => {
                    this.$u.toast(`${type === 0 ? '签到' : '补签'}失败`);
                })
            },
            // 領取獎勵
            receiveAward(it) {
                if (it.user.progress_status !== 2) {
                    return;
                }
                if (!this.is_login) {
                    return this.$u.toast('请先登录');
                }
                const userInfo = JSON.parse(localStorage.getItem("userInfo"));
				let user_id = userInfo ? userInfo.id : localStorage.getItem("userid");
                this.$u.get('/api/task/update', {
                    code: it.code,
                    user_id: user_id
                }).then(res => {
                    this.$store.dispatch('getInfo', this.$u);
                    this.getMission();
                    this.$u.toast('领取成功');
                }).catch(res => {
                    this.$u.toast('领取失败');
                })
            },
            // 返回
            back() {
               this.$router.back()
            }
        },  
    }
</script>

<style lang="scss" scoped>
    .dailyMission {
        min-height: 100%;
        position: relative;
        overflow: auto;
        background: url(../static/images/daily/bg.png) center -40rpx / 100% auto no-repeat;
        background-color: #ff3235;
        .dailyMissionHead {
            width: 100%;
		    padding: 20rpx;
            box-sizing: border-box;
            image {
                width: 60rpx;
                height: 60rpx;
            }
        }
        .dailyMissionTop {
            margin-top: 270rpx;
            .dailyMissionMessage {
                display: flex;
                align-items: center;
                width: calc(100% - 20rpx);
                margin: 0 10rpx 30rpx;
                padding: 4rpx 0;
                border-radius: 10px;
                background: #face91;
                border: 1px solid #fff;
                box-sizing: border-box;
                .dailyMissionMessageIcon {
                    width: 94rpx;
                    height: 88rpx;
                    margin: 0 0 0 28rpx;
                }
                .dailyMissionMessageText {
                    flex: 1;
                    margin-right: 20rpx;
                    font-size: 28rpx;
                    font-weight: bold;
                    color: #b88337;
                }
                .dailyMissionMessageSignIn {
                    width: 114rpx;
                    height: 114rpx;
                    margin-left: auto;
                    margin-right: 30rpx;
                }
            }
            .dailyMissionTitle {
                width: 80%;
                padding: 10rpx 0;
                margin: 0 auto 20rpx;
                font-size: 28rpx;
                font-weight: bold;
                border-radius: 10px;
                text-align: center;
                color: #fff;
                background: #face91;
                border: 1px solid #fff;
                box-sizing: border-box;
            }
        }
        .dailyMissionList {
            .dailyMissionListItem {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 18rpx 10rpx;
                .dailyMissionListItemIcon {
                    width: 88rpx;
                    height: 88rpx;
                    margin-left: 10rpx;
                }
                .dailyMissionListItemText {
                    flex: 1;
                    margin: 0 10rpx;
                    .dailyMissionListItemTextTitle {
                        margin-bottom: 4rpx;
                        font-size: 32rpx;
                        font-weight: bold;
                        color: #fff;
                        &.signIn {
                            color: #ffa73d;
                        }
                    }
                    .dailyMissionListItemTextContent {
                        font-size: 24rpx;
                        color: #fff;
                    }
                }
                .dailyMissionListItemButton {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 66rpx;
                    width: 162rpx;
                    margin-top: 32rpx;
                    margin-right: 14rpx;
                    padding: 0 14rpx;
                    border-radius: 5px;
                    text-align: center;
                    color: #fff;
                    background: linear-gradient(180deg, #ffa90f, #f87400);
                    box-sizing: border-box;
                    box-shadow: 0px 2px 6px rgba(51, 51, 51, 0.8);
                    &.disabled {
                        color: #4c4c4c;
                        background: linear-gradient(180deg, #aba8a5, #717171);
                    }
                }
            }
        }

        .dialyCalendar {
            width: 80%;
            position: fixed;
            top: 20vh;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 20px;
            box-shadow: 0px 4px 12px rgba(51, 51, 51, 0.8);
            .dialyCalendarTop {
                background: linear-gradient(to right, #ec6a50, #ea3a21);
                border-radius: 20px 20px 0 0;
                color: #fff;
                .dialyCalendarTopTitle {
                    position: relative;
                    padding: 16rpx 16rpx 4rpx;
                    text-align: center;
                    font-size: 32rpx;
                    .closeButton {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: absolute;
                        top: 20rpx;
                        right: 20rpx;
                        width: 40rpx;
                        height: 40rpx;
                    }
                }
                .dialyCalendarTopHead {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12rpx 0;
                    font-size: 28rpx;
                    .dialyCalendarHeadButton {
                        width: 40rpx;
                        height: 40rpx;
                        color: #fff;
                    }
                    image {
                        width: 40rpx;
                        height: 40rpx;
                    }
                    .buttonLeft {
                        margin-right: 40rpx;
                        margin-left: auto;
                    }
                    .buttonRight {
                        margin-right: auto;
                        margin-left: 40rpx;
                        transform: rotate(180deg);
                    }
                }
            }
            .dialyCalendarCenter {
                padding: 0 32rpx;
                background: #fff;
                .dialyCalendarWeek {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20rpx 0;
                    .weekItem {
                        flex: 1;
                        text-align: center;
                        font-size: 28rpx;
                        color: #8a8b88;
                        font-weight: bold;
                    }
                }
                .dialyCalendarDays {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    .dayItem {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: calc(100% / 7);
                        height: calc(calc(80vw - 64rpx) / 7);
                        padding: 8rpx;
                        font-size: 24rpx;
                        color: #666;
                        font-weight: bold;
                        box-sizing: border-box;
                        .dayItemText {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 100%;
                            height: 100%;
                            border-radius: 50rpx;
                            box-sizing: border-box;
                            &.isSignedIn {
                                color: #fff;
                                background: #ea3a21;
                                box-shadow: 0px 2px 6px rgba(51, 51, 51, 0.5);
                            }
                            &.isSelected {
                                color: #fff;
                                background: #ee9e79;
                                box-shadow: 0px 2px 6px rgba(51, 51, 51, 0.5);
                            }
                        }
                    }
                }
            }
            .dialyCalendarBottom {
                padding: 8rpx 24rpx 18rpx;
                border-radius: 0 0 20px 20px;
                background: #fff;
                .tips {
                    font-size: 32rpx;
                    font-weight: bold;
                    color: #95382b;
                }
                .tipsMini {
                    color: #a8a8a8;
                }
                .remainingTimes {
                    color: #ea3a21;
                }
                .signInButton {
                    width: 148rpx;
                    margin: 0 auto;
                    padding: 6rpx 0;
                    border-radius: 20px;
                    font-size: 32rpx;
                    text-align: center;
                    background: linear-gradient(to right, #ec6a50, #ea3a21);
                    color: #fff;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>