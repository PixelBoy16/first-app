<script setup lang="ts">
import FormSignIn from '../components/forms/FormSignIn.vue'
</script>

<template>
  <div class="ui--login-screen">
    <FormSignIn />
  </div>
</template>

<style scoped lang="scss">
.ui--login-screen {
  @apply flex justify-center items-center min-h-screen bg-white bg-no-repeat bg-cover bg-center;
  background-image: url('/static/images/bg-screen.jpg');
}
</style>
