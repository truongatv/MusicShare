<template>
  <v-layout row wrap>
    <v-flex xs6 offset-xs3>
      <panel title="Register">
        <div class="pl-4 pr-4 pt-2 pb-2">
          <form name="tab-tracker-form" autocomplete="off">
            <v-text-field label="Email" v-model="email"></v-text-field>
            <br>
            <v-text-field label="Password" type="password" v-model="password" autocomplete="new-password"></v-text-field>
          </form>
          <br>
          <div class="error" v-html="error"> 
          </div>
          <v-btn @click="register">Register</v-btn>
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
    async register () {
      try{
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({name: 'home'})
      } catch(error) {
        this.error = error.response.data.error
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
