<template>
  <div class="layout_main">
    <header></header>
    <div class="layout_siderbar-trigger"></div>
    <div class="CustomPageTitle">
      <img :src="target_png">
      <span>目标</span>
    </div>
    <div class="content-wrapper">
      <div class="IndexPage_layout-content">
        <div className="Tab_content">
          <div className="Tab_menu">
            <span>双月目标</span>
          </div>
        </div>
        <div class="MonthlyObjective_monthly-objective">
          <div class="title"></div>
          <Target></Target>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import target_png from '../assets/target.png'
import Target from '@/components/target.vue'
</script>

<style lang="scss" scoped>
@import './main.scss';
</style>