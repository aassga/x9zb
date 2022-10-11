<template>
    <div class="page-contentainer">
        <div class="page-title-wrap">
            <span class="page-title">列表</span>
        </div>
        <div class="page-content">
            <ds-table-page ref="first" fixed="right" :loading="loading" :total="total" :columns="columns" :table-data="tableData" :operationWidth="80" @search="search" :isSelection="true" @selected="selected($event)">
                <template slot="operation" slot-scope="scope">
                    <el-button size="small" class="fll" type="text" @click="total = 1">编辑</el-button>
                    <el-dropdown class="more-dots">
                        <span class="el-dropdown-link">...</span>
                        <el-dropdown-menu slot="dropdown" class="more-dropdown">
                            <el-dropdown-item>
                                <el-button type="text" size="small" @click="currentItem=scope.row">上架</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button type="text" size="small" @click="currentItem=scope.row">删除</el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </ds-table-page>
        </div>
    </div>
</template>

<script>
import { lfetchList } from '@/api/table'
import DsTablePage from "@/components/DsTablePage";

export default {
    name: 'able',
    components: {
        DsTablePage
    },
    data() {
        return {
            columns: [
                { prop: "id", label: "ID", width: "50" },
                { prop: "cover", label: "图片路径", tooltip: true, width: "170" },
                { prop: "content", label: "名称", minWidth: "100", tooltip: true },
                { prop: "price", label: "价格", minWidth: "100", tooltip: true },
                { prop: "statusText", label: "状态", width: "170", tooltip: true },
                { prop: "created_time", label: "创建时间", width: "170", tooltip: true },
                { prop: "try", label: "描述", width: "200", tooltip: true },
                { prop: "title", label: "简介", width: "200", tooltip: true },
            ],
            pageNum: 1,
            pageSize: 10,
            total: 0,
            loading: false,
            tableData: [],
            currentItem: {
                outsName: null
            }
        };
    },
    methods: {
        getList(){
            lfetchList().then(res => {
                // console.log(res)
                this.tableArr = res.data.items 
                this.tableArr.map(item => {
                    if(item.status){
                        item.statusText = "完成"
                    }else{
                        item.statusText = "未完成"
                    }
                    item.price = "$" + item.price
                })
                this.tableData = this.tableArr.slice((this.pageNum - 1) * this.pageSize, this.pageNum * this.pageSize) || []
                this.total = res.data.total
            })
        },
        search(pageNum = this.pageNum, pageSize = this.pageSize) {
            this.tableData = this.tableArr.slice((pageNum - 1) * pageSize, pageNum * pageSize) || []
        },
        selected(ev){
            // console.log(ev)
        }
    },
    mounted(){
        this.getList()
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

<style lang="scss">
  @import "~@/styles/element-ui/index.scss";
</style>
