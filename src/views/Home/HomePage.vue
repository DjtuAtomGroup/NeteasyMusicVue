<script setup>
import NavigatorPage from "@/components/Navigator/NavigatorPage.vue";
import FooterPage from "@/components/Footer/FooterPage.vue";
</script>

<template>
  <NavigatorPage/>
  <RouterView/>
  <FooterPage/>
</template>

<style scoped>
@import "Home.css";
</style>