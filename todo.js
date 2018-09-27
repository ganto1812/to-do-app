let todoList = {

    todos: [],

    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },

    changeTodo: function(position, todoText) {
        this.todos[position-1].todoText = todoText;
    },

    deleteTodo: function(position) {
        this.todos.splice(position, 1);
    },

    toggleAll: function() {
        let totalTodos = this.todos.length;
        let completedTodos = 0;


        this.todos.forEach(function(todo) {
            if (todo.completed === true) {
                completedTodos++;
            }            
        });

        this.todos.forEach(function(todo) {
            if (completedTodos === totalTodos) {
                todo.completed = false;
            }
            else {
                todo.completed = true;
            }
        })
    }
};


//handlers

let handlers = {
    addTodo: function() {
        let addText = document.getElementById('addText');
        //input.addEventListener('keyUp', function(event) {
            //event.preventDefault();
           // if (event.keyCode === 13) {
            //    document.getElementById("btnAdd").click();
           // }
        //});
        todoList.addTodo(addText.value);
        addText.value = '';
        view.displayTodos();
    },
    changeTodo:function() {
        let changePosition = document.getElementById('changePosition');
        let changeText = document.getElementById('changeText');
        todoList.changeTodo(changePosition.valueAsNumber, changeText.value);
        changePosition.value = '';
        changeText.value = '';
        view.displayTodos();
    },
    deleteTodo: function(position) {
        todoList.deleteTodo(position);
        view.displayTodos();
    },

    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    },
};

let view = {
    displayTodos: function() {
        let todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';

        todoList.todos.forEach(function(todo, position) {
            let todoLi = document.createElement('li');

            todoLi.id = position;
            todoLi.textContent = todo.todoText;
            todoLi.appendChild(this.createDelete());
            todosUl.appendChild(todoLi);
            if (todo.completed === true) {
                todoLi.classList.add('checked')
            }
        }, this);
    },

    createDelete:function () {
        let deleteBtn = document.createElement('i');
        deleteBtn.className = 'fas fa-trash-alt';
        return deleteBtn;
    },

    setUpEventListener: function () {
        let todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', function(event) {

            let elementClicked = event.target;
            if (elementClicked.className === 'fas fa-trash-alt') {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
            else if (elementClicked.tagName === 'LI') {
                elementClicked.classList.toggle('checked');
                if (elementClicked.className === 'checked') {
                    todoList.todos[elementClicked.id].completed = true;
                }
                else {
                    todoList.todos[elementClicked.id].completed = false;
                }
            }

        });
    },

};

view.setUpEventListener();




