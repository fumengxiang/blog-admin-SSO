<template>
  <div class="Footer">
    <div class="mxg-footer">
      <div class="footer-info">
        Copyright &copy;1999 mengxuegu.com &nbsp;All Rights Reserved&nbsp;
        <a href="http://www.beian.miit.gov.cn/" target="_blank" rel="nofollow"> 赣ICP备 16666888号-99</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.mxg-footer {
  width: 90%;
  margin: 0 auto;
  line-height: 60px;
  border-top: 1px solid #ddd;
}
.footer-info {
  text-align: center;
  font-size: 13px;
  color: #2c2c40;
}
.footer-info a {
  color: #2c2c40;
  text-decoration: none;
}
</style>
