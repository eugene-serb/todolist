const addTaskButton = document.querySelector('.todoList-form__addTaskButton');
const descriptionTaskInput = document.querySelector('.todoList-form__description-task');
const todoListWrapper = document.querySelector('.todoList-wrapper');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoListItems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
};

const createTemplate = (task, index) => {
    return `
        <li class="taskItem ${task.completed ? 'taskItem_completed' : ''}">
            <span class="taskItem__description">${task.description}</span>
            <input onclick="completeTask(${index})" class="taskItem__complete" type="checkbox" ${task.completed ? 'checked' : ''} />
            <button onclick="deleteTask(${index})" class="taskItem__deleteButton">Delete</button>
        </li>`
};

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks, ...completedTasks];
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

