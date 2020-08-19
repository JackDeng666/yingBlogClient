import request from './request'

class Song {

  async getSongList(){
    return await request({
      method: 'get',
      url: 'song/getSongList'
    })
  }
}

export default new Song()
