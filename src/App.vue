<!-- using vue 3 -->
<script setup lang="ts">
import ConfigModal from "./components/ConfigModal.vue"
import { ref, watchEffect, nextTick, onUnmounted, computed } from "vue"
import type { Ref } from "vue"
import { getMinutes, getSeconds } from "date-fns"

const zeroPad = (num: number) => String(num).padStart(2, "0")

const timerConfig = ref({
  pomodoro: {
    milliseconds: 1500000,
  },
  shortBreak: {
    milliseconds: 300000,
  },
  longBreak: {
    milliseconds: 900000,
  },
})

type TimerConfig = typeof timerConfig.value

const updateTimerConfig = (config: TimerConfig) => {
  timerConfig.value = config
}

const currentMode: Ref<keyof TimerConfig> = ref("pomodoro")

const currentTimer = ref(timerConfig.value[currentMode.value].milliseconds)
const currentTimerMinutes = computed(() => getMinutes(currentTimer.value))
const currentTimerSeconds = computed(() => getSeconds(currentTimer.value))

const changeMode = (newMode: keyof TimerConfig) => {
  currentMode.value = newMode
  nextTick(() => {
    currentTimer.value = timerConfig.value[currentMode.value].milliseconds
  })
}

const isRunning = ref(true)
// if the timer was isPaused, then when the mode changes, the timer should be reset to the new mode's timer.
watchEffect(() => {
  if (!isRunning.value) return
  currentTimer.value = timerConfig.value[currentMode.value].milliseconds
})

const timer = setInterval(() => {
  if (isRunning.value) return
  if (currentTimer.value === 0) {
    isRunning.value = true
    return
  }

  currentTimer.value -= 1000
}, 1000)

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="relative flex min-h-screen items-center justify-center">
    <div class="w-full max-w-xl">
      <div class="relative flex justify-end">
        <label htmlFor="my-modal-4" class="btn-info btn-sm btn">
          Settings
        </label>
      </div>

      <ConfigModal
        :currentConfig="timerConfig"
        :update-timer-config="updateTimerConfig"
      />

      <ul class="mt-4 flex items-center">
        <li class="flex-1 cursor-pointer">
          <button
            class="block w-full bg-base-300 px-6 py-4"
            @click="changeMode('pomodoro')"
          >
            Pomodoro
          </button>
        </li>
        <li class="flex-1 cursor-pointer text-primary">
          <button
            class="block w-full bg-base-300 px-6 py-4"
            @click="changeMode('shortBreak')"
          >
            Descanso
          </button>
        </li>
        <li class="flex-1 cursor-pointer text-secondary">
          <button
            class="block w-full bg-base-300 px-6 py-4"
            @click="changeMode('longBreak')"
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
        v-if="isRunning === true"
        class="btn btn-primary btn-lg mt-8 block mx-auto"
        @click="isRunning = false"
      >
        Iniciar
      </button>
      <button
        v-else
        class="btn btn-error btn-lg mt-8 block mx-auto"
        @click="isRunning = true"
      >
        Stop
      </button>
    </div>
  </div>
</template>
