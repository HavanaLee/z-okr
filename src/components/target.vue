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
              v-model="props.list.content"
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
    <div v-for="(v, i) in deep_list.obj.indicator" :key="v.id" class="KeyResult">
      <div class="key_res_info">
        <el-input
          v-model="v.content"
          type="textarea"
          placeholder="填写指标，用他来实现目标"
          maxlength="500"
          resize="none"
          :autosize="true"
          @focus="foucusInput($event, 'index', i)"
          @blur="blurInput($event, 'index', i)"
        ></el-input>
        <div class="key_res_act">
          <div class="key_res_del">
            <span>
              <svg
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
                class=""
              >
                <use xlink:href="#tu-icon-delete"></use>
              </svg>
            </span>
          </div>
          <div v-show="v.isFocused" class="key_res_weight">
            <span>
              <svg
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
                class=""
              >
                <use xlink:href="#tu-icon-bingtu"></use>
              </svg>
            </span>
            <span>{{ v.weigtht }}</span>
          </div>
          <!-- <div class="key_res_score"></div> -->
        </div>
      </div>
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
      <button class="act_btn" @click="emit('delete_target', deep_list.obj.id)">
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
import { onBeforeUnmount, reactive, watch } from 'vue'
import { deepClone } from '../utils/index'
import { generateUUID } from '../utils/index'

const props = defineProps(['list'])

let deep_list = reactive({
  obj: {} as TargetType
})
const stop = watch(
  props.list,
  val => {
    deep_list.obj = deepClone(val)
  },
  { immediate: true, deep: true }
)

onBeforeUnmount(() => {
  stop()
})

const emit = defineEmits(['change_content', 'delete_target'])

const foucusInput = function (e: FocusEvent, source: string, i?: number) {
  let target = e.target as HTMLElement
  while (
    (!target.classList.contains('obj_row') && source === 'target') ||
    (!target.classList.contains('KeyResult') && source === 'index')
  ) {
    target = target.parentElement as HTMLElement
  }
  target.classList.add('focus-input')
  if (typeof i === 'number' && i >= 0) deep_list.obj.indicator[i].isFocused = false
}

function blurInput(e: FocusEvent, source: string, i?: number) {
  let target = e.target as HTMLElement
  while (
    (!target.classList.contains('obj_row') && source === 'target') ||
    (!target.classList.contains('KeyResult') && source === 'index')
  ) {
    target = target.parentElement as HTMLElement
  }
  target.classList.remove('focus-input')
  if (typeof i === 'number' && i >= 0) deep_list.obj.indicator[i].isFocused = true
  emit('change_content', deep_list.obj)
}

function addIndicator() {
  deep_list.obj.indicator.push({
    content: '',
    score: 1,
    weigtht: '100%',
    id: generateUUID(),
    isFocused: true
  })
}
</script>

<style lang="scss">
@import './target.scss';
</style>
