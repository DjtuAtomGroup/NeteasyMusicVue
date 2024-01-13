<script setup>
import { ref } from "vue";
import {watchEffect} from "vue";
import {useCounterStore} from "@/stores/counter.js";
const store = useCounterStore()
const music = ref('')

watchEffect(() => {
  music.value = store.Murl
})
</script>

<template>
  <div class="bottom">
    <div class="bottom-audio">
      <audio controls :src="music" autoplay/>
    </div>
  </div>
</template>

<style scoped>
@import "footer.css";
</style>