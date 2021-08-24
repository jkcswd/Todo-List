import { projects,addProject, addTodo } from "./app"

const loadProjects = () => {
    const projectsDiv = document.querySelector('.projects');

    projectsDiv.innerHTML = ''
    projectsDiv.innerHTML += '<h2>Projects</h2><button class="project-btn">+</button>'

    projects.forEach(project => {
        //O(n^2) canditate for refactor.
        const projectDiv = document.createElement('div');

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
    const todoBtn = document.querySelector('.todo-btn');

    todoBtn.addEventListener('click', ()=> {
        const data = prompt('Add todo, format: title, description, dueDate, priority, notes');

        addTodo(data);
        loadProjects();
        
    })

}
const getProject = () => {
    const projectBtn = document.querySelector('.project-btn');

    projectBtn.addEventListener('click', ()=> {
        const data = prompt('Add Project, format: title, description');

        addProject(data);
        loadProjects();
    })

}

export { loadProjects, getProject, getTodo }