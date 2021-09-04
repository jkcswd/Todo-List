import { projects,addProject, addTodo } from "./app"

//TODO: fix the bug caused by calling the event listeners for save and close multiple times by refactoring to only call once!!!!

const initialLoadEventListeners = () => {
    //put the save and close modal event listenrs in here and call this once in the index.js run function.
}

const loadProjects = () => {
    const domCountAndProjectObject = {
        projectsDiv : document.querySelector('.projects'),
        count : 0,
        projects : projects
    };

    clearDOM(domCountAndProjectObject.projectsDiv);
    addEachProjectToDom(domCountAndProjectObject);
    addProjectEventListeners(); //bug 
    addTodoEventListeners(); //bug
}

const clearDOM = (projectsDiv) => {
    projectsDiv.innerHTML = ''
    projectsDiv.innerHTML += '<h2>Projects</h2><button class="project-btn">+</button>'
}

const addEachProjectToDom = (domCountAndProjectObject) => {
    domCountAndProjectObject.projects.forEach(project => {
        const projectDiv = document.createElement('div');

        projectDiv.setAttribute('data-index', `${domCountAndProjectObject.count}`);
        domCountAndProjectObject.count++;
        projectDiv.innerHTML += `<h3>${project.title}</h3><p>${project.description}</p>`
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
    closeButtonEventListener(domElementsObject); //bug this should only be called at begining once
    projectModalSaveEventListener(domElementsObject); //bug this should only be called at begining once
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
        addProject(title,description);
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
    closeButtonEventListener(domElementsObject); //bug this should only be called at begining once
    todoModalSaveEventListener(domElementsObject); //bug this should only be called at begining once
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
        addTodo(formFieldsObject);
        loadProjects();
    });            
}

const closeButtonEventListener = (domElementsObject) => {
    domElementsObject.closeBtn.addEventListener('click', () => {
        domElementsObject.modal.style.display = "none";
        domElementsObject.inputs.forEach( input  => input.value = '');
    });
}

export { loadProjects }