/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projects": () => (/* binding */ projects),
/* harmony export */   "initialiseExampleProjects": () => (/* binding */ initialiseExampleProjects),
/* harmony export */   "addProject": () => (/* binding */ addProject),
/* harmony export */   "addTodo": () => (/* binding */ addTodo)
/* harmony export */ });
class Todo {
  constructor (title, description, dueDate, priority, notes) {
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.notes = notes
    this.complete = false
  }
}

class Project {
  constructor (title, description) {
    this.title = title
    this.description = description
    this.todoList = []
  }

  addTodoObj (todoObj) {
    this.todoList.push(todoObj)
  }
}

const projects = [] // data holder

const addProject = (title, description) => {
  const newProject = new Project(title, description)
  projects.push(newProject)
}

const addTodo = (formFieldsObject) => {
  const newTodo = new Todo(
    formFieldsObject.title,
    formFieldsObject.description,
    formFieldsObject.dueDate,
    formFieldsObject.priority,
    formFieldsObject.notes
  )

  projects[formFieldsObject.project].todoList.push(newTodo)
}

const initialiseExampleProjects = () => {
  const defaultProject = new Project('Default', 'Default List')
  const exampleTodo = new Todo('Todo', 'example', '1/1/1', '1', 'This is an example todo item', defaultProject)

  defaultProject.addTodoObj(exampleTodo)
  projects.push(defaultProject)
}




/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadProjects": () => (/* binding */ loadProjects),
/* harmony export */   "initLocalStorageEventListeners": () => (/* binding */ initLocalStorageEventListeners)
/* harmony export */ });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./src/data.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ "./src/storage.js");



// TODO split DOM module into rendering and listener modules

let eventListenersInitialised = false // To stop multiple event listeners being attached to modal buttons . Refactor?

const loadProjects = () => {
  const domCountAndProjectObject = {
    projectsDiv: document.querySelector('.projects'),
    count: 0,
    projects: _data__WEBPACK_IMPORTED_MODULE_0__.projects
  }

  clearProjectsDOM(domCountAndProjectObject.projectsDiv)
  addEachProjectToDom(domCountAndProjectObject)
  addProjectEventListeners()
  addTodoEventListeners()
}

const clearProjectsDOM = (projectsDiv) => {
  projectsDiv.innerHTML = ''
  projectsDiv.innerHTML += '<h2>Projects</h2><button class="project-btn">+</button>'
}

const addEachProjectToDom = (domCountAndProjectObject) => {
  domCountAndProjectObject.projects.forEach(project => {
    const projectDiv = document.createElement('div')

    projectDiv.setAttribute('data-index', `${domCountAndProjectObject.count}`)
    projectDiv.classList.add('project')
    domCountAndProjectObject.count++
    projectDiv.innerHTML += `<h3>${project.title}</h3><p>${project.description}</p>`
    domCountAndProjectObject.projectsDiv.appendChild(projectDiv)

    loadTodoItems(project, projectDiv)
    addTodoButton(projectDiv)
    addProjectDeleteButton(projectDiv)
  })
}

const loadTodoItems = (project, projectDiv) => {
  const todoList = document.createElement('ul')

  project.todoList.forEach(todo => {
    const todoItem = document.createElement('li')

    todoItem.innerHTML += todo.title

    if (todo.complete === true) { todoItem.style.textDecoration = 'line-through' }

    todoList.appendChild(todoItem)
  })

  projectDiv.appendChild(todoList)
}

const addTodoButton = (projectDiv) => {
  const todoBtn = document.createElement('button')

  todoBtn.classList.add('todo-btn')
  todoBtn.innerHTML = '+'
  projectDiv.appendChild(todoBtn)
}

const addProjectDeleteButton = (projectDiv) => {
  const deleteBtn = document.createElement('button')

  deleteBtn.classList.add('delete-btn')
  deleteBtn.innerHTML = 'Delete Project'
  projectDiv.appendChild(deleteBtn)
}

const addProjectEventListeners = () => {
  const domElementsObject = {
    projectBtn: document.querySelector('.project-btn'),
    modal: document.querySelector('.modal-project'),
    saveBtn: document.querySelector('.save-project'),
    closeBtn: document.querySelector('.close-project'),
    inputs: document.querySelectorAll('.inputs-project')
  }

  projectButtonEventListener(domElementsObject)
  displayProjectEventListener()

  if (!eventListenersInitialised) {
    closeButtonEventListener(domElementsObject)
    projectModalSaveEventListener(domElementsObject)
  }
}

const displayProjectEventListener = () => {
  const projectNodeList = document.querySelectorAll('.project')

  projectNodeList.forEach(project => {
    project.addEventListener('click', (e) => {
      const projectObject = _data__WEBPACK_IMPORTED_MODULE_0__.projects[parseInt(e.currentTarget.dataset.index)]
      renderProjectToDisplay(projectObject)
    })
  })
}

const renderProjectToDisplay = (projectObject) => {
  const display = document.querySelector('.display')
  const projectDiv = document.createElement('div')
  const todoContainer = renderTodosForProject(projectObject)

  display.innerHTML = ''
  projectDiv.innerHTML += `<div class="project-display-title">
                          <h2>${projectObject.title}</h2><p>${[projectObject.description]}</p>
                          </div><div class="border"></div>`
  projectDiv.appendChild(todoContainer)
  display.appendChild(projectDiv)
  deleteTodoEventListener(projectObject)
  completeTodoEventListener(projectObject)
  editTodoEventListener(projectObject)
}

