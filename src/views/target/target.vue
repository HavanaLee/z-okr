<template>
  <div class="ObjectiveCard">
    <!-- 内容行 -->
    <div class="obj_row" tabindex="1">
      <div class="obj_input">
        <div style="margin-left: 24px">
          <div class="obj_input_cont">
            <span role="img" class="i-icon-target anticon" style="outline: none">
              <svg
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
                class
              >
                <use xlink:href="#tu-icon-OKRmubiao" />
              </svg>
            </span>
            <el-input
              v-model="target_content"
              type="textarea"
              class="obj_input_content"
              placeholder="填写目标，按 Enter 键保存"
              maxlength="500"
              resize="none"
              :autosize="true"
              @blur="blurInput($event, 'target')"
              @focus="foucusInput($event, 'target')"
            ></el-input>
          </div>
        </div>
      </div>
    </div>
    <!-- 指标部分 -->
    <div v-for="(v, i) in deep_target.indicator" :key="v.id" class="KeyResult">
      <indicator
        :indicator="v"
        :index="i"
        :target-idx="index"
        :edit-order="editOrder"
        @focus-indicator="foucusInput"
        @blur-indicator="blurInput"
      >
      </indicator>
    </div>
    <!-- 进展展示部分 -->
    <div v-if="deep_target.progress && !editProgress" class="obj_progress">
      <div class="obj_progress_header">
        <span role="img" class="i-icon anticon btn_span" style="outline: none">
          <svg
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            class=""
          >
            <use xlink:href="#tu-icon-describe"></use>
          </svg>
        </span>
        进展
      </div>
      <pre @click="fullProgress">{{ deep_target.progress }}</pre>
    </div>
    <!-- 进展编辑 -->
    <div v-if="editProgress" class="obj_progress">
      <div class="obj_progress_header">
        <span role="img" class="i-icon anticon btn_span" style="outline: none">
          <svg
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            class=""
          >
            <use xlink:href="#tu-icon-describe"></use>
          </svg>
        </span>
        进展
      </div>
      <el-input
        ref="progressInput"
        v-model="copyProgress"
        type="textarea"
        maxlength="500"
        :rows="8"
        resize="none"
        placeholder="填写进展，按 Ctrl + Enter 键保存"
        @blur="saveProgress"
      ></el-input>
    </div>
    <div v-if="editProgress" class="obj_action">
      <button class="act_btn act_btn_primary" @click="saveProgress">保存</button>
      <button class="act_btn" @mousedown.stop="cancelEditProgress">取消</button>
    </div>
    <!-- 操作部分 -->
    <div v-else class="obj_action">
      <button class="act_btn" @click="addIndicator">
        <span role="img" class="i-icon-target anticon btn_span" style="outline: none">
          <svg
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            class
          >
            <use xlink:href="#tu-icon-tianjiazhibiao" />
          </svg> </span
        >添加指标
      </button>
      <button class="act_btn" @click="editOrder = !editOrder">
        <span role="img" class="i-icon-target anticon btn_span" style="outline: none">
          <svg
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            class
          >
            <use xlink:href="#tu-icon-genggaizhibiaoshunxu" />
          </svg> </span
        >{{ editOrder ? '保存指标顺序' : '更换指标顺序' }}
      </button>
      <button class="act_btn" @click="fullProgress">
        <span role="img" class="i-icon-target anticon btn_span" style="outline: none">
          <svg
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            class
          >
            <use xlink:href="#tu-icon-describe" />
          </svg> </span
        >填写进展
      </button>
      <button class="act_btn" @click="delTarget">
        <span role="img" class="i-icon-target anticon btn_span" style="outline: none">
          <svg
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            class
          >
            <use xlink:href="#tu-icon-delete" />
          </svg> </span
        >删除目标
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, nextTick, onBeforeUnmount, ref, unref, watchEffect } from 'vue'
import { generateUUID } from '@/utils'
import type { TargetType } from './target'
import Indicator from '../indicator'
import { dialogInjectionKey } from '@/views/main'

const props = defineProps({
  target: {
    type: Object as () => TargetType,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
})
const target_content = ref('')

let deep_target = ref<TargetType>({ id: '', indicator: [] })
const stop = watchEffect(() => {
  target_content.value = props.target.content!
  deep_target.value = props.target
})

onBeforeUnmount(() => {
  stop()
})

// 聚焦和失焦部分
const emit = defineEmits(['change_content', 'change_progress'])
const foucusInput = function (e: FocusEvent, source: string, i?: number) {
  let target = e.target as HTMLElement
  while (
    (!target.classList.contains('obj_row') && source === 'target') ||
    (!target.classList.contains('KeyResult') && source === 'index')
  ) {
    target = target.parentElement as HTMLElement
  }
  target.classList.add('focus-input')
  if (typeof i === 'number' && i >= 0) deep_target.value.indicator[i].isFocused = false
}
function blurInput(e: FocusEvent, source: string, i?: number, val?: string) {
  let target = e.target as HTMLElement
  while (
    (!target.classList.contains('obj_row') && source === 'target') ||
    (!target.classList.contains('KeyResult') && source === 'index')
  ) {
    target = target.parentElement as HTMLElement
  }
  target.classList.remove('focus-input')
  if (typeof i === 'number' && i >= 0) {
    if (typeof val === 'string' && val) deep_target.value.indicator[i].content = val
    deep_target.value.indicator[i].isFocused = true
  }
  emit('change_content', target_content, props.index)
}

// 进展部分
const progressInput = ref(null as unknown as HTMLElement)
const editProgress = ref(false)
const copyProgress = ref('')
// 编辑进展
const fullProgress = () => {
  copyProgress.value = unref(deep_target.value.progress) || ''
  editProgress.value = true
  nextTick(() => {
    const input = progressInput.value as HTMLElement
    input.focus()
  })
}
// 取消编辑进展
const cancelEditProgress = () => {
  editProgress.value = false
  copyProgress.value = deep_target.value.progress || ''
}
// 保存进展
const saveProgress = () => {
  editProgress.value = false
  emit('change_progress', unref(copyProgress), props.index)
}

// 删除目标
const openDelDialog = inject(dialogInjectionKey)
function delTarget() {
  openDelDialog && openDelDialog(props.index, 'target')
}

// 操作指标部分
const editOrder = ref(false)
function addIndicator() {
  deep_target.value.indicator.push({
    content: '',
    score: 1,
    weight: '100%',
    id: generateUUID(),
    isFocused: true
  })
}
</script>

<style lang="scss">
@use '@/style/target.scss';
</style>
