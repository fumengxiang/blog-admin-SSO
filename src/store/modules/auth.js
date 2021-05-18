import api from '@/api/auth'
import { PcCookie, Key } from '@/utils/cookie'

const state = {
  // 用户信息，cookie中的数据是JSON格式，需要转化为对象
  userInfo: PcCookie.get(Key.userInfoKey) ? JSON.parse(PcCookie.get(Key.userInfoKey)) : null,
  // 访问令牌
  accessToken: PcCookie.get(Key.refreshTokenKey),
  // 刷新令牌
  refreshToken: PcCookie.get(Key.accessTokenKey)
}

const mutations = {
  // 赋值用户状态
  SET_USER_STATE(state, data) {
    const { userInfo, access_token, refresh_token } = data
    state.userInfo = userInfo
    state.accessToken = access_token
    state.refreshToken = refresh_token
    // 将数据保存到cookie中
    PcCookie.set(Key.userInfoKey, userInfo)
    PcCookie.set(Key.refreshTokenKey, refresh_token)
    PcCookie.set(Key.accessTokenKey, access_token)
  },

  // 重置用户状态
  RESET_USET_STATE() {
    state.userInfo = null
    state.accessToken = null
    state.refreshToken = null

    //移除cookie数据
    PcCookie.remove(Key.userInfoKey)
    PcCookie.remove(Key.refreshTokenKey)
    PcCookie.remove(Key.accessTokenKey)
  }
}

// 定义行为
const actions = {
  // 登录
  UserLogin({commit}, userData) {
    const { username, password } = userData
    return new Promise((resolve, reject) => {
      api.login({ username: username.trim(), password }).then(res => {
        const { code, data} = res
        if (code === 20000) {
          // 状态赋值，此时的data为JSON格式
          commit('SET_USER_STATE', data)
        }
        resolve(res)
      }).catch(err => {
        // 重置状态
        commit('RESET_USET_STATE')
        reject(err)
      })
    })
  },
  // 退出
  UserLogout({state, commit}, redirectURL) {
    api.logout(state.accessToken).then(res => {
      // 重置状态
      commit('RESET_USET_STATE')
      // 重定向为来源地址,如果没有指定重定向地址，则重定向为登录面
      window.location.href = redirectURL || '/'
    }).catch(err => {
      // 重置状态
      commit('RESET_USET_STATE')
      // 重定向为来源地址,如果没有指定重定向地址，则重定向为登录面
      window.location.href = redirectURL || '/'
    })
  },
  // 刷新令牌
  SendRefreshToken({state, commit}) {
    return new Promise((resolve, reject) => {
      // 判断是否存在刷新令牌
      if (!state.refreshToken) {
        commit('RESET_USET_STATE')
        reject('没有刷新令牌')
        return
      }
      // 发送请求
      api.refreshToken(state.refreshToken).then(res => {
        // 更新用户状态
        commit('SET_USER_STATE', res.data)
        resolve()
      }).catch(err => {
        // 重置状态
        commit('RESET_USET_STATE')
        reject(err)
      })
    }) 
  }
}

export default {
  state,
  mutations,
  actions
}