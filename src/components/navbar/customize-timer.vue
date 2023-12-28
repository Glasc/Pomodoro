<script setup lang="ts">
defineProps<{
  isRunning: boolean
}>()

const handleCustomizeClick = async () => {
  const inputRef = document.getElementById("pomodoro")
  await new Promise((resolve) => setTimeout(resolve, 200))
  inputRef?.focus()
}
</script>
<template>
  <div class="flex-none space-x-2 sm:space-x-4">
    <button class="" :disabled="isRunning">
      <label v-if="isRunning" class="btn btn-disabled hover:none w-full" htmlFor="my-modal-4"
        :disabled="false">Customize</label>
      <label v-else @click="handleCustomizeClick" class="btn btn-outline hover:none w-full"
        htmlFor="my-modal-4">Customize</label>
    </button>
  </div>
</template>