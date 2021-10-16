import { initialiseExampleProjects } from './data'
import { loadProjects, initLocalStorageEventListeners } from './dom'

const runApp = (() => {
  initLocalStorageEventListeners()
  initialiseExampleProjects()
  loadProjects()
})()
