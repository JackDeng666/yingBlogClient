import request from './request'

class Blog {
  // 获取博客分类
  async getBlogTypes(){
    return await request({
      method: 'get',
      url: 'blog/getBlogTypes'
    })
  }
  // 获取博客细节
  async getBlogDetail(params){
    return await request({
      method: 'get',
      url: 'blog/getBlogDetail',
      params
    })
  }
  // 获取博客列表
  async getBlogList(params){
    return await request({
      method: 'get',
      url: 'blog/getBlogList',
      params
    })
  }
  // 通过博客分类获取博客列表
  async getBlogListByType(params){
    return await request({
      method: 'get',
      url: 'blog/getBlogListByType',
      params
    })
  }
  // 获取用户收藏的博客列表
  async getCollectBlogListByUid(params){
    return await request({
      method: 'get',
      url: 'blog/getCollectBlogListByUid',
      params
    })
  }
  // 添加博客被浏览次数
  async addBlogBrowsedCount(data){
    return await request({
      method: 'post',
      url: 'blog/addBlogBrowsedCount',
      data
    })
  }
}

export default new Blog()
