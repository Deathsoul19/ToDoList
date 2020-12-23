const form = document.querySelector(".site-content__create-task"),
  input = document.querySelector("#add-task-text"),
  filterTasks = document.querySelector("#filter-tasks"),
  btnAddTask = document.querySelector("#add-task"),
  taskList = document.querySelector(".site-content__task-list");

// Functions

// Create strucure amd add the task to the list
function generateTask() {
  const taskText = input.value.trim(),
    newTask = document.createElement("div"),
    taskName = document.createElement("div"),
    checkBox = document.createElement("input"),
    name = document.createElement("p"),
    buttons = document.createElement("div"),
    editBtn = document.createElement("button"),
    editImg = document.createElement("img"),
    deleteBtn = document.createElement("button"),
    deleteImg = document.createElement("img"),
    content = document.createTextNode(taskText);

  if (taskText === "") {
    input.setAttribute("placeholder", "Add content to task");
    input.className = "error";
    return false;
  } else {
    input.classList.remove("error");
    input.setAttribute("placeholder", "Add your task");
  }

  //Classes are added to elements
  newTask.classList.add("site-content__new-task");
  taskName.classList.add("site-content__new-task--name");
  checkBox.classList.add("check");
  buttons.classList.add("site-content__new-task--buttons");
  editBtn.classList.add("site-content__new-task--button", "edit");
  deleteBtn.classList.add("site-content__new-task--button", "delete");

  //attributes are added to elements
  checkBox.setAttribute("type", "checkbox");
  name.setAttribute("id", "name-task");
  editBtn.setAttribute("type", "button");
  editImg.setAttribute("src", "./assets/edit.png");
  deleteBtn.setAttribute("type", "button"),
    deleteImg.setAttribute("src", "./assets/delete.png");

  //the task structure is created
  editBtn.appendChild(editImg);
  deleteBtn.appendChild(deleteImg);
  buttons.appendChild(editBtn);
  buttons.appendChild(deleteBtn);
  taskName.appendChild(checkBox);
  name.appendChild(content);
  taskName.appendChild(name);
  newTask.appendChild(taskName);
  newTask.appendChild(buttons);
  taskList.appendChild(newTask);

  for (var i = 0; i <= taskList.children.length - 1; i++) {
    const editButton = taskList.children[i].lastChild.firstChild,
      deleteButton = taskList.children[i].lastChild.lastChild,
      checkBox = taskList.children[i].firstChild.firstChild;

    editButton.addEventListener("click", editTask);
    deleteButton.addEventListener("click", deleteTask);
    checkBox.addEventListener("change", check);
  }

  input.value = "";
};

//Remove the select task
function deleteTask() {
  this.parentNode.parentNode.remove();
}

function editTask() {
  if (!this.parentNode) {
    return false;
  }
  const oldContent = this.parentNode.previousSibling.lastChild,
    oldText = oldContent.textContent,
    editSpace = document.createElement("input"),
    formEditTask = document.createElement("form"),
    btnSave = document.createElement("button"),
    imgSave = document.createElement("img"),
    newContent = document.createElement("p");

  editSpace.classList.add("site-content__new-task--rename");
  formEditTask.classList.add("site-content__task-list--edit-task");
  btnSave.classList.add("site-content__new-task--button", "save");

  editSpace.setAttribute("type", "text");
  editSpace.setAttribute("placeholder", oldText);

  formEditTask.appendChild(editSpace);

  formEditTask.setAttribute("onsubmit", "return false");
  btnSave.setAttribute("type", "button");
  imgSave.setAttribute("src", "./assets/save.png");
  btnSave.appendChild(imgSave);

  const btnEdit = this,
    buttons = this.parentNode;

  buttons.replaceChild(btnSave, btnEdit);
  oldContent.parentNode.replaceChild(formEditTask, oldContent);

  btnSave.addEventListener("click", saveNewContent);
  formEditTask.addEventListener("submit", saveNewContent);

  function saveNewContent() {
    const newText = document.createTextNode(editSpace.value);
    newContent.setAttribute("id", "name-task");
    newContent.appendChild(newText);
    formEditTask.parentNode.replaceChild(newContent, formEditTask);

    buttons.replaceChild(btnEdit, btnSave);
  }
}

function check() {
  const taskIsCheck = this.parentNode.parentNode;
  if (this.checked) {
    taskIsCheck.classList.add("is-check");
  } else {
    taskIsCheck.classList.remove("is-check");
  }
}

function filter() {
  if (this.value == 1) {
    for (let i = 0; i < taskList.children.length; i++) {
      taskList.children[i].style.display = "flex";
    }
  } else if (this.value == 2) {
    for (let i = 0; i < taskList.children.length; i++) {
      taskList.children[i].classList.contains("is-check") ?
        (taskList.children[i].style.display = "flex") :
        (taskList.children[i].style.display = "none");
    }
  } else if (this.value == 3) {
    for (let i = 0; i < taskList.children.length; i++) {
      taskList.children[i].classList.contains("is-check") ?
        (taskList.children[i].style.display = "none") :
        (taskList.children[i].style.display = "flex");
    }
  }
}

// Event
form.addEventListener("submit", generateTask);
btnAddTask.addEventListener("click", generateTask);
filterTasks.addEventListener("change", filter);