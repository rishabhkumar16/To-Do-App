let addBtn = document.getElementById("add-btn");
let addTitle = document.getElementById("note-title");
let addText = document.getElementById("note-text");

addBtn.addEventListener("click", (e) => {
  if (addTitle.value == "" || addText.value == "") {
    return alert("Please add note title and details");
  }

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addText.value,
  };
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTitle.value = "";
  addText.value = "";
  console.log(notesObj);
  showNotes();
  auto();
});

//Showing my saved notes from my local storage

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach(function (element, index) {
    html += `<div class="card border-info note mt-1">
                    <div class="card-body ">
                        <p class="card-text note-text text-success">Note ${
                          index + 1
                        }</p>
                        <h5 class="card-title note-title text-info">${
                          element.title
                        }</h5>
                        <p class="card-text note-text text-secondary">${
                          element.text
                        }.</p>
                        <a href="#" id="${index}" onclick="editNote(this.id)" class="btn  edit-btn">Edit</a>
                        <a href="#" id="${index}" onclick="deleteNote(this.id)" class="btn ml-2 delete-btn">Delete</a>
                    </div>
                </div>
        `;
  });

  let noteEle = document.getElementById("notes");
  if (notesObj.length != 0) {
    noteEle.innerHTML = html;
  } else {
    noteEle.innerHTML = "No Notes Yet!! Add a note using the form above";
  }
  auto();
}

//Deleting notes from the local storage

function deleteNote(index) {
  let confirmDel = confirm("Do you really want to delete this note!!!");

  if (confirmDel == true) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    auto();
  }
}

//Editing notes from the existing saved notes

function editNote(index) {
  let notes = localStorage.getItem("notes");
  if (addTitle.value !== "" || addText.value !== "") {
    return alert("Please clear the form before editing a note");
  }
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  // console.log(notesObj);
  notesObj.findIndex((element, index) => {
    addTitle.value = element.title;
    addText.value = element.text;
  });
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
  auto();
}
function removeAll() {
  let notes = localStorage.getItem("notes");

  let confirmclear = confirm("Do you really want to clear whole list!!!");
  if (confirmclear == true) {
    notesObj = [];
  }
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
  auto();
}

function auto() {
  let notes = localStorage.getItem("notes");
  let button = document.querySelector(".clear-btn");
  if (notes == "[]") {
    button.disabled = true;
    button.style.pointerEvents = "none";
  } else {
    button.disabled = false;
    button.style.pointerEvents = "auto";
  }
}

showNotes();
auto();
