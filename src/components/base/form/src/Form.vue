<script setup lang="ts">
import type { PropType } from 'vue'
import type { IFormItem } from '../type/type'
// props
const props = defineProps({
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => []
  },
  labelWidth: {
    type: String,
    default: () => '120px'
  },
  styleLayout: {
    type: Object,
    default: () => {
      return {
        padding: '10px 20px'
      }
    }
  },
  itemLayout: {
    type: Object,
    default: () => {
      return {
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      }
    }
  },
  modelValue: {
    type: Object,
    required: true
  },
  labelSize: {
    type: String,
    default: '14px'
  }
})

/* 内容修改：单向数据流 */
const emit = defineEmits(['update:modelValue'])
const changeValue = (value: any, field: any) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
const disable = (data: Date) => {
  var now = new Date()
  return data > now
}
</script>

<template>
  <div class="kl-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item">
          <el-col v-bind="itemLayout" v-if="!item.isHidden">
            <!-- input和password -->
            <template
              v-if="item.type === 'input' || item.type === 'password' || item.type === 'textarea'"
            >
              <el-form-item :rules="item.rules" :style="styleLayout">
                <template #label>
                  <div class="label" :style="{ fontSize: labelSize }">{{ item.label }}</div>
                </template>
                <el-input
                  :placeholder="item.placeholder"
                  :type="item.type"
                  v-bind="item.others"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="changeValue($event, item.field)"
                >
                </el-input>
              </el-form-item>
            </template>
            <!-- select -->
            <template v-if="item.type === 'select'">
              <el-form-item :rules="item.rules" :style="styleLayout">
                <template #label>
                  <div class="label" :style="{ fontSize: labelSize }">{{ item.label }}</div>
                </template>
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.others"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="changeValue($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :value="option.value"
                    :key="option.value"
                    :label="option.label"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
            <!-- datepicker -->
            <template v-if="item.type === 'dataPicker'">
              <el-form-item :rules="item.rules" :style="styleLayout">
                <template #label>
                  <div class="label" :style="{ fontSize: labelSize }">{{ item.label }}</div>
                </template>
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.others"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="changeValue($event, item.field)"
                  :disabled-date="disable"
                ></el-date-picker>
              </el-form-item>
            </template>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-form {
  padding-top: 5px;
}

.label {
  width: 100%;
  text-align: justify;
  text-align-last: justify;
  text-justify: distribute-all-lines;
  // text-justify: distribute;
}
</style>
