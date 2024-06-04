<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'Weather App',
  components: {AppHeader, AppFooter}
}
</script>

<template>
  <AppHeader />
  <main class="container">
    <RouterView />
  </main>
  <AppFooter />
</template>