window.onload = function () {

    let todoList = [];

    if (localStorage.getItem('todo') != undefined) {
        todoList = JSON.parse(localStorage.getItem('todo'));
        displayTasks();
    }

    function displayTasks() {
        
        let out = '';

        for (var key in todoList) {
            out += `
                <li ${todoList[key].important ? 'class="important"' : '' }>
                    <input id="item_${key}" type="checkbox" ${todoList[key].check ? "checked" : ""} />
                    <label for="item_${key}">${todoList[key].todo}</label>
                </li>`;
        };

        document.querySelector('#desk').innerHTML = out;
    };

    document.querySelector('#desk').addEventListener('change', () => {
        let idInput = event.target.getAttribute('id');
        let forLabel = document.querySelector('#desk').querySelector('[for=' + idInput + ']');
        let valueLabel = forLabel.innerHTML;

        todoList.forEach(function(item) {
            if (item.todo === valueLabel) {
                item.check = !item.check;
                localStorage.setItem('todo', JSON.stringify(todoList));
            }
        });
    });

    document.querySelector('#desk').addEventListener('contextmenu', function (event) {

        event.preventDefault();

        todoList.forEach(function (item, index) {
            if (item.todo === event.target.innerHTML) {
                if (event.ctrlKey || event.metaKey) {
                    todoList.splice(index, 1);
                } else {
                    item.important = !item.important;
                }
                displayTasks();
                localStorage.setItem('todo', JSON.stringify(todoList));
            }
        });
    });

    document.querySelector('#addButton').onclick = function () {

        const message = document.querySelector('#message');
        if (!message.value) return;

        let newTask = {
            todo: message.value,
            check: false,
            important: false
        };

        todoList.push(newTask);

        displayTasks();
        message.value = '';

        localStorage.setItem('todo', JSON.stringify(todoList));
    };
};

