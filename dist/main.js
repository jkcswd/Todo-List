/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projects": () => (/* binding */ projects),
/* harmony export */   "initProjects": () => (/* binding */ initProjects),
/* harmony export */   "addProject": () => (/* binding */ addProject),
/* harmony export */   "addTodo": () => (/* binding */ addTodo)
/* harmony export */ });
class Todo {
    constructor(title,description,dueDate, priority, notes){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }

    set setTitle(title) {
        this.title = title;
    }

    set setDesciption(desc) {
        this.description = desc;
    }

    set setDate(date) {
        this.dueDate = date;
    }

    set setPriority(prio) {
        this.priority = prio;
    }

    set setNotes(notes) {
        this.notes = notes;
    }
}

class Project {
    constructor(title,description){
        this.title = title;
        this.description = description;
        this.todoList = [];
    }

    set setTitle(title){
        this.title = title;
    }

    set setDesciption(desc){
        this.description = desc;
    }

    addTodoObj(todoObj) {
        this.todoList.push(todoObj)
    }
}

let projects = []; //data holder 

const addProject = (title,description) => {
    const newProject = new Project(title,description);
    projects.push(newProject);
}

const addTodo = (formFieldsObject) => {
    const newTodo = new Todo(formFieldsObject.title,
                             formFieldsObject.description,
                             formFieldsObject.dueDate, 
                             formFieldsObject.priority, 
                             formFieldsObject.notes);

    projects[formFieldsObject.project].todoList.push(newTodo);
}

const initProjects = () => {
    //Should this be here or in index.js?
    const defaultProject = new Project('Default', 'Default List');
    const exampleTodo = new Todo('Todo', 'example', '1/1/1','1','This is an example todo item', defaultProject);
    defaultProject.addTodoObj(exampleTodo);
    projects.push(defaultProject);
}



/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadProjects": () => (/* binding */ loadProjects)
/* harmony export */ });
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/app.js");


let eventListenersInitialised = false;

const loadProjects = () => {
    const domCountAndProjectObject = {
        projectsDiv : document.querySelector('.projects'),
        count : 0,
        projects : _app__WEBPACK_IMPORTED_MODULE_0__.projects
    };

    clearProjectsDOM(domCountAndProjectObject.projectsDiv);
    addEachProjectToDom(domCountAndProjectObject);
    addProjectEventListeners(); 
    addTodoEventListeners(); 
}

const clearProjectsDOM = (projectsDiv) => {
    projectsDiv.innerHTML = ''
    projectsDiv.innerHTML += '<h2>Projects</h2><button class="project-btn">+</button>'
}

const addEachProjectToDom = (domCountAndProjectObject) => {
    domCountAndProjectObject.projects.forEach(project => {
        const projectDiv = document.createElement('div');

        projectDiv.setAttribute('data-index', `${domCountAndProjectObject.count}`);
        projectDiv.classList.add('project');
        domCountAndProjectObject.count++;
        projectDiv.innerHTML += `<h3>${project.title}</h3><p>${project.description}</p>`;
        domCountAndProjectObject.projectsDiv.appendChild(projectDiv);

        loadTodoItems(project, projectDiv);
        addTodoButton(projectDiv);
    });
}

const loadTodoItems = (project, projectDiv) => {
    project.todoList.forEach(todo  => {
        const todoDiv = document.createElement('div');

        todoDiv.innerHTML += todo.title;
        projectDiv.appendChild(todoDiv);
    });
}

const addTodoButton = (projectDiv) => {
    const todoBtn = document.createElement('button');

    todoBtn.classList.add('todo-btn');
    todoBtn.innerHTML = '+';
    projectDiv.appendChild(todoBtn);
}

