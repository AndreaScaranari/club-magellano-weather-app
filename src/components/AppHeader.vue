<script>

export default {
	name: 'AppHeader',
	methods: {
		createImagePath(img_name) {
			const url = new URL(`../assets/${img_name}`, import.meta.url);
			return url.href
		}
	}
}
</script>

<template>
	<header class="flexsbc">
		<RouterLink to="/">
			<img :src='createImagePath("club-magellano-logo.svg")' alt="Logo Club Magellano">
		</RouterLink>
		<ul class="flexsbc">
			<li class="page-icon">
				<RouterLink to="/"><font-awesome-icon icon="cloud-sun" /> <span class="header-text">Dashboard</span>
				</RouterLink>
			</li>
			<li class="page-icon">
				<RouterLink to="/settings"><font-awesome-icon icon="gear" /> <span class="header-text">Settings</span>
				</RouterLink>
			</li>
		</ul>
	</header>
</template>