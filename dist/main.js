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

const addTodo = (title,description,dueDate, priority, notes, project) => {
    const newTodo = new Todo(title,description,dueDate, priority, notes);

    projects[project].todoList.push(newTodo);
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
/* harmony export */   "loadProjects": () => (/* binding */ loadProjects),
/* harmony export */   "getProject": () => (/* binding */ getProject),
/* harmony export */   "getTodo": () => (/* binding */ getTodo)
/* harmony export */ });
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/app.js");


const loadProjects = () => {
    //long function look at splitting
    const projectsDiv = document.querySelector('.projects');
    let count = 0;

    projectsDiv.innerHTML = ''
    projectsDiv.innerHTML += '<h2>Projects</h2><button class="project-btn">+</button>'

    _app__WEBPACK_IMPORTED_MODULE_0__.projects.forEach(project => {
        //O(n^2) canditate for refactor.
        const projectDiv = document.createElement('div');

        projectDiv.setAttribute('data-index', `${count}`);
        count++;
        projectDiv.innerHTML += `<h3>${project.title}</h3><p>${project.description}</p>`
        projectsDiv.appendChild(projectDiv);

        project.todoList.forEach(todo  => {
            const todoDiv = document.createElement('div');

            todoDiv.innerHTML += todo.title;
            projectDiv.appendChild(todoDiv);
        });
        const todoBtn = document.createElement('button');

        todoBtn.classList.add('todo-btn');
        todoBtn.innerHTML = '+';
        projectDiv.appendChild(todoBtn);
    });

    getProject();
    getTodo();
}

const getTodo = () => {
    const todoBtns = document.querySelectorAll('.todo-btn');

    [...todoBtns].forEach( todoBtn => {
        todoBtn.addEventListener('click', (e)=> {
            const project = parseInt(e.currentTarget.parentElement.dataset.index);
            const modal = document.querySelector('.modal-todo');
            const saveBtn = document.querySelector('.save-todo');
            const closeBtn = document.querySelector('.close-todo');
            const inputs = document.querySelectorAll('.inputs-todo');

            modal.style.display = "block";

            closeBtn.addEventListener('click', () => {
                modal.style.display = "none";
                inputs.forEach( input  => input.value = '');
            });
        
            saveBtn.addEventListener('click', () => {
                modal.style.display = "none";
                const title = document.querySelector('.title-todo').value;
                const description = document.querySelector('.description-todo').value;
                const dueDate = document.querySelector('.due-date-todo').value;
                const priority = document.querySelector('.priority-todo').value;
                const notes = document.querySelector('.notes-todo').value;
                  
                (0,_app__WEBPACK_IMPORTED_MODULE_0__.addTodo)(title,description,dueDate,priority,notes,project);
                loadProjects();
                inputs.forEach(input  => input.value = '');
            });            
        })
    })
}

