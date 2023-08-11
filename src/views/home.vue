<template>
  <section>
    <Aside></Aside>
    <Main></Main>
  </section>
</template>

<script setup lang="ts">
import Aside from '../components/aside.vue'
import Main from '../components/main.vue'
</script>

<style scoped lang="scss">
section {
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
}
</style>
