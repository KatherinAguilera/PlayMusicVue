//hacer los request a la API de last.fm
//importp los datos de config.js
import config from './config'
//apikey para colocarla como varianle en la URL
const { apiKey } = config
//url de la api 
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:country&api_key=${apiKey}&format=json`
    //exportar funcion a app.vue
export default function getArtists(country) {
    const url = URL.replace(':country', country)
        //debe retornar algo
    return fetch(url)
        .then(res => res.json())
        .then(json => json.topartists.artist)
}