<template>
  <div class="Header">
    <div class="mxg-header">
      <div class="logo">
        <img src="@/assets/image/logo.png" alt="商标logo">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.mxg-header {
  width: 100%;
  height: 80px;
  border-top: 3px solid #345dc2;

}
img {
  height: 50px;
}
.logo {
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 15px;
}
</style>