const getProject = () => {
    const projectBtn = document.querySelector('.project-btn');
    const modal = document.querySelector('.modal-project');
    const saveBtn = document.querySelector('.save-project');
    const closeBtn = document.querySelector('.close-project');
    const inputs = document.querySelectorAll('.inputs-project');

    projectBtn.addEventListener('click', ()=> {
        modal.style.display = "block";
    });
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
        inputs.forEach( input  => input.value = '');
    });

    saveBtn.addEventListener('click', () => {
        modal.style.display = "none";
        const title = document.querySelector('.title-project').value;
        const description = document.querySelector('.description-project').value;

        (0,_app__WEBPACK_IMPORTED_MODULE_0__.addProject)(title,description);
        loadProjects();
        inputs.forEach(input  => input.value = '');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQjs7QUFFbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JFb0Q7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsSUFBSSxrREFBZ0I7QUFDcEI7QUFDQTs7QUFFQSxpREFBaUQsTUFBTTtBQUN2RDtBQUNBLHVDQUF1QyxjQUFjLFVBQVUsb0JBQW9CO0FBQ25GOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsNkNBQU87QUFDdkI7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxnREFBVTtBQUNsQjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7Ozs7Ozs7VUMvRkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOcUM7QUFDbUI7O0FBRXhEO0FBQ0EsSUFBSSxrREFBWTtBQUNoQixJQUFJLGtEQUFZO0FBQ2hCLENBQUMsSSIsInNvdXJjZXMiOlsid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Ub2RvLUxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Ub2RvLUxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVG9kbyB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsZGVzY3JpcHRpb24sZHVlRGF0ZSwgcHJpb3JpdHksIG5vdGVzKXtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgdGhpcy5ub3RlcyA9IG5vdGVzO1xuICAgIH1cblxuICAgIHNldCBzZXRUaXRsZSh0aXRsZSkge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgfVxuXG4gICAgc2V0IHNldERlc2NpcHRpb24oZGVzYykge1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzYztcbiAgICB9XG5cbiAgICBzZXQgc2V0RGF0ZShkYXRlKSB7XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGRhdGU7XG4gICAgfVxuXG4gICAgc2V0IHNldFByaW9yaXR5KHByaW8pIHtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW87XG4gICAgfVxuXG4gICAgc2V0IHNldE5vdGVzKG5vdGVzKSB7XG4gICAgICAgIHRoaXMubm90ZXMgPSBub3RlcztcbiAgICB9XG59XG5cbmNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLGRlc2NyaXB0aW9uKXtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMudG9kb0xpc3QgPSBbXTtcbiAgICB9XG5cbiAgICBzZXQgc2V0VGl0bGUodGl0bGUpe1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgfVxuXG4gICAgc2V0IHNldERlc2NpcHRpb24oZGVzYyl7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjO1xuICAgIH1cblxuICAgIGFkZFRvZG9PYmoodG9kb09iaikge1xuICAgICAgICB0aGlzLnRvZG9MaXN0LnB1c2godG9kb09iailcbiAgICB9XG59XG5cbmxldCBwcm9qZWN0cyA9IFtdOyAvL2RhdGEgaG9sZGVyIFxuXG5jb25zdCBhZGRQcm9qZWN0ID0gKHRpdGxlLGRlc2NyaXB0aW9uKSA9PiB7XG4gICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHRpdGxlLGRlc2NyaXB0aW9uKTtcbiAgICBwcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xufVxuXG5jb25zdCBhZGRUb2RvID0gKHRpdGxlLGRlc2NyaXB0aW9uLGR1ZURhdGUsIHByaW9yaXR5LCBub3RlcywgcHJvamVjdCkgPT4ge1xuICAgIGNvbnN0IG5ld1RvZG8gPSBuZXcgVG9kbyh0aXRsZSxkZXNjcmlwdGlvbixkdWVEYXRlLCBwcmlvcml0eSwgbm90ZXMpO1xuXG4gICAgcHJvamVjdHNbcHJvamVjdF0udG9kb0xpc3QucHVzaChuZXdUb2RvKTtcbn1cblxuY29uc3QgaW5pdFByb2plY3RzID0gKCkgPT4ge1xuICAgIC8vU2hvdWxkIHRoaXMgYmUgaGVyZSBvciBpbiBpbmRleC5qcz9cbiAgICBjb25zdCBkZWZhdWx0UHJvamVjdCA9IG5ldyBQcm9qZWN0KCdEZWZhdWx0JywgJ0RlZmF1bHQgTGlzdCcpO1xuICAgIGNvbnN0IGV4YW1wbGVUb2RvID0gbmV3IFRvZG8oJ1RvZG8nLCAnZXhhbXBsZScsICcxLzEvMScsJzEnLCdUaGlzIGlzIGFuIGV4YW1wbGUgdG9kbyBpdGVtJywgZGVmYXVsdFByb2plY3QpO1xuICAgIGRlZmF1bHRQcm9qZWN0LmFkZFRvZG9PYmooZXhhbXBsZVRvZG8pO1xuICAgIHByb2plY3RzLnB1c2goZGVmYXVsdFByb2plY3QpO1xufVxuXG5cbmV4cG9ydCB7IHByb2plY3RzLCBpbml0UHJvamVjdHMsIGFkZFByb2plY3QsIGFkZFRvZG8gfTsiLCJpbXBvcnQgeyBwcm9qZWN0cyxhZGRQcm9qZWN0LCBhZGRUb2RvIH0gZnJvbSBcIi4vYXBwXCJcblxuY29uc3QgbG9hZFByb2plY3RzID0gKCkgPT4ge1xuICAgIC8vbG9uZyBmdW5jdGlvbiBsb29rIGF0IHNwbGl0dGluZ1xuICAgIGNvbnN0IHByb2plY3RzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzJyk7XG4gICAgbGV0IGNvdW50ID0gMDtcblxuICAgIHByb2plY3RzRGl2LmlubmVySFRNTCA9ICcnXG4gICAgcHJvamVjdHNEaXYuaW5uZXJIVE1MICs9ICc8aDI+UHJvamVjdHM8L2gyPjxidXR0b24gY2xhc3M9XCJwcm9qZWN0LWJ0blwiPis8L2J1dHRvbj4nXG5cbiAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICAvL08obl4yKSBjYW5kaXRhdGUgZm9yIHJlZmFjdG9yLlxuICAgICAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgcHJvamVjdERpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBgJHtjb3VudH1gKTtcbiAgICAgICAgY291bnQrKztcbiAgICAgICAgcHJvamVjdERpdi5pbm5lckhUTUwgKz0gYDxoMz4ke3Byb2plY3QudGl0bGV9PC9oMz48cD4ke3Byb2plY3QuZGVzY3JpcHRpb259PC9wPmBcbiAgICAgICAgcHJvamVjdHNEaXYuYXBwZW5kQ2hpbGQocHJvamVjdERpdik7XG5cbiAgICAgICAgcHJvamVjdC50b2RvTGlzdC5mb3JFYWNoKHRvZG8gID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRvZG9EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICAgICAgdG9kb0Rpdi5pbm5lckhUTUwgKz0gdG9kby50aXRsZTtcbiAgICAgICAgICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQodG9kb0Rpdik7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB0b2RvQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cbiAgICAgICAgdG9kb0J0bi5jbGFzc0xpc3QuYWRkKCd0b2RvLWJ0bicpO1xuICAgICAgICB0b2RvQnRuLmlubmVySFRNTCA9ICcrJztcbiAgICAgICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZCh0b2RvQnRuKTtcbiAgICB9KTtcblxuICAgIGdldFByb2plY3QoKTtcbiAgICBnZXRUb2RvKCk7XG59XG5cbmNvbnN0IGdldFRvZG8gPSAoKSA9PiB7XG4gICAgY29uc3QgdG9kb0J0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1idG4nKTtcblxuICAgIFsuLi50b2RvQnRuc10uZm9yRWFjaCggdG9kb0J0biA9PiB7XG4gICAgICAgIHRvZG9CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pbmRleCk7XG4gICAgICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10b2RvJyk7XG4gICAgICAgICAgICBjb25zdCBzYXZlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNhdmUtdG9kbycpO1xuICAgICAgICAgICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtdG9kbycpO1xuICAgICAgICAgICAgY29uc3QgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmlucHV0cy10b2RvJyk7XG5cbiAgICAgICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbiAgICAgICAgICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICBpbnB1dHMuZm9yRWFjaCggaW5wdXQgID0+IGlucHV0LnZhbHVlID0gJycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgc2F2ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGl0bGUtdG9kbycpLnZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uLXRvZG8nKS52YWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmR1ZS1kYXRlLXRvZG8nKS52YWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmlvcml0eS10b2RvJykudmFsdWU7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm90ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm90ZXMtdG9kbycpLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYWRkVG9kbyh0aXRsZSxkZXNjcmlwdGlvbixkdWVEYXRlLHByaW9yaXR5LG5vdGVzLHByb2plY3QpO1xuICAgICAgICAgICAgICAgIGxvYWRQcm9qZWN0cygpO1xuICAgICAgICAgICAgICAgIGlucHV0cy5mb3JFYWNoKGlucHV0ICA9PiBpbnB1dC52YWx1ZSA9ICcnKTtcbiAgICAgICAgICAgIH0pOyAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmNvbnN0IGdldFByb2plY3QgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWJ0bicpO1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLXByb2plY3QnKTtcbiAgICBjb25zdCBzYXZlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNhdmUtcHJvamVjdCcpO1xuICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlLXByb2plY3QnKTtcbiAgICBjb25zdCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5wdXRzLXByb2plY3QnKTtcblxuICAgIHByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IHtcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9KTtcbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBpbnB1dHMuZm9yRWFjaCggaW5wdXQgID0+IGlucHV0LnZhbHVlID0gJycpO1xuICAgIH0pO1xuXG4gICAgc2F2ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aXRsZS1wcm9qZWN0JykudmFsdWU7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uLXByb2plY3QnKS52YWx1ZTtcblxuICAgICAgICBhZGRQcm9qZWN0KHRpdGxlLGRlc2NyaXB0aW9uKTtcbiAgICAgICAgbG9hZFByb2plY3RzKCk7XG4gICAgICAgIGlucHV0cy5mb3JFYWNoKGlucHV0ICA9PiBpbnB1dC52YWx1ZSA9ICcnKTtcbiAgICB9KTtcblxufVxuXG5leHBvcnQgeyBsb2FkUHJvamVjdHMsIGdldFByb2plY3QsIGdldFRvZG8gfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgaW5pdFByb2plY3RzIH0gZnJvbSBcIi4vYXBwXCI7XG5pbXBvcnQgeyBsb2FkUHJvamVjdHMsIGdldFByb2plY3QsIGdldFRvZG99IGZyb20gXCIuL2RvbVwiXG5cbmNvbnN0IHJ1bkFwcCA9ICgoKT0+e1xuICAgIGluaXRQcm9qZWN0cygpO1xuICAgIGxvYWRQcm9qZWN0cygpO1xufSkoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=