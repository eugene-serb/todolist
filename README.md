# ToDoList
ToDoList in ***JavaScript*** and ***HTML with CSS***. **[[rep](https://github.com/eugene-serb/todolist/), [site](https://eugene-serb.github.io/todolist/)]**.

This is a simple to-do list web application. Helps you organize tasks and plan projects.

There is a few files:
1. ***index.html*** – a file with a form and another elements.
2. ***css/todolist.css*** – styles for the todolist application, but for now some of them are in the main styles on [this page](https://eugene-serb.github.io/).
3. ***css/index.css*** – index of the styles for all the todolist application.
4. ***index.js*** – all scripts in the todolist application.
5. ***img/%file name%.svg*** – all application icons.

Styles now in todolist.css describe the block sizes and the positions of the blocks on the page. I recommend use your own html form and css styles for your application.

Todolist.js is used for the entire operation of this application. For this application to work you need to add a script to your html:

```html
<script src="js/todolist.js"></script>
```

... and then you need to add form elements with CSS classes:
1. .todoList-form__addTaskButton – a button for adding an element to the .todoList-wrapper.
2. .todoList-form__deleteAllTaskButton – a button that deletes all items from LocalStorage.
3. .todoList-form__description-task – field with the text of the task.
4. .todoList-wrapper – the field where all the elements of the tasks will be placed.

Template for task items is in todolist.js, const createTemplate.

If you are interested in this or my other projects, or would like to suggest and share ideas with me, or just talk to me, contact me: *[@eugene_serb](https://t.me/eugene_serb)*
