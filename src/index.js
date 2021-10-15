import { initProjects } from './app'
import { loadProjects, initLocalStorageEventListeners } from './dom'

const runApp = (() => {
  initLocalStorageEventListeners()
  initProjects()
  loadProjects()
})()
