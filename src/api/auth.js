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
  }
}