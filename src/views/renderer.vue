<template>
  <BoardIndex v-if="collection === 'board' && document === 'list'" />
  <BoardContent v-else-if="collection === 'board' && !action" :document="document" />
  <BoardForm v-else-if="collection === 'board' && action === 'board-write'" :document="document" :action="action" />
  <BoardArticleForm v-else-if="collection === 'board' && action === 'article-write'" :document="document" :action="action" />
  <PageIndex v-else-if="collection === 'page' && document === 'list'" />
  <PageContent v-else-if="collection === 'page'" :document="document" />
  <ErrorPage v-else />
</template>

<script>
import BoardIndex from './board/index'
import BoardContent from './board/content'
import BoardForm from './board/form'
import BoardArticleForm from './board/article/form'
import PageIndex from './page/index'
import PageContent from './page/content'
import ErrorPage from './error'

export default {
  components: {
    BoardIndex, BoardContent, BoardForm, BoardArticleForm, PageIndex, PageContent, ErrorPage
  },
  computed: {
    collection () {
      return this.$route.params.collection
    },
    document () {
      return this.$route.params.document
    },
    action () {
      return this.$route.params.action
    }

  },
  created () {
    console.log(this.collection, this.document, this.action)
  }
}
</script>

<style>

</style>
