<template>
  <div v-if="user" class="flex gap-4 items-center">
    <img :src="user.image" alt="User Image" class="rounded-full p-1.5 h-12 w-12 bg-white shadow" />
    <div class="flex flex-col">
      <h1 class="text-xl text-theme-dark capitalize">Hi, {{ user.username }}</h1>
      <span class="text-sm font-semibold text-black/30 capitalize">{{ user.role }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

export default defineComponent({
  name: 'NavProfileComponent',
  setup() {
    const authStore = useAuthStore()
    const { user } = authStore

    return {
      user,
    }
  },
})
</script>
