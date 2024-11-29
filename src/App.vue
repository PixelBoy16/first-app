<script setup lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

import LayoutContainer from '@/components/layouts/LayoutContainer.vue'
import { useAuthStore } from '@/stores/auth.store'
</script>

<template>
  <LayoutContainer>
    <RouterView />
  </LayoutContainer>
</template>

<script lang="ts">
export default defineComponent({
  name: 'App',
  async mounted() {
    const authStore = useAuthStore()
    const response = await authStore.refreshToken()

    if (!response) {
      this.$router.push('/login')
    }
  },
})
</script>

<style scoped></style>
