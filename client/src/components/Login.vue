<template>
  <v-layout row wrap>
    <v-flex xs6 offset-xs3>
      <panel title="Login">
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field label="Email" v-model="email"></v-text-field>
          <br>
          <v-text-field type="password" label="Password" v-model="password"></v-text-field>
          <br>
          <div class="error" v-html="error">
            
          </div>
          <v-btn @click="login">Login</v-btn>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null 
    }
  },
  methods: {
    async login () {
      try{
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({name: 'home'})
      } catch(error) {
        this.error = 
        error.response.data.error
      }
    }
  },
  mounted() {
    
  }
}
</script>

<style scoped>
  .error {
    color: #ffffff;
    border-radius: 3px;
  }
</style>
