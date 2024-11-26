<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <h1><HelloWorld msg="Hello Kamin" /></h1>
    <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
    <RouterLink to="/login">Go to Login</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped></style>
