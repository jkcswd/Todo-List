import { initProjects } from "./app";
import { loadProjects } from "./dom"

const runApp = (()=>{
    initProjects();
    loadProjects();
})();