<template>
  <div class="layout_main">
    <header></header>
    <div class="layout_siderbar-trigger"></div>
    <div class="CustomPageTitle">
      <img :src="target_png" />
      <span>目标</span>
    </div>
    <div class="content-wrapper">
      <div class="IndexPage_layout-content">
        <div class="Tab_content">
          <div class="Tab_menu">
            <span>双月目标</span>
          </div>
        </div>
        <div class="MonthlyObjective_monthly-objective">
          <div class="title"></div>
          <Target :list="target_list" @change_content="changeTarget"></Target>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import target_png from '../assets/target.png'
import Target from '@/components/target.vue'
import { ref } from 'vue'

interface TargetType {
  content?: string
  id?: string
  score?: string
}
const target_list = ref<TargetType[]>([{ content: '' }])

const changeTarget = (val: TargetType) => {
  target_list.value = [val]
}
</script>

<style lang="scss" scoped>
@import "./main.scss";
</style>