<template>
    <div id="app">
        <el-container style="height: 500px; border: 1px solid #eee">

            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
<!--          每次点击自动关上      :default-openeds="['0', '1']-->
                <el-menu router>
                    <el-submenu v-for="(item,index) in $router.options.routes" :index="index+''" v-if="item.show">
                        <template slot="title">{{item.name}}</template>
                        <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path"
                                      v-if="item2.name !== '添加图书' || $store.state.user.role === 1"
                                      :class="$route.path==item2.path?'is-active':''">{{item2.name}}</el-menu-item>
                    </el-submenu>
                </el-menu>

            </el-aside>

            <el-main>
                <router-view></router-view>
            </el-main>

        </el-container>
    </div>
</template>

<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>

<script>
    export default {
        data() {
            return{

            }
        }
    };
</script>