const addProjectEventListeners = () => {
    const domElementsObject = {
        projectBtn : document.querySelector('.project-btn'),
        modal : document.querySelector('.modal-project'),
        saveBtn : document.querySelector('.save-project'),
        closeBtn : document.querySelector('.close-project'),
        inputs : document.querySelectorAll('.inputs-project')
    }
    
    projectButtonEventListener(domElementsObject);
    displayProjectEventListener();

    if (!eventListenersInitialised) {
        closeButtonEventListener(domElementsObject); 
        projectModalSaveEventListener(domElementsObject); 
    }
}

const displayProjectEventListener = () => {
    const projectNodeList = document.querySelectorAll('.project');
    const display = document.querySelector('.display');

    projectNodeList.forEach(project => {
        project.addEventListener('click', (e) => {
            const projectObject = _app__WEBPACK_IMPORTED_MODULE_0__.projects[parseInt(e.currentTarget.dataset.index)];
            const projectDiv = document.createElement('div');
            const todoContainer = renderTodosForProject(projectObject);

            display.innerHTML = '';
            projectDiv.innerHTML += `<h2>${projectObject.title}</h2><p>${[projectObject.description]}</p>`;
            projectDiv.appendChild(todoContainer);
            display.appendChild(projectDiv);
        });
    });
}

const renderTodosForProject = (projectObject) => {
    const todoContainer = document.createElement('div');

    projectObject.todoList.forEach(todo => {
        const todoDiv = document.createElement('div');

        todoDiv.innerHTML += `<h3>${todo.title}</h3><p>${todo.description}</p><p>${todo.dueDate}</p>
                                <p>${todo.priority}</p><p>${todo.notes}</p>`;
        todoContainer.appendChild(todoDiv);
    });

    return todoContainer;
}

const projectButtonEventListener = (domElementsObject) => {
    domElementsObject.projectBtn.addEventListener('click', ()=> {
        domElementsObject.modal.style.display = "block";
    });
}

const projectModalSaveEventListener = (domElementsObject) => { 
    domElementsObject.saveBtn.addEventListener('click', () => {
        domElementsObject.modal.style.display = "none";

        const title = document.querySelector('.title-project').value;
        const description = document.querySelector('.description-project').value;

        domElementsObject.inputs.forEach(input  => input.value = '');
        (0,_app__WEBPACK_IMPORTED_MODULE_0__.addProject)(title,description);
        loadProjects();
    });
}

const addTodoEventListeners = () => {
    const domElementsObject = {
        todoBtns : document.querySelectorAll('.todo-btn'),
        saveBtn : document.querySelector('.save-todo'),
        closeBtn : document.querySelector('.close-todo'),
        inputs : document.querySelectorAll('.inputs-todo'),
        modal : document.querySelector('.modal-todo'),
    };
    
    todoButtonsEventListener(domElementsObject);
    if (!eventListenersInitialised) {
        closeButtonEventListener(domElementsObject); 
        todoModalSaveEventListener(domElementsObject); 
        eventListenersInitialised = true;
    }
}

const todoButtonsEventListener = (domElementsObject) => {
    domElementsObject.todoBtns.forEach( todoBtn => { 
        todoBtn.addEventListener('click', (e)=> {
            const projectDataIndex = e.currentTarget.parentElement.dataset.index;

            domElementsObject.saveBtn.dataset.index = projectDataIndex;
            domElementsObject.modal.style.display = "block";
        });
    });
}

const todoModalSaveEventListener = (domElementsObject) => {
    domElementsObject.saveBtn.addEventListener('click', () => {
        domElementsObject.modal.style.display = "none";

        const formFieldsObject = {
            title : document.querySelector('.title-todo').value,
            description : document.querySelector('.description-todo').value,
            dueDate : document.querySelector('.due-date-todo').value,
            priority : document.querySelector('.priority-todo').value,
            notes : document.querySelector('.notes-todo').value,
            project : parseInt(domElementsObject.saveBtn.dataset.index) 
        };

        domElementsObject.inputs.forEach(input  => input.value = '');
        (0,_app__WEBPACK_IMPORTED_MODULE_0__.addTodo)(formFieldsObject);
        loadProjects();
    });            
}

