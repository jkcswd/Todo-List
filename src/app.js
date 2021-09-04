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

let projects = []; 

const addProject = (title,description) => {
    const newProject = new Project(title,description);
    projects.push(newProject);
}

const addTodo = (formFieldsObject) => {
    const newTodo = new Todo(formFieldsObject.title,
                             formFieldsObject.description,
                             formFieldsObject.dueDate, 
                             formFieldsObject.priority, 
                             formFieldsObject.notes);

    projects[formFieldsObject.project].addToObj(newTodo);
}

const initProjects = () => {
    const defaultProject = new Project('Default', 'Default List');
    const exampleTodo = new Todo('Todo', 'example', '1/1/1','1','This is an example todo item', defaultProject);
    defaultProject.addTodoObj(exampleTodo);
    projects.push(defaultProject);
}

export { projects, initProjects, addProject, addTodo };