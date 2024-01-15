<script setup>
import {onMounted} from "vue";
import {ref} from "vue";
import axios from "axios";
//获取用户信息
const info = ref()
onMounted(() => {
  const getInfo = () => {
    axios.get('http://8.130.35.251:3000/user/account').then((res) => {
      info.value = res.data.profile.avatarUrl
      console.log(res.data.profile.avatarUrl)
    })
  }
  getInfo()
})
</script>

<template>
  <div class="background">
    <div class="inner">
      <div class="user-info">
        <div class="avatar">
          <div class="user-img">
            <img :src="info" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "Second.css";
</style>