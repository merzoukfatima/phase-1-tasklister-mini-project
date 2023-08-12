document.addEventListener("DOMContentLoaded", () => {
  // your code here
  const form = document.getElementById("create-task-form");
  const input = document.getElementById("new-task-description");
  const submitButton = document.querySelector('input[type="submit"]');
  const ul = document.getElementById("tasks");
  const select = document.createElement("select");
  const options = ["low", "medium", "high"];
  options.forEach((value) => {
    const option = document.createElement("option");
    option.textContent = value;
    select.appendChild(option);
  });
  form.appendChild(select);
  form.insertBefore(select, input.nextSibling);
  const buttonSort = document.createElement("button");
  buttonSort.textContent = "Sort";
  buttonSort.style.width = "50px";
  buttonSort.style.height = "22px";
  buttonSort.style.fontSize = "13px";
  form.appendChild(buttonSort);
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    addTask(ul, input, select);
  });
  ul.addEventListener("click", (event) => {
    const target = event.target;
    if (target.textContent === "X") target.parentNode.remove();
    if (target.textContent === "Edit") editTask(target.parentNode);
  });
  buttonSort.addEventListener("click", (event) => {
    event.preventDefault();
    sortTasks(ul);
  });
});
const addTask = (element, input, select) => {
  const li = document.createElement("li");
  const buttonDelete = document.createElement("button");
  const buttonEdit = document.createElement("button");
  buttonEdit.textContent = "Edit";
  buttonDelete.textContent = "X";
  if (input.value != "") {
    li.textContent = input.value;
    input.value = "";
    li.style.color = changeColor(select);
    li.appendChild(buttonEdit);
    li.appendChild(buttonDelete);
    element.appendChild(li);
  } else {
    alert("write the task");
  }
};
const changeColor = (select) => {
  const selected = select.value;
  if (selected === "low") return "green";
  if (selected === "medium") return "orange";
  if (selected === "high") return "red";
};

const sortTasks = (tasks) => {
  const elements = [...tasks.children];
  if (elements.length > 1) {
    elements.sort((ele1, ele2) => {
      const a = ele1.style.color;
      const b = ele2.style.color;
      if (a === "red" && (b === "green" || b === "orange")) {
        return -1; // 'a' comes before 'b'
      } else if (a === "orange" && b === "green") {
        return -1; // 'a' comes before 'b'
      }
    });
  }
  tasks.innerHTML = "";
  elements.forEach((element) => tasks.appendChild(element));
};

const editTask = (element) => {
  if (element.querySelector("input") === null) {
    const input = document.createElement("input");
    input.style.width = "50px";
    input.value = element.firstChild.textContent;
    element.firstChild.textContent = "";
    element.insertBefore(input, element.firstChild);
    input.addEventListener("blur", () => {
      const span = document.createElement("span");
      span.textContent = input.value;
      element.insertBefore(span, input.nextSibling);
      input.remove();
    });
  }
};
