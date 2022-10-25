<template>
    <view class="redEnvelopeDialog">
        <view class="redEnvelopeDialogBg1" v-if="!is_login">
            <image class="redEnvelopeDialogClose" src="/static/images/daily/red-envelope-dialog-close-1.png" @click="close()"></image>
            <view class="redEnvelopeDialogBtns">
                <image class="redEnvelopeDialogBtnLeft" src="/static/images/daily/red-envelope-dialog-btn-1-1.png" @click="btnClick(true)"></image>
                <image class="redEnvelopeDialogBtnRight" src="/static/images/daily/red-envelope-dialog-btn-1-2.png" @click="btnClick(false)"></image>
            </view>
        </view>
        <view class="redEnvelopeDialogBg2" v-else>
            <image class="redEnvelopeDialogClose" src="/static/images/daily/red-envelope-dialog-close-1.png" @click="close()"></image>
        </view>
    </view>
</template>

<script>
    export default {
        name: 'redEnvelopeDialog',
        data() {
            return {

            }
        },
        computed: {
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
        },
        methods: {
            btnClick(isRegister) {
                if (isRegister) {
                    localStorage.setItem('isRegister', '1');
                }
                localStorage.setItem('backTo', location.hash);
                this.$navigateTo('../login/index');
            },
            close() {
                this.$emit('close');
            }
        },
    }
</script>

<style lang="scss" scoped>
    .redEnvelopeDialog {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000000;
        .redEnvelopeDialogBg1,
        .redEnvelopeDialogBg2 {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: column;
            position: relative;
            width: 80%;
            height: 596rpx;
            background: url(../../static/images/daily/red-envelope-bg-1.png) center top / 100% auto no-repeat;
            .redEnvelopeDialogClose {
                position: absolute;
                z-index: 1;
                width: 42rpx;
                height: 42rpx;
                top: 186rpx;
                right: 50rpx;
            }
            .redEnvelopeDialogBtns {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                margin-top: auto;
                margin-bottom: 100rpx;
                padding: 0 88rpx;
                box-sizing: border-box;
                .redEnvelopeDialogBtnLeft,
                .redEnvelopeDialogBtnRight {
                    flex: 1;
                    height: 52rpx;
                }
                .redEnvelopeDialogBtnLeft {
                    margin-right: 54rpx;
                }
                .redEnvelopeDialogBtnRight {
                    margin-left: 54rpx;
                }
            }
        }
        .redEnvelopeDialogBg2 {
            background: url(../../static/images/daily/red-envelope-bg-2.png) center 64rpx / 100% auto no-repeat;
        }
    }
</style>