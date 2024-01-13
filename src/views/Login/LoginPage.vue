<script setup>
import {ref, watchEffect} from "vue";
import QrcodeVue from "qrcode.vue";
import {useCounterStore} from "@/stores/counter.js";
const value = ref('')
const size = ref(128)
const status = ref()
const store = useCounterStore()
watchEffect(() => {
  value.value = store.url
  status.value = store.sta
})

const refresh = () => {
  store.layer = !store.layer
  store.getQR()
}
</script>

<template>
  <div class="background">
    <div class="boxground">
      <div class="title">登录</div>
      <div class="box">
        <div class="item-1">
          <div class="img-1"></div>
        </div>
        <div class="item-1">
          <div class="QR-c">
            <div class="notice">扫码登录</div>
            <div class="layer" v-show="store.layer">
              <el-button type="primary" style="height: 30px;margin-top: 49px" @click="refresh">刷新</el-button>
            </div>
            <div class="QR" id="qr">
              <qrcode-vue :value="value" :size="size"></qrcode-vue>
            </div>
            <div class="notice_2">使用<a href="https://music.163.com/#/download" target="_blank" style="color: dodgerblue">网易云app</a>扫码登录</div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <el-button style="width: 150px;height: 32px;margin-top: 9px;border-radius: 16px;border: 1px solid #b9b8b8;overflow: hidden;background-color: transparent;color: #b9b8b8">选择其他登录方式</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "Login.css";
</style>