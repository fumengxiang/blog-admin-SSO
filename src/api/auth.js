import service from '@/utils/request'

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

// 请求头添加 Authrization: Basic client_id: client_secret
const auth = { // axios 会将auth属性作为请求字段Authrization中的信息，加入到请求头中后端要求发送此字段
  username: "fumengxiang",
  password: "123456"
}

export default {
  login(data) {
    return service({
      headers,
      auth,
      url: "/auth/login",
      method: "post",
      params: data
    })
  },
  // 查询用户名是否已经存在
  getUserByUsername(username) {
    return service({
      url: `/system/api/user/username/${username}`,
      method: "get"
    })
  },
  // 注册接口
  register(data) {
    return service({
      url: `/system/api/user/register`,
      method: 'post',
      data
    })
  },
  getProtocol() {
    return service({
      url: `${window.location.href}/xieyi.html`, // window.location.href 可以获取当前访问的路径
      method: 'get'
    })
  },
  // 退出系统
  logout(accessToken) {
    return service({
      headers,
      auth,
      url: `/auth/logout`,
      method: 'get',
      params: {
        accessToken
      }
    })
  },
  // 刷新令牌，获取行的认证信息
  refreshToken(refreshToken) {
    return service({
      url: `/auth/user/refreshToken`,
      method: 'get',  
      params: {
        refreshToken
      }  
    })
  }
}
