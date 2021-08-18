<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <SiteTitle :title="site.title" />
      <v-spacer/>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer">
      <SiteMenu :items="site.menu" />
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
    <SiteFooter :footer="site.footer" />
  </v-app>
</template>

<script>
import SiteTitle from '@/views/site/title'
import SiteFooter from '@/views/site/footer'
import SiteMenu from '@/views/site/menu'

export default {
  components: { SiteTitle, SiteFooter, SiteMenu },
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
        console.log(v)
        if (!v) {
          this.$firebase.database().ref().child('site').set(this.site)
          return
        }
        this.site = v
      }, (e) => {
        console.log(e.message)
      })
    }
  }
}
</script>
