import api from '@/api/auth'
import { PcCookie, Key } from '@/utils/cookie'

const state = {
  // 用户信息
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
  UserLogin({commit}, userData) {
    const { username, password } = userData
    return new Promise((resolve, reject) => {
      api.login({ username: username.trim(), password}).then(res => {
        const { code, data} = res
        if (code === 20000) {
          // 状态赋值
          commit('SET_USER_STATE', data)
        }
        resolve(res)
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