let todoList = JSON.parse(localStorage.getItem('todoList')) || [];


renderTodoList();

document.querySelector('.js-add-btn')
    .addEventListener('click', () => {
        addTodo()
    })

document.querySelector('.js-reset-btn')
    .addEventListener('click', () => {
        resetList()
    })

function addTodo() {
    const newTodoElement = document.querySelector('.js-name-input');
    const newTodoDateElement = document.querySelector('.js-date-input');
    const name = newTodoElement.value;
    let dueDate = newTodoDateElement.value;

    if (!newTodoDateElement.value) {
        dueDate = '(no deadline)'
    }

    todoList.push({
        name,
        dueDate
    });

    renderTodoList();
    
    newTodoElement.value = '';
    newTodoDateElement.value = '';
    
}

function onKeyDown(event) {
    if (event.key === 'Enter')
    {addTodo()}
}

function resetList() {
    todoList = [];
    renderTodoList();
}

function renderTodoList() {
    let todoListHTML = '';
    for (i = 0; i < todoList.length; i++) {
        const todoObject = todoList[i];
        const name = todoObject.name;
        const dueDate = todoObject.dueDate;
        const html = `
        <div class="new-task">
            <span class="to-do">${name}</span>
            <span class="due-date">${dueDate}</span>
            <button class="delete-btn js-delete-btn">
            Delete</button>
        </div>
        `

        todoListHTML += html;
        saveToStorage();
    }
    
        
    let htmlTaskList = document.querySelector('.js-task-list')
    htmlTaskList.innerHTML = todoListHTML;

    document.querySelectorAll('.js-delete-btn')
        .forEach((deleteButton, index)=>{
            deleteButton.addEventListener('click',()=>{
            todoList.splice(index, 1);
            renderTodoList()
            })
        })
}

function saveToStorage() {
    localStorage.setItem('todoList',JSON.stringify(todoList));
}