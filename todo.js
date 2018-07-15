let todoList = {

    todos: [],
    
    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },

    changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
    },

    deleteTodo: function(position) {
        this.todos.splice(position, 1);
    },

    toggleCompleted: function(position) {
        let todo = this.todos[position];
        todo.completed = !todo.completed;
    },

    toggleAll: function() {
        let totalTodos = this.todos.length;
        let completedTodos = 0;

        for (let i=0; i<totalTodos; i++) {
            if (this.todos[i].completed === true) {
                completedTodos++;
            }
        }
        if (totalTodos === completedTodos) {
            for (let i=0; i<totalTodos; i++) {
                this.todos[i].completed = false;
            }
        }
        else {
            for (let i=0; i<totalTodos; i++) {
                this.todos[i].completed = true;
            }
        }
    }
};
//handlers

let handlers = {
    addTodo: function() {
        let addText = document.getElementById('addText');
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
    deleteTodo: function() {
        let deletePosition = document.getElementById('deletePosition');
        todoList.deleteTodo(deletePosition.valueAsNumber);
        deletePosition = '';
        view.displayTodos();
    },
    toggleCompleted: function() {
        let completedPosition =  document.getElementById('completedPosition');
        todoList.toggleCompleted(completedPosition.valueAsNumber);
        completedPosition = '';
        view.displayTodos();

    },
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    }
};

let view = {
    displayTodos: function() {
        let todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';

        for (let i = 0; i < todoList.todos.length; i++) {   
            let todoLi = document.createElement('li');
            let todo = todoList.todos[i];
            let todoTextCompleted = '';

            if (todo.completed === true) {
                todoTextCompleted = '(X) ' + todo.todoText;
            }
            else {
                todoTextCompleted = '( ) ' + todo.todoText;
            }

            todoLi.textContent = todoTextCompleted;
            todosUl.appendChild(todoLi);
        }
    }
}


/*todoList.addTodo("item 1");
todoList.addTodo("item 2");
todoList.addTodo("item 3");
todoList.changeTodo(0, "first change");
todoList.toggleCompleted(0);
todoList.toggleAll();
todoList.displayTodos();
todoList.toggleAll();*/

