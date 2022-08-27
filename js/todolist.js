/* --------- */
/* TODO LIST */
/* --------- */

'use strict';

class Task {
  constructor(description) {
    this.description = description;
    this.completed = false;
    this.important = false;
  };
};

class ToDoList {
  constructor() {
    this.#DOMs();
    this.#eventListeners();

    this.tasks;
    this.#getLocalStorage();
    this.todoListItems = [];

    this.#fillHtmlList();
  };

  completeTask = (index) => {
    this.tasks[index].completed = !this.tasks[index].completed;
    if (this.tasks[index].completed) {
      this.todoListItems[index].classList.add('taskItem_completed');
    } else {
      this.todoListItems[index].classList.remove('taskItem_completed');
    };
    this.#setLocalStorage();
    this.#fillHtmlList();
  };
  markImportantTask = (index) => {
    this.tasks[index].important = !this.tasks[index].important;
    this.#setLocalStorage();
    this.#fillHtmlList();
  };
  deleteTask = (index) => {
    this.todoListItems[index].classList.add('taskItem_deletion');

    setTimeout(() => {
      this.tasks.splice(index, 1);
      this.#setLocalStorage();
      this.#fillHtmlList();
    }, 500);
  };

  #createTemplate = (task, index) => {
    return `
        <li class="taskItem ${task.completed ? 'taskItem_completed' : ''} ${task.important ? 'taskItem_important' : ''}">
            <div class="taskItem__buttonsContainer">
                <button onclick="TODOLIST.completeTask(${index})" class="taskItem__button ${task.completed ? 'taskItem__isCompleted' : 'taskItem__isNotCompleted'}"></button>
                <button onclick="TODOLIST.markImportantTask(${index})" class="taskItem__button ${task.important ? 'taskItem__isImportant' : 'taskItem__isNotImportant'}"></button>
                <button onclick="TODOLIST.deleteTask(${index})" class="taskItem__button taskItem__deleteButton"></button>
            </div>
            <span class="taskItem__description">${task.description}</span>
        </li>`;
  };
  #filterTasks = () => {
    const activeImportantTasks = this.tasks.length && this.tasks.filter(item => item.completed == false && item.important == true);
    const activeTasks = this.tasks.length && this.tasks.filter(item => item.completed == false && item.important == false);
    const completedImportantTasks = this.tasks.length && this.tasks.filter(item => item.completed == true && item.important == true);
    const completedTasks = this.tasks.length && this.tasks.filter(item => item.completed == true && item.important == false);

    this.tasks = [...activeImportantTasks, ...activeTasks, ...completedImportantTasks, ...completedTasks];
  };
  #fillHtmlList = () => {
    this.$todoListWrapper.innerHTML = '';
    if (this.tasks.length > 0) {
      this.#filterTasks();
      this.tasks.forEach((item, index) => {
        this.$todoListWrapper.innerHTML += this.#createTemplate(item, index);
      });
      this.todoListItems = document.querySelectorAll('.taskItem');
    };
  };
  #setLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  };
  #getLocalStorage = () => {
    localStorage.tasks ? this.tasks = JSON.parse(localStorage.getItem('tasks')) : this.tasks = [];
  };

  #DOMs = () => {
    this.$addTaskButton = document.querySelector('.todoList-form__addTaskButton');
    this.$deleteAllTaskButton = document.querySelector('.todoList-form__deleteAllTaskButton');
    this.$descriptionTaskInput = document.querySelector('.todoList-form__description-task');
    this.$todoListWrapper = document.querySelector('.todoList-wrapper');
  };
  #eventListeners = () => {
    this.$addTaskButton.addEventListener('click', () => {
      if (this.$descriptionTaskInput.value) {
        this.tasks.push(new Task(this.$descriptionTaskInput.value));
        this.#setLocalStorage();
        this.#fillHtmlList();
        this.$descriptionTaskInput.value = '';
      };
    });
    this.$deleteAllTaskButton.addEventListener('click', () => {
      this.todoListItems.forEach((item) => {
        item.classList.add('taskItem_deletion');
      });
      setTimeout(() => {
        this.tasks = [];
        this.#setLocalStorage();
        this.#fillHtmlList();
      }, 500);
    });
  };
};

/* -------------- */
/* INITIALIZATION */
/* -------------- */

const TODOLIST = new ToDoList();

