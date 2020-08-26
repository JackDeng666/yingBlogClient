<template>
  <div>
    <meting-js
      v-if="listType==1"
      server="netease"
      type="playlist"
      :id="listId"
      fixed="true"
      autoplay="true">
    </meting-js>
    <div v-if="listType==2" id="aplayer"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {Song} from '../../utils/api'
export default {
  data() {
    return {
      listId: 0,
      listType: 0,
      listName: ""
    }
  },
  computed:{
    ...mapState(['songListInfo'])
  },
  async mounted(){
    this.listId = this.songListInfo.song_list_id
    this.listType = this.songListInfo.song_list_type
    this.listName = this.songListInfo.song_list_name
    // 如果为本地歌曲
    if(this.listType == 2){
      let res = await Song.getLocalSongByListId({listId: this.listId})
      let data = res.data.songList
      data.forEach(element => {
        element.artist = this.listName
      });
      const ap = new APlayer({
        container: document.getElementById('aplayer'),
        // lrcType: 1,
        fixed: true,
        autoplay: true,
        audio: data
      })
    }
  }
}
</script>
