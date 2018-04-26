<template>
  <div class="home">
    <div v-for="(article, index) in articles" :key="index">
      <Article :article="article" />
    </div>
  </div>
</template>

<script>
import Article from '@/components/Article.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    Article
  },
  methods: {
    ...mapActions([
      'getAllArticles'
    ])
  },
  computed: {
    ...mapState([
      'articles'
    ])
  },
  created () {
    this.getAllArticles()
  }
}
</script>
