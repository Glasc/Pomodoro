<template>
  <div class="flex justify-center px-3">
    <ul class="menu menu-vertical sm:menu-horizontal rounded-box w-full">
      <li class="flex-1 cursor-pointer text-accent">
        <button class="block w-full px-6 py-4 disabled:bg-base-100 font-medium " :class="{
          'bg-base-300 disabled:text-gray-400': props.currentMode !== 'pomodoro',
          'text-accent-content bg-accent disabled:text-accent/60':
            props.currentMode === 'pomodoro',
        }" @click="emit('changeMode', 'pomodoro')" :disabled="props.isRunning">
          Pomodoro
        </button>
      </li>
      <li class="flex-1 cursor-pointer text-primary rounded-xl">
        <button class="block w-full px-6 py-4 disabled:bg-base-100 font-medium " :class="{
          'bg-base-300 disabled:text-gray-400': props.currentMode !== 'shortBreak',
          'text-primary-content bg-primary disabled:text-primary/60':
            props.currentMode === 'shortBreak',
        }" @click="emit('changeMode', 'shortBreak')" :disabled="props.isRunning">
          Descanso
        </button>
      </li>
      <li class="flex-1 cursor-pointer text-secondary">
        <button class="block w-full bg-base-300 px-6 py-4 disabled:bg-base-100 font-medium " :class="{
          'bg-base-300 disabled:text-gray-400': props.currentMode !== 'longBreak',
          'bg-secondary text-secondary-content disabled:text-secondary/60':
            props.currentMode === 'longBreak',
        }" @click="emit('changeMode', 'longBreak')" :disabled="props.isRunning">
          Descanso largo
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { TimerConfig } from '@/utils';
import { defineProps, defineEmits } from 'vue'

interface Props {
  currentMode: keyof TimerConfig
  isRunning: boolean
}

const props = defineProps<Props>()

const emit = defineEmits(['changeMode'])
</script>