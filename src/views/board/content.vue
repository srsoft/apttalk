<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="accent" dense flat dark>
        <v-toolbar-title v-text="info.title"></v-toolbar-title>
        <v-spacer></v-spacer>
        <template v-if="user">
          <v-btn icon @click="write" :disabled="user.level > 0"><v-icon>mdi-pencil</v-icon></v-btn>
          <v-btn icon @click="articleWrite" :disabled="user.level > 4"><v-icon>mdi-plus</v-icon></v-btn>
        </template>
      </v-toolbar>
      <v-card-text v-if="info.createdAt">
        <v-alert color="info" outlined dismissible>
          <div style="white-space: pre-line">{{ info.description }}</div>
          <div style="text-right font-italic caption">작성일: {{ info.createdAt.toDate().toString() }}</div>
          <div style="text-right font-italic caption">수정일: {{ info.updatedAt.toDate().toString() }}</div>
        </v-alert>
      </v-card-text>
      <BoardArticle :info="info" :document="document" />
    </v-card>
  </v-container>
</template>

<script>
import BoardArticle from './article/index'
export default {
  components: { BoardArticle },
  props: ['document'],
  data () {
    return {
      unsubscribe: null,
      info: {
        category: '',
        title: '',
        description: ''
      },
      loading: false
    }
  },
  watch: {
    document () {
      this.subscribe()
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    rtUser () {
      return this.$store.state.fireUser
    }
  },
  created () {
    this.subscribe()
  },
  destroyed () {
    if (this.unsubscribe) this.unsubscribe()
  },
  methods: {
    subscribe () {
      console.log(this.rtUser)
      if (this.unsubscribe) this.unsubscribe()
      const ref = this.$firebase.firestore().collection('boards').doc(this.document)
      this.unsubscribe = ref.onSnapshot(doc => {
        if (!doc.exists) return this.write()
        this.info = doc.data()
      })
    },
    async write () {
      this.$router.push(this.$route.path + '/board-write')
    },
    async articleWrite () {
      this.$router.push({ path: this.$route.path + '/article-write', query: { articleId: '' } })
    }
  }
}
</script>

<style>

</style>
