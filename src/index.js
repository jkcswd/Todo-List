import { initProjects } from "./app";
import { loadProjects, getProject, getTodo} from "./dom"

const runApp = (()=>{
    initProjects();
    loadProjects();
})();