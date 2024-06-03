<script>

export default {
    name: 'AppHeader',
    methods: {
    createImagePath(img_name){
        const url = new URL (`../assets/${img_name}`, import.meta.url);
        return url.href
    }
}
}
</script>

<template>
    <header class="flexsbc">
        <img :src='createImagePath("club-magellano-logo.svg")' alt="Logo Club Magellano">
        <ul class="flexsbc">
            <li><a href="dashboard.html"><font-awesome-icon icon="cloud-sun" /></a></li>
            <li><a href="settings.html"><font-awesome-icon icon="gear" /></a></li>
        </ul>  
    </header>
</template>