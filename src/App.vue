<template lang="pug">
  #app
    img(src='dist/lastfm.png' class="logo")
    h1 Mira el Top de música con Last.fm
    div.select
      select(v-model="selectedCountry" class="selection")
        option(v-for="country in countries" v-bind:value="country.value" class="option") {{ country.name }}
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
        { name: 'Peru', value: 'peru' },
        { name: 'Bolivia', value: 'bolivia' },
        { name: 'Mexico', value: 'mexico' },
        { name: 'Ecuador', value: 'ecuador' },
      ],
      selectedCountry: 'colombia',
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
  display flex
  flex-direction column
  justify-content center
  align-items center
  margin 0 auto
  box-shadow 0 5px 5px 5px rgba(0,0,0,0.2);
  max-width 800px

body
  margin 0
  font-family Arial, Helvetica, sans-serif

.logo
  max-width 300px
  min-width 50px

h1
  box-shadow: 0 5px 5px 5px rgba(0,0,0,0.2)
  padding: 10px
  border-radius: 25px 0 25px 0

select {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0 0 0 0.5em;
    color: #f39e9e;
    cursor: pointer;
    background: #2c3e50;
    border: none;
    font-size 18px

}
.option
  border-radius 8px
.select {
  position: relative;
  display: block;
  width: 20em;
  line-height: 2.5;
  background: #2c3e50;
  overflow: hidden;
  border-radius: .25em;
}
.select::after
    content '\25BC';
    position absolute;
    border 1px solid black 
    top 0;
    right 0;
    bottom 0;
    padding 0 1em;
    background white;
    pointer-events none;
ul
  list-style-type none
  padding 0
  display grid 
  grid-template 1fr 1fr 1fr / 1fr 1fr 1fr
  padding 0 20px 0 20px

li
  display inline-block
  margin 0 10px

a
  color #FD1643
  text-decoration none
 @media screen and (max-width: 700px)
    ul
      display grid 
      grid-template 1fr 1fr /  1fr 1fr
 @media screen and (max-width: 400px)
    ul
      display grid 
      grid-template 1fr  /  1fr
    h1, h2 
      font-size 18px
    .bands
      width 100%
</style>
