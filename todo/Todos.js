import {writeToLS, readFromLS} from './ls.js';
import {qs, setCallbacks, onTouch} from './utilities.js';

let todoList = null;

export default class Todos { 
    constructor(key, element) {
        this.todoList = getTodos(key);
        this.key = key;
        this.element = element;
        this.listTodos();
    }

    addTodo() {
        const input = qs('.new')
        saveTodo(input.value, this.key);
        input.value = '';
        this.todoList = getTodos(this.key);
        this.listTodos();
    }

    completeTodo(event) {
        const id = event.target.dataset.id
        this.todoList[id].completed = !this.todoList[id].completed;
        saveTodos(this.key, this.todoList);
        this.listTodos();
    }

    removeTodo(event) {
        const id = event.target.dataset.id
        this.todoList.splice(id, 1);
        saveTodos(this.key, this.todoList);
        this.listTodos();
    }

    listTodos() {
        renderTodoList(this.todoList, this.element );
        updateCounter(this.remains);
        this.setCallbacks();
    }

    filterTodos() {
        const id = event.target.dataset.id
        this.todoList.forEach(ele => {
            if (id === 'active' && ele.completed ) {
                ele.hide = true
            } else if (id === 'completed' && !ele.completed) {
                ele.hide = true;
            } else {
                ele.hide = false;
            }
        });
        const listElement = qs('.footer-list');
        listElement.className = 'footer-list ' + id;

        this.listTodos(); 
        
    }

    setCallbacks() {
        // complete Todo
        setCallbacks('.checkbox', this.completeTodo.bind(this));
        // remove Todo
        setCallbacks('.remove', this.removeTodo.bind(this));
    }

    init() {
        onTouch('.add', this.addTodo.bind(this));
        onTouch('.all', this.filterTodos.bind(this));
        onTouch('.active', this.filterTodos.bind(this));
        onTouch('.completed', this.filterTodos.bind(this));
    }

    get remains() {
        return this.todoList.filter(ele => !ele.completed).length;
    }
}

/* build a todo object, add it to the todoList, and save the new list to local storage.
@param {string} key The key under which the value is stored under in LS 
@param {string} task The text of the task to be saved.
*/
function saveTodo(task, key) {
    if (!task) return;
    const todo = { id : new Date(), content: task, completed: false }
    todoList.push(todo);
    writeToLS(key, todoList);
}

/* Save the whole list to local storage.
@param {string} key The key under which the value is stored under in LS
@param {list} todoList List of todos
*/
function saveTodos(key, todoList) {
    if (key && todoList) {
        writeToLS(key, todoList);
    }  
}

/* check the contents of todoList, a local variable containing a list of ToDos. If it is null then pull the list of todos from localstorage, update the local variable, and return it
@param {string} key The key under which the value is stored under in LS 
@return {array} The value as an array of objects
*/
function getTodos(key) { 
    todoList = readFromLS(key);
    return todoList;
}

/* foreach todo in list, build a li element for the todo, and append it to element
@param {array} list The list of tasks to render to HTML 
@param {element} element The DOM element to insert our list elements into.
*/
function renderTodoList(list, element) {   
    element.innerHTML = '';
    list.forEach((ele, indx) => {
        if (!ele.hide) {
            const li = document.createElement('li');
            li.id = indx;
            li.innerHTML = ` <div class="${ele.completed ? "checkbox done" : 'checkbox'}" id="checkbox-${indx}" data-id=${indx}></div>
                <div class="${ele.completed ? "detail done" : 'detail'}" >${ele.content}</div>
                <button class="remove" id="remove-${indx}" data-id=${indx}>X</button>`;
            element.appendChild(li);
        }
    });
}

/* foreach todo in list, build a li element for the todo, and append it to element
@param {array} list The list of tasks to render to HTML 
@param {element} element The DOM element to insert our list elements into.
*/
function updateCounter(counter) {   
    const elem = qs('.left');
    elem.innerHTML = `${counter} task left`;
}