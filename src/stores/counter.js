import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";
import {useRouter} from "vue-router";

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  const isShow = ref(false)
  const url = ref('')
  const sta = ref()
  const key = ref('')
  const layer = ref(false)
  const getQR = () => {
    const router = useRouter()
    axios.get('http://8.130.35.251:3000/login/qr/key').then((res) => {
      key.value = res.data.data.unikey
    })
    axios.get(`http://8.130.35.251:3000/login/qr/create?key=${key.value}`).then((res) => {
      url.value = res.data.data.qrurl
    })
    function getStatus()  {
      axios.get(`http://8.130.35.251:3000/login/qr/check?key=${key.value}`).then((res) => {
        sta.value = res.data.code
      })
      //如果状态码800说明二维码无效，清除轮询，显示遮罩
      if (sta.value === 800){
        clearInterval(timer)
        console.log('二维码已失效')
        layer.value = !layer.value
      }
      //如果状态码803说明登陆成功，cookie已返回，跳转首页
      if (sta.value === 803){
        console.log('登陆成功')
        router.push('/')
      }
    }
    const timer = setInterval(getStatus,5000)
  }
  function increment() {
    count.value++
  }
  //音乐播放
  const Murl = ref('')

  return { count, doubleCount, increment,isShow,url,sta,key,layer,getQR,Murl }
})
