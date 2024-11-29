<script setup lang="ts">
import { AuthService } from '@/services'
import clsx from 'clsx'
import { useRoute, useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'

import IconBoard from '../icons/IconBoard.vue'
import IconUser from '../icons/IconUser.vue'
import IconLogout from '../icons/IconLogout.vue'

const route = useRoute()

const active = (path: string) => {
  const isActive = route.path === path

  return {
    text: clsx(
      'w-full transition-all px-2 py-1.5 ease-in rounded-md flex gap-2 items-center',
      isActive ? 'bg-theme text-white ' : 'text-black',
    ),
    icon: clsx('', isActive ? 'text-white ' : 'text-black'),
  }
}

const handleSignOut = () => {
  const router = useRouter()

  AuthService.signOut(() => {
    router.push('/login')
  })
}
</script>

<template>
  <aside class="bg-transparent max-w-64 z-50 fixed h-screen w-full px-4 py-4 flex flex-col gap-4">
    <div class="bg-white text-left shadow h-max rounded-2xl px-4 py-4">
      <RouterLink to="/" class="text-2xl font-semibold text-theme">LOGO</RouterLink>
    </div>
    <div class="flex flex-col gap-2 overflow-hidden bg-white shadow h-full rounded-2xl p-4">
      <RouterLink to="/" :class="active('/').text"
        ><IconBoard :class="active('/').icon" /> Dashboard</RouterLink
      >
      <RouterLink to="/profile" :class="active('/profile').text"
        ><IconUser :class="active('/profile').icon" /> Profile</RouterLink
      >
      <hr />
      <button @click="handleSignOut" class="w-full text-left px-2 py-1 flex gap-2 items-center">
        <IconLogout />
        logout
      </button>
    </div>
  </aside>
</template>

<style scoped></style>
