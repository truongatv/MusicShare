<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <Youtube :song="song" />
      </v-flex>
      <v-flex xs6 class="ml-2">
        <song-metadata :song="song"/>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6 class="mt-2">
        <Lyrics :song="song"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import SongsService from '@/services/SongsService'
  import SongMetadata from './SongMetadata'
  import Youtube from './YouTube'
  import Lyrics from './Lyrics'
export default {
  data() {
    return {
      song: {}
    }
  },
  components: {
    SongMetadata,
    Youtube,
    Lyrics
  },
  async mounted(){
    try{
      const songId = this.$store.state.route.params.songId
      this.song = (await SongsService.show(songId)).data
    } catch(error) {
      console.log(error)
    }
  }
}
</script>

<style scoped>
  .song {
    padding: 20px;
    height: 330px;
    overflow: hidden
  }
  .song-title{
    font-size: 30px;
  }
  .song-artist {
    font-size: 24px;
  }
  .song-genre {
    font-size: 18px;
  }
</style>
