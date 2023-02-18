<script setup lang="ts">
import ConfigModal from "./components/ConfigModal.vue"
import SettingsButton from "./components/SettingsButton.vue"
import { ref, watchEffect, nextTick, onUnmounted, computed } from "vue"
import type { Ref } from "vue"
import { getMinutes, getSeconds } from "date-fns"
import { zeroPad } from "./utils"
import type { TimerConfig } from "./utils"
import bellSound from "./assets/bell.mp3"

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
    const audio = new Audio(bellSound)
    audio.volume = 0.3
    audio.play()
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
  <ConfigModal
    @submit="updateTimerConfig"
    :current-config="timerConfigInMilliseconds"
    :current-mode="currentMode"
  />

  <div
    class="relative flex min-h-screen items-center justify-center"
    :class="{ 'bg-base-300': isRunning }"
  >
    <div class="w-full max-w-xl px-4 mb-8 space-y-14">
      <div class="relative flex justify-end mb-8">
        <SettingsButton :is-running="isRunning" />
      </div>

      <ul class="menu menu-vertical sm:menu-horizontal rounded-box sm:w-full">
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
        <li class="flex-1 cursor-pointer text-primary rounded-xl">
          <button
            class="block w-full px-6 py-4 disabled:bg-base-100 font-medium disabled:text-gray-400"
            :class="{
              'bg-base-300': currentMode !== 'shortBreak',
              'text-primary-content bg-primary disabled:text-primary/60':
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

      <div class="flex justify-center">
        <div
          class="radial-progress bg-base-200"
          :class="{
            'text-accent': currentMode === 'pomodoro',
            'text-primary': currentMode === 'shortBreak',
            'text-secondary': currentMode === 'longBreak',
          }"
          style="--size: 17rem; --thickness: 0.35rem"
          :style="{
            '--value':
              (currentTimer / timerConfigInMilliseconds[currentMode]) * 100,
          }"
        >
          <span class="block p-8 text-center text-6xl font-medium">
            {{ zeroPad(currentTimerMinutes) }}:{{
              zeroPad(currentTimerSeconds)
            }}
          </span>
        </div>
      </div>

      <button
        v-if="!isRunning"
        class="btn btn-lg block mx-auto"
        :class="{
          'btn-accent': currentMode === 'pomodoro',
          'btn-primary': currentMode === 'shortBreak',
          'btn-secondary': currentMode === 'longBreak',
        }"
        @click="isRunning = true"
      >
        Start
      </button>
      <button
        v-else
        class="btn btn-error btn-lg block mx-auto"
        @click="isRunning = false"
      >
        Stop
      </button>
    </div>
  </div>
</template>
