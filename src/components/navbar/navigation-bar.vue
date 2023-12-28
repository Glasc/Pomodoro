<script setup lang="ts">
import themeSwitcher from "./theme-switcher.vue"
import CustomizeTimer from "./customize-timer.vue"
defineProps<{
  isRunning: boolean
}>()
</script>

<template>
  <div class="bg-base-300 border-b-2 border-base-100">
    <div class="navbar mx-auto max-w-4xl px-4 py-5">
      <div class="flex-1">
        <img src="/tomato.png" alt="" width="40" height="40" />
        <a class="text-2xl font-bold mt-1">Pomodoro</a>
      </div>
      <div class="flex-none space-x-3 sm:space-x-6">
        <customize-timer :isRunning="isRunning" />
        <theme-switcher />
      </div>
    </div>
  </div>
</template>
