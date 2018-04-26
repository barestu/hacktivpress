<template>
  <div class="modal-body">
    <h2 class="text-center py-3">Login</h2>
    <form @submit.prevent="login">
      <div class="form-signin mt-3">
        <div class="form-group">
          <label class="ml-2">Username</label>
          <input type="text" class="form-control" v-model="username" :class="{ error: wrongUser }" name="email" value="" placeholder="Your username">
        </div>
        <div class="form-group">
          <label class="ml-2">Password</label>
          <input type="password" class="form-control" v-model="password" :class="{ error: wrongPass }" name="password" value="" placeholder="Your password">
        </div>
        <div v-if="errMsg" class="alert alert-danger mt-3" role="alert">
          {{ errMsg }}
        </div>
        <!-- Button Submit/Cancel -->
        <div class="text-center py-3 mt-2">
          <button type="submit" class="btn btn-success px-5 mx-1">Login</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'

export default {
  name: 'login-form',
  data () {
    return {
      username: '',
      password: '',
      wrongUser: false,
      wrongPass: false,
      errMsg: ''
    }
  },
  methods: {
    ...mapMutations([
      'setLogin'
    ]),
    login () {
      axios.post('http://localhost:3000/api/user/login', {
        username: this.username,
        password: this.password
      })
        .then(response => {
          localStorage.setItem('token', response.data.token)
          this.username = ''
          this.password = ''
          this.errMsg = ''
          this.setLogin()
          console.log('Login success', response)
          alert('Login success')
        })
        .catch(err => {
          console.log('Login failed', err.message)
        })
    }
  }

}
</script>

<style>
.error {
  border: solid 2px red
}
</style>
