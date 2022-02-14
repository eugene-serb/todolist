const addTaskButton = document.querySelector('.todoList-form__addTaskButton');
const deleteAllTaskButton = document.querySelector('.todoList-form__deleteAllTaskButton');
const descriptionTaskInput = document.querySelector('.todoList-form__description-task');
const todoListWrapper = document.querySelector('.todoList-wrapper');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoListItems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
    this.important = false;
};

const createTemplate = (task, index) => {
    return `
        <li class="taskItem ${task.completed ? 'taskItem_completed' : ''} ${task.important ? 'taskItem_important' : ''}">
            <span class="taskItem__description">${task.description}</span>
            <div class="taskItem__buttonsContainer">
                <button onclick="completeTask(${index})" class="taskItem__complete">Ready: ${task.completed ? 'YES' : 'NO'}</button>
                <button onclick="markImportantTask(${index})" class="taskItem__important">Important: ${task.important ? 'YES' : 'NO'}</button>
                <button onclick="deleteTask(${index})" class="taskItem__deleteButton">Delete</button>
            </div>
        </li>`
};

const filterTasks = () => {
    const activeImportantTasks = tasks.length && tasks.filter(item => item.completed == false && item.important == true);
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false && item.important == false);
    const completedImportantTasks = tasks.length && tasks.filter(item => item.completed == true && item.important == true);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true && item.important == false);

    tasks = [...activeImportantTasks, ...activeTasks, ...completedImportantTasks, ...completedTasks];
};

const fillHtmlList = () => {
    todoListWrapper.innerHTML = '';

    if (tasks.length > 0) {

        filterTasks();

        tasks.forEach((item, index) => {
            todoListWrapper.innerHTML += createTemplate(item, index);
        });

        todoListItems = document.querySelectorAll('.taskItem');
    };
};

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const completeTask = (index) => {
    tasks[index].completed = !tasks[index].completed;

    if (tasks[index].completed) {
        todoListItems[index].classList.add('taskItem_completed');
    } else {
        todoListItems[index].classList.remove('taskItem_completed');
    };

    updateLocal();
    fillHtmlList();
};

const markImportantTask = (index) => {
    tasks[index].important = !tasks[index].important;

    updateLocal();
    fillHtmlList();
};

const deleteTask = (index) => {
    todoListItems[index].classList.add('deletion');

    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    }, 500)
};

addTaskButton.addEventListener('click', () => {
    tasks.push(new Task(descriptionTaskInput.value));
    updateLocal();
    fillHtmlList();
    descriptionTaskInput.value = '';
});

deleteAllTaskButton.addEventListener('click', () => {

    todoListItems.forEach((item) => {
        item.classList.add('deletion');
    });

    setTimeout(() => {
        tasks = [];
        updateLocal();
        fillHtmlList();
    }, 500)
});

