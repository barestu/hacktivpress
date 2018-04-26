<template>
  <div class="modal-body">
    <h2 class="text-center py-3">Write Article</h2>
    <form @submit.prevent="createArticle(newArticle)">
      <div class="form-signin mt-3">
        <div class="form-group">
          <label class="ml-2">Title</label>
          <input v-model="newArticle.title" type="text" class="form-control" name="title" placeholder="Title">
        </div>
        <div class="form-group">
          <label class="ml-2">Content</label>
          <textarea v-model="newArticle.content" class="form-control" rows="5"></textarea>
        </div>
        <div class="form-group">
          <label>Category</label>
          <select class="custom-select" v-model="newArticle.category">
            <option v-for="(category, index) in categories" :key="index" :value="category">{{ category }}</option>
          </select>
        </div>
        <div class="form-group custom-file">
          <label class="file-label" for="customFile">Article Picture</label>
          <div v-if="newArticle.image_url">
            <img :src="newArticle.image_url" style="width: 60%;" />
          </div>
          <div class="form-group">
            <input type="file" class="file-input" name="image_url" value="" id="customFile">
          </div>
        </div>
        <!-- Button Submit/Cancel -->
        <div class="text-center py-3 mt-2">
          <button type="submit" class="btn btn-primary px-5 mx-1">Add Post</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'create-article',
  data () {
    return {
      newArticle: {
        title: '',
        content: '',
        category: '',
        image_url: ''
      }
    }
  },
  computed: {
    ...mapState([
      'categories'
    ])
  },
  methods: {
    ...mapActions([
      'createArticle'
    ])
  }
}
</script>

<style>

</style>
