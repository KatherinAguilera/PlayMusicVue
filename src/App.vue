<template lang="pug">
  #app
    img(src='dist/logo.png')
    h1 Play Music with VueJS
    select(v-model="selectedCountry")
      option(v-for="country in countries" v-bind:value="country.value") {{ country.name }}
    spinner(v-show="loading")
    ul
      artist(v-for="artist in artists" v-bind:artist="artist" v-bind:key="artist.mbid")
</template>

<script>
import getArtists from './api'
import Artist from './components/Artist.vue'
import Spinner from './components/Spinner.vue'
//importar metodo funcion de index.js
//export default es cuando se va a exportar algo e importarlo en algun lugar 

export default {
  name: 'app',
  data () {
    return {
      artists: [],
       //array para seleccionar pais
      countries: [
        { name: 'Argentina', value: 'argentina' },
        { name: 'Colombia', value: 'colombia' },
        { name: 'España', value: 'spain' },
      ],
      selectedCountry: 'argentina',
      //al comnzar cargue el loader
      loading: true
    }
  },
   //Definiendo componente artist
  components: {
    Artist,
    Spinner
  },
  methods: {
    refreshArtists() {
        //declarar this en una variable para que no haga referencia a window 
      const self = this
      this.loading = true
      this.artists = []
      getArtists(this.selectedCountry)
      //Devolvera todos los artistas
        .then(function (artists) {
          self.loading = false
          self.artists = artists
        })
    }
  },
   //mounted en vuejs en el momento que fue montado en componente en el ciclo de vida
  mounted() {
    this.refreshArtists()
  },//cuando haya un cambio en select pais
  watch: {
    selectedCountry() {
      this.refreshArtists()
    }
  }
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px

h1, h2
  font-weight normal

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
