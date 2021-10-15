import { projects } from './app'

const storeData = () => {
  localStorage.setItem('projects', JSON.stringify(projects))
}

const retrieveData = () => {
  return JSON.parse(localStorage.getItem('projects'))
}

const clearData = () => {
  localStorage.clear()
}

export { storeData, retrieveData, clearData }
