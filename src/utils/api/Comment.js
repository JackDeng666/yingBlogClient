import request from './request'
class Comment {
  // 根据博客id获取评论列表
  async getCommentListByBlogId(params){
    return await request({
      method: 'get',
      url: 'comment/getCommentListByBlogId',
      params
    })
  }
  // 添加评论
  async addComment(data){
    return await request({
      method: 'post',
      url: 'comment/addComment',
      data
    })
  }
}

export default new Comment()
