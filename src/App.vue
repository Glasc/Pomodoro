<script setup lang="ts">
import { ref, watchEffect, nextTick, onUnmounted } from "vue"
import type { Ref } from "vue"
import type { TimerConfig } from "./utils"
import bellSound from "./assets/bell.mp3"
import navigationBar from "./components/navbar/navigation-bar.vue"
import configModal from "./components/config-modal.vue"
import TimerControl from "./components/timer-control.vue"
import TimerDisplay from "./components/timer-display.vue"
import ModeSelector from "./components/mode-selector.vue"
import CollapsibleElements from "./components/collapsible-elements.vue"
const timerConfigInMilliseconds = ref({
  pomodoro: 1500000,
  shortBreak: 300000,
  longBreak: 900000,
})

const currentMode: Ref<keyof TimerConfig> = ref("pomodoro")
const currentTimer = ref(timerConfigInMilliseconds.value[currentMode.value])
const isRunning = ref(false)

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

const theme = localStorage?.getItem("theme")
if (!theme) {
  localStorage.setItem("theme", "rosepine")
}
</script>

<template>
  <config-modal @submit="updateTimerConfig" :current-config="timerConfigInMilliseconds" :current-mode="currentMode" />
  <div class="relative flex min-h-screen" :class="{ 'bg-base-200': isRunning }">
    <div class="w-full space-y-10 pb-10">
      <navigation-bar :is-running="isRunning" />
      <mode-selector :current-mode="currentMode" @change-mode="changeMode" :is-running="isRunning" />
      <timer-display :current-mode="currentMode" :current-timer="currentTimer"
        :timerConfigInMilliseconds="timerConfigInMilliseconds" />
      <timer-control @start="isRunning = true" @stop="isRunning = false" :is-running="isRunning"
        :current-mode="currentMode" />
      <collapsible-elements />
    </div>
  </div>
</template>
