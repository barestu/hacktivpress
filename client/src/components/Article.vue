<template>
  <div class="article text-center">
    <h3 class="font-weight-bold">
      {{ article.title }}
    </h3>
    <small>Category: {{ article.category }}</small>
    <p>{{ article.content }}</p>
    <small>Posted by
      <span class="font-weight-bold">
        {{ article.author.username }}
      </span>
    </small>
    <p>
      <small>{{ article.createdAt }}</small>
    </p>
    <div v-if="article.author.username === user.username">
      <button data-toggle="modal" :data-target="targetUpdateModal" class="btn btn-sm btn-warning mx-1">update</button>
      <button @click="deleteArticle(article)" class="btn btn-sm btn-danger mx-1">delete</button>
    </div>
    <hr>
    <!-- Modal Update -->
    <div class="modal fade" :id="idUpdateModal">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <h2 class="text-center py-3">Update Article</h2>
            <form @submit.prevent="updateArticle(editData)">
              <div class="form-signin mt-3">
                <div class="form-group">
                  <label class="ml-2">Title</label>
                  <input v-model="editData.title" type="text" class="form-control" name="title" placeholder="Title">
                </div>
                <div class="form-group">
                  <label class="ml-2">Content</label>
                  <textarea v-model="editData.content" class="form-control" rows="5"></textarea>
                </div>
                <div class="form-group">
                  <label>Category</label>
                  <select class="custom-select" v-model="editData.category">
                    <option v-for="(category, index) in categories" :key="index" :value="category">{{ category }}</option>
                  </select>
                </div>
                <div class="form-group custom-file">
                  <label class="file-label" for="customFile">Article Picture</label>
                  <div v-if="editData.image_url">
                    <img :src="editData.image_url" style="width: 60%;" />
                  </div>
                  <div class="form-group">
                    <input type="file" class="file-input" name="image_url" value="">
                  </div>
                </div>
                <!-- Button Submit/Cancel -->
                <div class="text-center py-3 mt-2">
                  <button type="submit" class="btn btn-outline-success px-5 mx-1">Update Post</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'articles',
  props: [
    'article'
  ],
  data () {
    return {
      idUpdateModal: `modal${this.article._id}`,
      targetUpdateModal: `#modal${this.article._id}`,
      cacheData: '',
      editData: {
        _id: this.article._id,
        title: this.article.title,
        content: this.article.content,
        // img_url: this.article.img_url,
        category: this.article.category
      }
    }
  },
  computed: {
    ...mapState([
      'user',
      'categories'
    ])
  },
  methods: {
    ...mapActions([
      'updateArticle',
      'deleteArticle'
    ])
  }
}
</script>

<style>

</style>
