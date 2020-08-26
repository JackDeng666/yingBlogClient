import request from './request'

class Song {
  async getLocalSongByListId(params){
    return await request({
      method: 'get',
      url: 'song/getLocalSongByListId',
      params
    })
  }
  async getSongList(){
    return await request({
      method: 'get',
      url: 'song/getSongList'
    })
  }
}

export default new Song()
