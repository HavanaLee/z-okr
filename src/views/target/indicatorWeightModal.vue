<template>
  <el-dialog v-model="visibility" title="指标权重" style="display: block" @close="closeModal">
    <div style="flex-grow: 1">
      <div v-for="(item, index) in weightList" :key="item.id" style="width: 100%">
        <div class="result-item-header">
          <div class="result-item-header-title">{{ '指标' }}{{ index + 1 }}</div>
          <div class="result-item-header-property" style="width: 50%">
            <span role="img" class="anticon" style="outline: none; margin-right: 8px">
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
            <div class="result-item-header-property-input-outer">
              <el-input
                v-model="item.weight"
                :formatter="formatterValue"
                :parser="formatterValue"
              ></el-input>
            </div>
            %
          </div>
        </div>
        <div class="result-item-content">{{ item.content }}</div>
      </div>
    </div>
    <template #footer>
      <div class="footer-left">
        <div class="weight-total">
          {{ totalWeight }}
          <span v-if="remainWight" class="weight-error">{{ remainWight }}</span>
        </div>
      </div>
      <div class="footer-right">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" :disabled="!!remainWight" @click="ok">确 定</el-button>
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
const emit = defineEmits(['update:visible', 'updateWeight'])

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

function copyIndicator() {
  weightList.value = props.indicator.map(item => {
    return {
      id: item.id,
      content: item.content || '未填写',
      weight: item.weight.slice(0, -1)
    }
  })
}
watchEffect(() => {
  if (props.indicator && visibility.value) copyIndicator()
})
const totalWeight = computed(() => {
  let total = weightList.value.reduce((sum, item) => {
    return sum + parseFloat(item.weight.substring(0) || '0')
  }, 0)
  return '权重总计' + total.toFixed(2) + '%'
})
const remainWight = computed(() => {
  let total = weightList.value.reduce((sum, item) => {
    return sum + parseFloat(item.weight.substring(0) || '0')
  }, 0)
  const num = Math.abs(100 - total).toFixed(2) + '%'
  return total !== 100 ? (total < 100 ? `剩余 ${num}未分配` : `超出 ${num}`) : ''
})

// 指标格式化
const regex = /^(100(\.0{0,2})?|\d{0,2}(\.\d{0,2})?)?$/
const formatterValue = (e: string) => {
  if (!regex.test(e)) e = e.slice(0, e.length - 1)
  return e
}

const closeModal = () => {
  copyIndicator()
  visibility.value = false
}
const ok = () => {
  const map = weightList.value.map(e => {
    let weight = e.weight
    if (weight.charAt(weight.length - 1) === '.') weight = weight.slice(0, weight.length - 1)
    weight = Number(weight).toFixed(2) + '%'
    return { ...e, weight }
  })
  emit('updateWeight', map)
  visibility.value = false
}
</script>
<style lang="scss" scoped>
@use '../../style/variables.scss' as *;
@use '../../style/mixins.scss' as *;

.result-item-header {
  display: flex;
  height: 30px;
  justify-content: space-between;
  margin-bottom: 6px;

  .result-item-header-title {
    line-height: 28px;
    font-size: 20px;
    color: $normal-text-color;
    font-weight: 500;
  }

  .result-item-header-property {
    display: flex;
    align-items: center;
    font-size: 20px;
    background-image: linear-gradient(#ebecf0, #ebecf0), linear-gradient(#494bbf, #494bbf);
    background-size:
      100% 2px,
      0 2px;
    background-position:
      100% 100%,
      0 100%;
    background-repeat: no-repeat;
    transition: background-size 0.2s ease;

    .result-item-header-property-input-outer {
      @include border-none();
      flex: 1 1;
      display: flex;
      align-items: center;
      position: relative;
      border-radius: 4px;

      ::v-deep() .el-input__wrapper {
        box-shadow: none !important;
        background: none !important;
      }

      .el-input__wrapper:hover {
        box-shadow: none !important;
      }

      ::v-deep().el-input__inner {
        height: 28px;
        font-size: 20px;
        line-height: 28px;
        padding: 0;
        border-radius: 0 !important;
        box-shadow: none !important;
        ime-mode: disabled;
        flex: 1 1;
        border: none;
        outline: none !important;
        background-color: transparent;
        color: #333;
      }
    }
  }
}

.result-item-content {
  border: 1px solid #ebecf0;
  background-color: #f9f9f9;
  line-height: 20px;
  border-radius: 4px;
  padding: 8px 12px;
  color: $normal-text-color;
  text-align: justify;
  font-size: 14px;
}

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
