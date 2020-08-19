import request from './request'

class Statistics {

  async getSiteInfo(){
    return await request({
      method: 'get',
      url: 'statistics/getSiteInfo'
    })
  }

  async addBrowsedCount(){
    return await request({
      method: 'get',
      url: 'statistics/addBrowsedCount'
    })
  }

  async addLikedCount(){
    return await request({
      method: 'get',
      url: 'statistics/addLikedCount'
    })
  }

  async addBlogBrowsedCount(){
    return await request({
      method: 'get',
      url: 'statistics/addBlogBrowsedCount'
    })
  }

  // 切换点赞信息
  async togglePraise(data){
    return await request({
      method: 'post',
      url: 'statistics/togglePraise',
      data
    })
  }
  // 获取点赞信息
  async getPraise(params){
    return await request({
      method: 'get',
      url: 'statistics/getPraise',
      params
    })
  }
  // 通过博客id获取博客被点赞计数
  async getPraiseCountByBid(params){
    return await request({
      method: 'get',
      url: 'statistics/getPraiseCountByBid',
      params
    })
  }
  // 切换收藏信息
  async toggleCollect(data){
    return await request({
      method: 'post',
      url: 'statistics/toggleCollect',
      data
    })
  }
  // 获取收藏信息
  async getCollect(params){
    return await request({
      method: 'get',
      url: 'statistics/getCollect',
      params
    })
  }
  // 通过博客id获取博客被收藏计数
  async getCollectCountByBid(params){
    return await request({
      method: 'get',
      url: 'statistics/getCollectCountByBid',
      params
    })
  }
}

export default new Statistics()
