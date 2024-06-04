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
    temps: []
  }) ,
  methods: {
    fetchWeather(){
        axios.get(url)
        .then(res => {
            const data = res.data;
            data.list.forEach(item => {
                this.dates.push(item.dt * 1000);
                this.temps.push(item.main.temp - 273.15);
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
<h1>Previsioni Meteo per: Lodi</h1>
<ul>
    <li v-for="temp in temps">{{ temp.toFixed(1) }} °C</li>
</ul>
</template>