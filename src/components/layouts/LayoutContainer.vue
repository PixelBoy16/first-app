<script setup lang="ts">
import NavbarComponent from '@/components/layouts/Navbar.vue'
import SidebarComponent from '@/components/layouts/Sidebar.vue'

import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const openSidebar = ref(false)

const toggleSidebar = () => {
  openSidebar.value = !openSidebar.value
}

const isLoginPage = computed(() => {
  const pathname = route.path
  return pathname === '/login'
})
</script>

<template>
  <main id="app" class="font-prompt">
    <template v-if="isLoginPage">
      <slot></slot>
    </template>
    <template v-else>
      <NavbarComponent />
      <SidebarComponent />
      <section
        class="ml-64 max-w-[calc(100%_-_256px)] relative bg-transparent min-h-screen w-full pt-24 pr-10 pl-6 pb-4 transition-all duration-500 ease-out"
      >
        <div class="rounded-xl w-full">
          <slot></slot>
        </div>
      </section>
    </template>
  </main>
</template>

<script lang="ts">
export default {
  name: 'LayoutContainer',
}
</script>

<style lang="scss" scoped>
#app {
  @apply min-h-screen bg-[#f8f9fa];
}
</style>
