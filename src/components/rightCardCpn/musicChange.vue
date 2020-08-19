<template>
<div class="music-box">
  <div v-for="(item,i) in songList" :key="i" @click="changeMusic(item.song_list_id,i)">
    <waterButton :buttonName="item.song_list_name" :isActive="currentSongList==i"></waterButton>
  </div>
</div>
</template>

<script>
import {Song} from '../../utils/api'
import waterButton from '@/components/littleCpn/waterButton'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      songList: null,
      currentSongList: 0
    }
  },
  components:{
    waterButton
  },
  inject: ['reMusic'],
  methods:{
    changeMusic(musicId,active){
      this.currentSongList = active
      this.changeMusicId(musicId)
      this.reMusic()
    },
    ...mapMutations(['changeMusicId'])
  },
  async created(){
    let res = await Song.getSongList()
    this.songList = res.data.data.songList
  }
}
</script>

<style scoped>
.music-box{
  margin: 10px 0;
}
.music-box div{
  text-align: center;
}
</style>
