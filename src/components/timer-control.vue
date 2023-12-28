<template>
  <button v-if="!isRunning" class="btn btn-lg block mx-auto" :class="buttonClass" @click="start">
    Start
  </button>
  <button v-else class="btn btn-error btn-lg block mx-auto mt-8" @click="stop">
    Stop
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  isRunning: {
    type: Boolean,
    required: true,
  },
  currentMode: {
    type: String,
    required: true,
  },
})

const buttonClass = computed(() => ({
  'btn-accent': props.currentMode === 'pomodoro',
  'btn-primary': props.currentMode === 'shortBreak',
  'btn-secondary': props.currentMode === 'longBreak',
}))

const emit = defineEmits(['start', 'stop'])

const start = () => emit('start')
const stop = () => emit('stop')
</script>