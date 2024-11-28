<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '@/stores/auth.store';

export default defineComponent({
  name: 'App',
  async mounted() {
    // ตรวจสอบและรีเฟรช session เมื่อแอปโหลดขึ้น
    const authStore = useAuthStore();
    await authStore.refreshToken();

    console.log(authStore);
  }
});
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