const renderTodosForProject = (projectObject) => {
  const todoContainer = document.createElement('div')
  let todoCount = 0

  projectObject.todoList.forEach(todo => {
    const todoDiv = document.createElement('div')

    todoDiv.classList.add('todo-div')
    todoDiv.setAttribute('data-index', `${todoCount}`)
    todoDiv.innerHTML += `<h3>${todo.title}</h3><p>${todo.description}</p><p>${todo.dueDate}</p>
                          <p>${todo.priority}</p><p>${todo.notes}</p>
                          <button class="delete-todo display-btn">Delete Todo</button>
                          <button class="edit-todo display-btn">Edit Todo</button>
                          <button class="complete-todo display-btn">Complete Todo</button>`

    if (todo.complete === true) { todoDiv.style.textDecoration = 'line-through' }

    todoContainer.appendChild(todoDiv)
    todoCount++
  })

  return todoContainer
}

const deleteTodoEventListener = (projectObject) => {
  const deleteBtns = document.querySelectorAll('.delete-todo')

  deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', (e) => {
      const dataIndex = e.currentTarget.parentElement.dataset.index

      projectObject.todoList.splice(dataIndex, 1)
      loadProjects()
      renderProjectToDisplay(projectObject)
    })
  })
}

const editTodoEventListener = (projectObject) => {
  const editBtns = document.querySelectorAll('.edit-todo')
  const modal = document.querySelector('.modal-todo-edit')

  editBtns.forEach(editBtn => {
    editBtn.addEventListener('click', (e) => {
      modal.setAttribute('data-index', e.currentTarget.parentElement.dataset.index)
      // so that save button listener on edit modal can get the correct todo list item to edit

      modal.style.display = 'block'
    })
  })

  editTodoModalCloseEventListener(modal)
  editTodoModalSaveEventListener(projectObject, modal)
}

const editTodoModalCloseEventListener = (modal) => {
  const closeBtn = document.querySelector('.close-todo-edit')

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'
  })
}

const editTodoModalSaveEventListener = (projectObject, modal) => {
  const saveBtn = document.querySelector('.save-todo-edit')

  saveBtn.addEventListener('click', () => {
    const editTodoFormObject = {
      title: document.querySelector('.title-todo-edit').value,
      description: document.querySelector('.description-todo-edit').value,
      dueDate: document.querySelector('.due-date-todo-edit').value,
      priority: document.querySelector('.priority-todo-edit').value,
      notes: document.querySelector('.notes-todo-edit').value,
      inputs: document.querySelectorAll('.inputs-edit')
    }
    const todo = projectObject.todoList[parseInt(modal.dataset.index)]

    modal.style.display = 'none'
    todo.title = editTodoFormObject.title
    todo.description = editTodoFormObject.description
    todo.dueDate = editTodoFormObject.dueDate
    todo.priority = editTodoFormObject.priority
    todo.notes = editTodoFormObject.notes

    editTodoFormObject.inputs.forEach(input => { input.value = '' })
    loadProjects()
    renderProjectToDisplay(projectObject)
  })
}

const completeTodoEventListener = (projectObject) => {
  const completeBtns = document.querySelectorAll('.complete-todo')

  completeBtns.forEach(completeBtn => {
    completeBtn.addEventListener('click', (e) => {
      const dataIndex = e.currentTarget.parentElement.dataset.index

      projectObject.todoList[parseInt(dataIndex)].complete = true
      loadProjects()
      renderProjectToDisplay(projectObject)
    })
  })
}

const projectButtonEventListener = (domElementsObject) => {
  domElementsObject.projectBtn.addEventListener('click', () => {
    domElementsObject.modal.style.display = 'block'
  })
}

const projectModalSaveEventListener = (domElementsObject) => {
  domElementsObject.saveBtn.addEventListener('click', () => {
    domElementsObject.modal.style.display = 'none'

    const title = document.querySelector('.title-project').value
    const description = document.querySelector('.description-project').value

    domElementsObject.inputs.forEach(input => { input.value = '' })
    ;(0,_data__WEBPACK_IMPORTED_MODULE_0__.addProject)(title, description)
    loadProjects()
  })
}

const addTodoEventListeners = () => {
  const domElementsObject = {
    deleteBtns: document.querySelectorAll('.delete-btn'),
    todoBtns: document.querySelectorAll('.todo-btn'),
    saveBtn: document.querySelector('.save-todo'),
    closeBtn: document.querySelector('.close-todo'),
    inputs: document.querySelectorAll('.inputs-todo'),
    modal: document.querySelector('.modal-todo')
  }

  todoButtonsEventListener(domElementsObject)
  deleteButtonsEventListener(domElementsObject)

  if (!eventListenersInitialised) { // To stop multiple event listeners being attached to modal buttons
    closeButtonEventListener(domElementsObject)
    todoModalSaveEventListener(domElementsObject)
    eventListenersInitialised = true
  }
}

const deleteButtonsEventListener = (domElementsObject) => {
  domElementsObject.deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', (e) => {
      const projectDataIndex = e.currentTarget.parentElement.dataset.index

      _data__WEBPACK_IMPORTED_MODULE_0__.projects.splice(projectDataIndex, 1)
      loadProjects()
    })
  })
}

const todoButtonsEventListener = (domElementsObject) => {
  domElementsObject.todoBtns.forEach(todoBtn => {
    todoBtn.addEventListener('click', (e) => {
      const projectDataIndex = e.currentTarget.parentElement.dataset.index

      domElementsObject.saveBtn.dataset.index = projectDataIndex
      domElementsObject.modal.style.display = 'block'
    })
  })
}

