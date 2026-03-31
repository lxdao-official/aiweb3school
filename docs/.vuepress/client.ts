import { defineClientConfig } from 'vuepress/client'
import Timeline from './components/Timeline.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('Timeline', Timeline)
  },
})
