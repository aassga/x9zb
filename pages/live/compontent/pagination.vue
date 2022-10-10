<template>
    <view class="pagination">
        <view class="pagination-btn" @click="page_jump(1)">
            首页
        </view>
        <view class="pagination-btn" @click="page_jump(current - 1)">
            上页
        </view>
        <view 
            class="pagination-btn num" 
            :class="{'active': it == current}" 
            v-for="it in page_list" 
            :key="it"
            @click="page_jump(it)"
        >
            {{it}}
        </view>
        <view class="pagination-btn" @click="page_jump(current + 1)">
            下页
        </view>
        <view class="pagination-btn" @click="page_jump(total_page)">
            尾页
        </view>
    </view>
</template>

<script>
    export default {
        name: 'pagination',
        data() {
            return {
            }
        },
        props: {
            // 當前第幾頁
            current: {
                type: Number || String,
                default: 1
            },
            // 總共幾筆
            total: {
                type: Number || String,
                default: 0
            },
            // 一頁幾筆
            limit: {
                type: Number || String,
                default: 20
            }
        },
        computed: {
            total_page() {
                let result = 1;
                if (this.total > 0) {
                    result = Math.ceil(this.total / this.limit);
                }
                return result;
            },
            page_list() {
                let page = parseInt(this.current);
                let min_page = Math.max(page - 2, 1);
                let max_page = Math.min(min_page + 4, this.total_page);
                min_page = Math.max(max_page - 4, 1);
                let page_list = [];
                for (let i = min_page; i <= max_page; i++) {
                    page_list.push(i);
                }
                if (page_list.length === 0) {
                    page_list.push(1);
                }
                return page_list;
            }
        },
        methods: {
            page_jump(page) {
                this.$emit('jumpPage', page);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .pagination{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100rpx;
        width: 100%;
        .pagination-btn {
            height: 60rpx;
            padding: 0 10rpx;
            margin-right: 6rpx;
            font-size: 28rpx;
            line-height: 60rpx;
            color: #777;
            background: #d7d7d7;
            border-radius: 4px;
            text-align: center;
            box-sizing: border-box;
            &.num {
                min-width: 60rpx;
                border-radius: 50%;
            }
            &.active {
                color: #87390E;
                background: linear-gradient(90deg, #FFDFAB 0%, #E3AC72 100%);
            }
            &:last-child {
                margin: 0;
            }
        }
    }
</style>