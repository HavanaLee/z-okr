<template>
  <div class="ObjectiveCard">
    <!-- 内容行 -->
    <div class="obj_row" tabindex="1">
      <div class="obj_input">
        <div style="margin-left: 24px;">
          <div class="obj_input_cont">
            <span role="img" class="i-icon-target anticon" style="outline: none;">
              <svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class>
                <use xlink:href="#tu-icon-OKRmubiao" />
              </svg>
            </span>
            <el-input type="textarea" v-model="props.list.content" class="obj_input_content"
              placeholder="填写目标，按 Enter 键保存" @blur="blurInput" maxlength="500" resize="none" :autosize="true"
              @focus="foucusInput"></el-input>
          </div>
        </div>
      </div>
    </div>
    <!-- 指标部分 -->
    <div class="KeyResult" v-for="v in deep_list.obj.indicator" :key="v.id">
      <div class="key_res_info"></div>
    </div>
    <!-- 操作部分 -->
    <div class="obj_action">
      <button class="act_btn" @click="addIndicator">
        <span role="img" class="i-icon-target anticon btn_span" style="outline: none;">
          <svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class>
            <use xlink:href="#tu-icon-tianjiazhibiao" />
          </svg>
        </span>添加指标
      </button>
      <button class="act_btn">
        <span role="img" class="i-icon-target anticon btn_span" style="outline: none;">
          <svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class>
            <use xlink:href="#tu-icon-genggaizhibiaoshunxu" />
          </svg>
        </span>更换指标顺序
      </button>
      <button class="act_btn">
        <span role="img" class="i-icon-target anticon btn_span" style="outline: none;">
          <svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class>
            <use xlink:href="#tu-icon-describe" />
          </svg>
        </span>填写进展
      </button>
      <button class="act_btn" @click="emit('delete_target', deep_list.id)">
        <span role="img" class="i-icon-target anticon btn_span" style="outline: none;">
          <svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class>
            <use xlink:href="#tu-icon-delete" />
          </svg>
        </span>删除目标
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HtmlHTMLAttributes, onBeforeUnmount, reactive, ref, watch, } from 'vue'
import { deepClone } from '../utils/index'
import { generateUUID } from '../utils/index'




const props = defineProps(['list'])

let deep_list = reactive({
  obj: {} as TargetType
})
const stop = watch(props.list, val => {

  deep_list.obj = deepClone(val)
}, { immediate: true, deep: true })

onBeforeUnmount(() => {
  stop()
})

const emit = defineEmits(['change_content', 'delete_target'])

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
  emit('change_content', deep_list.obj)
}

function addIndicator() {
  deep_list.obj.indicator.push({ content: '', score: 1, weigtht: '100%' })
}
</script>

<style lang="scss">
@import "./target.scss";
</style>