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
export default {
  props: [
    'song'
  ],
  methods: {
    navigateTo(route){
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
</style>
