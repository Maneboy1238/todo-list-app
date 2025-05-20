//localStorage.removeItem('todo');
let isDarkMode= false;
const moon = document.querySelector('#moon');

let p = document.querySelector('.error-message');
const icon = document.querySelector('#icon');

const header = document.querySelector('.header');

const inputElem = document.querySelector('.js-input');

const dateElem = document.querySelector('.js-date');

const addButton = document.querySelector('.addButton');

/* Icon animation */
moon.addEventListener(
  'click', 
() => { 
  
  if (icon.classList.contains('fa-moon')) {
    
    setTimeout(() => {
      
      isDarkMode = true;
    document.querySelectorAll('.todo-card').forEach(
      (btm) => {
        btm.style.background = 'black';
      }
    )
    inputElem.style.background ='black';
    dateElem.style.background = 'black';
     document.body.style.background = '#121212';
     
     document.body.style.color = '#fff';
     header.style.background = 'black';
    icon.classList.remove('fa-moon');
    
    icon.classList.add('fa-sun');
    
  }
  , 150)
  
  }
  
  else if (icon.classList.contains('fa-sun')) {
    
    setTimeout (() => {
      
      isDarkMode = false;
      
      document.querySelectorAll('.todo-card').forEach(
        (btn) => {
          btn.style.background = 'whitesmoke'
        }
      )
      inputElem.style.background ='whitesmoke';
    dateElem.style.background = 'whitesmoke';
     document.body.style.background = '#fff';
     
     document.body.style.color = 'black';
     header.style.background = 'whitesmoke';
    icon.classList.remove('fa-sun');
    
    icon.classList.add('fa-moon');
  }
  );
}
}  
);

/* Fade-in animation for hero-text */
let hero = document.querySelector('.hero-text');

setTimeout(() => {
  
hero.style.opacity = 1;

hero.style.transform = 'translateY(0px)';

}
,500);

/* todolist */
const todo = [];



try {
   const savedTodosString = localStorage.getItem('todo');
  let savedTodos;
   
   if (savedTodosString !== 'undefined') {
       savedTodos = JSON.parse(savedTodosString);
   }
    if (Array.isArray(savedTodos)) {
      todo.push(...savedTodos);
      renderTodoList();
    }
  
} catch (e) {
  console.log('error');
}

function renderTodoList () {
let displayTodoList = '';

for (
  let i=0;

i<todo.length;

i++
  
)
{
  
  const todoList = todo[i];
  
  const name = todoList.name;
  
  const date = todoList.date;
  
  let background = '';
  if(isDarkMode === true) {
    background = 'black';
  }
  else if (isDarkMode === false) {
    background = 'whitesmoke';
  }


  const html = `
  <div class="todo-card  p-8 flex flex-col "
  style="background: ${background}">
    <p class="text-sm text-gray-500 text-left">${date}</p>
    
    <p class="text text-lg  text-center leading-snug whitespace-normal break-all mt-8 mb-8">${name}</p>
    
    <div class="flex justify-end">
      <button onclick="deleteToDo(${i})" class="text-red-500 hover:text-red-700">
        Cancel
      </button>
    </div>
  </div>
`;
  
  displayTodoList += html;
}
document.querySelector('.containTodo').innerHTML = displayTodoList;
 

}
function addToDo() {
  const name = inputElem.value.trim();
const date = dateElem.value.trim();


  if (name === '' || date === '') {
    
    p.innerHTML = 'Enter a task and a due date';
   return
  }
  else {
    p.innerHTML = '';
  }
  
const savedTodos = JSON.parse(localStorage.getItem('todo'));



todo.push({name,date});

inputElem.value = '';

dateElem.value = '';

renderTodoList();
setItem();
}
addButton.addEventListener('click',
  () => {
    addToDo();
  }
)
function deleteToDo(i)  {
  todo.splice(i, 1);
renderTodoList();
setItem()
}
function setItem() {
localStorage.setItem('todo', JSON.stringify(todo));
}