<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <SiteTitle :title="site.title" />
      <v-spacer/>
      <SiteSign />
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" width="400">
      <SiteMenu :items="site.menu" />
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
    <SiteFooter :footer="site.footer" />
  </v-app>
</template>

<script>
import SiteTitle from '@/views/site/title'
import SiteFooter from '@/views/site/footer'
import SiteMenu from '@/views/site/menu'
import SiteSign from '@/views/site/sign'

export default {
  components: { SiteTitle, SiteFooter, SiteMenu, SiteSign },
  name: 'App',
  data () {
    return {
      drawer: false,
      site: {
        menu: [
          {
            icon: 'mdi-home',
            subItems: [
              { title: 'Dashboard', to: '/' },
              { title: 'About', to: '/about' }
            ],
            title: 'home'
          },
          {
            icon: 'mdi-home',
            subItems: [
              { title: 'Hello1', to: '/' },
              { title: 'Hello2', to: '/about' }
            ],
            title: 'hello'
          }
        ],
        title: 'page title',
        footer: 'page footer'
      }
    }
  },
  created () {
    this.subscribe()
  },
  methods: {
    subscribe () {
      this.$firebase.database().ref().child('site').on('value', (sn) => {
        const v = sn.val()
        if (!v) {
          this.$firebase.database().ref().child('site').set(this.site)
        } else {
          this.site = v
        }
      }, (e) => {
        console.log(e.message)
      })
    }
  }
}
</script>
