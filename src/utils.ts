import z from "zod"

export const zeroPad = (num: number) => String(num).padStart(2, "0")

export const timerConfigSchema = z.object({
  pomodoro: z
    .number({
      invalid_type_error: "A number must be provided.",
      required_error: "A number is required",
    })
    .min(0.1, "Minimum one minute")
    .max(60, "Maximum 60 minutes"),
  shortBreak: z
    .number({ invalid_type_error: "A number must be provided." })
    .min(1, "Minimum one minute")
    .max(60, "Maximum 60 minutes"),
  longBreak: z
    .number({ invalid_type_error: "A number must be provided." })
    .min(1, "Minimum one minute")
    .max(60, "Maximum 60 minutes"),
})

export type TimerConfig = z.infer<typeof timerConfigSchema>