const todoModalSaveEventListener = (domElementsObject) => {
  domElementsObject.saveBtn.addEventListener('click', () => {
    domElementsObject.modal.style.display = 'none'

    const formFieldsObject = {
      title: document.querySelector('.title-todo').value,
      description: document.querySelector('.description-todo').value,
      dueDate: document.querySelector('.due-date-todo').value,
      priority: document.querySelector('.priority-todo').value,
      notes: document.querySelector('.notes-todo').value,
      project: parseInt(domElementsObject.saveBtn.dataset.index)
    }

    domElementsObject.inputs.forEach(input => { input.value = '' })
    ;(0,_data__WEBPACK_IMPORTED_MODULE_0__.addTodo)(formFieldsObject)
    loadProjects()

    // TODO rerender display when new todo added
  })
}

const closeButtonEventListener = (domElementsObject) => {
  domElementsObject.closeBtn.addEventListener('click', () => {
    domElementsObject.modal.style.display = 'none'
    domElementsObject.inputs.forEach(input => { input.value = '' })
  })
}
const initLocalStorageEventListeners = () => {
  localStorageSaveEventListener()
  localStorageClearEventListener()
  localStorageLoadEventListener()
}

const localStorageSaveEventListener = () => {
  const saveBtn = document.querySelector('.storage-save')

  saveBtn.addEventListener('click', () => {
    ;(0,_storage__WEBPACK_IMPORTED_MODULE_1__.storeData)()
  })
}
const localStorageClearEventListener = () => {
  const clearBtn = document.querySelector('.storage-clear')

  clearBtn.addEventListener('click', () => {
    ;(0,_storage__WEBPACK_IMPORTED_MODULE_1__.clearData)()
  })
}

const localStorageLoadEventListener = () => {
  const loadBtn = document.querySelector('.storage-load')
  const retrievedData = (0,_storage__WEBPACK_IMPORTED_MODULE_1__.retrieveData)()

  loadBtn.addEventListener('click', () => {
    _data__WEBPACK_IMPORTED_MODULE_0__.projects.splice(0, _data__WEBPACK_IMPORTED_MODULE_0__.projects.length)
    _data__WEBPACK_IMPORTED_MODULE_0__.projects.push(...retrievedData)
    loadProjects()
  })
}




/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "storeData": () => (/* binding */ storeData),
/* harmony export */   "retrieveData": () => (/* binding */ retrieveData),
/* harmony export */   "clearData": () => (/* binding */ clearData)
/* harmony export */ });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./src/data.js");


const storeData = () => {
  localStorage.setItem('projects', JSON.stringify(_data__WEBPACK_IMPORTED_MODULE_0__.projects))
}

const retrieveData = () => {
  return JSON.parse(localStorage.getItem('projects'))
}

