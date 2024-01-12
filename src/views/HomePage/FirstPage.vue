<script setup>
import {useRouter} from "vue-router";
import {onMounted} from "vue";
import { ref } from "vue";
import axios from "axios";
const list = ref()

onMounted(() => {
  const getHome = () => {
    axios.get('http://8.130.35.251:3000/personalized/newsong').then((res) => {
      list.value = res.data.result.slice(0,8)
    })
  }
  getHome()
})
const swiperList = ref([
    'https://p1.music.126.net/g43E1tvb_kl5B7R3uFVXgg==/109951169251942850.jpg?imageView&quality=89',
    'https://p1.music.126.net/xi2VBlgbUfmm-kmtIMheBA==/109951169251939548.jpg?imageView&quality=89',
    'https://p1.music.126.net/ElO9bc6seLPxmWWZ7_Yuvg==/109951169251965661.jpg?imageView&quality=89',
    'https://p1.music.126.net/m4N5Uo30VUFOBLgJzV3ZGA==/109951169251903279.jpg?imageView&quality=89'
])
const router = useRouter()
const jump = () => {
  router.push('/login')
}
</script>

<template>
  <div class="background">
    <div class="img">
      <el-carousel height="280px" pause-on-hover interval="5000" autoplay>
        <el-carousel-item v-for="item in swiperList" :key="item">
          <img :src="item" alt="" loading="lazy">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="inner">
      <div class="tabs-box">
        <div class="tabs-left">
          <el-tabs type="border-card">
            <el-tab-pane label="华语">
              <div class="tab-item">
                <div v-for="item in list" :key="item" class="tab-div">
                  <img :src="item.picUrl" alt="" loading="lazy">
                  <p>{{item.name}}</p>
                  <p>歌手:{{item.song.artists[0].name}}</p>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="流行">
              <div class="tab-item">
                vvvvv
              </div>
            </el-tab-pane>
            <el-tab-pane label="摇滚">
              <div class="tab-item">
                momomomo
              </div>
            </el-tab-pane>
            <el-tab-pane label="民谣">
              <div class="tab-item">
                momomomo
              </div>
            </el-tab-pane>
            <el-tab-pane label="电子">
              <div class="tab-item">
                momomomo
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="tabs-right">
          <div class="tab-download">
            <a href="https://music.163.com/#/download" target="_blank"></a>
            <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
          </div>
          <div class="tabs-right-login">
            <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
            <el-button type="danger" style="background-color: #c20c0c" @click="jump">用户登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "First.css";
</style>