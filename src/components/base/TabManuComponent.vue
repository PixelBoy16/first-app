<template>
  <div class="tabs">
    <div
      v-for="tab in tabs"
      :key="tab.tab_id"
      :class="['tab', { active: tab.tab_id === activeTab, disabled: tab.isDisabled }]"
      @click="selectTab(tab.tab_id)"
    >
      {{ tab.label }}
    </div>
  </div>
  <div class="tab-content">
    <slot :name="`tab-${activeTab}`"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Tab {
  tab_id: number
  label: string
  isDisabled?: boolean
}

export default defineComponent({
  name: 'TabComponent',
  props: {
    tabs: {
      type: Array as () => Tab[],
      required: true,
    },
    defaultActiveTab: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      activeTab: this.defaultActiveTab,
    }
  },
  methods: {
    selectTab(tabId: number) {
      const selectedTab = this.tabs.find((tab) => tab.tab_id === tabId)
      if (selectedTab && !selectedTab.isDisabled) {
        this.activeTab = tabId
      }
    },
  },
})
</script>

<style scoped lang="scss">
.tabs {
  @apply flex gap-2;
}
.tab {
  @apply cursor-pointer rounded-3xl px-3 py-1.5 text-theme-dark;
}
.tab.active {
  @apply font-bold shadow bg-theme text-white;
}
.tab.disabled {
  @apply text-black/40 cursor-not-allowed;
}
.tab-content {
  @apply w-max min-w-[50%] mt-5 bg-white p-6 rounded-2xl shadow max-xl:min-w-full;
}
</style>