const closeButtonEventListener = (domElementsObject) => {
    domElementsObject.closeBtn.addEventListener('click', () => {
        domElementsObject.modal.style.display = "none";
        domElementsObject.inputs.forEach( input  => input.value = '');
    });
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
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/app.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");



const runApp = (()=>{
    (0,_app__WEBPACK_IMPORTED_MODULE_0__.initProjects)();
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.loadProjects)();
})();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQjs7QUFFbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekVvRDs7QUFFcEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMENBQVE7QUFDM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaURBQWlELCtCQUErQjtBQUNoRjtBQUNBO0FBQ0EsdUNBQXVDLGNBQWMsVUFBVSxvQkFBb0I7QUFDbkY7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtDQUFrQywwQ0FBUTtBQUMxQztBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLG9CQUFvQixVQUFVLDRCQUE0QjtBQUNyRztBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsb0NBQW9DLFdBQVcsVUFBVSxpQkFBaUIsU0FBUyxhQUFhO0FBQ2hHLHFDQUFxQyxjQUFjLFNBQVMsV0FBVztBQUN2RTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLGdEQUFVO0FBQ2xCO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSw2Q0FBTztBQUNmO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7OztVQy9LQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05xQztBQUNEOztBQUVwQztBQUNBLElBQUksa0RBQVk7QUFDaEIsSUFBSSxrREFBWTtBQUNoQixDQUFDLEkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9zcmMvYXBwLmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1RvZG8tTGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRvZG8ge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLGRlc2NyaXB0aW9uLGR1ZURhdGUsIHByaW9yaXR5LCBub3Rlcyl7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgIHRoaXMubm90ZXMgPSBub3RlcztcbiAgICB9XG5cbiAgICBzZXQgc2V0VGl0bGUodGl0bGUpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIH1cblxuICAgIHNldCBzZXREZXNjaXB0aW9uKGRlc2MpIHtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2M7XG4gICAgfVxuXG4gICAgc2V0IHNldERhdGUoZGF0ZSkge1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkYXRlO1xuICAgIH1cblxuICAgIHNldCBzZXRQcmlvcml0eShwcmlvKSB7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvO1xuICAgIH1cblxuICAgIHNldCBzZXROb3Rlcyhub3Rlcykge1xuICAgICAgICB0aGlzLm5vdGVzID0gbm90ZXM7XG4gICAgfVxufVxuXG5jbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSxkZXNjcmlwdGlvbil7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLnRvZG9MaXN0ID0gW107XG4gICAgfVxuXG4gICAgc2V0IHNldFRpdGxlKHRpdGxlKXtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIH1cblxuICAgIHNldCBzZXREZXNjaXB0aW9uKGRlc2Mpe1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzYztcbiAgICB9XG5cbiAgICBhZGRUb2RvT2JqKHRvZG9PYmopIHtcbiAgICAgICAgdGhpcy50b2RvTGlzdC5wdXNoKHRvZG9PYmopXG4gICAgfVxufVxuXG5sZXQgcHJvamVjdHMgPSBbXTsgLy9kYXRhIGhvbGRlciBcblxuY29uc3QgYWRkUHJvamVjdCA9ICh0aXRsZSxkZXNjcmlwdGlvbikgPT4ge1xuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdCh0aXRsZSxkZXNjcmlwdGlvbik7XG4gICAgcHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcbn1cblxuY29uc3QgYWRkVG9kbyA9IChmb3JtRmllbGRzT2JqZWN0KSA9PiB7XG4gICAgY29uc3QgbmV3VG9kbyA9IG5ldyBUb2RvKGZvcm1GaWVsZHNPYmplY3QudGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1GaWVsZHNPYmplY3QuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1GaWVsZHNPYmplY3QuZHVlRGF0ZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1GaWVsZHNPYmplY3QucHJpb3JpdHksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtRmllbGRzT2JqZWN0Lm5vdGVzKTtcblxuICAgIHByb2plY3RzW2Zvcm1GaWVsZHNPYmplY3QucHJvamVjdF0udG9kb0xpc3QucHVzaChuZXdUb2RvKTtcbn1cblxuY29uc3QgaW5pdFByb2plY3RzID0gKCkgPT4ge1xuICAgIC8vU2hvdWxkIHRoaXMgYmUgaGVyZSBvciBpbiBpbmRleC5qcz9cbiAgICBjb25zdCBkZWZhdWx0UHJvamVjdCA9IG5ldyBQcm9qZWN0KCdEZWZhdWx0JywgJ0RlZmF1bHQgTGlzdCcpO1xuICAgIGNvbnN0IGV4YW1wbGVUb2RvID0gbmV3IFRvZG8oJ1RvZG8nLCAnZXhhbXBsZScsICcxLzEvMScsJzEnLCdUaGlzIGlzIGFuIGV4YW1wbGUgdG9kbyBpdGVtJywgZGVmYXVsdFByb2plY3QpO1xuICAgIGRlZmF1bHRQcm9qZWN0LmFkZFRvZG9PYmooZXhhbXBsZVRvZG8pO1xuICAgIHByb2plY3RzLnB1c2goZGVmYXVsdFByb2plY3QpO1xufVxuXG5leHBvcnQgeyBwcm9qZWN0cywgaW5pdFByb2plY3RzLCBhZGRQcm9qZWN0LCBhZGRUb2RvIH07IiwiaW1wb3J0IHsgcHJvamVjdHMsYWRkUHJvamVjdCwgYWRkVG9kbyB9IGZyb20gXCIuL2FwcFwiXG5cbmxldCBldmVudExpc3RlbmVyc0luaXRpYWxpc2VkID0gZmFsc2U7XG5cbmNvbnN0IGxvYWRQcm9qZWN0cyA9ICgpID0+IHtcbiAgICBjb25zdCBkb21Db3VudEFuZFByb2plY3RPYmplY3QgPSB7XG4gICAgICAgIHByb2plY3RzRGl2IDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzJyksXG4gICAgICAgIGNvdW50IDogMCxcbiAgICAgICAgcHJvamVjdHMgOiBwcm9qZWN0c1xuICAgIH07XG5cbiAgICBjbGVhclByb2plY3RzRE9NKGRvbUNvdW50QW5kUHJvamVjdE9iamVjdC5wcm9qZWN0c0Rpdik7XG4gICAgYWRkRWFjaFByb2plY3RUb0RvbShkb21Db3VudEFuZFByb2plY3RPYmplY3QpO1xuICAgIGFkZFByb2plY3RFdmVudExpc3RlbmVycygpOyBcbiAgICBhZGRUb2RvRXZlbnRMaXN0ZW5lcnMoKTsgXG59XG5cbmNvbnN0IGNsZWFyUHJvamVjdHNET00gPSAocHJvamVjdHNEaXYpID0+IHtcbiAgICBwcm9qZWN0c0Rpdi5pbm5lckhUTUwgPSAnJ1xuICAgIHByb2plY3RzRGl2LmlubmVySFRNTCArPSAnPGgyPlByb2plY3RzPC9oMj48YnV0dG9uIGNsYXNzPVwicHJvamVjdC1idG5cIj4rPC9idXR0b24+J1xufVxuXG5jb25zdCBhZGRFYWNoUHJvamVjdFRvRG9tID0gKGRvbUNvdW50QW5kUHJvamVjdE9iamVjdCkgPT4ge1xuICAgIGRvbUNvdW50QW5kUHJvamVjdE9iamVjdC5wcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgcHJvamVjdERpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBgJHtkb21Db3VudEFuZFByb2plY3RPYmplY3QuY291bnR9YCk7XG4gICAgICAgIHByb2plY3REaXYuY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpO1xuICAgICAgICBkb21Db3VudEFuZFByb2plY3RPYmplY3QuY291bnQrKztcbiAgICAgICAgcHJvamVjdERpdi5pbm5lckhUTUwgKz0gYDxoMz4ke3Byb2plY3QudGl0bGV9PC9oMz48cD4ke3Byb2plY3QuZGVzY3JpcHRpb259PC9wPmA7XG4gICAgICAgIGRvbUNvdW50QW5kUHJvamVjdE9iamVjdC5wcm9qZWN0c0Rpdi5hcHBlbmRDaGlsZChwcm9qZWN0RGl2KTtcblxuICAgICAgICBsb2FkVG9kb0l0ZW1zKHByb2plY3QsIHByb2plY3REaXYpO1xuICAgICAgICBhZGRUb2RvQnV0dG9uKHByb2plY3REaXYpO1xuICAgIH0pO1xufVxuXG5jb25zdCBsb2FkVG9kb0l0ZW1zID0gKHByb2plY3QsIHByb2plY3REaXYpID0+IHtcbiAgICBwcm9qZWN0LnRvZG9MaXN0LmZvckVhY2godG9kbyAgPT4ge1xuICAgICAgICBjb25zdCB0b2RvRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgdG9kb0Rpdi5pbm5lckhUTUwgKz0gdG9kby50aXRsZTtcbiAgICAgICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZCh0b2RvRGl2KTtcbiAgICB9KTtcbn1cblxuY29uc3QgYWRkVG9kb0J1dHRvbiA9IChwcm9qZWN0RGl2KSA9PiB7XG4gICAgY29uc3QgdG9kb0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gICAgdG9kb0J0bi5jbGFzc0xpc3QuYWRkKCd0b2RvLWJ0bicpO1xuICAgIHRvZG9CdG4uaW5uZXJIVE1MID0gJysnO1xuICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQodG9kb0J0bik7XG59XG5cbmNvbnN0IGFkZFByb2plY3RFdmVudExpc3RlbmVycyA9ICgpID0+IHtcbiAgICBjb25zdCBkb21FbGVtZW50c09iamVjdCA9IHtcbiAgICAgICAgcHJvamVjdEJ0biA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWJ0bicpLFxuICAgICAgICBtb2RhbCA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1wcm9qZWN0JyksXG4gICAgICAgIHNhdmVCdG4gOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2F2ZS1wcm9qZWN0JyksXG4gICAgICAgIGNsb3NlQnRuIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlLXByb2plY3QnKSxcbiAgICAgICAgaW5wdXRzIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmlucHV0cy1wcm9qZWN0JylcbiAgICB9XG4gICAgXG4gICAgcHJvamVjdEJ1dHRvbkV2ZW50TGlzdGVuZXIoZG9tRWxlbWVudHNPYmplY3QpO1xuICAgIGRpc3BsYXlQcm9qZWN0RXZlbnRMaXN0ZW5lcigpO1xuXG4gICAgaWYgKCFldmVudExpc3RlbmVyc0luaXRpYWxpc2VkKSB7XG4gICAgICAgIGNsb3NlQnV0dG9uRXZlbnRMaXN0ZW5lcihkb21FbGVtZW50c09iamVjdCk7IFxuICAgICAgICBwcm9qZWN0TW9kYWxTYXZlRXZlbnRMaXN0ZW5lcihkb21FbGVtZW50c09iamVjdCk7IFxuICAgIH1cbn1cblxuY29uc3QgZGlzcGxheVByb2plY3RFdmVudExpc3RlbmVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3ROb2RlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0Jyk7XG4gICAgY29uc3QgZGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaXNwbGF5Jyk7XG5cbiAgICBwcm9qZWN0Tm9kZUxpc3QuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICAgICAgcHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0T2JqZWN0ID0gcHJvamVjdHNbcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXgpXTtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IHRvZG9Db250YWluZXIgPSByZW5kZXJUb2Rvc0ZvclByb2plY3QocHJvamVjdE9iamVjdCk7XG5cbiAgICAgICAgICAgIGRpc3BsYXkuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBwcm9qZWN0RGl2LmlubmVySFRNTCArPSBgPGgyPiR7cHJvamVjdE9iamVjdC50aXRsZX08L2gyPjxwPiR7W3Byb2plY3RPYmplY3QuZGVzY3JpcHRpb25dfTwvcD5gO1xuICAgICAgICAgICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZCh0b2RvQ29udGFpbmVyKTtcbiAgICAgICAgICAgIGRpc3BsYXkuYXBwZW5kQ2hpbGQocHJvamVjdERpdik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5jb25zdCByZW5kZXJUb2Rvc0ZvclByb2plY3QgPSAocHJvamVjdE9iamVjdCkgPT4ge1xuICAgIGNvbnN0IHRvZG9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHByb2plY3RPYmplY3QudG9kb0xpc3QuZm9yRWFjaCh0b2RvID0+IHtcbiAgICAgICAgY29uc3QgdG9kb0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRvZG9EaXYuaW5uZXJIVE1MICs9IGA8aDM+JHt0b2RvLnRpdGxlfTwvaDM+PHA+JHt0b2RvLmRlc2NyaXB0aW9ufTwvcD48cD4ke3RvZG8uZHVlRGF0ZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPiR7dG9kby5wcmlvcml0eX08L3A+PHA+JHt0b2RvLm5vdGVzfTwvcD5gO1xuICAgICAgICB0b2RvQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9EaXYpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvZG9Db250YWluZXI7XG59XG5cbmNvbnN0IHByb2plY3RCdXR0b25FdmVudExpc3RlbmVyID0gKGRvbUVsZW1lbnRzT2JqZWN0KSA9PiB7XG4gICAgZG9tRWxlbWVudHNPYmplY3QucHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4ge1xuICAgICAgICBkb21FbGVtZW50c09iamVjdC5tb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH0pO1xufVxuXG5jb25zdCBwcm9qZWN0TW9kYWxTYXZlRXZlbnRMaXN0ZW5lciA9IChkb21FbGVtZW50c09iamVjdCkgPT4geyBcbiAgICBkb21FbGVtZW50c09iamVjdC5zYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBkb21FbGVtZW50c09iamVjdC5tb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGl0bGUtcHJvamVjdCcpLnZhbHVlO1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXNjcmlwdGlvbi1wcm9qZWN0JykudmFsdWU7XG5cbiAgICAgICAgZG9tRWxlbWVudHNPYmplY3QuaW5wdXRzLmZvckVhY2goaW5wdXQgID0+IGlucHV0LnZhbHVlID0gJycpO1xuICAgICAgICBhZGRQcm9qZWN0KHRpdGxlLGRlc2NyaXB0aW9uKTtcbiAgICAgICAgbG9hZFByb2plY3RzKCk7XG4gICAgfSk7XG59XG5cbmNvbnN0IGFkZFRvZG9FdmVudExpc3RlbmVycyA9ICgpID0+IHtcbiAgICBjb25zdCBkb21FbGVtZW50c09iamVjdCA9IHtcbiAgICAgICAgdG9kb0J0bnMgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1idG4nKSxcbiAgICAgICAgc2F2ZUJ0biA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zYXZlLXRvZG8nKSxcbiAgICAgICAgY2xvc2VCdG4gOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtdG9kbycpLFxuICAgICAgICBpbnB1dHMgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5wdXRzLXRvZG8nKSxcbiAgICAgICAgbW9kYWwgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdG9kbycpLFxuICAgIH07XG4gICAgXG4gICAgdG9kb0J1dHRvbnNFdmVudExpc3RlbmVyKGRvbUVsZW1lbnRzT2JqZWN0KTtcbiAgICBpZiAoIWV2ZW50TGlzdGVuZXJzSW5pdGlhbGlzZWQpIHtcbiAgICAgICAgY2xvc2VCdXR0b25FdmVudExpc3RlbmVyKGRvbUVsZW1lbnRzT2JqZWN0KTsgXG4gICAgICAgIHRvZG9Nb2RhbFNhdmVFdmVudExpc3RlbmVyKGRvbUVsZW1lbnRzT2JqZWN0KTsgXG4gICAgICAgIGV2ZW50TGlzdGVuZXJzSW5pdGlhbGlzZWQgPSB0cnVlO1xuICAgIH1cbn1cblxuY29uc3QgdG9kb0J1dHRvbnNFdmVudExpc3RlbmVyID0gKGRvbUVsZW1lbnRzT2JqZWN0KSA9PiB7XG4gICAgZG9tRWxlbWVudHNPYmplY3QudG9kb0J0bnMuZm9yRWFjaCggdG9kb0J0biA9PiB7IFxuICAgICAgICB0b2RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdERhdGFJbmRleCA9IGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaW5kZXg7XG5cbiAgICAgICAgICAgIGRvbUVsZW1lbnRzT2JqZWN0LnNhdmVCdG4uZGF0YXNldC5pbmRleCA9IHByb2plY3REYXRhSW5kZXg7XG4gICAgICAgICAgICBkb21FbGVtZW50c09iamVjdC5tb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuY29uc3QgdG9kb01vZGFsU2F2ZUV2ZW50TGlzdGVuZXIgPSAoZG9tRWxlbWVudHNPYmplY3QpID0+IHtcbiAgICBkb21FbGVtZW50c09iamVjdC5zYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBkb21FbGVtZW50c09iamVjdC5tb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgICAgICAgY29uc3QgZm9ybUZpZWxkc09iamVjdCA9IHtcbiAgICAgICAgICAgIHRpdGxlIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpdGxlLXRvZG8nKS52YWx1ZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uLXRvZG8nKS52YWx1ZSxcbiAgICAgICAgICAgIGR1ZURhdGUgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHVlLWRhdGUtdG9kbycpLnZhbHVlLFxuICAgICAgICAgICAgcHJpb3JpdHkgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpb3JpdHktdG9kbycpLnZhbHVlLFxuICAgICAgICAgICAgbm90ZXMgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm90ZXMtdG9kbycpLnZhbHVlLFxuICAgICAgICAgICAgcHJvamVjdCA6IHBhcnNlSW50KGRvbUVsZW1lbnRzT2JqZWN0LnNhdmVCdG4uZGF0YXNldC5pbmRleCkgXG4gICAgICAgIH07XG5cbiAgICAgICAgZG9tRWxlbWVudHNPYmplY3QuaW5wdXRzLmZvckVhY2goaW5wdXQgID0+IGlucHV0LnZhbHVlID0gJycpO1xuICAgICAgICBhZGRUb2RvKGZvcm1GaWVsZHNPYmplY3QpO1xuICAgICAgICBsb2FkUHJvamVjdHMoKTtcbiAgICB9KTsgICAgICAgICAgICBcbn1cblxuY29uc3QgY2xvc2VCdXR0b25FdmVudExpc3RlbmVyID0gKGRvbUVsZW1lbnRzT2JqZWN0KSA9PiB7XG4gICAgZG9tRWxlbWVudHNPYmplY3QuY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGRvbUVsZW1lbnRzT2JqZWN0Lm1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9tRWxlbWVudHNPYmplY3QuaW5wdXRzLmZvckVhY2goIGlucHV0ICA9PiBpbnB1dC52YWx1ZSA9ICcnKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IHsgbG9hZFByb2plY3RzIH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGluaXRQcm9qZWN0cyB9IGZyb20gXCIuL2FwcFwiO1xuaW1wb3J0IHsgbG9hZFByb2plY3RzIH0gZnJvbSBcIi4vZG9tXCJcblxuY29uc3QgcnVuQXBwID0gKCgpPT57XG4gICAgaW5pdFByb2plY3RzKCk7XG4gICAgbG9hZFByb2plY3RzKCk7XG59KSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==