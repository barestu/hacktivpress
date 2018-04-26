import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt from 'jsonwebtoken'

let baseUrl = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: {
      id: '',
      username: ''
    },
    articles: [],
    categories: [
      'Category 1',
      'Category 2',
      'Category 3'
    ]
  },
  mutations: {
    setLogin (state) {
      let token = localStorage.getItem('token')
      let decoded = jwt.decode(token)

      if (decoded) {
        state.isLogin = true
        state.user.id = decoded.id
        state.user.username = decoded.username
      } else {
        alert('Error login failed invalid token')
      }
    },

    setLogout (state) {
      localStorage.removeItem('token')
      state.isLogin = false
      state.user.id = ''
      state.user.username = ''
      alert('You have been logged out')
    },

    fetchArticles: (state, data) => {
      state.articles = data
    }
  },
  actions: {
    getAllArticles: ({ commit }) => {
      axios.get(`${baseUrl}/api/article`)
        .then(response => {
          commit('fetchArticles', response.data.articles)
        })
        .catch(err => {
          console.log('Get articles failed', err)
        })
    },

    createArticle: ({ commit, dispatch }, data) => {
      let token = localStorage.getItem('token')

      axios.post(`${baseUrl}/api/article/create`, data, {
        headers: { token }
      })
        .then(response => {
          dispatch('getAllArticles')
          console.log('Create article success', response)
          alert('Create article success')
        })
        .catch(err => {
          console.log('Create article failed', err)
        })
    },

    updateArticle: ({ commit, dispatch }, data) => {
      let token = localStorage.getItem('token')

      axios.put(`${baseUrl}/api/article/update/${data._id}`, data, {
        headers: { token }
      })
        .then(response => {
          dispatch('getAllArticles')
          console.log('Update article success', response)
          alert('Update article success')
        })
        .catch(err => {
          console.log('Update article failed', err)
        })
    },

    deleteArticle: ({ commit, dispatch }, data) => {
      let token = localStorage.getItem('token')
      console.log(data)

      if (confirm('Are you sure want to delete this article?')) {
        axios.delete(`${baseUrl}/api/article/delete/${data._id}`, {
          headers: { token }
        })
          .then(response => {
            dispatch('getAllArticles')
            console.log('Delete article success', response)
            alert('Delete article success')
          })
          .catch(err => {
            console.log('Delete article failed', err)
          })
      }
    }
  }
})
