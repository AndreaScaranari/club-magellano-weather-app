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
		forecasts: [[]],
	}),
	methods: {
		// metodo per recuperare le immagini
		createImagePath(img_name) {
			const url = new URL(`../assets/${img_name}`, import.meta.url);
			return url.href
		},
		// chiamata axios con attivazione e disattivazione loader\
		fetchWeather() {
			this.isLoading = true;
			axios.get(url)
				.then(res => {
					const data = res.data;
					// variabili che utilizzo per pushare gli oggetti ottenuti dal forEach nel giusto array (array che include solo oggetti con la stessa data) 
					let i = 0;
					let sameDay = data.list[i].dt_txt.slice(0, 10);
					// raccolgo i dati della chiamata axios in oggetti
					data.list.forEach(item => {
						const date = new Date(item.dt * 1000).toLocaleString();
						const temp = (item.main.temp - 273.15).toFixed(2) + "°";
						const weather = item.weather[0].description;
						const today = item.dt_txt.slice(0, 10);
						// verifico a che giorno appartengono e in caso il giorno sia cambiato creo e modifico l'array in cui pushare
						if (today != sameDay) {
							i++;
							sameDay = today;
							this.forecasts.push([]);
						}
						// push nell'array
						this.forecasts[i].push({ date, temp, weather });
					});
				})
				// gestione errori
				.catch(err => {
					console.error('Errore nel recuperare i dati meteo:', err);
				})
				// chiudo il loader
				.then(() => {
					this.isLoading = false;
				});
		}
	},
	created() {
		// lancio chiamata axios
		this.fetchWeather();
	}
}
</script>

<template>
	<div v-if="!isLoading">
		<h1>Previsioni Meteo:<br>Lodi</h1>
		<!-- <h2 class="flexsec dates">
			<div class="btn">
				<< </div>
					<div>{{ forecasts[0][0].date.slice(0, 5) }}</div>
					<div class="btn">>></div>
		</h2> -->
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