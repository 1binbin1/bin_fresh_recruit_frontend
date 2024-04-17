<script setup lang="ts">
import {defineExpose, ref} from "vue";
import {showBox, showMsg} from "@/utils/message";
import {defineEmits, onMounted} from "vue";
import {useCommonStore} from "@/stores/common/common";
import {storeToRefs} from "pinia";
import {useFreshStore} from "@/stores/main/school/fresh";

const store = useCommonStore()
const {getdict} = store
const {dictData} = storeToRefs(store)

const freshSendStore = useFreshStore()
const {getCount,getMap} = freshSendStore
const {countRes,mapData,selectNum} = storeToRefs(freshSendStore)

const dialogVisible = ref(false)
defineExpose({
  getVisible() {
    dialogVisible.value = true
  }
})
const emits = defineEmits(['batchOut'])
// 数据导出
const selectData = ref([])
// const selectNum = ref("")
const batchAddFn = () => {
  emits('batchOut', selectData.value,selectNum.value)
}
const cancel = () => {
  dialogVisible.value = false
}
const dicts = []
const countSelect = []
onMounted(async () => {
  await getdict(5)
  await getMap()
  dictData.value.forEach((item, index) => {
    dicts.push({
      label: item,
      value: index
    })
  })
})
</script>

<template>
  <el-dialog v-model="dialogVisible" title="批量新增" width="40%" align-center>
    <div class="content">
      <div class="content-top">
        <div class="select">
          <span>投递状态</span>
          <el-select placeholder="投递状态选择" style="width: 300px;margin-left: 10px" v-model="selectData" clearable multiple
          >
            <el-option
                v-for="item in dicts"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </div>
        <div class="select">
          <span>数量范围</span>
          <el-select placeholder="导出数量范围" style="width: 300px;margin-left: 10px" v-model="selectNum" clearable
          >
            <el-option
                v-for="item in mapData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="content-bottom">
        <el-button class="cancel" @click="cancel">取消</el-button>
        <el-button class="confirm" type="success" @click="batchAddFn">确定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.content-top {
  width: 100%;
  display: flex;
  font-weight: bolder;
  font-size: 16px;
  margin: 5px 0;
  align-items: flex-end;
}

.download {
  margin-left: 10px;
  color: #dd4040;
  font-size: 14px;
}

.download:hover {
  cursor: pointer;
}

.content-center {
  width: 100%;
  margin: 10px 0;
}

.content-bottom {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.cancel {
  margin-right: 20px;
}

.cancel, .confirm {
  width: 20%;
  height: 38px;
}

:deep(.el-button>span) {
  letter-spacing: 4px;
}

.content-top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.select {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 20px;
}
</style>
