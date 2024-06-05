<script>
export default {
	name: 'AppHourSelection',
	props: {
		forecasts: {
			type: Array,
			required: true
		},
		j: {
			type: Number,
			required: true
		},
		xlClassA: {
			type: String,
			default: ''
		},
		xlClassB: {
			type: String,
			default: ''
		}
	},
	methods: {
		changeHour(index) {
			this.$emit('change-hour', index);
		}
	}
}
</script>

<template>
	<ul class="flexsec" :class="xlClassA">
		<li class="hours" :class="xlClassB" v-for="(forecast, index) in forecasts" :key="index"
			@click="changeHour(index)">
			<button class="btn" :disabled="j === index">{{ forecast.date.slice(12, 17) }}</button>
		</li>
	</ul>
</template>