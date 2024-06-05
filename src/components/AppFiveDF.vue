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
        changeHour(index) {
            this.$emit('change-hour', index);
        }
    }
}
</script>

<template>
    <tr v-for="(forecast, index) in forecasts.slice(1, 5)" :key="index" class="flexsbc">
        <td class="w-20">
            {{ forecast[0].date.slice(0, 5) }}
        </td>
        <td class="w-50">
            {{ forecast[4].weather }}
        </td>
        <td class="w-30">
            {{ forecast[4].max }} / {{ forecast[1].min }}
        </td>
    </tr>
</template>