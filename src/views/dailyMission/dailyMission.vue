<template>
    <div class="dailyMission">
		<div class="dialogMain">
			<div class="dialogContent">
				<div class="dialogMissionMenu">
					<div class="dialogMissionMenuHead">
						<div class="title" @click="test()">每日任务：</div>
						<div class="balance">
							<img class="diamond-icon" src="../../assets/images/daily/diamond.png"/>
							我的钻石余额: 
							<span>{{is_login ? parseInt(userInfo.balances) : 0}}</span>
						</div>
					</div>
					<div class="dialogMissionList">
						<div class="dialogMissionListItem" v-for="it in missionList" :key="it.id">
							<img class="dialogMissionListItemIcon" :src="it.icon"/>
							<div class="dialogMissionListItemText">
								<div class="dialogMissionListItemTextTitle">
									{{it.name}}
									<div class="dialogMissionSignInButton" v-if="it.code === 'checkin'" @click="signIn(0)">点击签到</div>
								</div>
								<div class="dialogMissionListItemTextContent">{{it.description}}</div>
							</div>
							<div class="dialogMissionListItemButton" :class="{'disabled': it.user.progress_status !== 2}" @click="receiveAward(it)">{{it.user.progress_str}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="dialyCalendar" v-if="showCalendar">
			<div class="dialyCalendarTop">
				<div class="dialyCalendarTopTitle">
					<div>签到</div>
					<div class="closeButton" @click="showCalendar = false">
						<i class="el-icon-close"></i>
					</div>
				</div>
				<div class="dialyCalendarTopHead">
					<img class="buttonLeft" src="../../assets/images/daily/right.png" @click="lastMonth()" />
					<div>{{year}}年{{month}}月</div>
					<img class="buttonRight" src="../../assets/images/daily/right.png" @click="nextMonth()" />
				</div>
			</div>
			<div class="dialyCalendarCenter">
				<div class="dialyCalendarWeek">
					<div class="weekItem">日</div>
					<div class="weekItem">一</div>
					<div class="weekItem">二</div>
					<div class="weekItem">三</div>
					<div class="weekItem">四</div>
					<div class="weekItem">五</div>
					<div class="weekItem">六</div>
				</div>
				<div class="dialyCalendarDays">
					<div class="dayItem" v-for="(it, index) in days" :key="index">
						<div class="dayItemText" :class="{'isSignedIn': signedInNum.indexOf(it) !== -1, 'isSelected': selectDateNum === it}" @click="selectDate(it)">{{it}}</div>
					</div>
				</div>
			</div>
			<div class="dialyCalendarBottom">
				<div class="tips">
					连续打卡签到30天即可抽取世界杯门票
				</div>
				<div class="tipsMini">
					小提示: 选中日期点击补签即可成功补签<br/>
					补签需花費50钻石, 每月补签次数上限為3次。
				</div>
				<div class="remainingTimes">
					剩余次数: {{amended}}次
				</div>
				<div class="signInButton" @click="signIn(1)">
					补签
				</div>
			</div>
		</div>
    </div>
</template>

<script>
    import {
        getMission,
        getSignInRecord,
        getAmended,
        signIn,
        receiveAward
    } from '../../api/user.js'
    export default {
        name: 'DailyMission',
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
				return this.$store.state.infos;
            },
            is_login() {
                let result = false;
				if (JSON.stringify(this.$store.state.infos) !== '{}') {
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
                return result
            }
        },
		watch: {
			userInfo: {
				handler(newV, oldV) {
					if (newV) {
						this.initCalendar();
						this.getMission();
						this.getSignInRecord();
						this.getAmended();
					}
				},
				deep: true
			}
		},
        created() {
			if (localStorage.getItem('userInfo')) {
				if (localStorage.getItem('userInfo') !== '{}') {
					this.$store.dispatch('getUserInfo', '');
				}
			} else {
				this.initCalendar();
				this.getMission();
				this.getSignInRecord();
				this.getAmended();
			}
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
                let user_id = this.$store.state.user.token ? this.$store.state.user.data.id : localStorage.getItem("userid");
                let data = {
                    user_id: user_id
                }
                getMission(data).then(res => {
                    this.missionList = res.data;

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
							this.$message.success('您已完成了所有任务!');
							this.isShowAllCompleted = true;
						}
					}
                })
            },
            // 取得簽到記錄
            getSignInRecord() {
                let user_id = this.$store.state.user.token ? this.$store.state.user.data.id : localStorage.getItem("userid");
                let data = {
                    user_id: user_id
                }
                getSignInRecord(data).then(res => {
                    let record = res.data.map(it => it.date);
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
                let user_id = this.$store.state.user.token ? this.$store.state.user.data.id : localStorage.getItem("userid");
                let data = {
                    user_id: user_id
                }
                getAmended(data).then(res => {
                    // res.data = 當月補簽過次數
                    this.amended = (3 - res.data) < 0 ? 0 : (3 - res.data);
                }).catch(res => {
                    this.amended = 0;
                })
            },
            // 0: 簽到, 1: 補簽
            signIn(type = 0) {
                if (!this.is_login) {
                    return this.$message.error('请先登录');
                }
                let user_id = this.$store.state.user.token ? this.$store.state.user.data.id : localStorage.getItem("userid");
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
                        return this.$message.error('尚未选择日期');
                    }
                    if (this.amended <= 0) {
                        return this.$message.error('补签剩余次数不足');
                    }
                    let balance = this.is_login ? parseInt(this.userInfo.balances) : 0;
                    if (balance < 50) {
                        return this.$message.error('钻石余额不足');
                    }
                    data['date'] = `${this.year}-${this.month}-${this.selectDateNum}`;
                }
                signIn(data).then(res => {
                    if (res.data) {
                        this.getSignInRecord();
                        this.$message.success(`${type === 0 ? '签到' : '补签'}成功`);
                        if (type === 0) {
                            this.getMission();
                            this.isTodaySignIn = true;
                        }
                        if (type === 1) {
                            this.$store.dispatch('getUserInfo', '');
                            this.getAmended();
                            this.selectDateNum = null;
                        }
                    } else {
                        this.$message.error(`${type === 0 ? '签到' : '补签'}失败`);
                    }
                }).catch(res => {
                    this.$message.error(`${type === 0 ? '签到' : '补签'}失败`);
                })
            },
            // 領取獎勵
            receiveAward(it) {
                if (it.user.progress_status !== 2) {
                    return;
                }
                if (!this.is_login) {
                    return this.$message.error('请先登录');
                }
                let user_id = this.$store.state.user.token ? this.$store.state.user.data.id : localStorage.getItem("userid");
                let data = {
                    code: it.code,
                    user_id: user_id
                }
                receiveAward(data).then(res => {
                    if (res.data) {
                        this.$store.dispatch('getUserInfo', '');
                        this.getMission();
                        this.$message.success('领取成功');
                    } else {
                        this.$message.error('领取失败');    
                    }
                }).catch(res => {
                    this.$message.error('领取失败');
                })
            },
			test() {
				// console.log(this.$store.state);
			}
        }
    }
