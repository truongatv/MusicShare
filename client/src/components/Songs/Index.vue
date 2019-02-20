<template>
  <v-layout row wrap>
    <v-flex xs6 offset-xs3>
      <SongsPanel :songs="songs" />
    </v-flex>
  </v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'
import SongsPanel from './SongsPanel'
import SongsSearchPanel from './SongsSearchPanel'
export default {
  data() {
    return {
      songs: null
    }
  },
  watch: {
    async '$route' (to, from) {
      try{
        this.songs = (await SongsService.index(this.$route.query.search)).data
      } catch(error) {
        console.log(error)
      }
    }
  },
  components: {
    SongsPanel
  },
  async mounted () {

    //do a request to server for all the song
    try{
      if(!this.$route.query.search ){
        console.log("test1111")
        this.songs = (await SongsService.index()).data
      } else {
        console.log("test")
        this.songs = (await SongsService.index(this.$route.query.search)).data
      }
    } catch(error) {
      this.error = error.response.data.error
    }
  }
}
</script>
<style scoped>

</style>
