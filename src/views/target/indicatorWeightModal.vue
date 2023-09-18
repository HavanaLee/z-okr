<template>
  <el-dialog v-model="visibility" title="指标权重" @close="closeModal">
    <template #footer>
      <div class="footer-left">
        <div class="weight-total">
          {{ totalWeight }}
          <span class="weight-error">{{ remainWight }}</span>
        </div>
      </div>
      <div class="footer-right">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { computed, watchEffect, ref } from 'vue'
import { Indicator, WeightList } from './target'

const props = withDefaults(
  defineProps<{
    visible: boolean
    indicator: Indicator[]
    id: string
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
// 拷贝一份数据，防止直接修改原数据
const weightList = ref<WeightList[]>([])
watchEffect(() => {
  if (props.indicator && visibility.value) {
    weightList.value = props.indicator.map(item => {
      return {
        id: item.id,
        content: item.content,
        weight: item.weight
      }
    })
  }
})
const totalWeight = computed(() => {
  let total = weightList.value.reduce((sum, item) => {
    return sum + parseFloat(item.weight.substring(0, item.weight.length - 1))
  }, 0)
  return '权重总计' + total.toFixed(2) + '%'
})
const remainWight = computed(() => {
  let total = weightList.value.reduce((sum, item) => {
    return sum + parseFloat(item.weight.substring(0, item.weight.length - 1))
  }, 0)
  return !total ? `剩余 ${(100 - total).toFixed(2)}%未分配` : ''
})

const closeModal = () => {
  visibility.value = false
}
const ok = () => {
  visibility.value = false
}
</script>
<style lang="scss" scoped>
.weight-error {
  color: #f33;
  margin-left: 8px;
  position: relative;
  &::before {
    content: ',';
    color: #999;
    position: relative;
    left: -6px;
  }
}
</style>
