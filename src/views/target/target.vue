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
        @focus-indicator="foucusInput"
        @blur-indicator="blurInput"
      ></indicator>
    </div>
    <!-- 操作部分 -->
    <div class="obj_action">
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
      <button class="act_btn">
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
        >更换指标顺序
      </button>
      <button class="act_btn">
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
import { inject, onBeforeUnmount, ref, watchEffect } from 'vue'
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
// const stop = watch(
//   props.target,
//   val => {
//     console.log('xxxxxxxxxxx')
//     deep_target.value = val
//   },
//   { immediate: true, deep: true }
// )
const stop = watchEffect(() => {
  // target_content.value = props.target.content!
  deep_target.value = props.target
})

onBeforeUnmount(() => {
  stop()
})

// 聚焦和失焦部分
const emit = defineEmits(['change_content'])
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

// 删除目标
const openDelDialog = inject(dialogInjectionKey)
function delTarget() {
  openDelDialog && openDelDialog(props.index, 'target')
}

// 操作指标部分
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
