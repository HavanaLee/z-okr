<template>
  <div class="ObjectiveCard">
    <div class="obj_input">
      <div class="obj_input_cont">
        <div>
          <span role="img" class="i-icon-target" style="outline: none;">
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
          <textarea
            v-model="deep_list.content"
            class="obj_input_content"
            :style="{ height: '34px' }"
            @blur="changeContent"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, reactive, watch, watchEffect } from 'vue'
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
function changeContent() {
  emit('change_content', deep_list)
}
</script>

<style lang="scss">
@import "./target.scss";
</style>