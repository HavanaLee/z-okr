<template>
  <div class="key_res_info">
    <el-input
      v-model="clone_indicator.content"
      type="textarea"
      placeholder="填写指标，用他来实现目标"
      maxlength="500"
      resize="none"
      :autosize="true"
      @focus="emit('focus-indicator', $event, 'index', index)"
      @blur="emit('blur-indicator', $event, 'index', index, clone_indicator.content)"
    ></el-input>
    <!-- 指标操作部分 -->
    <div v-if="!editOrder" class="key_res_act">
      <div class="key_res_del" @click="delIndicator">
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
      <div v-show="clone_indicator.isFocused" class="key_res_weight">
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
        <span>{{ clone_indicator.weight }}</span>
      </div>
      <!-- <div class="key_res_score"></div> -->
    </div>
    <!-- 更换指标顺序 -->
    <div v-else class="key_res_order">
      <div
        v-for="item in orderActs"
        :key="item.icon"
        :class="[item.disabled ? 'key_res_order_not' : 'key_res_order_allow', 'i-icon']"
        @click="item.fn"
      >
        <span role="img" class="anticon" style="outline: none">
          <svg
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            class=""
          >
            <use :xlink:href="item.icon"></use>
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject, ref, watchEffect } from 'vue'
import type { Indicator, TargetType } from '../target'
import { dialogInjectionKey } from '@/views/main'

const props = withDefaults(
  defineProps<{
    indicator: Indicator
    index: number
    targetIdx: number
    target: TargetType
    editOrder: boolean
  }>(),
  {
    index: 0,
    targetIdx: 0
  }
)
const emit = defineEmits(['blur-indicator', 'focus-indicator', 'order-indicator'])
let clone_indicator = ref<Indicator>({
  id: '',
  isFocused: false,
  weight: '',
  content: '',
  score: 0
})
watchEffect(() => {
  clone_indicator.value = { ...props.indicator }
})

// 更换指标顺序
const isLast = computed(() => {
  return props.index === props.target.indicator.length - 1
})
const isFirst = computed(() => {
  return props.index === 0
})
const orderActs = computed(() => {
  return [
    {
      name: '置顶',
      icon: '#tu-icon-daoding',
      disabled: isFirst.value,
      fn: () => {
        emit('order-indicator', 'top', props.index)
      }
    },
    {
      name: '上移',
      icon: '#tu-icon-up',
      disabled: isFirst.value,
      fn: () => {
        emit('order-indicator', 'up', props.index)
      }
    },
    {
      name: '下移',
      icon: '#tu-icon-down',
      disabled: isLast.value,
      fn: () => {
        emit('order-indicator', 'down', props.index)
      }
    },
    {
      name: '置底',
      icon: '#tu-icon-intheend',
      disabled: isLast.value,
      fn: () => {
        emit('order-indicator', 'bottom', props.index)
      }
    }
  ]
})

// 删除指标
const openDelDialog = inject(dialogInjectionKey)
const delIndicator = () => {
  console.log(props.index, 'index')
  openDelDialog && openDelDialog(props.targetIdx, 'indicator', props.index)
}
</script>
