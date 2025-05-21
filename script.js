const addStudentModalWrapper = document.getElementById("add-student");
const confirmDeletionModalWrapper = document.getElementById("confirm-deletion");
const addStudentModal = addStudentModalWrapper?.querySelector(".modal");
const confirmDeletionModal = confirmDeletionModalWrapper?.querySelector(".modal");


const addStudentForm = document.getElementById("add-student-form");
const addStudentButton = document.getElementById("add-student-btn");
const closeModalButton = document.getElementById("close-modal-btn");
const studentsTable = document.getElementById("students-table");


const students = [
  {id: 0, group: "PZ-21", name: "Mariia", surname: "Sokolovska", birthday: "2024-03-07", gender: "F", active: false},
  {id: 1, group: "PZ-23", name: "Someone", surname: "111", birthday: "2020-03-07", gender: "M", active: false}
];


students.forEach(el => createStudent(el));



addStudentButton.onclick = showStudentModal;
closeModalButton.onclick = e => {
  e.preventDefault();
  hideStudentModal();
};


addStudentForm.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const student = {...Object.fromEntries(formData), id: students.length};
  students.push(student);
  createStudent(student);
  hideStudentModal();
};


document.addEventListener("mousedown", (e) => {
  handleClickOutside(e, addStudentModal, hideStudentModal);
  handleClickOutside(e, confirmDeletionModal, hideConfirmationModal);
});


function onStudentEdit(e, id) {
  const formData = new FormData(e.target);
  const student = {...Object.fromEntries(formData), id};
  students[students.findIndex(el => el.id === id)] = student;
  createStudent(student, true);
  hideStudentModal();
}


function onStudentCreate(e) {
  const formData = new FormData(e.target);
  const student = {...Object.fromEntries(formData), id: students.length};
  students.push(student);
  createStudent(student);
  hideStudentModal();
}




function createStudent({id, group, name, surname, birthday, gender, active}, replace) {
  const tr = document.createElement("tr");
tr.id = `student-${id}`;

const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.id = `student-check-${id}`;

const label = document.createElement("label");
label.htmlFor = checkbox.id;
label.textContent = "Select"; 
label.style.position = "absolute"; // Приховує текст мітки, але залишає її доступною
label.style.width = "1px";
label.style.height = "1px";
label.style.overflow = "hidden";
label.style.clip = "rect(1px, 1px, 1px, 1px)";

const checkBoxTd = document.createElement("td");
checkBoxTd.appendChild(checkbox);
checkBoxTd.appendChild(label);

tr.appendChild(checkBoxTd);




  const cells = [group, `${name} ${surname}`, gender, birthday];
 
  for (let cellContent of cells) {
    const td = document.createElement("td");
    td.textContent = cellContent;
    tr.appendChild(td);  
  }


  const activeTd = document.createElement("td");
  const activeDiv = document.createElement("div");
  activeDiv.classList.add("status");
  active && activeDiv.classList.add("active");
  activeTd.appendChild(activeDiv);
  tr.appendChild(activeTd);

 const createActionButtons = (id) => {
  const container = document.createElement("div");
  container.classList.add("action-buttons");

  // Edit Button
  const editButton = document.createElement("button");
  editButton.classList.add("icon-button");
  editButton.onclick = () => onStudentEditModal(id);

  const editIcon = document.createElement("img");
  editIcon.src = "icons/edit.png";
  editIcon.alt = "Edit";
  editIcon.classList.add("icon-img");

  editButton.appendChild(editIcon);

  // Remove Button
  const removeButton = document.createElement("button");
  removeButton.classList.add("icon-button");
  removeButton.onclick = () => confirmDeletion(id);

  const removeIcon = document.createElement("img");
  removeIcon.src = "icons/delete.png";
  removeIcon.alt = "Delete";
  removeIcon.classList.add("icon-img");

  removeButton.appendChild(removeIcon);

  container.appendChild(editButton);
  container.appendChild(removeButton);
  return container;
};

const actionsTd = document.createElement("td");
actionsTd.appendChild(createActionButtons(id));
tr.appendChild(actionsTd);


  if (replace) {
    document.getElementById(`student-${id}`).replaceWith(tr);
  } else {
    studentsTable.querySelector("tbody").appendChild(tr);
  }
  return tr;
}


function confirmDeletion(id) {
  showConfirmationModal();
  const confirmDeletionButton = document.getElementById("confirm-deletion-btn");
  const cancelDeletionButton = document.getElementById("cancel-deletion-btn");
  const student = students.find(el => el.id === id);
  document.getElementById("confirm-question")
    .textContent = `Are you sure you want to delete ${student.name} ${student.surname}?`;


  confirmDeletionButton.onclick = () => {
    removeStudent(id);
    hideConfirmationModal();
  };
  cancelDeletionButton.onclick = hideConfirmationModal;
}


function removeStudent(id) {
  document.getElementById(`student-${id}`)?.remove();
  students.filter(el => el.id !== id);
}


function onStudentEditModal(id) {
  showStudentModal("edit", id);
  const student = students.find(el => el.id === id);
  if (!student) return;
  const group = document.getElementById("group");
  const name = document.getElementById("name");
  const surname = document.getElementById("surname");
  const gender = document.getElementById("gender");
  const birthday = document.getElementById("birthday");
  group.value = student.group;
  name.value = student.name;
  surname.value = student.surname;
  gender.value = student.gender;
  birthday.value = student.birthday;
}


function hideStudentModal() {
  addStudentModalWrapper.classList.add("hidden");
}


function showStudentModal(mode, id) {
  if (mode === "edit") {
    document.getElementById("modal-title").textContent = "Edit student";
    addStudentForm.onsubmit = (e) => {
      e.preventDefault();
      onStudentEdit(e, id);
    };  
  } else {
    document.getElementById("modal-title").textContent = "Create student"
    addStudentForm.onsubmit = (e) => {
      e.preventDefault();
      onStudentCreate(e);
    }
  }
  addStudentModalWrapper.classList.remove("hidden");
}


function hideConfirmationModal() {
  confirmDeletionModalWrapper.classList.add("hidden")
}


function showConfirmationModal() {
  confirmDeletionModalWrapper.classList.remove("hidden");
}


function handleClickOutside({target}, element, callback) {
  if (element && target instanceof HTMLElement && !element.contains(target)) {
    callback();
  }
}

document.getElementById('dashboard-link').addEventListener('click', () => {
    alert('Dashboard page (Coming soon)');
  });

  document.getElementById('tasks-link').addEventListener('click', () => {
    alert('Tasks page (Coming soon)');
  });

  const burgerMenu = document.getElementById('burger-menu');
const nav = document.querySelector('.nav');


document.addEventListener('DOMContentLoaded', function () {
  const burgerMenu = document.getElementById('burger-menu');
  const nav = document.querySelector('.nav');

  if (burgerMenu && nav) {
    burgerMenu.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
    const links = document.querySelectorAll('.nav-link');
    const currentLocation = window.location.pathname;
  
    links.forEach(link => {
      // Видаляємо клас active у всіх посиланнях
      link.classList.remove('active');
  
      // Якщо посилання відповідає поточному шляху, додаємо клас active
      if (link.href.includes(currentLocation)) {
        link.classList.add('active');
      }
    });
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => console.log("Service Worker registered"))
      .catch((err) => console.error("Service Worker registration failed", err));
  }
  
  
  