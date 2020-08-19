import request from './request'

class User {
  // 获取邮箱验证码
  async getVerificateCode(params){
    return await request({
      method: 'get',
      url: 'user/getVerificationCode',
      params
    })
  }
  // 用户注册
  async register(data){
    return await request({
      method: 'post',
      url: 'user/register',
      data
    })
  }
  // 用户登录
  async login(data){
    return await request({
      method: 'post',
      url: 'user/login',
      data
    })
  }
  // 获取用户信息
  async getUserInfo(params){
    return await request({
      method: 'get',
      url: 'user/getUserInfo',
      params
    })
  }
  // 查询token是否过期
  async checkToken(data){
    return await request({
      method: 'post',
      url: 'user/checkToken',
      data
    })
  }
  // 修改用户信息
  async updateUserInfo(data){
    return await request({
      method: 'post',
      url: 'user/updateUserInfo',
      data
    })
  }
}

export default new User()
