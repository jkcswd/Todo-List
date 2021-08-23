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
/* harmony export */   "initProjects": () => (/* binding */ initProjects)
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

const initProjects = () => {
    //Should this be here or in index.js?
    const defaultProject = new Project('Default', 'Default List');
    const exampleTodo = new Todo('Todo', 'example', '1/1/1',1,'This is an example todo item', defaultProject);
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


const loadProjects = () => {
    const sidebar = document.querySelector('.sidebar');

    _app__WEBPACK_IMPORTED_MODULE_0__.projects.forEach(project => {
        //O(n^2) canditate for refactor.
        const projectDiv = document.createElement('div');

        projectDiv.innerHTML += `<h3>${project.title}</h3><p>${project.description}</p>`
        sidebar.appendChild(projectDiv);

        project.todoList.forEach(todo  => {
            const todoDiv = document.createElement('div');

            todoDiv.innerHTML += todo.title;
            projectDiv.appendChild(todoDiv);


        })
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



(0,_app__WEBPACK_IMPORTED_MODULE_0__.initProjects)();
(0,_dom__WEBPACK_IMPORTED_MODULE_1__.loadProjects)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUI7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRGdDOztBQUVoQztBQUNBOztBQUVBLElBQUksa0RBQWdCO0FBQ3BCO0FBQ0E7O0FBRUEsdUNBQXVDLGNBQWMsVUFBVSxvQkFBb0I7QUFDbkY7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQSxTQUFTO0FBQ1QsS0FBSztBQUNMOzs7Ozs7OztVQ3JCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ04rQztBQUNYOztBQUVwQyxrREFBWTtBQUNaLGtEQUFZLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ub2RvLUxpc3QvLi9zcmMvYXBwLmpzIiwid2VicGFjazovL1RvZG8tTGlzdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1RvZG8tTGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vVG9kby1MaXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRvZG8ge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLGRlc2NyaXB0aW9uLGR1ZURhdGUsIHByaW9yaXR5LCBub3Rlcyl7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgIHRoaXMubm90ZXMgPSBub3RlcztcbiAgICB9XG5cbiAgICBzZXQgc2V0VGl0bGUodGl0bGUpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIH1cblxuICAgIHNldCBzZXREZXNjaXB0aW9uKGRlc2MpIHtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2M7XG4gICAgfVxuXG4gICAgc2V0IHNldERhdGUoZGF0ZSkge1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkYXRlO1xuICAgIH1cblxuICAgIHNldCBzZXRQcmlvcml0eShwcmlvKSB7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvO1xuICAgIH1cblxuICAgIHNldCBzZXROb3Rlcyhub3Rlcykge1xuICAgICAgICB0aGlzLm5vdGVzID0gbm90ZXM7XG4gICAgfVxufVxuXG5jbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSxkZXNjcmlwdGlvbil7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLnRvZG9MaXN0ID0gW107XG4gICAgfVxuXG4gICAgc2V0IHNldFRpdGxlKHRpdGxlKXtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIH1cblxuICAgIHNldCBzZXREZXNjaXB0aW9uKGRlc2Mpe1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzYztcbiAgICB9XG5cbiAgICBhZGRUb2RvT2JqKHRvZG9PYmopIHtcbiAgICAgICAgdGhpcy50b2RvTGlzdC5wdXNoKHRvZG9PYmopXG4gICAgfVxufVxuXG5sZXQgcHJvamVjdHMgPSBbXTsgLy9kYXRhIGhvbGRlciBcblxuY29uc3QgaW5pdFByb2plY3RzID0gKCkgPT4ge1xuICAgIC8vU2hvdWxkIHRoaXMgYmUgaGVyZSBvciBpbiBpbmRleC5qcz9cbiAgICBjb25zdCBkZWZhdWx0UHJvamVjdCA9IG5ldyBQcm9qZWN0KCdEZWZhdWx0JywgJ0RlZmF1bHQgTGlzdCcpO1xuICAgIGNvbnN0IGV4YW1wbGVUb2RvID0gbmV3IFRvZG8oJ1RvZG8nLCAnZXhhbXBsZScsICcxLzEvMScsMSwnVGhpcyBpcyBhbiBleGFtcGxlIHRvZG8gaXRlbScsIGRlZmF1bHRQcm9qZWN0KTtcbiAgICBkZWZhdWx0UHJvamVjdC5hZGRUb2RvT2JqKGV4YW1wbGVUb2RvKTtcbiAgICBwcm9qZWN0cy5wdXNoKGRlZmF1bHRQcm9qZWN0KTtcbn1cblxuXG5leHBvcnQgeyBwcm9qZWN0cywgaW5pdFByb2plY3RzIH07IiwiaW1wb3J0IHsgcHJvamVjdHMgfSBmcm9tIFwiLi9hcHBcIlxuXG5jb25zdCBsb2FkUHJvamVjdHMgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyk7XG5cbiAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICAvL08obl4yKSBjYW5kaXRhdGUgZm9yIHJlZmFjdG9yLlxuICAgICAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgcHJvamVjdERpdi5pbm5lckhUTUwgKz0gYDxoMz4ke3Byb2plY3QudGl0bGV9PC9oMz48cD4ke3Byb2plY3QuZGVzY3JpcHRpb259PC9wPmBcbiAgICAgICAgc2lkZWJhci5hcHBlbmRDaGlsZChwcm9qZWN0RGl2KTtcblxuICAgICAgICBwcm9qZWN0LnRvZG9MaXN0LmZvckVhY2godG9kbyAgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9kb0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgICAgICB0b2RvRGl2LmlubmVySFRNTCArPSB0b2RvLnRpdGxlO1xuICAgICAgICAgICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZCh0b2RvRGl2KTtcblxuXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5cbmV4cG9ydCB7IGxvYWRQcm9qZWN0cyB9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBpbml0UHJvamVjdHMsIHByb2plY3RzIH0gZnJvbSBcIi4vYXBwXCI7XG5pbXBvcnQgeyBsb2FkUHJvamVjdHMgfSBmcm9tIFwiLi9kb21cIlxuXG5pbml0UHJvamVjdHMoKTtcbmxvYWRQcm9qZWN0cygpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==