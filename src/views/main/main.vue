<template>
  <div class="layout_main">
    <header class="main_header"></header>
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
          <Target
            v-for="(v, index) in target_list"
            :key="v.id"
            :target="v"
            :index="index"
            @change_content="changeTargetContent"
            @change_progress="changeTargetProgress"
          ></Target>
        </div>
        <!-- 新增按钮 -->
        <button class="add_btn" @click="addTarget">
          <span role="img" class="icon-plus" style="outline: none">
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
          <span v-if="showBtnSubtitle" class="add_obj_subtitle"
            >点击“新增目标”按钮创建次双月第一个重要目标</span
          >
        </button>
      </div>
    </div>
  </div>
  <el-dialog v-model="isVisible" width="520px" class="delete_target" :show-close="false" top="35vh">
    <img :src="delete_png" width="100" height="100" style="margin-right: 24px" />
    <div>
      <div style="text-align: left; font-size: 20px; font-weight: 500; color: #333">
        删除{{ isDeleteTarget ? '目标' : '指标' }}
      </div>
      <div style="font-size: var('--el-font-size-medium'); margin-top: 8px; color: #999">
        删除{{ isDeleteTarget ? '目标' : '指标' }}后不可恢复，是否继续{{
          isDeleteTarget ? '?' : ''
        }}
      </div>
    </div>
    <template #footer>
      <span></span>
      <span class="dialog-footer">
        <el-button @click="cancel_delete">否</el-button>
        <el-button type="primary" @click="query_delete">是</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import target_png from '@/assets/target.png'
import delete_png from '@/assets/del.png'
import Target from '@/views/target'
import { generateUUID } from '@/utils'
import type { TargetType } from '@/views/target'
import { dialogInjectionKey } from './constants'
import type { Source } from './constants'
import { computed, provide, ref } from 'vue'

let isDeleteTarget = ref<boolean>(false)
let isDeleteIndicator = ref<boolean>(false)
let delete_tidx = ref<number>(0)
let delete_idx = ref<number>(0)
const isVisible = computed({
  get: () => isDeleteTarget.value || isDeleteIndicator.value,
  set: val => {
    if (!val) cancel_delete()
  }
})

// 目标列表的操作
const changeTargetContent = (val: string, i: number) => {
  const target = target_list.value[i]
  target.content = val
}
const changeTargetProgress = (val: string, i: number) => {
  const target = target_list.value[i]
  target.progress = val
}
const target_list = ref<TargetType[]>([])
const showBtnSubtitle = computed(() => !target_list.value.length)
const addTarget = () => {
  target_list.value.push({ content: '', id: generateUUID(), indicator: [] })
}
const delete_Modal = (tidx: number, source: Source, idx?: number) => {
  source === 'target' ? (isDeleteTarget.value = true) : (isDeleteIndicator.value = true)
  delete_tidx.value = tidx
  source === 'indicator' && (delete_idx.value = idx!)
}
provide(dialogInjectionKey, delete_Modal)

// 删除弹窗的操作
const query_delete = () => {
  if (!target_list.value.length) return
  if (isDeleteTarget.value) target_list.value.splice(delete_tidx.value, 1)
  else delIndicator()
  cancel_delete()
}
const cancel_delete = () => {
  isDeleteIndicator.value = false
  isDeleteTarget.value = false
  delete_idx.value = 0
  delete_tidx.value = 0
}
const delIndicator = () => {
  const indicator = target_list.value[delete_tidx.value].indicator
  if (indicator.length !== 1) {
    if (delete_idx.value === 0) {
      indicator[delete_idx.value + 1].weight =
        (
          Number(indicator[delete_idx.value + 1].weight.slice(0, -1)) +
          Number(indicator[delete_idx.value].weight.slice(0, -1))
        ).toFixed(2) + '%'
    } else {
      indicator[delete_idx.value - 1].weight =
        (
          Number(indicator[delete_idx.value - 1].weight.slice(0, -1)) +
          Number(indicator[delete_idx.value].weight.slice(0, -1))
        ).toFixed(2) + '%'
    }
  }
  indicator.splice(delete_idx.value, 1)
}
</script>

<style lang="scss" scoped>
@import '@/style/main.scss';
</style>
