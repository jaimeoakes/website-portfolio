// Lista inicial de tarefas
const defaultTodoList = [
  { name: "make dinner", dueDate: "2024-12-22" },
  { name: "wash dishes", dueDate: "2024-12-22" },
  { name: "walk the dogs", dueDate: "2024-12-22" },
  { name: "take a shower", dueDate: "2024-12-22" },
];

// Carrega a lista do localStorage ou inicializa com a lista padrão
let todoList = JSON.parse(localStorage.getItem("todoList"));

if (!todoList || todoList.length === 0) {
  todoList = defaultTodoList;
  localStorage.setItem("todoList", JSON.stringify(todoList)); // Salva no localStorage
}

// Função para renderizar a lista de tarefas
function renderTodoList() {
  let todoListHTML = "";

  todoList.forEach((todo, index) => {
    const { name, dueDate } = todo;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button onclick="
        todoList.splice(${index}, 1);
        saveToStorage();
        renderTodoList();
      " class="delete-todo-button js-delete-todo-button">Delete</button>
    `;
    todoListHTML += html;
  });

  document.querySelector(".js-todo-list").innerHTML = todoListHTML;
}

// Função para salvar no localStorage
function saveToStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

// Adiciona uma nova tarefa
function addTodo() {
  const nameInput = document.querySelector(".js-name-input");
  const dueDateInput = document.querySelector(".js-due-date-input");

  const name = nameInput.value.trim();
  const dueDate = dueDateInput.value;

  if (!name || !dueDate) {
    alert("Please fill out both fields");
    return;
  }

  todoList.push({ name, dueDate }); // Adiciona ao array
  saveToStorage(); // Atualiza no localStorage
  renderTodoList(); // Re-renderiza a lista

  nameInput.value = ""; // Limpa o campo de entrada
  dueDateInput.value = ""; // Limpa o campo de data
}

// Inicializa a lista ao carregar a página
renderTodoList();

// Adiciona evento ao botão "Add"
document.querySelector(".js-add-todo-button").addEventListener("click", addTodo);
