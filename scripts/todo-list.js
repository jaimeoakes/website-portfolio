// Array inicial de tarefas

const todoList = JSON.parse(localStorage.getItem('todoList')) || [{
      name: 'make dinner',
      dueDate: '2024-12-22'
  },  {
      name: 'wash dishes',
      dueDate: '2024-12-22'
  },  {
      name: 'Walk the dogs',
      dueDate: '2024-12-22'
  },  {
      name: 'take a shower',
      dueDate: '2024-12-22'
    }
];

// Renderiza a lista de tarefas na tela
renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {

    const { name, dueDate } = todoObject;
    const html = `
      <div>${name}</div> 
      <div>${dueDate}</div>
      <button onclick="
        todoList.splice(${index}, 1);
        renderTodoList();
      " class="delete-todo-button">Delete</button>
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

// Adiciona uma nova tarefa à lista
function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  // Validação para evitar campos vazios
  if (name === '' || dueDate === '') {
    alert('Please fill out both fields');
    return;
  }

  todoList.push({ name, dueDate }); // Adiciona a nova tarefa ao array

  inputElement.value = ''; // Limpa o campo de entrada de texto
  dateInputElement.value = ''; // Limpa o campo de data

  renderTodoList(); // Re-renderiza a lista de tarefas

  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}
