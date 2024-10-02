<template>
  <nav class="navbar navbar-expand-lg bg-dark  navbar-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <img src="https://cdn-icons-png.flaticon.com/512/188/188987.png" alt="Logo" width="30" height="34" class="d-inline-block">
        Pokédex
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/favorites">Favoritos</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>
