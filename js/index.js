const content = document.querySelector(".site-content__task-list");
const generateContent = (task) => {
  const html = `
  <div class="site-content__new-task">
  <div class="site-content__new-task--name">
    <input type="checkbox" class="check">
    <p id="name-task">${task}</p>
  </div>
  <div class="site-content__new-task--buttons">
    <button class="site-content__new-task--button edit">
      <img src="./assets/edit.png" />
    </button>
    <button class="site-content__new-task--button delete">
    <img src="./assets/delete.png" />
    </button>
  </div>
</div>
    `;
  content.innerHTML += html;
};

const createTask = document.querySelector(".site-content__create-task");
createTask.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTask = createTask.add.value.trim();
  if (newTask.length) {
    generateContent(newTask);
    createTask.reset();
  }
});

content.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
  }
});

content.addEventListener("click", (e) => {
  const divTaskName = e.target.parentElement.parentElement.firstElementChild;
  if (e.target.classList.contains("edit")) {
    const placeholder = divTaskName.lastElementChild.textContent;
    const html = `
      <form class="site-content__task-list--edit-task">
        <input type="text" name="change" placeholder="${placeholder}" class="site-content__new-task--rename">
        <button type="submit" hidden></button>
      </form>`;
    divTaskName.lastElementChild.outerHTML = html;

    const changeTask = document.querySelector(".site-content__task-list--edit-task");
    changeTask.addEventListener("submit", e => {
      e.preventDefault();
      const newTask = changeTask.change.value.trim();
      if (newTask.length) {
        const newHtml = `<p id="name-task">${newTask}</p>`
        changeTask.outerHTML = newHtml;
      }
    })
  }
});

content.addEventListener("click", (e) => {
  if (e.target.checked && e.target.classList.contains("check")) {
    e.target.parentElement.parentElement.classList.add("is-check");
  }
});

content.addEventListener("click", (e) => {
  if (!e.target.checked && e.target.classList.contains("check")) {
    e.target.parentElement.parentElement.classList.remove("is-check");
  }
});

const filterList = document.querySelector("#filter-tasks");
filterList.addEventListener("click", (e) => {
  if (filterList.selectedIndex === 1) {
    const checkBox = document.querySelectorAll(".check");

    for (let i = 0; i < checkBox.length; i++) {
      checkBox[i].parentElement.parentElement.style.display = "flex";
    }
    createTask.reset();

  } else if (filterList.selectedIndex === 2) {
    const checkBox = document.querySelectorAll(".check");
    for (let i = 0; i < checkBox.length; i++) {
      if (checkBox[i].parentElement.parentElement.classList.contains("is-check")) {
        checkBox[i].parentElement.parentElement.style.display = "flex";
        checkBox[i].checked = true;
      }
      if (!checkBox[i].parentElement.parentElement.classList.contains("is-check")) {
        checkBox[i].parentElement.parentElement.style.display = "none";
      }
    }
    createTask.reset();

  } else if (filterList.selectedIndex === 3) {
    const checkBox = document.querySelectorAll(".check");
    for (let i = 0; i < checkBox.length; i++) {
      if (!checkBox[i].parentElement.parentElement.classList.contains("is-check")) {
        checkBox[i].parentElement.parentElement.style.display = "flex";
      }
      if (checkBox[i].parentElement.parentElement.classList.contains("is-check")) {
        checkBox[i].parentElement.parentElement.style.display = "none";
      }
    }
    createTask.reset();
  }
});