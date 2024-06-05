<script>
import axios from 'axios';
import { store } from '../data/store';
import AppHourSelection from '../components/AppHourSelection.vue';
import AppBoxWeather from '../components/AppBoxWeather.vue';

const apiKey = 'e74beaa658d90f730fa32959308941a4';
const lat = 45.3097228;
const lon = 9.503716;
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=it&appid=${apiKey}`;

export default {
	name: 'DashboardPage',
	components: { AppHourSelection, AppBoxWeather },
	data: () => ({
		store,
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
		changeDay(index) {
			this.i = index;
			this.j = 0;
		},
		// cambia l'orario a cui le previsioni fanno riferimento
		changeHour(index) {
			this.j = index;
		},
		// chiamata axios con attivazione e disattivazione loader\
		fetchWeather() {
			store.isLoading = true;
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
						const pop = Math.round(parseFloat(item.pop * 100)) + "%";
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
					store.isLoading = false;
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
	<div v-if="!store.isLoading" class="wrapper">
		<!-- titolo pagina -->
		<h1>Previsioni Meteo: Lodi</h1>
		<!-- selettore data per mobile-->
		<h2 class="flexsec dates">
			<button class="btn" @click="previousDay()" :disabled="i <= 0">
				<font-awesome-icon :icon="['fas', 'angles-left']" /> </button>
			<div class="underline">{{ forecasts[i][j].date.slice(0, 5) }}</div>
			<button class="btn" @click="nextDay()" :disabled="i >= 4"><font-awesome-icon
					:icon="['fas', 'angles-right']" /></button>
		</h2>
		<!-- selettore data tablet / fisso -->
		<ul class="dates-md">
			<li v-for="(forecast, index) in forecasts.slice(0, -1)" :key="index" @click="changeDay(index)">
				<button class="btn" :disabled="i == index">
					<h2>{{ forecast[0].date.slice(0, 5) }}</h2>
				</button>
			</li>
		</ul>
		<!-- area centrale con icona, temp, ecc -->
		<div class="flexsec main-temp">
			<!-- orari previsioni della giornata -->
			<AppHourSelection :forecasts="forecasts[i]" :j="j" @change-hour="changeHour" xlClassA="hours-container-xl"
				xlClassB="hours-xl" />
			<!-- icona meteo -->
			<img :src="`https://openweathermap.org/img/wn/${forecasts[i][j].icon}@2x.png`" alt="Icona Meteo"
				class="meteo-icon">
			<!-- temperatura -->
			<div class="weatemp">
				<div class="temperature">{{ forecasts[i][j].temp }}</div>
				<div class="weather">{{ forecasts[i][j].weather }}
				</div>
				<div class="max-min">{{ forecasts[i][j].max }} / {{ forecasts[i][j].min }}</div>
			</div>
			<!-- boxes con dettagli su temperatura -->
			<AppBoxWeather :forecasts="forecasts" :i="i" :j="j" classA="row-md" />
		</div>
		<!-- previsioni a cinque giorni -->
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
		<div class="five-d-f-xl">
			<table class="accordion-table-xl">
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
		<!-- orari previsioni della giornata -->
		<AppHourSelection :forecasts="forecasts[i]" :j="j" @change-hour="changeHour" xlClassA="hours-container" />
		<!-- boxes con dettagli su temperatura -->
		<AppBoxWeather :forecasts="forecasts" :i="i" :j="j" classA="row" idA="dboard-area" />
	</div>
</template>