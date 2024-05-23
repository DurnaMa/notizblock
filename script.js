let names = ["Mahir", "Svetlana"];
let yourNotes = ["Test", "Test2"];

document.addEventListener("DOMContentLoaded", function () {
    load();
    render();
    includeHTML();
    trash();
});

class IncludeHTML extends HTMLElement {
    async connectedCallback() {
        const file = this.getAttribute("src");
        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error(`Failed to fetch ${file}: ${response.statusText}`);
            this.innerHTML = await response.text();
        } catch (error) {
            this.innerHTML = 'Page not found';
            console.error(error);
        }
    }
}

customElements.define('include-html', IncludeHTML);

function render() {
    let noteContainer = document.getElementById("content");
    noteContainer.innerHTML = "";

    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const yournote = yourNotes[i];

        noteContainer.innerHTML += /*html*/ `
            <div class="cardNote">
                <div class="container">
                    <label>Name: ${name}</label>
                    <textarea readonly rows="4" cols="50">${yournote}</textarea>
                </div>
                <button onclick="trash(${i})">Löschen</button>
            </div>
        `;
    }
}

function addYourNotes() {
    let name = document.getElementById("name");
    let note = document.getElementById("note");

    names.push(name.value);
    yourNotes.push(note.value);

    name.value = "";
    note.value = "";

    render();
    save();
}

function deleteNote(i) {
    names.splice(i, 1);
    yourNotes.splice(i, 1);

    render();
    save();
}

function save() {
    let namesAsText = JSON.stringify(names);
    localStorage.setItem("names", namesAsText);

    let yourNotesAsText = JSON.stringify(yourNotes);
    localStorage.setItem("yourNotes", yourNotesAsText);
}

function load() {
    let namesAsText = localStorage.getItem("names");
    let yourNotesAsText = localStorage.getItem("yourNotes");

    if (namesAsText && yourNotesAsText) {
        names = JSON.parse(namesAsText);
        yourNotes = JSON.parse(yourNotesAsText);
    }
}

function autoResizeTextarea(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
}

// {
//     // Hier kannst du den Code einfügen, der beim Klicken auf den Trash-Button ausgeführt werden soll
//     alert("Eintrag wird gelöscht!");
// }

function trash() {
    let noteContainer = document.getElementById("trash");
    noteContainer.innerHTML = "";

    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const yournote = yourNotes[i];

        noteContainer.innerHTML += /*html*/ `
            <div class="cardNote">
                <div class="container">
                    <label>Name: ${name}</label>
                    <textarea readonly rows="4" cols="50">${yournote}</textarea>
                </div>
                <button onclick="deleteNoteFromTrash(${i})">Löschen</button>
            </div>
        `;
    }
}

function deleteNoteFromTrash(i) {
    names.splice(i, 1);
    yourNotes.splice(i, 1);

    trash();
    save();
}