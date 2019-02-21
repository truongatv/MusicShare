<template>
  <v-layout>
    <v-flex xs4>
      <Panel title="Song Metadata">
        <v-text-field
          label="title"
          required
          :rules="[rules.required]"
          v-model="song.title"
        ></v-text-field>
        <v-text-field
          label="artist"
          :rules="[rules.required]"
          v-model="song.artist"
        ></v-text-field>
        <v-text-field
          label="genre"
          :rules="[rules.required]"
          v-model="song.genre"
        ></v-text-field>
        <v-text-field
          label="album"
          :rules="[rules.required]"
          v-model="song.album"
        ></v-text-field>
        <v-text-field
          label="album Image Url"
          :rules="[rules.required]"
          v-model="song.albumImageUrl"
        ></v-text-field>
        <v-text-field
          label="youtube ID"
          :rules="[rules.required]"
          v-model="song.youtubeId"
        ></v-text-field>
      </Panel>
    </v-flex>
    <v-flex xs8>
      <Panel title="Songs Structure" class="ml-2">
        <v-textarea
          label="Tab" 
          :rules="[rules.required]"
          v-model="song.tab"
        ></v-textarea>
        <v-textarea
          label="Lyrics"
          :rules="[rules.required]"
          v-model="song.lyrics"
        ></v-textarea>
      </Panel>
      <div class="danger-alert" v-if=error>{{error}}</div>
      <v-btn dark class="cyan" @click="create">Create</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'
export default {
  data() {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: null,
      rules: {
        required: (value) => !!value || 'Required!'
      }
    }
  },
  methods: {
    async create() { 
      //call API
      this.error = null
      const areAllFieldsFilledIn = Object.keys(this.song).every(key => !!this.song[key])
      if(!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      try{
         await SongsService.post(this.song)
         this.$router.push({
          name: 'songs'
         })
      } catch(error) {
        console.log(error)
      }
      
    }
  }
}
</script>

<style scoped>

</style>
