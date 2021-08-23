class Todo {
    constructor(title,description,dueDate, priority, notes){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }
}

class Project {
    constructor(title,description){
        this.title = title;
        this.description = description;
        this.todoList = [];
    }

    addTodoObj(todoObj) {
        this.todoList.push(todoObj)
    }
}

const populateProjects = ()=> {

}

const deleteTodo = (project,todo) => {

}
const editTodo = () => {

}

export { };