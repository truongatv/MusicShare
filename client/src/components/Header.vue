<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
      <span class="home" @click="navigateTo({name: 'songs'})">
        TruongAtv
      </span>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn flat dark @click="navigateTo({name: 'songs'})">Browse Songs</v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn flat dark :to="{name: 'notes'}">Notes</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <input id="search-song" type="text" v-if="showSearch" name="" placeholder="search..." v-model="dataSearch">
    <v-btn icon @click="searchSong">
        <v-icon>search</v-icon>
      </v-btn>
    <v-toolbar-items >
      <v-btn v-if="!$store.state.isUserLoggedIn" flat dark @click="navigateTo({name: 'login'})">
        LOGIN
      </v-btn>
      <v-btn v-if="!$store.state.isUserLoggedIn" flat dark @click="navigateTo({name: 'register'})">
        Sign Up
      </v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" flat dark @click="logout">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      showSearch: false,
      dataSearch: '',
      route: null
    }
  },
  mounted() {
    this.dataSearch = ''
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout() {
      this.$store.dispatch('setToken', null )
      this.$store.dispatch('setUser', null)
      this.$router.push({name: 'songs'})
    },
    searchSong() {
      if(!this.showSearch){
        this.showSearch = true
      } else {
        console.log(this.route)
        // this.$store.dispatch('setSearchClick')
        this.$router.push(this.route)
        // window.location.reload()

      }
    }
  },
  watch: {
    dataSearch(value) {
      this.route = {
        name: 'songs'
      }
      if(this.dataSearch != ''){
        this.route.query = {
          search: this.dataSearch 
        }
      }
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}
.home:hover {
  color: #E9E;
}
#search-song {
  border-bottom: 1px solid white;
  width: 300px
}
</style>
