<!-- using vue 3 -->
<script setup lang="ts">
import ConfigModal from "./components/ConfigModal.vue"
import { ref, watchEffect, nextTick, onUnmounted, computed } from "vue"
import type { Ref } from "vue"
import { getMinutes, getSeconds } from "date-fns"
import { zeroPad } from "./utils"
import type { TimerConfig } from "./utils"

const timerConfigInMilliseconds = ref({
  pomodoro: 1500000,
  shortBreak: 300000,
  longBreak: 900000,
})

const currentMode: Ref<keyof TimerConfig> = ref("pomodoro")
const currentTimer = ref(timerConfigInMilliseconds.value[currentMode.value])
const isRunning = ref(false)

const currentTimerMinutes = computed(() => getMinutes(currentTimer.value))
const currentTimerSeconds = computed(() => getSeconds(currentTimer.value))

// if the timer was isPaused, then when the mode changes, the timer should be reset to the new mode's timer.
watchEffect(() => {
  if (isRunning.value) return
  currentTimer.value = timerConfigInMilliseconds.value[currentMode.value]
})

const updateTimerConfig = (config: TimerConfig) => {
  timerConfigInMilliseconds.value = config
}

const changeMode = (newMode: keyof TimerConfig) => {
  currentMode.value = newMode
  nextTick(() => {
    currentTimer.value = timerConfigInMilliseconds.value[currentMode.value]
  })
}

const timer = setInterval(() => {
  if (!isRunning.value) return
  if (currentTimer.value === 0) {
    isRunning.value = false
    return
  }

  currentTimer.value -= 1000
}, 1000)

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div
    class="relative flex min-h-screen items-center justify-center"
    :class="{ 'bg-base-300': isRunning }"
  >
    <div class="w-full max-w-xl mb-8">
      <div class="relative flex justify-end mb-8">
        <button class="disabled:bg-base-100" :disabled="isRunning">
          <label
            v-if="isRunning"
            class="btn-sm btn btn-outline btn-info hover:none w-full"
            htmlFor="my-modal-4"
            :disabled="false"
            >Settings</label
          >
          <label
            v-else
            class="btn-sm btn btn-outline btn-info hover:none w-full"
            htmlFor="my-modal-4"
            >Settings</label
          >
        </button>
      </div>

      <ConfigModal
        @submit="updateTimerConfig"
        :current-config="timerConfigInMilliseconds"
      />

      <ul class="mt-4 flex items-center">
        <li class="flex-1 cursor-pointer text-accent">
          <button
            class="block w-full px-6 py-4 disabled:bg-base-100 font-medium disabled:text-gray-400"
            :class="{
              'bg-base-300': currentMode !== 'pomodoro',
              'text-accent-content bg-accent disabled:text-accent/60':
                currentMode === 'pomodoro',
            }"
            @click="changeMode('pomodoro')"
            :disabled="isRunning"
          >
            Pomodoro
          </button>
        </li>
        <li class="flex-1 cursor-pointer text-primary">
          <button
            class="block w-full bg-base-300 px-6 py-4 disabled:bg-base-100 font-medium disabled:text-gray-400"
            :class="{
              'bg-base-300': currentMode !== 'shortBreak',
              'bg-primary text-primary-content disabled:text-primary/60':
                currentMode === 'shortBreak',
            }"
            @click="changeMode('shortBreak')"
            :disabled="isRunning"
          >
            Descanso
          </button>
        </li>
        <li class="flex-1 cursor-pointer text-secondary">
          <button
            class="block w-full bg-base-300 px-6 py-4 disabled:bg-base-100 font-medium disabled:text-gray-400"
            :class="{
              'bg-base-300': currentMode !== 'longBreak',
              'bg-secondary text-secondary-content disabled:text-secondary/60':
                currentMode === 'longBreak',
            }"
            @click="changeMode('longBreak')"
            :disabled="isRunning"
          >
            Descanso largo
          </button>
        </li>
      </ul>

      <div
        class="mx-auto mt-12 flex h-72 w-72 items-center justify-center border-8 border-primary/70 rounded-full"
      >
        <div class="pointer-events-none">
          <span class="block p-8 text-center text-6xl font-medium">
            {{ zeroPad(currentTimerMinutes) }}:{{
              zeroPad(currentTimerSeconds)
            }}
          </span>
        </div>
      </div>

      <button
        v-if="!isRunning"
        class="btn btn-primary btn-lg mt-12 block mx-auto"
        @click="isRunning = true"
      >
        Start
      </button>
      <button
        v-else
        class="btn btn-error btn-lg mt-12 block mx-auto"
        @click="isRunning = false"
      >
        Stop
      </button>
    </div>
  </div>
</template>
