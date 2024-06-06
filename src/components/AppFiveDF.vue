<script>
export default {
    name: 'AppFiveDF',
    props: {
        forecasts: {
            type: Array,
            required: true
        }
    },
    methods: {
        findDailyMax(i) {
            const maxArray = this.forecasts[i].map(forecast => parseInt(forecast.max.slice(0, -1)));
            return Math.max(...maxArray) + "°";
        },
        findDailyMin(i) {
            const minArray = this.forecasts[i].map(forecast => parseInt(forecast.min.slice(0, -1)));
            return Math.min(...minArray) + "°";
        },
    }
}
</script>

<template>
    <tr v-for="(forecast, index) in forecasts.slice(1, 5)" :key="index" class="flexsbc">
        <td>
            {{ forecast[0].date.slice(0, 5) }}
        </td>
        <td>
            {{ forecast[4].weather }}
        </td>
        <td>
            {{ findDailyMax(index) }} / {{ findDailyMin(index) }}
        </td>
    </tr>
</template>