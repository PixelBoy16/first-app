<script setup lang="ts">
import ProfileTitleItem from './ProfileTitleItem.vue'
import IconPin from '../icons/IconPin.vue'
import IconCheck from '../icons/IconCheck.vue'
import IconMessage from '../icons/IconMessage.vue'
import TabComponent from '@/components/base/TabManuComponent.vue'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()
const { user } = authStore

const MENU_TAB = [
  { tab_id: 1, label: 'About', isDisabled: false },
  { tab_id: 2, label: 'More', isDisabled: false },
]
</script>

<template>
  <div class="flex w-full gap-20" v-if="user">
    <div class="w-max flex flex-col gap-6">
      <img
        :src="user.image"
        alt="User Image"
        class="bg-white w-80 h-auto bg-cover rounded-xl shadow"
      />

      <ProfileTitleItem title="Work" />

      <div class="">
        <div class="flex items-center gap-4">
          <h2 class="text-lg text-theme-dark w-max">
            {{ user.company.title }}
          </h2>
          <span class="text-xs text-theme bg-theme/10 rounded px-2 py-1">primary</span>
        </div>
        <p class="mt-2 text-sm text-black/30">
          {{ user.company.address.address }}
        </p>
        <p class="mt-0 text-sm text-black/30">
          {{ user.company.address.city }}
          <span class="mt-0 text-xs text-black/30">
            {{ user.company.address.coordinates.lat }} ,
            {{ user.company.address.coordinates.lng }}
          </span>
        </p>
      </div>

      <div class="">
        <div class="flex items-center gap-4">
          <h2 class="text-lg text-theme-dark w-max">
            {{ user.company.department }}
          </h2>
          <span class="text-xs text-theme bg-theme/10 rounded px-2 py-1">secondary</span>
        </div>
        <p class="mt-2 text-sm text-black/30">
          {{ user.company.address.address }}
        </p>
        <p class="mt-0 text-sm text-black/30">
          {{ user.company.address.city }}
          <span class="mt-0 text-xs text-black/30">
            {{ user.company.address.coordinates.lat }} ,
            {{ user.company.address.coordinates.lng }}
          </span>
        </p>
      </div>

      <ProfileTitleItem title="crypto" />

      <div class="">
        <div class="flex items-center gap-4">
          <h2 class="text-lg text-theme-dark w-max">
            {{ user.crypto.coin }}
          </h2>
        </div>
        <p class="mt-2 text-sm text-black/30">
          {{ user.crypto.network }}
        </p>
        <p class="mt-0 text-sm text-black/30 flex items-center">
          wallet:
          <span class="mt-0 text-xs text-black/30 truncate max-w-48">
            {{ user.crypto.wallet }}
          </span>
        </p>
      </div>
    </div>

    <div class="w-full flex flex-col gap-6">
      <div class="flex gap-6 items-start">
        <div>
          <h1 class="text-2xl text-theme-dark w-max">{{ user.firstName }} {{ user.lastName }}</h1>
          <p class="text-theme uppercase">{{ user.role }}</p>
        </div>
        <div class="flex gap-1 items-center mt-1.5">
          <IconPin class="w-4 text-red-500" />
          <p class="text-sm text-black/60">{{ user.address.city }}</p>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex gap-1 items-center">
          <IconMessage class="w-8 text-theme-dark" />
          <h1 class="text-2xl text-theme-dark w-max">Send message</h1>
        </div>
        <button
          type="button"
          class="px-4 py-2 transition-all bg-theme/10 text-theme flex items-center gap-2"
        >
          <IconCheck class="text-theme w-5" />
          Contacts
        </button>
        <button type="button" class="text-black/40 px-0 py-4 transition-all hover:text-theme">
          Report user
        </button>
      </div>

      <div>
        <TabComponent :tabs="MENU_TAB">
          <template v-slot:tab-1>
            <div class="flex flex-col gap-4 text-sm">
              <ProfileTitleItem title="Contacts" />

              <ul>
                <li>
                  <p class="topic">Phone:</p>
                  <p class="result">{{ user.phone }}</p>
                </li>
                <li>
                  <p class="topic">Address:</p>
                  <p class="text-black/70">
                    {{ user.address.address }}
                    <span class="block"
                      >{{ user.address.city }}, {{ user.address.coordinates.lat }}
                      {{ user.address.coordinates.lng }}</span
                    >
                  </p>
                </li>
                <li>
                  <p class="topic">Email:</p>
                  <p class="result">{{ user.email }}</p>
                </li>
              </ul>

              <ProfileTitleItem title="Information" />

              <ul>
                <li>
                  <p class="topic">Birthdate:</p>
                  <p class="">{{ user.birthDate }}</p>
                </li>
                <li>
                  <p class="topic">Gender:</p>
                  <p class="">
                    {{ user.gender }}
                  </p>
                </li>
              </ul>
            </div>
          </template>
          <template v-slot:tab-2>
            <div class="flex flex-col gap-4 text-sm">
              <ProfileTitleItem title="Bank" />

              <ul>
                <li>
                  <p class="topic">Card Number:</p>
                  <p class="result">{{ user.bank.cardNumber }}</p>
                </li>
                <li>
                  <p class="topic">Currency:</p>
                  <p class="result">{{ user.bank.currency }} {{ user.bank.cardExpire }}</p>
                </li>
                <li>
                  <p class="topic">Type:</p>
                  <p class="result">
                    {{ user.bank.cardType }}
                  </p>
                </li>
              </ul>

              <ProfileTitleItem title="system" />

              <ul>
                <li>
                  <p class="topic">Ip:</p>
                  <p class="">
                    {{ user.ip }}
                  </p>
                </li>
                <li>
                  <p class="topic">Mac Address:</p>
                  <p class="">{{ user.macAddress }}</p>
                </li>
                <li>
                  <p class="topic">User Agent:</p>
                  <p class="max-w-64 truncate">
                    {{ user.userAgent }}
                  </p>
                </li>
              </ul>
            </div>
          </template>
        </TabComponent>
      </div>
    </div>
  </div>
</template>

<!-- <script lang="ts">
import TabComponent from '@/components/base/TabManuComponent.vue'

const MENU_TAB = [
  { tab_id: 1, label: 'About', isDisabled: false },
  { tab_id: 2, label: 'More', isDisabled: false },
]

export default {
  components: {
    TabComponent,
  },
  data() {
    return {
      MENU_TAB,
    }
  },
}
</script> -->

<style scoped lang="scss">
ul {
  @apply text-theme-dark;
  li {
    @apply flex my-2;
  }

  p.topic {
    @apply w-32;
  }

  p.result {
    @apply text-theme;
  }
}
</style>
