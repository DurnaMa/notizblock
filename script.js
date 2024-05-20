let names = ["Mahir", "Svetlana"];
let yournotes = ["Test", "Test2"];

document.addEventListener("DOMContentLoaded", function () {
    load();
    render();
    includeHTML();
});

async function includeHTML() {
    let includeElements = document.querySelectorAll("[data-include]");
    for (let i = 0; i < includeElements.length; i++) {
        let element = includeElements[i];
        let file = element.getAttribute("data-include");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = "Page not found";
        }
    }
}

function render() {
    let noteContainer = document.getElementById("content");
    noteContainer.innerHTML = '';

    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const yournote = yournotes[i];

        noteContainer.innerHTML += /*html*/ `
            <div class="cardNote">
                <div class="container">
                    <label>Name: ${name}</label>
                    <textarea readonly rows="4" cols="50">${yournote}</textarea>
                </div>
                <button onclick="deleteNote(${i})">Löschen</button>
            </div>
        `;
    }
}


function addYourNotes() {
    let name = document.getElementById("name");
    let note = document.getElementById("note");

    names.push(name.value);
    yournotes.push(note.value);

    name.value = "";
    note.value = "";

    render();
    save();
}

function deleteNote(i) {
    names.splice(i, 1);
    yournotes.splice(i, 1);

    render();
    save();
}

function save() {
    let namesAsText = JSON.stringify(names);
    localStorage.setItem("names", namesAsText);

    let yournotesAsText = JSON.stringify(yournotes);
    localStorage.setItem("yournotes", yournotesAsText);
}

function load() {
    let namesAsText = localStorage.getItem("names");
    let yournotesAsText = localStorage.getItem("yournotes");

    if (namesAsText && yournotesAsText) {
        names = JSON.parse(namesAsText);
        yournotes = JSON.parse(yournotesAsText);
    }
}

function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}
