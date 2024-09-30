<script setup>
import AppCard from '../components/pokemon/AppCard.vue'
import AppListPokemons from '../components/pokemon/AppListPokemons.vue'
</script>

<template>
  <section class="container pt-4">
    <div class="row g-4">
      <section class="col-md-12 col-lg-6">
        <AppCard />
      </section>
      <section class="col-md-12 col-lg-6 tableCards">
        <AppListPokemons />
      </section>
    </div>
  </section>
</template>

<style scoped>
.tableCards {
  max-height: 820px;
  overflow-y: scroll;
  overflow-x: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  padding: 20px 10px;
  text-align: center;
  border-radius: 10px;
  background-color: #f3f4f6;
}

.tableCards:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
.tableCards::-webkit-scrollbar {
  width: 8px;
}

.tableCards::-webkit-scrollbar-track {
  background: #e2e8f0;
}

.tableCards::-webkit-scrollbar-thumb:hover {
  background-color: #718096;
}
</style>
