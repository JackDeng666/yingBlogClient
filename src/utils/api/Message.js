import request from './request'
class Message {
  // 获取留言列表
  async getMessageList(params){
    return await request({
      method: 'get',
      url: 'message/getMessageList',
      params
    })
  }
  // 添加留言
  async addMessage(data){
    return await request({
      method: 'post',
      url: 'message/addMessage',
      data
    })
  }
}

export default new Message()
