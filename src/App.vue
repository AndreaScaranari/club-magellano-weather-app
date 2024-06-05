<script>
import { store } from './data/store';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import AppLoader from './components/AppLoader.vue';

export default {
	name: 'Weather App',
	components: { AppHeader, AppFooter, AppLoader },
	data: () => ({
		store
	})
}
</script>

<template>
	<AppHeader />
	<main class="container">
		<AppLoader v-if="store.isLoading" />
		<RouterView />
	</main>
	<AppFooter />
</template>