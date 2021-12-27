<template>
  <div class="ObjectiveCard">
    <div class="obj_row" tabindex="1">
      <div class="obj_input">
        <div style="margin-left: 24px;">
          <div class="obj_input_cont">
            <span role="img" class="i-icon-target anticon" style="outline: none;">
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
              type="textarea"
              v-model="deep_list.content"
              class="obj_input_content"
              placeholder="填写目标，按 Enter 键保存"
              @blur="blurInput"
              maxlength="500"
              resize="none"
              :autosize="true"
              @focus="foucusInput"
            ></el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HtmlHTMLAttributes, onBeforeUnmount, reactive, watch, watchEffect } from 'vue'
import { deepClone } from '../utils/index'
const props = defineProps({
  list: {
    type: Object,
    default() {
      return {}
    }
  }
})

let deep_list: { content: string, id?: '' } = reactive({ content: '' })
const stop = watch([props.list], val => {
  console.log('props', val);

  deep_list = deepClone(val)
}, { deep: true })

onBeforeUnmount(() => {
  stop()
})

const emit = defineEmits<{
  (e: 'change_content', obj: {
    id?: string | undefined, content: string
  }): void
}>()

const foucusInput = function (e: FocusEvent) {
  let target = e.target as HTMLElement
  while (!target.classList.contains('obj_row')) {
    target = target.parentElement as HTMLElement
  }
  target.classList.add('focus-input')
}

function blurInput(e: FocusEvent) {
  let target = e.target as HTMLElement
  while (!target.classList.contains('obj_row')) {
    target = target.parentElement as HTMLElement
  }
  target.classList.remove('focus-input')
}
function changeContent() {
  emit('change_content', deep_list)
}
</script>

<style lang="scss">
@import "./target.scss";
</style>