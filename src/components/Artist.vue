<template lang="pug">
  li.artist
    h2: a(:href="artist.url" target="_blank") {{ artist.name }}
    figure
      a(:href="artist.url" target="_blank")
      img(:src="artist.image[2]['#text']" class="bands")
</template>

<script>
//Exportar componente artist
export default {
  name: 'artist',
  props: [ 'artist' ]
}
</script>

<style lang="stylus" scoped>
li.artist
  display block
  margin 10px 0
h2{
  background :#000000
  opacity .8
  border-radius 25px
  padding 5px
  margin-left 10px
}
.bands{
border-radius 10px
transition .8s
animation-delay .4s
animation enter 2s ease-in-out alternate
}
.bands:hover{
transform scale(1.2)
cursor pointer
background: #d4d0d0
opacity: .8
}
@keyframes enter 
  0% 
    transform translateX(-3000px) 
  50%
    transform translateX(200px) 
  70%
    transform translateX(-200px)
    transition .3s
  100%
    transform translateX(0)
</style>
