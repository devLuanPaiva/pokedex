<script setup lang="ts">
import Nav from './components/shared/AppNav.vue'
import Footer from './components/shared/AppFooter.vue'
</script>

<template>
  <div class="app-container">
    <Nav />
    <main class="main">
      <router-view></router-view>
    </main>
    <Footer/>
  </div>
</template>

<style scoped>
html, body {
    height: 100%; 
    margin: 0;
    padding: 0;
}

.app-container {
    display: flex;
    flex-direction: column; 
    min-height: 100vh; 
}

.main {
    flex: 1; 
}
</style>
