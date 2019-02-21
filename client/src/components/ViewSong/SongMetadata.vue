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
      isBookmarked: false
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
    bookmark() {
      console.log("click")
    },
    unbookmark() {

    }
  },
  async mounted() {
    try {
      console.log('song',this.$route.params.songId)
      const bookmark = await BookmarkService.index({
        songId: this.$route.params.songId,
        userId: this.$store.state.user.id
      })
      this.isBookmarked = !!(bookmark.data.length)
    } catch(error){
      console.log(error)
    }
  }
}
</script>

<style scoped>
</style>
