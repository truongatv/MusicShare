<template>
  <div>
    <Panel title="Song Metadata">
        <v-layout>
          <v-flex xs6>
            <div class="song-title">
              {{song.title}}
            </div>
            <div class="song-artist">
              {{song.artist}}
            </div>
            <div class="song-genre">
              {{song.genre}}
            </div>
            <v-btn dark class="cyan" @click="navigateTo({name: 'song-edit', params: {songId: song.id}})">Edit</v-btn>
            <v-btn dark v-if="isUserLoggedIn && !this.isBookmarked" class="cyan" @click="bookmark">Bookmark</v-btn>
            <v-btn dark v-if="isUserLoggedIn && this.isBookmarked" class="cyan" @click="unbookmark">UnBookmark</v-btn>
          </v-flex>
          <v-flex xs6>
            <v-img :src="song.albumImageUrl"></v-img>
            <br>
            {{song.album}}
          </v-flex>
        </v-layout>
    </Panel>
  </div>
</template>

<script>
  import SongsService from '@/services/SongsService'
    import BookmarkService from '@/services/BookmarkService'
  import {mapState} from 'vuex'
export default {
  data() {
    return {
      isBookmarked: null
    }
  },
  props: [
    'song'
  ],
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  methods: {
    navigateTo(route){
      this.$router.push(route)
    },
    async bookmark() {
      console.log('bookmark',this.$route.params.songId, this.$store.state.user.id)
      try{  
        this.isBookmarked = (await BookmarkService.post({
          songId: this.$route.params.songId,
          userId: this.$store.state.user.id
        })).data
        console.log(this.isBookmarked)
      }catch(error){
        console.log(error)
      }
    },
    async unbookmark() {
      try{  
        await BookmarkService.delete(this.$store.state.user.id,this.isBookmarked.id)
        this.isBookmarked = null
      }catch(error){
        console.log(error)
      }
    }
  },
  watch: {
    async song() {
      if(!this.isUserLoggedIn){
        return
      }
      try {
        console.log('song',this.$route.params.songId)
        const bookmark = await BookmarkService.index({
          songId: this.$route.params.songId,
          userId: this.$store.state.user.id
        })
        if(bookmark.data.length){
          this.isBookmarked = bookmark.data[0]
        }
      } catch(error){
        console.log(error)
      }
    }
  }
  // async mounted() {
  //   if(!this.isUserLoggedIn){
  //     return
  //   }
  //   try {
  //     console.log('song',this.$route.params.songId)
  //     const bookmark = await BookmarkService.index({
  //       songId: this.$route.params.songId,
  //       userId: this.$store.state.user.id
  //     })
  //     this.isBookmarked = !!(bookmark.data.length)
  //   } catch(error){
  //     console.log(error)
  //   }
  // }
}
</script>

<style scoped>
</style>
