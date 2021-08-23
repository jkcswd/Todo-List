import { projects } from "./app"

const loadProjects = () => {
    const sidebar = document.querySelector('.sidebar');

    projects.forEach(project => {
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

export { loadProjects }