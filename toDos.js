const form = document.querySelector(".toDoForm");
const input = document.querySelector(".toDoInput");
const toDoList = document.querySelector(".toDoList");

const LSKEY = "TODOS";
let toDos = [];

function handleDelBtn(event) {
  const btn = event.target;
  const li = event.target.parentNode.parentNode.parentNode;
  toDoList.removeChild(li);

  const cleanToDos = toDos.filter(function (toDos) {
    return toDos.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  addLocalStorage();
}

function loadLocalStorage() {
  const loadToDos = localStorage.getItem(LSKEY);
  if (loadToDos !== null) {
    const parsedToDos = JSON.parse(loadToDos);
    parsedToDos.forEach((toDo) => {
      addList(toDo.text);
    });
  }
}

function addLocalStorage() {
  localStorage.setItem(LSKEY, JSON.stringify(toDos));
}

function addList(text) {
  const id = toDos.length + 1;
  const toDoObj = { id: id, text: text };
  toDos.push(toDoObj);
  addLocalStorage();

  const li = document.createElement("li");
  li.id = id;
  const inputCheck = document.createElement("input");
  inputCheck.type = "checkbox";
  inputCheck.classList.add("inputCheck");
  const span = document.createElement("span");
  const inputEdit = document.createElement("input");
  const div = document.createElement("div");
  const editBtn = document.createElement("button");
  const delBtn = document.createElement("button");

  inputCheck.addEventListener("change", () => {
    if (inputCheck.checked) {
      span.style =
        "font-style: italic; color:#d8a6a3; text-decoration: line-through;";
    } else {
      span.style = "font-style: none";
    }
  });

  span.innerText = text;
  inputEdit.classList.add("inputEdit");
  span.classList.add("showing");
  inputEdit.classList.add("notShowing");
  editBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
  delBtn.innerHTML = '<i class="fas fa-times"></i>';
  editBtn.addEventListener("click", () => {
    span.classList.remove("showing");
    span.classList.add("notShowing");
    inputEdit.classList.remove("notShowing");
    inputEdit.classList.add("showing");

    inputEdit.value = span.innerText;
    inputEdit.focus();
    inputEdit.addEventListener("blur", () => {
      span.innerText = inputEdit.value;
      span.classList.remove("notShowing");
      span.classList.add("showing");
      inputEdit.classList.remove("showing");
      inputEdit.classList.add("notShowing");
    });
  });
  delBtn.addEventListener("click", handleDelBtn);

  div.appendChild(editBtn);
  div.appendChild(delBtn);
  li.appendChild(inputCheck);
  li.appendChild(span);
  li.appendChild(inputEdit);
  li.appendChild(div);
  toDoList.appendChild(li);
}

function handleSubmit(event) {
  event.preventDefault();

  const toDo = input.value;
  addList(toDo);

  input.value = "";
}

function init() {
  form.addEventListener("submit", handleSubmit);
  loadLocalStorage();
}

init();
