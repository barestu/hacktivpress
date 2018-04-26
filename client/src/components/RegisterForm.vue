<template>
  <div class="modal-body">
    <h2 class="text-center py-3">Register</h2>
    <form @submit.prevent="register">
      <div class="form-signin mt-3">
        <div class="form-group">
          <label class="ml-2">Username</label>
          <input type="text" class="form-control" v-model="username" name="email" value="" placeholder="Your username">
        </div>
        <div class="form-group">
          <label class="ml-2">Password</label>
          <input type="password" class="form-control" v-model="password" :class="{ error: wrongPass }" name="password" value="" placeholder="Your password">
        </div>
        <div v-if="passErrMsg !== ''">
          <small class="px-2 text-danger">{{ passErrMsg }}</small>
        </div>
        <div v-if="errMsg" class="alert alert-danger mt-3" role="alert">
          {{ errMsg }}
        </div>
        <!-- Button Submit/Cancel -->
        <div class="text-center py-3 mt-2">
          <button type="submit" class="btn btn-success px-5 mx-1">Register</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'register-form',
  data () {
    return {
      username: '',
      password: '',
      wrongPass: false,
      passErrMsg: '',
      errMsg: ''
    }
  },
  methods: {
    register () {
      let newUser = {
        username: this.username,
        password: this.password
      }

      axios.post('http://localhost:3000/api/user/register', newUser)
        .then(response => {
          alert('Register success, you can continue to login')
          // eslint-disable-next-line
          $('#modalRegister').modal('toggle')
        })
        .catch(err => {
          console.log('Register failed', err)
        })
    }
  },
  watch: {
    password () {
      let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/
      let result = re.test(this.password)

      if (!result) {
        this.wrongPass = true
        this.passErrMsg = 'Password length should be atleast 6 alhpa-numeric characters!'
      } else {
        this.wrongPass = false
        this.passErrMsg = ''
      }
    }
  }
}
</script>

<style>
.error {
  border: 2px solid rgb(216, 75, 75)
}
</style>
