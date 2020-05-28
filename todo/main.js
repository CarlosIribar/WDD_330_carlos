import Todos from './Todos.js';

window.onload = function(){
    const ul = document.getElementById('list-container');
    let todo = new Todos('myTodo', ul );
    todo.init();
}
