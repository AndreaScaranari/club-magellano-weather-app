<script>
import { store } from '../data/store';


export default {
	name: 'SettingsPage',
	data: () => ({
		store,
	})
}
</script>

<template>
	<h1>Pagina delle impostazioni</h1>
	<div class="btn-container">
		<RouterLink to="/" class="btn">Torna alla Dashboard</RouterLink>
	</div>
</template>