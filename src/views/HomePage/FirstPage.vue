<script setup>
import {useRouter} from "vue-router";
import {onMounted} from "vue";
import { ref } from "vue";
import axios from "axios";
import {useCounterStore} from "@/stores/counter.js";


const store = useCounterStore()
//链接解析部分
//华语页面
const list = ref()
const url = ref([])
//新碟上线页面
const newUrls = ref()
const newTapes = ref([])
const hot_search = ref()
//热门歌手
const hot_singer = ref()
//推荐电台
const hot_tv = ref()
//热门节目
const hot_live = ref()
onMounted(() => {
  const getHome = () => {
    axios.get('http://8.130.35.251:3000/personalized/newsong').then((res) => {
      list.value = res.data.result.slice(0,8)
    })
    axios.get('http://8.130.35.251:3000/personalized/newsong').then((res) => {
      for (let i = 0;i < 8;i ++){
        url.value.push(res.data.result[i].song.id)
      }
    })

  }
  //新碟上架链接解析
  const getNew = () => {
    axios.get('http://8.130.35.251:3000/top/album?offset=0&limit=30&year=2019&month=6').then((res) => {
      newUrls.value = res.data.monthData.slice(0,8)
    })
    axios.get('http://8.130.35.251:3000/top/album?offset=0&limit=30&year=2019&month=6').then((res) => {
      for (let i = 0;i < 8;i ++){
        newTapes.value.push(res.data.monthData[i].id)
      }
    })
    //获取热搜记录
    axios.get('http://8.130.35.251:3000/search/hot/detail').then((res) => {
      hot_search.value = res.data.data.slice(0,14)
    })
  }
  //获取热门歌手
  const getSinger = () => {
    axios.get('http://8.130.35.251:3000/top/artists').then((res) => {
      hot_singer.value = res.data.artists.slice(0,8)
    })
  }
  //获取电台推荐
  const getTV = () => {
    axios.get('http://8.130.35.251:3000/personalized/djprogram').then((res) => {
      hot_tv.value = res.data.result
    })
  }
  //获取热门节目
  const getProgram = () => {
    axios.get('http://8.130.35.251:3000/program/recommend?limit=8').then((res) => {
      hot_live.value = res.data.programs
    })
  }
  getProgram()
  getTV()
  getSinger()
  getHome()
  getNew()
})
const swiperList = ref([
    'https://p1.music.126.net/g43E1tvb_kl5B7R3uFVXgg==/109951169251942850.jpg?imageView&quality=89',
    'https://p1.music.126.net/xi2VBlgbUfmm-kmtIMheBA==/109951169251939548.jpg?imageView&quality=89',
    'https://p1.music.126.net/ElO9bc6seLPxmWWZ7_Yuvg==/109951169251965661.jpg?imageView&quality=89',
    'https://p1.music.126.net/m4N5Uo30VUFOBLgJzV3ZGA==/109951169251903279.jpg?imageView&quality=89'
])

//获取音乐链接
const getID = (index) => {
  axios.get(`http://8.130.35.251:3000/song/url/v1?id=${url.value[index]}&level=standard`).then((res) => {
    store.Murl = res.data.data[0].url
  })
}
const getID_2 = (index) => {
  axios.get(`http://8.130.35.251:3000/song/url/v1?id=${newTapes.value[index]}&level=standard`).then((res) => {
    store.Murl = res.data.data[0].url
  })
  console.log(newTapes.value[index])
}
const router = useRouter()
const jump = () => {
  router.push('/login')
  store.getQR()
}
const switch_value = ref(false)
//点击热搜歌曲，直接播放
const hotSearch = ref('')
const search = (index) => {
  hotSearch.value = hot_search.value[index].searchWord
    axios.get(`http://8.130.35.251:3000/search?keywords=${hotSearch.value}`).then((res) => {
      axios.get(`http://8.130.35.251:3000/song/url/v1?id=${res.data.result.songs[0].id}&level=standard`).then((res) => {
        store.Murl = res.data.data[0].url
      })
    })
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
            <el-tab-pane label="热门">
              <div class="tab-item">
                <div v-for="(item,index) in list" :key="item" class="tab-div">
                  <div class="img-bk">
                    <img :src="item.picUrl" alt="" loading="lazy" @click="getID(index)">
                  </div>
                  <p>{{item.name}}</p>
                  <p>歌手:{{item.song.artists[0].name}}</p>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="新碟上架">
              <div class="tab-item">
                <div v-for="(item,index) in newUrls" :key="item" class="tab-div">
                  <div class="img-bk">
                    <img :src="item.picUrl" alt="" @click="getID_2(index)">
                  </div>
                  <p>{{item.name}}</p>
                  <p>歌手:{{item.artist.name}}</p>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="电台">
              <div class="tab-item">
                <div class="tab-div" v-for="item in hot_tv" :key="item">
                  <div class="img-bk">
                    <img :src="item.picUrl" alt="" loading="lazy">
                  </div>
                  <p>{{item.name}}</p>
                  <p>{{item.program.dj.nickname}}</p>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="推荐节目">
              <div class="tab-item">
                <div class="tab-div" v-for="item in hot_live" :key="item">
                  <div class="img-bk">
                    <img :src="item.mainSong.album.picUrl" alt="" loading="lazy">
                  </div>
                  <p>{{item.mainSong.album.name}}</p>
                  <p>{{item.mainSong.album.artist.name}}</p>
                </div>
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
          <div class="dark-mode">
            <p>开启夜间模式</p>
            <el-switch v-model="switch_value" size="large" active-text="夜间模式" inline-prompt active-color="#C20C0C"></el-switch>
          </div>
        </div>
      </div>
      <div class="tabs-box">
        <div class="tabs-right" id="hot-search" style="border-right: 1px solid #d3d3d3;box-sizing: border-box">
          <ul class="hot-search">
            <li style="font-size: 20px;font-weight: bold;text-align: center;box-shadow: none">热搜榜</li>
            <li v-for="(item,index) in hot_search" :key="index" @click="search(index)">
              {{index + 1 }}、&nbsp;{{item.searchWord}}
            </li>
          </ul>
        </div>
        <div class="tabs-left">
          <div class="left-title">热门歌手</div>
          <div class="left-musician">
            <div class="singer" v-for="item in hot_singer" :key="item">
              <div class="singer-bk">
                <img :src="item.picUrl" alt="" loading="lazy">
              </div>
              <p>{{item.name}}</p>
              <p>{{item.alias[0]}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "First.css";
</style>