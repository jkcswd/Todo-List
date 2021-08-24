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

const addProject = (data) => {
    const arr = data.split(',');
    const newProject = new Project(arr[0],arr[1]);
    projects.push(newProject);
}

const addTodo = (data,project) => {
    const arr = data.split(',');
    const newTodo = new Todo(arr[0],arr[1],arr[2],arr[3],arr[4]);

    projects[project].todoList.push(newTodo);
}

const initProjects = () => {
    //Should this be here or in index.js?
    const defaultProject = new Project('Default', 'Default List');
    const exampleTodo = new Todo('Todo', 'example', '1/1/1','1','This is an example todo item', defaultProject);
    defaultProject.addTodoObj(exampleTodo);
    projects.push(defaultProject);
}


export { projects, initProjects, addProject, addTodo };