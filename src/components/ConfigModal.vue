<script setup lang="ts">
import { minutesToMilliseconds } from "date-fns"
import { ref, nextTick, watchEffect } from "vue"
import { getMinutes } from "date-fns"
import { timerConfigSchema } from "../utils"
import type { TimerConfig } from "../utils"

interface Props {
  currentConfig: TimerConfig
}
const props = defineProps<Props>()

const emit = defineEmits(["submit"])

const pomodoroInMinutes = ref(getMinutes(props.currentConfig.pomodoro))
const shortBreakInMinutes = ref(getMinutes(props.currentConfig.shortBreak))
const longBreakInMinutes = ref(getMinutes(props.currentConfig.longBreak))

const checkInputs = () => {
  try {
    timerConfigSchema.parse({
      pomodoro: minutesToMilliseconds(pomodoroInMinutes.value),
      shortBreak: minutesToMilliseconds(shortBreakInMinutes.value),
      longBreak: minutesToMilliseconds(longBreakInMinutes.value),
    })
    return false
  } catch (err) {
    return true
  }
}

const formIsValid = ref(true)

const handleSubmit = () => {
  formIsValid.value = true

  const newTimer = {
    pomodoro: minutesToMilliseconds(pomodoroInMinutes.value),
    shortBreak: minutesToMilliseconds(shortBreakInMinutes.value),
    longBreak: minutesToMilliseconds(longBreakInMinutes.value),
  }

  const data = timerConfigSchema.safeParse(newTimer)

  if (!data.success) {
    formIsValid.value = false
    return
  } 

  emit("submit", data.data)
}
</script>

<template>
  <input type="checkbox" id="my-modal-4" class="modal-toggle" />
  <label htmlFor="my-modal-4" class="modal cursor-pointer">
    <label class="modal-box relative w-auto" htmlFor="">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <label class="block" htmlFor="pomodoro">Pomodoro</label>
          <input
            id="pomodoro"
            class="input-bordered input w-full max-w-xs bg-base-200"
            min="1"
            max="60"
            v-model.number="pomodoroInMinutes"
          />
        </div>
        <div class="space-y-2">
          <label class="block" htmlFor="shortBreak">Short break</label>
          <input
            id="shortBreak"
            class="input-bordered input w-full max-w-xs bg-base-200"
            v-model.number="shortBreakInMinutes"
            min="1"
            max="60"
          />
        </div>
        <div class="space-y-2">
          <label class="block" htmlFor="longBreak">Long break</label>
          <input
            id="longBreak"
            class="input-bordered input w-full max-w-xs bg-base-200"
            v-model.number="longBreakInMinutes"
            min="1"
            max="60"
          />
        </div>
        <button
          type="submit"
          class="w-full modal-action btn-secondary btn mt-4"
          v-bind:disabled="checkInputs()"
        >
          <label htmlFor="my-modal-4" class="w-full">Submit</label>
        </button>
      </form>
    </label>
  </label>
</template>
