<script setup lang="ts">
import NavbarProfile from '../profile/NavbarProfile.vue'
</script>

<template>
  <nav
    class="flex gap-6 items-center justify-end absolute top-0 left-0 z-50 bg-transparent px-10 h-24 w-full"
    :class="navClass"
  >
    <NavbarProfile />
  </nav>
</template>

<script lang="ts">
import clsx from 'clsx'

export default {
  name: 'NavbarComponent',
  computed: {
    navClass() {
      return clsx({
        hidden: this.$route.path === '/login',
      })
    },
  },
}
</script>

<style scoped></style>
