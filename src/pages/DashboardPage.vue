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
		i: 0,
		j: 0
	}),
	methods: {
		// metodo per recuperare le immagini
		createImagePath(img_name) {
			const url = new URL(`../assets/${img_name}`, import.meta.url);
			return url.href
		},
		// convertire Kelvin in Celsius
		findTemperatureC(kelvin) {
			return Math.round(kelvin - 273.15) + "°";
		},
		// prima lettera maiuscola
		firstLetterUC(word) {
			return word[0].toUpperCase() + word.slice(1);
		},
		// passa alle previsioni del giorno successivo
		nextDay() {
			if (this.i < 4) {
				this.i++;
				this.j = 0;
			}
		},
		// passa alle previsioni del giorno precedente
		previousDay() {
			if (this.i > 0) {
				this.i--;
				this.j = 0;
			}
		},
		// cambia l'orario a cui le previsioni fanno riferimento
		changeHour(index) {
			this.j = index;
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
						const today = item.dt_txt.slice(0, 10);
						const date = new Date(item.dt * 1000).toLocaleString();
						const temp = this.findTemperatureC(item.main.temp);
						const weather = this.firstLetterUC(item.weather[0].description);
						const pop = item.pop * 100 + "%";
						let rainMM;
						if (item.rain) {
							rainMM = item.rain['3h'] + "mm";
						} else {
							rainMM = null;
						};
						const max = this.findTemperatureC(item.main.temp_max);
						const min = this.findTemperatureC(item.main.temp_min);
						const windSpeed = item.wind.speed;
						const windDirection = item.wind.deg;
						const humidity = item.main.humidity + "%";
						const pressure = item.main.pressure;
						const icon = item.weather[0].icon;

						// verifico a che giorno appartengono e in caso il giorno sia cambiato creo e modifico l'array in cui pushare
						if (today != sameDay) {
							i++;
							sameDay = today;
							this.forecasts.push([]);
						}
						// push nell'array
						this.forecasts[i].push({ date, temp, weather, pop, rainMM, max, min, windSpeed, windDirection, humidity, pressure, icon });
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
		<!-- Titolo pagina -->
		<h1>Previsioni Meteo: Lodi</h1>
		<!-- Selettore data -->
		<h2 class="flexsec dates">
			<button class="btn" @click="previousDay()" :disabled="i <= 0">
				<font-awesome-icon :icon="['fas', 'angles-left']" /> </button>
			<div class="underline">{{ forecasts[i][j].date.slice(0, 5) }}</div>
			<button class="btn" @click="nextDay()" :disabled="i >= 4"><font-awesome-icon
					:icon="['fas', 'angles-right']" /></button>
		</h2>
		<!-- Icona e main info -->
		<div class="flexsec main-temp">
			<img :src="`https://openweathermap.org/img/wn/${forecasts[i][j].icon}@2x.png`" alt="Icona Meteo"
				class="meteo-icon">
			<!-- <img :src='createImagePath("club-magellano-image-logo.jpg")' alt="Icona Meteo" class="meteo-icon"> -->
			<div class="weatemp">
				<div class="temperature">{{ forecasts[i][j].temp }}</div>
				<div class="weather">{{ forecasts[i][j].weather }}
				</div>
				<div class="max-min">{{ forecasts[i][j].max }} / {{ forecasts[i][j].min }}</div>
			</div>
		</div>
		<!-- Previsioni a cinque giorni -->
		<div class="five-d-f">
			<div class="flexsec" @click="is5DOpen = !is5DOpen">
				<span class="accordion-button btn ">Previsioni a 4 giorni
					<font-awesome-icon icon="chevron-down" /></span>
			</div>
			<table v-show="is5DOpen" class="accordion-table">
				<tr v-for="(forecast, index) in forecasts.slice(1, 5)" :key="index" class="flexsbc">
					<td class="w-20">
						{{ forecast[0].date.slice(0, 5) }}
					</td>
					<td class="w-50">
						{{ forecast[4].weather }}
					</td>
					<td class="w-30">
						{{ forecast[4].max }} / {{ forecasts[1][4].min }}
					</td>
				</tr>
			</table>
		</div>
		<!-- Orari previsioni della giornata -->
		<ul class="flexsec hours-container">
			<li class="hours" v-for="(forecast, index) in forecasts[i]" :key="index" @click="changeHour(index)"><button
					class="btn" :disabled="j == index">{{
						forecast.date.slice(12,
							17) }}</button></li>
		</ul>
		<!-- boxes con dettagli su temperatura -->
		<div class="row" id="dboard-area">
			<!-- col precipitazioni -->
			<div class="col">
				<div class="card ">
					<h4>Precipitazioni</h4>
					<div class="flexsec">
						<div>
							<div>{{ forecasts[i][j].pop }}<br>
								{{ forecasts[i][j].rainMM }}</div>
						</div>
						<div v-if="forecasts[i][j].pop != '0%'"><font-awesome-icon :icon="['fas', 'droplet']" /></div>
						<div v-else><font-awesome-icon :icon="['fas', 'droplet-slash']" />
						</div>
					</div>
				</div>
			</div>
			<!-- col vento -->
			<div class="col">
				<div class="card ">
					<h4>Vento</h4>
					<div class="flexsec">
						<div>
							<div>{{ forecasts[i][j].windSpeed }}
								<!-- <br>{{ forecasts[i][j].windDirection }} -->
							</div>
							<div class="mini-text">m/s</div>
						</div>
						<div>
							<font-awesome-icon :icon="['fas', 'wind']" />
						</div>
					</div>
				</div>
			</div>
			<!-- col umidità -->
			<div class="col">
				<div class="card">
					<h4>Umidità</h4>
					<div class="flexsec">
						<div>{{ forecasts[i][j].humidity }}</div>
						<div><font-awesome-icon :icon="['fas', 'gauge']" /></div>
					</div>
				</div>
			</div>
			<!-- col pressione -->
			<div class="col">
				<div class="card">
					<h4>Pressione</h4>
					<div class="flexsec">
						<div>
							<div>{{ forecasts[i][j].pressure }}</div>
							<div class="mini-text">mbar</div>
						</div>
						<div><font-awesome-icon :icon="['fas', 'arrows-down-to-line']" /></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>