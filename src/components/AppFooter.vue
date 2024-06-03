<script>
export default {
    name: 'AppFooter',
    methods: {
    createImagePath(img_name){
        const url = new URL (`../assets/${img_name}`, import.meta.url);
        return url.href
    }
}
}
</script>

<template>
    <footer>
        <!-- Logo -->
        <RouterLink to="/">
            <img :src='createImagePath("club-magellano-logo.svg")' alt="Logo Club Magellano">
        </RouterLink>
        <!-- Informazioni utili -->
        <ul id="addresses">
            <li>© <strong>CLUB MAGELLANO SRL</strong> by <b><i>Mafegeni Viaggi</i></b></li>
            <li>Aut.prov. REGDE/1606/2010-08-17 P IVA 06389170967</li>
            <li>Tel. <b>02.39523309</b> E-mail: <a href="info@clubmagellano.it">info@clubmagellano.it</a></li>
            <li>Via Bagnolo, 14 - Tavazzano (LO)</li>
            <li><a href="https://www.clubmagellano.it/privacy-policy/" target="_blank">Privacy Policy</a> | <a href="https://www.clubmagellano.it/cookie-policy/" target="_blank">Cookie Policy</a></li>
        </ul>
        <!-- Social -->
        <ul id="social" class="flexsbc">
            <li><a href="https://facebook.com/clubmagellano.it" target="_blank"><font-awesome-icon icon="fab fa-facebook" class="page-icon"/></a></li>
            <li><a href="https://twitter.com/clubmagellano" target="_blank"><font-awesome-icon icon="fab fa-twitter" class="page-icon"/></a></li>
            <li><a href="https://www.instagram.com/viaggiclubmagellano/" target="_blank" ><font-awesome-icon icon="fab fa-instagram" class="page-icon"/></a></li>
        </ul>
    </footer>
</template>