const clearData = () => {
  localStorage.clear()
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./src/data.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");



const runApp = (() => {
  (0,_dom__WEBPACK_IMPORTED_MODULE_1__.initLocalStorageEventListeners)()
  ;(0,_data__WEBPACK_IMPORTED_MODULE_0__.initialiseExampleProjects)()
  ;(0,_dom__WEBPACK_IMPORTED_MODULE_1__.loadProjects)()
})()

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Oi8vdG9kby1saXN0Ly4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVG9kbyB7XG4gIGNvbnN0cnVjdG9yICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBub3Rlcykge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZVxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvblxuICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGVcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHlcbiAgICB0aGlzLm5vdGVzID0gbm90ZXNcbiAgICB0aGlzLmNvbXBsZXRlID0gZmFsc2VcbiAgfVxufVxuXG5jbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IgKHRpdGxlLCBkZXNjcmlwdGlvbikge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZVxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvblxuICAgIHRoaXMudG9kb0xpc3QgPSBbXVxuICB9XG5cbiAgYWRkVG9kb09iaiAodG9kb09iaikge1xuICAgIHRoaXMudG9kb0xpc3QucHVzaCh0b2RvT2JqKVxuICB9XG59XG5cbmNvbnN0IHByb2plY3RzID0gW10gLy8gZGF0YSBob2xkZXJcblxuY29uc3QgYWRkUHJvamVjdCA9ICh0aXRsZSwgZGVzY3JpcHRpb24pID0+IHtcbiAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHRpdGxlLCBkZXNjcmlwdGlvbilcbiAgcHJvamVjdHMucHVzaChuZXdQcm9qZWN0KVxufVxuXG5jb25zdCBhZGRUb2RvID0gKGZvcm1GaWVsZHNPYmplY3QpID0+IHtcbiAgY29uc3QgbmV3VG9kbyA9IG5ldyBUb2RvKFxuICAgIGZvcm1GaWVsZHNPYmplY3QudGl0bGUsXG4gICAgZm9ybUZpZWxkc09iamVjdC5kZXNjcmlwdGlvbixcbiAgICBmb3JtRmllbGRzT2JqZWN0LmR1ZURhdGUsXG4gICAgZm9ybUZpZWxkc09iamVjdC5wcmlvcml0eSxcbiAgICBmb3JtRmllbGRzT2JqZWN0Lm5vdGVzXG4gIClcblxuICBwcm9qZWN0c1tmb3JtRmllbGRzT2JqZWN0LnByb2plY3RdLnRvZG9MaXN0LnB1c2gobmV3VG9kbylcbn1cblxuY29uc3QgaW5pdGlhbGlzZUV4YW1wbGVQcm9qZWN0cyA9ICgpID0+IHtcbiAgY29uc3QgZGVmYXVsdFByb2plY3QgPSBuZXcgUHJvamVjdCgnRGVmYXVsdCcsICdEZWZhdWx0IExpc3QnKVxuICBjb25zdCBleGFtcGxlVG9kbyA9IG5ldyBUb2RvKCdUb2RvJywgJ2V4YW1wbGUnLCAnMS8xLzEnLCAnMScsICdUaGlzIGlzIGFuIGV4YW1wbGUgdG9kbyBpdGVtJywgZGVmYXVsdFByb2plY3QpXG5cbiAgZGVmYXVsdFByb2plY3QuYWRkVG9kb09iaihleGFtcGxlVG9kbylcbiAgcHJvamVjdHMucHVzaChkZWZhdWx0UHJvamVjdClcbn1cblxuZXhwb3J0IHsgcHJvamVjdHMsIGluaXRpYWxpc2VFeGFtcGxlUHJvamVjdHMsIGFkZFByb2plY3QsIGFkZFRvZG8gfVxuIiwiaW1wb3J0IHsgcHJvamVjdHMsIGFkZFByb2plY3QsIGFkZFRvZG8gfSBmcm9tICcuL2RhdGEnXG5pbXBvcnQgeyBzdG9yZURhdGEsIGNsZWFyRGF0YSwgcmV0cmlldmVEYXRhIH0gZnJvbSAnLi9zdG9yYWdlJ1xuXG4vLyBUT0RPIHNwbGl0IERPTSBtb2R1bGUgaW50byByZW5kZXJpbmcgYW5kIGxpc3RlbmVyIG1vZHVsZXNcblxubGV0IGV2ZW50TGlzdGVuZXJzSW5pdGlhbGlzZWQgPSBmYWxzZSAvLyBUbyBzdG9wIG11bHRpcGxlIGV2ZW50IGxpc3RlbmVycyBiZWluZyBhdHRhY2hlZCB0byBtb2RhbCBidXR0b25zIC4gUmVmYWN0b3I/XG5cbmNvbnN0IGxvYWRQcm9qZWN0cyA9ICgpID0+IHtcbiAgY29uc3QgZG9tQ291bnRBbmRQcm9qZWN0T2JqZWN0ID0ge1xuICAgIHByb2plY3RzRGl2OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMnKSxcbiAgICBjb3VudDogMCxcbiAgICBwcm9qZWN0czogcHJvamVjdHNcbiAgfVxuXG4gIGNsZWFyUHJvamVjdHNET00oZG9tQ291bnRBbmRQcm9qZWN0T2JqZWN0LnByb2plY3RzRGl2KVxuICBhZGRFYWNoUHJvamVjdFRvRG9tKGRvbUNvdW50QW5kUHJvamVjdE9iamVjdClcbiAgYWRkUHJvamVjdEV2ZW50TGlzdGVuZXJzKClcbiAgYWRkVG9kb0V2ZW50TGlzdGVuZXJzKClcbn1cblxuY29uc3QgY2xlYXJQcm9qZWN0c0RPTSA9IChwcm9qZWN0c0RpdikgPT4ge1xuICBwcm9qZWN0c0Rpdi5pbm5lckhUTUwgPSAnJ1xuICBwcm9qZWN0c0Rpdi5pbm5lckhUTUwgKz0gJzxoMj5Qcm9qZWN0czwvaDI+PGJ1dHRvbiBjbGFzcz1cInByb2plY3QtYnRuXCI+KzwvYnV0dG9uPidcbn1cblxuY29uc3QgYWRkRWFjaFByb2plY3RUb0RvbSA9IChkb21Db3VudEFuZFByb2plY3RPYmplY3QpID0+IHtcbiAgZG9tQ291bnRBbmRQcm9qZWN0T2JqZWN0LnByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgY29uc3QgcHJvamVjdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgICBwcm9qZWN0RGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGAke2RvbUNvdW50QW5kUHJvamVjdE9iamVjdC5jb3VudH1gKVxuICAgIHByb2plY3REaXYuY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpXG4gICAgZG9tQ291bnRBbmRQcm9qZWN0T2JqZWN0LmNvdW50KytcbiAgICBwcm9qZWN0RGl2LmlubmVySFRNTCArPSBgPGgzPiR7cHJvamVjdC50aXRsZX08L2gzPjxwPiR7cHJvamVjdC5kZXNjcmlwdGlvbn08L3A+YFxuICAgIGRvbUNvdW50QW5kUHJvamVjdE9iamVjdC5wcm9qZWN0c0Rpdi5hcHBlbmRDaGlsZChwcm9qZWN0RGl2KVxuXG4gICAgbG9hZFRvZG9JdGVtcyhwcm9qZWN0LCBwcm9qZWN0RGl2KVxuICAgIGFkZFRvZG9CdXR0b24ocHJvamVjdERpdilcbiAgICBhZGRQcm9qZWN0RGVsZXRlQnV0dG9uKHByb2plY3REaXYpXG4gIH0pXG59XG5cbmNvbnN0IGxvYWRUb2RvSXRlbXMgPSAocHJvamVjdCwgcHJvamVjdERpdikgPT4ge1xuICBjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcblxuICBwcm9qZWN0LnRvZG9MaXN0LmZvckVhY2godG9kbyA9PiB7XG4gICAgY29uc3QgdG9kb0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICB0b2RvSXRlbS5pbm5lckhUTUwgKz0gdG9kby50aXRsZVxuXG4gICAgaWYgKHRvZG8uY29tcGxldGUgPT09IHRydWUpIHsgdG9kb0l0ZW0uc3R5bGUudGV4dERlY29yYXRpb24gPSAnbGluZS10aHJvdWdoJyB9XG5cbiAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZCh0b2RvSXRlbSlcbiAgfSlcblxuICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKHRvZG9MaXN0KVxufVxuXG5jb25zdCBhZGRUb2RvQnV0dG9uID0gKHByb2plY3REaXYpID0+IHtcbiAgY29uc3QgdG9kb0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG5cbiAgdG9kb0J0bi5jbGFzc0xpc3QuYWRkKCd0b2RvLWJ0bicpXG4gIHRvZG9CdG4uaW5uZXJIVE1MID0gJysnXG4gIHByb2plY3REaXYuYXBwZW5kQ2hpbGQodG9kb0J0bilcbn1cblxuY29uc3QgYWRkUHJvamVjdERlbGV0ZUJ1dHRvbiA9IChwcm9qZWN0RGl2KSA9PiB7XG4gIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG5cbiAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZS1idG4nKVxuICBkZWxldGVCdG4uaW5uZXJIVE1MID0gJ0RlbGV0ZSBQcm9qZWN0J1xuICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ0bilcbn1cblxuY29uc3QgYWRkUHJvamVjdEV2ZW50TGlzdGVuZXJzID0gKCkgPT4ge1xuICBjb25zdCBkb21FbGVtZW50c09iamVjdCA9IHtcbiAgICBwcm9qZWN0QnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1idG4nKSxcbiAgICBtb2RhbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLXByb2plY3QnKSxcbiAgICBzYXZlQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2F2ZS1wcm9qZWN0JyksXG4gICAgY2xvc2VCdG46IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1wcm9qZWN0JyksXG4gICAgaW5wdXRzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5wdXRzLXByb2plY3QnKVxuICB9XG5cbiAgcHJvamVjdEJ1dHRvbkV2ZW50TGlzdGVuZXIoZG9tRWxlbWVudHNPYmplY3QpXG4gIGRpc3BsYXlQcm9qZWN0RXZlbnRMaXN0ZW5lcigpXG5cbiAgaWYgKCFldmVudExpc3RlbmVyc0luaXRpYWxpc2VkKSB7XG4gICAgY2xvc2VCdXR0b25FdmVudExpc3RlbmVyKGRvbUVsZW1lbnRzT2JqZWN0KVxuICAgIHByb2plY3RNb2RhbFNhdmVFdmVudExpc3RlbmVyKGRvbUVsZW1lbnRzT2JqZWN0KVxuICB9XG59XG5cbmNvbnN0IGRpc3BsYXlQcm9qZWN0RXZlbnRMaXN0ZW5lciA9ICgpID0+IHtcbiAgY29uc3QgcHJvamVjdE5vZGVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QnKVxuXG4gIHByb2plY3ROb2RlTGlzdC5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgIHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3QgcHJvamVjdE9iamVjdCA9IHByb2plY3RzW3BhcnNlSW50KGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4KV1cbiAgICAgIHJlbmRlclByb2plY3RUb0Rpc3BsYXkocHJvamVjdE9iamVjdClcbiAgICB9KVxuICB9KVxufVxuXG5jb25zdCByZW5kZXJQcm9qZWN0VG9EaXNwbGF5ID0gKHByb2plY3RPYmplY3QpID0+IHtcbiAgY29uc3QgZGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaXNwbGF5JylcbiAgY29uc3QgcHJvamVjdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGNvbnN0IHRvZG9Db250YWluZXIgPSByZW5kZXJUb2Rvc0ZvclByb2plY3QocHJvamVjdE9iamVjdClcblxuICBkaXNwbGF5LmlubmVySFRNTCA9ICcnXG4gIHByb2plY3REaXYuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwicHJvamVjdC1kaXNwbGF5LXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxoMj4ke3Byb2plY3RPYmplY3QudGl0bGV9PC9oMj48cD4ke1twcm9qZWN0T2JqZWN0LmRlc2NyaXB0aW9uXX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3M9XCJib3JkZXJcIj48L2Rpdj5gXG4gIHByb2plY3REaXYuYXBwZW5kQ2hpbGQodG9kb0NvbnRhaW5lcilcbiAgZGlzcGxheS5hcHBlbmRDaGlsZChwcm9qZWN0RGl2KVxuICBkZWxldGVUb2RvRXZlbnRMaXN0ZW5lcihwcm9qZWN0T2JqZWN0KVxuICBjb21wbGV0ZVRvZG9FdmVudExpc3RlbmVyKHByb2plY3RPYmplY3QpXG4gIGVkaXRUb2RvRXZlbnRMaXN0ZW5lcihwcm9qZWN0T2JqZWN0KVxufVxuXG5jb25zdCByZW5kZXJUb2Rvc0ZvclByb2plY3QgPSAocHJvamVjdE9iamVjdCkgPT4ge1xuICBjb25zdCB0b2RvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgbGV0IHRvZG9Db3VudCA9IDBcblxuICBwcm9qZWN0T2JqZWN0LnRvZG9MaXN0LmZvckVhY2godG9kbyA9PiB7XG4gICAgY29uc3QgdG9kb0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgICB0b2RvRGl2LmNsYXNzTGlzdC5hZGQoJ3RvZG8tZGl2JylcbiAgICB0b2RvRGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGAke3RvZG9Db3VudH1gKVxuICAgIHRvZG9EaXYuaW5uZXJIVE1MICs9IGA8aDM+JHt0b2RvLnRpdGxlfTwvaDM+PHA+JHt0b2RvLmRlc2NyaXB0aW9ufTwvcD48cD4ke3RvZG8uZHVlRGF0ZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwPiR7dG9kby5wcmlvcml0eX08L3A+PHA+JHt0b2RvLm5vdGVzfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRlbGV0ZS10b2RvIGRpc3BsYXktYnRuXCI+RGVsZXRlIFRvZG88L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXQtdG9kbyBkaXNwbGF5LWJ0blwiPkVkaXQgVG9kbzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY29tcGxldGUtdG9kbyBkaXNwbGF5LWJ0blwiPkNvbXBsZXRlIFRvZG88L2J1dHRvbj5gXG5cbiAgICBpZiAodG9kby5jb21wbGV0ZSA9PT0gdHJ1ZSkgeyB0b2RvRGl2LnN0eWxlLnRleHREZWNvcmF0aW9uID0gJ2xpbmUtdGhyb3VnaCcgfVxuXG4gICAgdG9kb0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvRGl2KVxuICAgIHRvZG9Db3VudCsrXG4gIH0pXG5cbiAgcmV0dXJuIHRvZG9Db250YWluZXJcbn1cblxuY29uc3QgZGVsZXRlVG9kb0V2ZW50TGlzdGVuZXIgPSAocHJvamVjdE9iamVjdCkgPT4ge1xuICBjb25zdCBkZWxldGVCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlbGV0ZS10b2RvJylcblxuICBkZWxldGVCdG5zLmZvckVhY2goZGVsZXRlQnRuID0+IHtcbiAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3QgZGF0YUluZGV4ID0gZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pbmRleFxuXG4gICAgICBwcm9qZWN0T2JqZWN0LnRvZG9MaXN0LnNwbGljZShkYXRhSW5kZXgsIDEpXG4gICAgICBsb2FkUHJvamVjdHMoKVxuICAgICAgcmVuZGVyUHJvamVjdFRvRGlzcGxheShwcm9qZWN0T2JqZWN0KVxuICAgIH0pXG4gIH0pXG59XG5cbmNvbnN0IGVkaXRUb2RvRXZlbnRMaXN0ZW5lciA9IChwcm9qZWN0T2JqZWN0KSA9PiB7XG4gIGNvbnN0IGVkaXRCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVkaXQtdG9kbycpXG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLXRvZG8tZWRpdCcpXG5cbiAgZWRpdEJ0bnMuZm9yRWFjaChlZGl0QnRuID0+IHtcbiAgICBlZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIG1vZGFsLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaW5kZXgpXG4gICAgICAvLyBzbyB0aGF0IHNhdmUgYnV0dG9uIGxpc3RlbmVyIG9uIGVkaXQgbW9kYWwgY2FuIGdldCB0aGUgY29ycmVjdCB0b2RvIGxpc3QgaXRlbSB0byBlZGl0XG5cbiAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgfSlcbiAgfSlcblxuICBlZGl0VG9kb01vZGFsQ2xvc2VFdmVudExpc3RlbmVyKG1vZGFsKVxuICBlZGl0VG9kb01vZGFsU2F2ZUV2ZW50TGlzdGVuZXIocHJvamVjdE9iamVjdCwgbW9kYWwpXG59XG5cbmNvbnN0IGVkaXRUb2RvTW9kYWxDbG9zZUV2ZW50TGlzdGVuZXIgPSAobW9kYWwpID0+IHtcbiAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtdG9kby1lZGl0JylcblxuICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIH0pXG59XG5cbmNvbnN0IGVkaXRUb2RvTW9kYWxTYXZlRXZlbnRMaXN0ZW5lciA9IChwcm9qZWN0T2JqZWN0LCBtb2RhbCkgPT4ge1xuICBjb25zdCBzYXZlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNhdmUtdG9kby1lZGl0JylcblxuICBzYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IGVkaXRUb2RvRm9ybU9iamVjdCA9IHtcbiAgICAgIHRpdGxlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGl0bGUtdG9kby1lZGl0JykudmFsdWUsXG4gICAgICBkZXNjcmlwdGlvbjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uLXRvZG8tZWRpdCcpLnZhbHVlLFxuICAgICAgZHVlRGF0ZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmR1ZS1kYXRlLXRvZG8tZWRpdCcpLnZhbHVlLFxuICAgICAgcHJpb3JpdHk6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmlvcml0eS10b2RvLWVkaXQnKS52YWx1ZSxcbiAgICAgIG5vdGVzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm90ZXMtdG9kby1lZGl0JykudmFsdWUsXG4gICAgICBpbnB1dHM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnB1dHMtZWRpdCcpXG4gICAgfVxuICAgIGNvbnN0IHRvZG8gPSBwcm9qZWN0T2JqZWN0LnRvZG9MaXN0W3BhcnNlSW50KG1vZGFsLmRhdGFzZXQuaW5kZXgpXVxuXG4gICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIHRvZG8udGl0bGUgPSBlZGl0VG9kb0Zvcm1PYmplY3QudGl0bGVcbiAgICB0b2RvLmRlc2NyaXB0aW9uID0gZWRpdFRvZG9Gb3JtT2JqZWN0LmRlc2NyaXB0aW9uXG4gICAgdG9kby5kdWVEYXRlID0gZWRpdFRvZG9Gb3JtT2JqZWN0LmR1ZURhdGVcbiAgICB0b2RvLnByaW9yaXR5ID0gZWRpdFRvZG9Gb3JtT2JqZWN0LnByaW9yaXR5XG4gICAgdG9kby5ub3RlcyA9IGVkaXRUb2RvRm9ybU9iamVjdC5ub3Rlc1xuXG4gICAgZWRpdFRvZG9Gb3JtT2JqZWN0LmlucHV0cy5mb3JFYWNoKGlucHV0ID0+IHsgaW5wdXQudmFsdWUgPSAnJyB9KVxuICAgIGxvYWRQcm9qZWN0cygpXG4gICAgcmVuZGVyUHJvamVjdFRvRGlzcGxheShwcm9qZWN0T2JqZWN0KVxuICB9KVxufVxuXG5jb25zdCBjb21wbGV0ZVRvZG9FdmVudExpc3RlbmVyID0gKHByb2plY3RPYmplY3QpID0+IHtcbiAgY29uc3QgY29tcGxldGVCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbXBsZXRlLXRvZG8nKVxuXG4gIGNvbXBsZXRlQnRucy5mb3JFYWNoKGNvbXBsZXRlQnRuID0+IHtcbiAgICBjb21wbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCBkYXRhSW5kZXggPSBlLmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0LmluZGV4XG5cbiAgICAgIHByb2plY3RPYmplY3QudG9kb0xpc3RbcGFyc2VJbnQoZGF0YUluZGV4KV0uY29tcGxldGUgPSB0cnVlXG4gICAgICBsb2FkUHJvamVjdHMoKVxuICAgICAgcmVuZGVyUHJvamVjdFRvRGlzcGxheShwcm9qZWN0T2JqZWN0KVxuICAgIH0pXG4gIH0pXG59XG5cbmNvbnN0IHByb2plY3RCdXR0b25FdmVudExpc3RlbmVyID0gKGRvbUVsZW1lbnRzT2JqZWN0KSA9PiB7XG4gIGRvbUVsZW1lbnRzT2JqZWN0LnByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZG9tRWxlbWVudHNPYmplY3QubW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgfSlcbn1cblxuY29uc3QgcHJvamVjdE1vZGFsU2F2ZUV2ZW50TGlzdGVuZXIgPSAoZG9tRWxlbWVudHNPYmplY3QpID0+IHtcbiAgZG9tRWxlbWVudHNPYmplY3Quc2F2ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBkb21FbGVtZW50c09iamVjdC5tb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG5cbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aXRsZS1wcm9qZWN0JykudmFsdWVcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXNjcmlwdGlvbi1wcm9qZWN0JykudmFsdWVcblxuICAgIGRvbUVsZW1lbnRzT2JqZWN0LmlucHV0cy5mb3JFYWNoKGlucHV0ID0+IHsgaW5wdXQudmFsdWUgPSAnJyB9KVxuICAgIGFkZFByb2plY3QodGl0bGUsIGRlc2NyaXB0aW9uKVxuICAgIGxvYWRQcm9qZWN0cygpXG4gIH0pXG59XG5cbmNvbnN0IGFkZFRvZG9FdmVudExpc3RlbmVycyA9ICgpID0+IHtcbiAgY29uc3QgZG9tRWxlbWVudHNPYmplY3QgPSB7XG4gICAgZGVsZXRlQnRuczogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlbGV0ZS1idG4nKSxcbiAgICB0b2RvQnRuczogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8tYnRuJyksXG4gICAgc2F2ZUJ0bjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNhdmUtdG9kbycpLFxuICAgIGNsb3NlQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtdG9kbycpLFxuICAgIGlucHV0czogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmlucHV0cy10b2RvJyksXG4gICAgbW9kYWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10b2RvJylcbiAgfVxuXG4gIHRvZG9CdXR0b25zRXZlbnRMaXN0ZW5lcihkb21FbGVtZW50c09iamVjdClcbiAgZGVsZXRlQnV0dG9uc0V2ZW50TGlzdGVuZXIoZG9tRWxlbWVudHNPYmplY3QpXG5cbiAgaWYgKCFldmVudExpc3RlbmVyc0luaXRpYWxpc2VkKSB7IC8vIFRvIHN0b3AgbXVsdGlwbGUgZXZlbnQgbGlzdGVuZXJzIGJlaW5nIGF0dGFjaGVkIHRvIG1vZGFsIGJ1dHRvbnNcbiAgICBjbG9zZUJ1dHRvbkV2ZW50TGlzdGVuZXIoZG9tRWxlbWVudHNPYmplY3QpXG4gICAgdG9kb01vZGFsU2F2ZUV2ZW50TGlzdGVuZXIoZG9tRWxlbWVudHNPYmplY3QpXG4gICAgZXZlbnRMaXN0ZW5lcnNJbml0aWFsaXNlZCA9IHRydWVcbiAgfVxufVxuXG5jb25zdCBkZWxldGVCdXR0b25zRXZlbnRMaXN0ZW5lciA9IChkb21FbGVtZW50c09iamVjdCkgPT4ge1xuICBkb21FbGVtZW50c09iamVjdC5kZWxldGVCdG5zLmZvckVhY2goZGVsZXRlQnRuID0+IHtcbiAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3QgcHJvamVjdERhdGFJbmRleCA9IGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaW5kZXhcblxuICAgICAgcHJvamVjdHMuc3BsaWNlKHByb2plY3REYXRhSW5kZXgsIDEpXG4gICAgICBsb2FkUHJvamVjdHMoKVxuICAgIH0pXG4gIH0pXG59XG5cbmNvbnN0IHRvZG9CdXR0b25zRXZlbnRMaXN0ZW5lciA9IChkb21FbGVtZW50c09iamVjdCkgPT4ge1xuICBkb21FbGVtZW50c09iamVjdC50b2RvQnRucy5mb3JFYWNoKHRvZG9CdG4gPT4ge1xuICAgIHRvZG9CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3QgcHJvamVjdERhdGFJbmRleCA9IGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaW5kZXhcblxuICAgICAgZG9tRWxlbWVudHNPYmplY3Quc2F2ZUJ0bi5kYXRhc2V0LmluZGV4ID0gcHJvamVjdERhdGFJbmRleFxuICAgICAgZG9tRWxlbWVudHNPYmplY3QubW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICB9KVxuICB9KVxufVxuXG5jb25zdCB0b2RvTW9kYWxTYXZlRXZlbnRMaXN0ZW5lciA9IChkb21FbGVtZW50c09iamVjdCkgPT4ge1xuICBkb21FbGVtZW50c09iamVjdC5zYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGRvbUVsZW1lbnRzT2JqZWN0Lm1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcblxuICAgIGNvbnN0IGZvcm1GaWVsZHNPYmplY3QgPSB7XG4gICAgICB0aXRsZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpdGxlLXRvZG8nKS52YWx1ZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVzY3JpcHRpb24tdG9kbycpLnZhbHVlLFxuICAgICAgZHVlRGF0ZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmR1ZS1kYXRlLXRvZG8nKS52YWx1ZSxcbiAgICAgIHByaW9yaXR5OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpb3JpdHktdG9kbycpLnZhbHVlLFxuICAgICAgbm90ZXM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ub3Rlcy10b2RvJykudmFsdWUsXG4gICAgICBwcm9qZWN0OiBwYXJzZUludChkb21FbGVtZW50c09iamVjdC5zYXZlQnRuLmRhdGFzZXQuaW5kZXgpXG4gICAgfVxuXG4gICAgZG9tRWxlbWVudHNPYmplY3QuaW5wdXRzLmZvckVhY2goaW5wdXQgPT4geyBpbnB1dC52YWx1ZSA9ICcnIH0pXG4gICAgYWRkVG9kbyhmb3JtRmllbGRzT2JqZWN0KVxuICAgIGxvYWRQcm9qZWN0cygpXG5cbiAgICAvLyBUT0RPIHJlcmVuZGVyIGRpc3BsYXkgd2hlbiBuZXcgdG9kbyBhZGRlZFxuICB9KVxufVxuXG5jb25zdCBjbG9zZUJ1dHRvbkV2ZW50TGlzdGVuZXIgPSAoZG9tRWxlbWVudHNPYmplY3QpID0+IHtcbiAgZG9tRWxlbWVudHNPYmplY3QuY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZG9tRWxlbWVudHNPYmplY3QubW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIGRvbUVsZW1lbnRzT2JqZWN0LmlucHV0cy5mb3JFYWNoKGlucHV0ID0+IHsgaW5wdXQudmFsdWUgPSAnJyB9KVxuICB9KVxufVxuY29uc3QgaW5pdExvY2FsU3RvcmFnZUV2ZW50TGlzdGVuZXJzID0gKCkgPT4ge1xuICBsb2NhbFN0b3JhZ2VTYXZlRXZlbnRMaXN0ZW5lcigpXG4gIGxvY2FsU3RvcmFnZUNsZWFyRXZlbnRMaXN0ZW5lcigpXG4gIGxvY2FsU3RvcmFnZUxvYWRFdmVudExpc3RlbmVyKClcbn1cblxuY29uc3QgbG9jYWxTdG9yYWdlU2F2ZUV2ZW50TGlzdGVuZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHNhdmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RvcmFnZS1zYXZlJylcblxuICBzYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHN0b3JlRGF0YSgpXG4gIH0pXG59XG5jb25zdCBsb2NhbFN0b3JhZ2VDbGVhckV2ZW50TGlzdGVuZXIgPSAoKSA9PiB7XG4gIGNvbnN0IGNsZWFyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0b3JhZ2UtY2xlYXInKVxuXG4gIGNsZWFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNsZWFyRGF0YSgpXG4gIH0pXG59XG5cbmNvbnN0IGxvY2FsU3RvcmFnZUxvYWRFdmVudExpc3RlbmVyID0gKCkgPT4ge1xuICBjb25zdCBsb2FkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0b3JhZ2UtbG9hZCcpXG4gIGNvbnN0IHJldHJpZXZlZERhdGEgPSByZXRyaWV2ZURhdGEoKVxuXG4gIGxvYWRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcHJvamVjdHMuc3BsaWNlKDAsIHByb2plY3RzLmxlbmd0aClcbiAgICBwcm9qZWN0cy5wdXNoKC4uLnJldHJpZXZlZERhdGEpXG4gICAgbG9hZFByb2plY3RzKClcbiAgfSlcbn1cblxuZXhwb3J0IHsgbG9hZFByb2plY3RzLCBpbml0TG9jYWxTdG9yYWdlRXZlbnRMaXN0ZW5lcnMgfVxuIiwiaW1wb3J0IHsgcHJvamVjdHMgfSBmcm9tICcuL2RhdGEnXG5cbmNvbnN0IHN0b3JlRGF0YSA9ICgpID0+IHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKVxufVxuXG5jb25zdCByZXRyaWV2ZURhdGEgPSAoKSA9PiB7XG4gIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKVxufVxuXG5jb25zdCBjbGVhckRhdGEgPSAoKSA9PiB7XG4gIGxvY2FsU3RvcmFnZS5jbGVhcigpXG59XG5cbmV4cG9ydCB7IHN0b3JlRGF0YSwgcmV0cmlldmVEYXRhLCBjbGVhckRhdGEgfVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBpbml0aWFsaXNlRXhhbXBsZVByb2plY3RzIH0gZnJvbSAnLi9kYXRhJ1xuaW1wb3J0IHsgbG9hZFByb2plY3RzLCBpbml0TG9jYWxTdG9yYWdlRXZlbnRMaXN0ZW5lcnMgfSBmcm9tICcuL2RvbSdcblxuY29uc3QgcnVuQXBwID0gKCgpID0+IHtcbiAgaW5pdExvY2FsU3RvcmFnZUV2ZW50TGlzdGVuZXJzKClcbiAgaW5pdGlhbGlzZUV4YW1wbGVQcm9qZWN0cygpXG4gIGxvYWRQcm9qZWN0cygpXG59KSgpXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=