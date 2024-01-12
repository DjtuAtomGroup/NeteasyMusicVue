<script setup>
import { ref } from "vue";
import {Search} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {useCounterStore} from "@/stores/counter.js";
const store = useCounterStore()



const value = ref('')
const router = useRouter()
const loginBtn = () => {
  router.push('/login')
  store.getQR()
}
</script>

<template>
  <div class="navigator" style="left: 0;right: 0;top: 0">
    <div class="main">
      <div class="item-1"><a href="/" style="width: 177px;height: 70px;cursor: pointer;display: block"></a></div>
      <div class="item-2">
        <el-menu
            :default-active="'/'"
            class="el-menu-demo"
            mode="horizontal"
            active-text-color="#ffffff"
            text-color="#ccc"
            router
            background-color="#C20C0C"
        >
          <el-menu-item index="/">发现音乐</el-menu-item>
          <el-menu-item index="/music">我的音乐</el-menu-item>
          <el-menu-item index="/follow">关注</el-menu-item>
          <el-menu-item index="/shop">商城</el-menu-item>
          <el-menu-item index="/musician">音乐人</el-menu-item>
          <el-menu-item index="/cloud">云推歌</el-menu-item>
        </el-menu>
      </div>
      <div class="item-3">
        <el-input v-model="value" placeholder="音乐/视频/电台/用户" :prefix-icon="Search" clearable/>
      </div>
      <div class="item-4">
        <el-button style="width: 100%;border: 1px solid #cccccc;border-radius: 16px;background-color: transparent;color: white" @click="loginBtn">登录</el-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "navigator.css";
</style>