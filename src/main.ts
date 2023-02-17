import { createApp } from "vue"
import { createPinia } from "pinia"
import "./assets/main.css"
import App from "./App.vue"
import { FocusTrap } from "focus-trap-vue"

const app = createApp(App)

app.use(createPinia())
app.component("FocusTrap", FocusTrap)

app.mount("#app")
