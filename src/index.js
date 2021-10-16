import { initProjects } from './data'
import { loadProjects, initLocalStorageEventListeners } from './dom'

const runApp = (() => {
  initLocalStorageEventListeners()
  initProjects()
  loadProjects()
})()
