<script>
export default {
	name: 'AppLoader',
};
</script>

<template>
	<div class="loader-overlay">
		<font-awesome-icon :icon="['fas', 'spinner']" />
		<div class="loader-text">Loading...</div>
	</div>
</template>