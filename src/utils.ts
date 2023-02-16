import z from "zod"

export const zeroPad = (num: number) => String(num).padStart(2, "0")

export const timerConfigSchema = z.object({
  pomodoro: z.number().min(1000, "Minimum one second").max(3600000),
  shortBreak: z.number().min(1000).max(3600000),
  longBreak: z.number().min(1000).max(3600000),
})

export type TimerConfig = z.infer<typeof timerConfigSchema>