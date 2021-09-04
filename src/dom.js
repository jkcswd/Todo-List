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



const getTodo = () => {
    const domElementsObject = {
        todoBtns : document.querySelectorAll('.todo-btn'),
        saveBtn : document.querySelector('.save-todo'),
        closeBtn : document.querySelector('.close-todo'),
        inputs : document.querySelectorAll('.inputs-todo'),
        modal : document.querySelector('.modal-todo'),
        project : null
    }
    
    todoBtns.forEach( todoBtn => { 
        todoBtn.addEventListener('click', (e)=> {
            modal.style.display = "block";
            project = parseInt(e.currentTarget.parentElement.dataset.index);
        });
    });
    
    closeButton(domElementsObject);
    
    saveBtn.addEventListener('click', () => {
        modal.style.display = "none";
        const title = document.querySelector('.title-todo').value;
        const description = document.querySelector('.description-todo').value;
        const dueDate = document.querySelector('.due-date-todo').value;
        const priority = document.querySelector('.priority-todo').value;
        const notes = document.querySelector('.notes-todo').value;

        inputs.forEach(input  => input.value = '');
        addTodo(title,description,dueDate,priority,notes,project);
        loadProjects();
    });            
}

const getProject = () => { //gets called multiple times???
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

        inputs.forEach(input  => input.value = '');
        addProject(title,description);
        loadProjects();
    });
}

const closeButton = (domElementsObject) => {
    domElementsObject.closeBtn.addEventListener('click', () => {
        domElementsObject.modal.style.display = "none";
        domElementsObject.inputs.forEach( input  => input.value = '');
    });
}

export { loadProjects }