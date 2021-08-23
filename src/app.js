import { Project, Todo } from "./objects";

const createTodo = (title,description,dueDate, priority, notes) => {
    const todo = new Todo(title,description,dueDate, priority, notes);
}
const createProject = (title,description) => {
    const project = new Project(title,description);
}
const deleteTodo = (project,todo) => {

}
const editTodo = () => {

}

export { createTodo, createProject}