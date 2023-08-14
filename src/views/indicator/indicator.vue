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
      @blur="emit('focus-blur', $event, 'index', index, clone_indicator.content)"
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
  </div>
</template>
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import type { Indicator } from '../target'
const props = withDefaults(defineProps<{ indicator: Indicator; index: number }>(), {
  index: 0
})
const emit = defineEmits(['focus-blur', 'focus-indicator'])
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
</script>
