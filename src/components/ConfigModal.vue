<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import { minutesToMilliseconds } from "date-fns"
import {
  ref,
  watchEffect,
  reactive,
  nextTick,
  onUnmounted,
  computed,
} from "vue"
import { getMinutes, getSeconds } from "date-fns"
import z from "zod"

const timerSchema = z.object({
  pomodoro: z.object({
    milliseconds: z.number().min(1000).max(3600000),
  }),
  shortBreak: z.object({
    milliseconds: z.number().min(1000).max(3600000),
  }),
  longBreak: z.object({
    milliseconds: z.number().min(1000).max(3600000),
  }),
})

type Timer = z.infer<typeof timerSchema>

interface Props {
  updateTimerConfig: (config: Timer) => void
  currentConfig: Timer
}
const props = defineProps<Props>()

const pomodoroInMinutes = ref(
  getMinutes(props.currentConfig.pomodoro.milliseconds)
)
const shortBreakInMinutes = ref(
  getMinutes(props.currentConfig.shortBreak.milliseconds)
)
const longBreakInMinutes = ref(
  getMinutes(props.currentConfig.longBreak.milliseconds)
)

const handleSubmit = () => {
  const newTimer = {
    pomodoro: {
      milliseconds: minutesToMilliseconds(pomodoroInMinutes.value),
    },
    shortBreak: {
      milliseconds: minutesToMilliseconds(shortBreakInMinutes.value),
    },
    longBreak: {
      milliseconds: minutesToMilliseconds(longBreakInMinutes.value),
    },
  }

  const data = timerSchema.safeParse(newTimer)

  if (!data.success) {
    console.log(data.error)
    return
  }
  props.updateTimerConfig(newTimer)
}
</script>

<template>
  <input type="checkbox" id="my-modal-4" class="modal-toggle" />
  <label htmlFor="my-modal-4" class="modal cursor-pointer">
    <label class="modal-box relative w-auto" htmlFor="">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <label class="block" htmlFor="pomodoro"> Pomodoro </label>
          <input
            id="pomodoro"
            class="input-bordered input w-full max-w-xs bg-base-200"
            v-model.number="pomodoroInMinutes"
          />
        </div>
        <div class="space-y-2">
          <label class="block" htmlFor="shortBreak"> Short break </label>
          <input
            id="shortBreak"
            class="input-bordered input w-full max-w-xs bg-base-200"
            v-model.number="shortBreakInMinutes"
          />
        </div>
        <div class="space-y-2">
          <label class="block" htmlFor="longBreak"> Long break </label>
          <input
            id="longBreak"
            class="input-bordered input w-full max-w-xs bg-base-200"
            v-model.number="longBreakInMinutes"
          />
        </div>
        <button type="submit" class="modal-action w-full">
          <label htmlFor="my-modal-4" class="btn-secondary btn mt-4 w-full">
            Submit
          </label>
        </button>
      </form>
    </label>
  </label>
</template>
