import { defineClientConfig } from 'vuepress/client'
import Timeline from './components/Timeline.vue'
import './styles/index.scss'

export default defineClientConfig({
  enhance({ app }) {
    app.component('Timeline', Timeline)
  },
})
