<template>
  <Panel title="Songs">
    <v-btn slot="action" @click="navigateTo({name: 'songs-create'})" class="cyan accent-3" light medium absolute right middle fab>
      <v-icon>add</v-icon>
    </v-btn>
    <div class="song" v-for="song in songs" :key="songs.id">
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
          <v-btn color="cyan" @click="navigateTo({name:'ViewSong', params : {songId: song.id}})">View</v-btn>
        </v-flex>
        <v-flex xs6>
          <v-img :src="song.albumImageUrl"></v-img>
        </v-flex>
      </v-layout>
    </div>
  </Panel>
</template>

<script>
export default {
  props: ['songs'],
  methods: {
    navigateTo(route){
      this.$router.push(route);
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
