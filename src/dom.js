import { projects,addProject, addTodo } from "./app"

const loadProjects = () => {
    //long function look at splitting
    const projectsDiv = document.querySelector('.projects');
    let count = 0;

    projectsDiv.innerHTML = ''
    projectsDiv.innerHTML += '<h2>Projects</h2><button class="project-btn">+</button>'

    projects.forEach(project => {
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
            const inputs = document.querySelectorAll('.inputs');

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
                  
                addTodo(title,description,dueDate,priority,notes,project);
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
    const inputs = document.querySelectorAll('.inputs');

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

        addProject(title,description);
        loadProjects();
        inputs.forEach(input  => input.value = '');
    });

}

export { loadProjects, getProject, getTodo }