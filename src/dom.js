import { projects,addProject, addTodo } from "./app"

const loadProjects = () => {
    const projectsDiv = document.querySelector('.projects');
    let count = 0;

    clearDOM(projectsDiv);

    projects.forEach(project => {
        const projectDiv = document.createElement('div');

        projectDiv.setAttribute('data-index', `${count}`);
        count++;
        projectDiv.innerHTML += `<h3>${project.title}</h3><p>${project.description}</p>`
        projectsDiv.appendChild(projectDiv);

        loadTodoItems(project, projectDiv);
        addTodoButton(projectDiv);
    });

    getProject();
    getTodo();
}

const clearDOM = (projectsDiv) => {
    projectsDiv.innerHTML = ''
    projectsDiv.innerHTML += '<h2>Projects</h2><button class="project-btn">+</button>'
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

const getProject = () => { //gets called multiple times???
    const domElementsObject = {
        projectBtn : document.querySelector('.project-btn'),
        modal : document.querySelector('.modal-project'),
        saveBtn : document.querySelector('.save-project'),
        closeBtn : document.querySelector('.close-project'),
        inputs : document.querySelectorAll('.inputs-project')
    }
    
    projectButtonEventListener(domElementsObject);
    closeButtonEventListener(domElementsObject);
    projectModalSaveEventListener(domElementsObject);
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

const getTodo = () => {
    const domElementsObject = {
        todoBtns : document.querySelectorAll('.todo-btn'),
        saveBtn : document.querySelector('.save-todo'),
        closeBtn : document.querySelector('.close-todo'),
        inputs : document.querySelectorAll('.inputs-todo'),
        modal : document.querySelector('.modal-todo'),
        project : null
    };
    
    todoButtonsEventListener(domElementsObject);
    closeButtonEventListener(domElementsObject);
    todoModalSaveEventListener(domElementsObject);
}

const todoButtonsEventListener = (domElementsObject) => {
    domElementsObject.todoBtns.forEach( todoBtn => { 
        todoBtn.addEventListener('click', (e)=> {
            domElementsObject.modal.style.display = "block";
            domElementsObject.project = parseInt(e.currentTarget.parentElement.dataset.index);
        });
    });
}

const closeButtonEventListener = (domElementsObject) => {
    domElementsObject.closeBtn.addEventListener('click', () => {
        domElementsObject.modal.style.display = "none";
        domElementsObject.inputs.forEach( input  => input.value = '');
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
            project : domElementsObject.project
        };

        domElementsObject.inputs.forEach(input  => input.value = '');
        addTodo(formFieldsObject);
        loadProjects();
    });            
}

export { loadProjects }