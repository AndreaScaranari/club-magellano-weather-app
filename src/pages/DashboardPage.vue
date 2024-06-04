<script>
import axios from 'axios';

const apiKey = 'e74beaa658d90f730fa32959308941a4';
const lat = 45.3097228;
const lon = 9.503716;
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=it&appid=${apiKey}`;

export default {
  name: 'DashboardPage',
  data: () => ({
    dates: [],
    temps: [],
    weathers: []
  }) ,
  methods: {
    createImagePath(img_name){
        const url = new URL (`../assets/${img_name}`, import.meta.url);
        return url.href
    },
    fetchWeather(){
        axios.get(url)
        .then(res => {
            const data = res.data;
            data.list.forEach(item => {
                this.dates.push(new Date(item.dt * 1000));
                this.temps.push(item.main.temp - 273.15);
                this.weathers.push(item.weather[0].description);
            });
        })
        .catch(err => {
            console.error('Errore nel recuperare i dati meteo:', err);
            });
  }},
  created() {
    this.fetchWeather();
  }
}
</script>

<template>
<h1>Previsioni Meteo:<br>Lodi</h1>
<h2 class="flexsec dates"><div class="btn"><<</div><div>4/06</div><div class="btn">>></div></h2>
<div class="flexsec main-temp">
    <img :src='createImagePath("club-magellano-image-logo.jpg")' alt="Icona Meteo" class="meteo-icon">
    <div class="weatemp">
        <div class="temperature">25°</div>
        <div class="weather">Soleggiato</div>
        <div class="max-min">22° / 16°</div>
    </div>
</div>
<ul>
    <li></li>
</ul>
<ul class="flexsec hours-container">
        <li class="hours"><span class="btn">3:00</span></li>
        <li class="hours"><span class="btn">3:00</span></li>
        <li class="hours"><span class="btn">3:00</span></li>
        <li class="hours"><span class="btn">3:00</span></li>
        <li class="hours"><span class="btn">3:00</span></li>
        <li class="hours"><span class="btn">3:00</span></li>
        <li class="hours"><span class="btn">3:00</span></li>
        <li class="hours"><span class="btn">3:00</span></li>
</ul>
<ul>
    <li>Pop: 80%</li>
    <li>mm: 15</li>
    <li>velocità vento: 30kmh</li>
    <li>direzione vento: sud</li>
    <li>umidità</li>
    <li>pressione</li>
    <li>visibilità</li>
    <li>Alba / Tramonto</li>
</ul>

<!-- <ul> -->
    <!-- <li v-for="temp in temps">{{ temp.toFixed(2) }} °C</li> -->
    <!-- <li v-for="date in dates">{{ date.toLocaleString()}}</li> -->
    <!-- <li v-for="weather in weathers">{{ weather}}</li> -->
<!-- </ul> -->
</template>