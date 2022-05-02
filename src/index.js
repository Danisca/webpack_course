//normal way to require a file
// import Template from './templates/Template.js';
// console.log(Template);
// import "./styles/main.css"

//using alias to manage files's routes
import Template from "@templates/Template.js"
import "@styles/main.css";

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
