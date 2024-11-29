<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="flex w-full gap-1 items-center">
    <span class="uppercase text-black/30 text-xs">{{ title }}</span>
    <div class="w-full h-px bg-black/20"></div>
  </div>
</template>

<style scoped></style>
