//localStorage.removeItem('todo');
let isDarkMode = false;
const moon = document.querySelector('#moon');
const headerText = document.querySelector('.header-text');
const icon = document.querySelector('#icon');

const header = document.querySelector('.header');

const inputElem = document.querySelector('.js-input');

const dateElem = document.querySelector('.js-date');
const timeElem = document.querySelector('.js-time');
const addButton = document.querySelector('.addButton');
const inputCon = document.querySelector('.js');

/* Icon animation */
moon.addEventListener(
  'click', 
  () => { 
    if (icon.classList.contains('fa-moon')) {
      setTimeout(() => {
        isDarkMode = true;
        headerText.innerHTML = 'Dark mode'
        document.querySelectorAll('.todo-card').forEach(
          (btm) => {
            btm.style.background = '#2a213d';
          }
        );
        inputCon.style.background = 'black';
        timeElem.style.background = 'black';
        inputElem.style.background = 'black';
        dateElem.style.background = 'black';
        document.body.style.background = '#121212';
        document.body.style.color = '#fff';
        header.style.background = 'black';
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }, 150);
    } else if (icon.classList.contains('fa-sun')) {
      setTimeout(() => {
        isDarkMode = false;
        headerText.innerHTML = 'Light mode'
        document.querySelectorAll('.todo-card').forEach(
          (btn) => {
            btn.style.background = '#f3f0ff';
          }
        );
        inputCon.style.background = 'whitesmoke';
        timeElem.style.background = 'whitesmoke';
        inputElem.style.background = 'whitesmoke';
        dateElem.style.background = 'whitesmoke';
        document.body.style.background = '#fff';
        document.body.style.color = 'black';
        header.style.background = 'whitesmoke';
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }, 150);
    }
  }
);

/* Fade-in animation for hero-text */
let hero = document.querySelector('.hero-text');

setTimeout(() => {
  hero.style.opacity = 1;
  hero.style.transform = 'translateY(0px)';
}, 500);

/* todolist */
const todo = [];

try {
  const savedTodosString = localStorage.getItem('todo');
  let savedTodos;

  if (savedTodosString !== 'undefined' && savedTodosString !== null) {
    savedTodos = JSON.parse(savedTodosString);
  }

  if (Array.isArray(savedTodos)) {
    todo.push(...savedTodos);
    renderTodoList();
  }
} catch (e) {
  console.log('error');
}

function renderTodoList() {
  let displayTodoList = '';

  for (let i = 0; i < todo.length; i++) {
    const todoList = todo[i];
    const name = todoList.name;
    const date = todoList.date;
    const time = todoList.formattedTime;

    let background = '';
    if (isDarkMode === true) {
      background = '#2a213d';
    } else if (isDarkMode === false) {
      background = '#f3f0ff';
    }

    const html = `
      <div class="todo-card p-4 flex flex-col max-w-md md:p-6" style="background: ${background}">
      <div class="flex flex-row justify-between text-xs space-x-4 text-gray-500 md:text-base"
        <p class="text-left">${date}</p>
        <p>${time}</p>
        </div>
        <p class="text text-sm text-center whitespace-normal break-all mt-2 mb-2 md:text-xl">${name}</p>
        <div class="flex justify-end">
          <button onclick="deleteToDo(${i})" class="text-red-500 text-sm hover:text-red-700 select-none">Delete</button>
        </div>
      </div>
    `;

    displayTodoList += html;
    
  }

  document.querySelector('.containTodo').innerHTML = displayTodoList;
  observeTodoCards();
}

function addToDo() {
  const name = inputElem.value.trim();
  const date = dateElem.value.trim();
  
  
  
const time = timeElem.value
const hour = parseInt(time.split(":")[0]);
  
  const minute = time.split(":")[1];
  let period = '';
  if (hour >= 12) {
    period = 'pm';
  }
  else {
    period = 'am';
  }
  const formattedTime = `${hour}:${minute} ${period}`;
  const toast = document.querySelector('.toast');
  
  
  if (name === '' || date === '' || time === '') {
    toast.innerHTML = 'Enter a task, a due date and due time';
     toast.style.opacity = 1;
    toast.style.transition = 'none';
       toast.style.background = 'indianred';
    setTimeout(() => {
      toast.style.opacity = 0;
      toast.style.transition = 'all 1s ease';
    }, 2000);
    return;
  } else {
    toast.innerHTML = '<p>Your task has been created</p>';
    toast.style.transform = `translateX(0)`;
    toast.style.opacity = 1;
    toast.style.transition = 'none';
        toast.style.background = 'lawngreen';
        hero.innerHTML = 'My Task';
    setTimeout(() => {
      toast.style.opacity = 0;
      toast.style.transition = 'all 1s ease';
    }, 2000);

    
    todo.push({ name, date, formattedTime });

    inputElem.value = '';
    dateElem.value = '';
    timeElem.value = '';
    renderTodoList();
    setItem();
    observeTodoCards();
  }
}

addButton.addEventListener('click', () => {
  addToDo();
});

function deleteToDo(i) {
  todo.splice(i, 1);
  renderTodoList();
  setItem();
}

function setItem() {
  localStorage.setItem('todo', JSON.stringify(todo));
}
// Setup the observer globally
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      hero.innerHTML = 'My task';
    } else {
      hero.innerHTML = 'Create your own task';
    }
  });
});

// After DOM is loaded and todos are rendered, observe the card
function observeTodoCards() {
  observer.disconnect(); // avoid double observing

  const todoCards = document.querySelectorAll('.todo-card');

  todoCards.forEach(card => observer.observe(card));

  // Check immediately if any card is already in view
  const inView = Array.from(todoCards).some(card => {
    const rect = card.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  });

  hero.innerHTML = inView ? 'My task' : 'Create <br>your <br>own task';
}
window.addEventListener('DOMContentLoaded', () => {
  observeTodoCards();
});

inputElem.addEventListener('click',
  () => {
    inputCon.style.transform = 'translateY(0)';
    inputCon.style.position = 'fixed';
  }
)