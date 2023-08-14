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
          <Target
            v-for="(v, index) in target_list"
            :key="v.id"
            :target="v"
            :index="index"
            @change_content="changeTargetContent"
            @delete_target="delete_target"
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
import { computed, ref } from 'vue'

const target_list = ref<TargetType[]>([])
let isVisible = ref<boolean>(false)
let isDeleteTarget = ref<boolean>(false)
let isDeleteIndex = ref<boolean>(false)
let delete_id = ref<string>('')

const changeTargetContent = (val: string, i: number) => {
  const target = target_list.value[i]
  target.content = val
}

const showBtnSubtitle = computed(() => !target_list.value.length)
const addTarget = () => {
  target_list.value.push({ content: '', id: generateUUID(), indicator: [] })
}

const delete_target = (id: string, source: string) => {
  source === 'target' ? (isDeleteTarget.value = true) : (isDeleteIndex.value = true)
  isVisible.value = true
  delete_id.value = id
}

const query_delete = () => {
  const idx = target_list.value.findIndex(e => e.id == delete_id.value)
  target_list.value.splice(idx, 1)
  isVisible.value = false
}

const cancel_delete = () => {
  isVisible.value = false
  isDeleteIndex.value = false
  isDeleteTarget.value = false
}
</script>

<style lang="scss" scoped>
@import '@/style/main.scss';
</style>
