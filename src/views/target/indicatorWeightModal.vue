<template>
  <el-dialog v-model="visibility" title="指标权重" @close="closeModal"></el-dialog>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    visible: boolean
  }>(),
  {}
)
const emit = defineEmits(['update:visible'])

const visibility = computed({
  get: function () {
    return props.visible
  },
  set: function (val) {
    emit('update:visible', val)
  }
})

const closeModal = () => {
  visibility.value = false
}
</script>
