import { defineClientConfig } from 'vuepress/client'
import CourseBootcampBanner from './components/CourseBootcampBanner.vue'
import LogoWall from './components/LogoWall.vue'
import Timeline from './components/Timeline.vue'
import RoadmapPlayground from './components/RoadmapPlayground.vue'
import './styles/index.scss'

export default defineClientConfig({
  enhance({ app }) {
    app.component('CourseBootcampBanner', CourseBootcampBanner)
    app.component('LogoWall', LogoWall)
    app.component('Timeline', Timeline)
    app.component('RoadmapPlayground', RoadmapPlayground)
  },
})
