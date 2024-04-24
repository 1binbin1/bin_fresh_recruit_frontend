<script setup lang="ts">
import {ref} from 'vue'
import LoginPanel from './cpns/LoginPanel.vue'
import RegisterPanel from './cpns/RegisterPanel.vue'
import FindPassPanel from './cpns/FindPassPanel.vue'

const activeName = ref('login')
// 是否是找回密码界面
const isFind = ref(false)
const find = () => {
  isFind.value = true
}
const noFind = () => {
  isFind.value = false
}

</script>
<template>
  <div class="login">
    <div class="container">
      <div class="left">
        <div class="items">
          <div class="item">
            <div class="item-left">
              <el-icon color="var(--theme-color)">
                <Notebook/>
              </el-icon>
            </div>
            <div class="item-right">应届生找工作上校招通</div>
          </div>
          <div class="item">
            <div class="item-left">
              <el-icon>
                <ChatLineRound/>
              </el-icon>
            </div>
            <div class="item-right">
              <span>沟通</span>
              <span>与企业直接聊</span>
            </div>
          </div>
          <div class="item">
            <div class="item-left">
              <el-icon>
                <SuitcaseLine/>
              </el-icon>
            </div>
            <div class="item-right">
              <span>任你选</span>
              <span>海量岗位随你选</span>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="panel">
          <div class="panel-header">
            <!-- 登录界面 -->
            <template v-if="!isFind">
              <div>
                <el-tabs v-model="activeName" stretch>
                  <el-tab-pane label="登录" name="login"
                  >
                    <LoginPanel @findPwd="find" @loginByCode="loginByCodeFn"
                    />
                  </el-tab-pane>
                  <el-tab-pane label="注册" name="register">
                    <RegisterPanel/>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </template>
            <!-- 找回界面 -->
            <template v-else>
              <div>
                <FindPassPanel @toLogin="noFind"/>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/image/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  color: $color-white;

  .container {
    width: 900px;
    height: 600px;
    border-radius: 40px;
    display: flex;
    color: black;
    box-shadow: 0 0 15px 15px rgba(0, 0, 0, 0.3);

    .left {
      width: 225px;
      height: 600px;
      background-color: rgb(248, 245, 245);
      border-radius: 20px 0 0 20px;
      border-right: 2px solid rgb(242, 241, 242);
      display: flex;
      flex-direction: column;
      caret-color: rgba(0, 0, 0, 0);

      .items {
        // 左侧边距修改
        margin: 80px 15px;

        .item {
          margin-bottom: 60px;
          display: flex;
          align-items: center;
          justify-content: center;

          .item-left {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 32px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }

          .item-right {
            width: 140px;
            margin-left: 10px;
            display: flex;
            justify-content: center;
            font-size: 16px;
            flex-direction: column;
          }
        }

        .item:first-child {
          .item-left {
            //background-color: var(--theme-color)
          }

          .item-right {
            color: var(--theme-color)
          }
        }
      }
    }

    .right {
      width: 675px;
      height: 600px;
      background-color: #fff;
      border-radius: 0 20px 20px 0;

      .panel {
        margin: 50px;

        .panel-header {
          // 修改tab样式
          :deep(.el-tabs__item.is-active) {
            color: var(--theme-color)
          }

          :deep(.el-tabs__item) {
            caret-color: rgba(0, 0, 0, 0);
            font-size: 20px;
          }

          :deep(.el-tabs__active-bar) {
            background-color: var(--theme-color)
          }

          :deep(.el-tabs__item:hover) {
            color: var(--theme-color)
          }
        }
      }
    }
  }
}
</style>
./cpns/FindPassPanel.vue./cpns/LoginPanel.vue
