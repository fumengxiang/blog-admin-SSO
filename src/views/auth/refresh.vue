<template>
  <div class="refresh-container">
    <div v-show="visible">
      <!-- 下面是展示的内容 -->
      <div class="content">
        <span v-html="message"></span>
      </div>
      <!-- 半透明背景层 -->
      <div class="over">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Refresh',
  data () {
    return {
      visible: true,
      message: '请稍等，正在重新进行身份认证...',
      redirectURL: null
    }
  },
  created() {
    this.redirectURL = this.$route.query.redirectURL || '/'
    this.refreshLogin()
  },
  methods: {
    // 通过刷新令牌获取新的令牌数据
    refreshLogin() {
      this.$store.dispatch('SendRefreshToken').then(() => {
        this.message = '刷新成功，重定向到应用'
        window.location.href = this.redirectURL // 跳转到来时的应用
      }).catch(err => {
        this.message = `您的身份已过期, 请点击<a href="/?redirectURL=${this.redirectURL}">重新登录</a>`
      })
    }
  }
}
</script>

<style scoped>
.content {
  position: fixed;
  height: 120px;
  width: 500px;
  line-height: 120px;
  text-align: center;
  font-size: 19px;
  color: #303133;
  background-color: #fff;
  border-radius: 0.25rem;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
a {
  color: #345dc2;
  text-decoration: none;
}
a:hover {
  text-decoration: underline; 
}
.over {
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0.5; /* 透明度为50% */
  filter: alpha(opacity=50);
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #000;
}
</style>
