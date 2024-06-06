<script>
export default {
	name: 'AppBoxWeather',
	props: {
		forecasts: {
			type: Array,
			required: true
		},
		i: {
			type: Number,
			required: true
		},
		j: {
			type: Number,
			required: true
		},
		classA: {
			type: String,
			default: ''
		},
		idA: {
			type: String,
			default: ''
		}
	}
}
</script>

<template>
	<div :class="classA" :id="idA">
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
			<div class="card">
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
</template>