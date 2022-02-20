# todolist

ToDoList **[[rep](https://github.com/eugene-serb/todolist), [site](https://eugene-serb.github.io/todolist/)]** on ***JavaScript*** and ***HTML with CSS***. 

This is a simple to-do list web application. Helps you organize tasks and plan projects.

There is a few files:
1. ***index.html*** – file with form and another elements.
2. ***css/todolist.css*** – styles of todolist app, but now part of they in main styles at [this page](https://eugene-serb.github.io/).
3. ***js/todolist.js*** – all scripts in todolist app.
4. ***img/*.svg*** – all pictograms at the app.

Styles now in todolist.css describe sizing and positions block on the page, next made it standalone. Now i recomend use own html form and css styles for your app.

Todolist.js used for all work this app. For work this app need add script to your html:

```html
<script src="js/todolist.js"></script>
```

... and next you need add form elements with css classes:
1. .todoList-form__addTaskButton – button that add element to .todoList-wrapper.
2. .todoList-form__deleteAllTaskButton – button that remove all elements from LocalStorage.
3. .todoList-form__description-task – field with task's text.
4. .todoList-wrapper – field where will placed all tasks elements.

Template for tasks elements placed in todolist.js, const createTemplate().

If you are interested in this or my other projects, or would like to suggest and share ideas with me, or just talk to me, contact me: *[@eugene_serb](https://twitter.com/eugene_serb)*