</script>

<style lang="scss" scoped>
	.dailyMission {
		padding-top: 60px;
        .dialogMain {
            background: url('../../assets/images/daily/Bg.png') center top / 1280px auto no-repeat;
			background-color: #fbfbfb;
            .dialogContent {
				padding-top: 610px;
                margin-bottom: 40px;
                .dialogMissionMenu {
                    width: calc(100% - 80px);
					max-width: 1230px;
                    margin: 0 auto;
                    padding: 40px 65px;
                    border-radius: 5px;
                    background: #fff;
                    box-shadow: 0px 0px 15px rgba(51, 51, 51, 0.5);
                    box-sizing: border-box;
                    .dialogMissionMenuHead {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .title {
                            color: #000;
                            font-size: 24px;
                            font-weight: bold;
                        }
                        .balance {
                            color: #000;
                            font-size: 16px;
                            font-weight: bold;
                            img {
                                width: 28px;
                                height: 28px;
                            }
                            span {
                                color: #ffa90f;
                            }
                        }
                    }
                    .dialogMissionList {
                        margin-top: 40px;
                        .dialogMissionListItem {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            margin-bottom: 15px;
                            .dialogMissionListItemIcon {
                                width: 70px;
                                height: 70px;
                            }
                            .dialogMissionListItemText {
                                flex: 1;
                                margin: 0 20px;
                                .dialogMissionListItemTextTitle {
                                    display: flex;
                                    align-items: flex-end;
                                    font-size: 18px;
                                    font-weight: bold;
                                    color: #000;
                                    .dialogMissionSignInButton {
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        margin-left: 10px;
                                        padding: 3px;
                                        font-size: 14px;
                                        border-radius: 3px;
                                        text-align: center;
                                        color: #fff;
                                        background: linear-gradient(180deg, #ffa90f, #f87400);
                                        box-sizing: border-box;
                                        cursor: pointer;
                                    }
                                }
                                .dialogMissionListItemTextContent {
                                    font-size: 14px;
                                    line-height: 1.4;
                                    color: #777;
                                }
                            }
                            .dialogMissionListItemButton {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                min-height: 34px;
                                width: 100px;
                                padding: 0 14px;
                                font-size: 14px;
                                border-radius: 3px;
                                text-align: center;
                                color: #fff;
                                background: linear-gradient(180deg, #ffa90f, #f87400);
                                box-sizing: border-box;
                                box-shadow: 0px 2px 6px rgba(51, 51, 51, 0.8);
                                cursor: pointer;
                                &.disabled {
                                    color: #4c4c4c;
                                    background: linear-gradient(180deg, #aba8a5, #717171);
                                }
                            }
                        }
                    }
                }
            }
        }

        .dialyCalendar {
            width: 80%;
            max-width: 400px;
            position: fixed;
            top: 20vh;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 20px;
            box-shadow: 0px 4px 12px rgba(51, 51, 51, 0.8);
			z-index: 9999;
            .dialyCalendarTop {
                background: linear-gradient(to right, #ec6a50, #ea3a21);
                border-radius: 20px 20px 0 0;
                color: #fff;
                .dialyCalendarTopTitle {
                    position: relative;
                    padding: 8px 8px 4px;
                    text-align: center;
                    font-size: 18px;
                    .closeButton {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: absolute;
                        top: 15px;
                        right: 15px;
                        font-size: 24px;
                        cursor: pointer;
                    }
                }
                .dialyCalendarTopHead {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 6px 0;
                    font-size: 16px;
                    .dialyCalendarHeadButton {
                        width: 40px;
                        height: 40px;
                        color: #fff;
                    }
                    img {
                        width: 25px;
                        height: 25px;
                    }
                    .buttonLeft {
                        margin-right: 20px;
                        margin-left: auto;
                        cursor: pointer;
                    }
                    .buttonRight {
                        margin-right: auto;
                        margin-left: 20px;
                        cursor: pointer;
                        transform: rotate(180deg);
                    }
                }
            }
            .dialyCalendarCenter {
                padding: 0 16px;
                background: #fff;
                .dialyCalendarWeek {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 5px 0;
                    .weekItem {
                        flex: 1;
                        text-align: center;
                        font-size: 18px;
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
                        height: calc(calc(400px - 40px) / 7);
                        padding: 8px;
                        font-size: 16px;
                        color: #666;
                        font-weight: bold;
                        box-sizing: border-box;
                        .dayItemText {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 100%;
                            height: 100%;
                            border-radius: 50px;
                            box-sizing: border-box;
                            cursor: pointer;
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
                padding: 0 16px 10px;
                border-radius: 0 0 20px 20px;
                background: #fff;
                .tips {
                    font-size: 20px;
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
                    width: 86px;
                    margin: 0 auto;
                    padding: 3px 0;
                    border-radius: 20px;
                    font-size: 16px;
                    text-align: center;
                    background: linear-gradient(to right, #ec6a50, #ea3a21);
                    color: #fff;
                    box-sizing: border-box;
                    cursor: pointer;
                }
            }
        }
	}
</style>