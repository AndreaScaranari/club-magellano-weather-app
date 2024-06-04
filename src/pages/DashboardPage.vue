<script>
import axios from 'axios';

const apiKey = 'e74beaa658d90f730fa32959308941a4';
const lat = 45.3097228;
const lon = 9.503716;
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=it&appid=${apiKey}`;

export default {
  name: 'DashboardPage',
  data: () => ({
	isLoading: false,
	is5DOpen: false,
	forecasts: [],
  }) ,
  methods: {
    createImagePath(img_name){
        const url = new URL (`../assets/${img_name}`, import.meta.url);
        return url.href
    },
    fetchWeather(){
		this.isLoading = true;
        axios.get(url)
        .then(res => {
            const data = res.data;
            data.list.forEach(item => {
                const date = new Date(item.dt * 1000).toLocaleString();
				const temp = (item.main.temp - 273.15).toFixed(2)+"°";
            	const weather = item.weather[0].description;

				this.forecasts.push({ date, temp, weather });
            });
        })
        .catch(err => {
            console.error('Errore nel recuperare i dati meteo:', err);
            })
		.then(() => {
			this.isLoading = false;
		});
  }},
  created() {
    // this.fetchWeather();
  }
}
</script>

<template>
<div v-if="!isLoading">
	<h1>Previsioni Meteo:<br>Lodi</h1>
	<h2 class="flexsec dates"><div class="btn"><<</div><div>Lodi</div><div class="btn">>></div></h2>
	<div class="flexsec main-temp">
			<img :src='createImagePath("club-magellano-image-logo.jpg")' alt="Icona Meteo" class="meteo-icon">
			<div class="weatemp">
					<div class="temperature">25°</div>
					<div class="weather">Soleggiato</div>
					<div class="max-min">22° / 16°</div>
			</div>
	</div>
	<div>
		<h2 class="accordion-button" @click="is5DOpen = !is5DOpen">
			Previsioni a 5 giorni
			<font-awesome-icon icon="chevron-down" />
		</h2>
		<ul v-show="is5DOpen">
				<li class="flexsbc">
					<div>
						date
					</div>
					<div>
						icon
					</div>
					<div>
						min / max
					</div>
				</li>
				<li class="flexsbc">
					<div>
						date
					</div>
					<div>
						icon
					</div>
					<div>
						min / max
					</div>
				</li>
				<li class="flexsbc">
					<div>
						date
					</div>
					<div>
						icon
					</div>
					<div>
						min / max
					</div>
				</li>
				<li class="flexsbc">
					<div>
						date
					</div>
					<div>
						icon
					</div>
					<div>
						min / max
					</div>
				</li>
		</ul>
	</div>
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
</div>


</template>