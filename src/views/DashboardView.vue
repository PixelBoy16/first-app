<script setup lang="ts">
import Chart from '@/components/base/Chart.vue'
</script>

<template>
  <div class="dashboard-content">
    <section class="summary">
      <div class="summary-item bg-gradient-to-b from-cyan-500 to-blue-500">
        <h3>Product Sold</h3>
        <p>1,234</p>
        <h4>Jan - March 2024</h4>
      </div>
      <div class="summary-item bg-gradient-to-b from-purple-500 to-pink-500">
        <h3>Net Pofit</h3>
        <p>$12,345</p>
        <h4>Jan - March 2024</h4>
      </div>
      <div class="summary-item bg-gradient-to-b from-yellow-500 to-orange-500">
        <h3>New Customers</h3>
        <p>567</p>
        <h4>Jan - March 2024</h4>
      </div>
    </section>

    <section class="charts">
      <Chart />
    </section>
  </div>
</template>

<style scoped lang="scss">
.dashboard-content {
  @apply flex flex-col gap-5 p-5;
}

.summary {
  @apply grid grid-cols-3 gap-6;
}

.summary-item {
  @apply flex flex-col gap-1.5 text-white rounded-2xl px-8 py-6 shadow;

  h3 {
    @apply text-xs uppercase font-semibold;
  }

  h4 {
    @apply text-xs;
  }

  p {
    @apply text-2xl;
  }
}

.charts {
  @apply w-full;
}
</style>
