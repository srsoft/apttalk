<template>
  <v-sheet>
    <v-textarea v-model="text"></v-textarea>
    <v-btn @click="read">read</v-btn>
    <v-btn @click="write">write</v-btn>
  </v-sheet>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      text: '',
      url: ''
    }
  },
  methods: {
    async write () {
      const sn = await this.$firebase.storage().ref().child('xxx.text').putString('abcd')
      this.url = await sn.ref.getDownloadURL()
    },
    async read () {
      const r = await axios.get(this.url)
      console.log(r)
      this.text = r.data
    }
  }
}
</script>

<style>

</style>
