<template>
  <v-sheet>
    <v-subheader>
      editor
      <v-spacer></v-spacer>
      <v-btn @click="read">read</v-btn>
    </v-subheader>
    <editor :options="options" :initialValue="text" ref="editor"></editor>
    <viewer :initialValue="text"></viewer>
  </v-sheet>
</template>

<script>
export default {
  data () {
    return {
      options: {
        language: 'ko'
      },
      text: '# abcdefg'
    }
  },
  methods: {
    read () {
      alert(this.$refs.editor.invoke('getMarkdown'))
    }
  }
}
</script>

<style>

</style>
