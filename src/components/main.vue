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
          <Target :list="v" @change_content="changeTarget" v-for="v in target_list" :key="v.id"></Target>
        </div>
        <!-- 新增按钮 -->
        <button class="add_btn" @click="addTarget">
          <span role="img" class="icon-plus" style="outline: none;">
            <svg
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
              class
            >
              <use xlink:href="#tu-icon-add" />
            </svg>
          </span>
          新增目标
          <span class="add_obj_subtitle" v-if="showBtnSubtitle">点击“新增目标”按钮创建次双月第一个重要目标</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import target_png from '../assets/target.png'
import Target from '@/components/target.vue'
import { computed, ref } from 'vue'
import { generateUUID } from '../utils/index'

interface TargetType {
  content?: string
  id: string
  score?: string
}
const target_list = ref<TargetType[]>([])

const changeTarget = (val: TargetType) => {
  target_list.value = [val]
}

const showBtnSubtitle = computed(() => !target_list.value.length)
const addTarget = () => {
  target_list.value.push({ content: '', id: generateUUID() })
}
</script>

<style lang="scss" scoped>
@import "./main.scss";
</style>