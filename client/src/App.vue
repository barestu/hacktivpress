<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        <div v-if="!isLogin" class="mx-3">
          <button class="btn btn-outline-success" data-toggle="modal" data-target="#modalRegister">Register</button>
          <button class="btn btn-success mx-2" data-toggle="modal" data-target="#modalLogin">Login</button>
        </div>
        <div v-if="isLogin">
          <button @click.prevent="setLogout" class="btn btn-outline-danger mx-2">Logout</button>
        </div>
      </div>
    <!-- Modal Register-->
    <div class="modal fade" id="modalRegister" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <RegisterForm />
        </div>
      </div>
    </div>
    <!-- Modal Login -->
    <div class="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <LoginForm />
        </div>
      </div>
    </div>
    </nav>
    <!-- Welcome -->
    <div class="control my-2 text-center">
      <h1>Welcome to hacktivpress</h1>
      <div v-if="isLogin">
        <button class="btn btn-outline-success" data-toggle="modal" data-target="#modalWrite">Write New Article</button>
      </div>
      <hr>
      <!-- Modal Add Article -->
      <div class="modal fade" id="modalWrite" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <CreateArticle />
          </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import CreateArticle from '@/components/CreateArticle'
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'app',
  components: {
    CreateArticle,
    LoginForm,
    RegisterForm
  },
  methods: {
    ...mapMutations([
      'setLogin',
      'setLogout'
    ])
  },
  computed: {
    ...mapState([
      'isLogin'
    ])
  },
  created () {
    let token = localStorage.getItem('token')

    if (token) {
      this.setLogin()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
