let names = [];
let yourNotes = [];
let trashNames = [];
let trashNotes = [];

document.addEventListener("DOMContentLoaded", function () {
    load();
    render();
    if (document.getElementById("trash")) {
        renderTrash();
    }
});

class IncludeHTML extends HTMLElement {
    async connectedCallback() {
        const file = this.getAttribute("src");
        try {
            const response = await fetch(file);
            if (!response.ok)
                throw new Error(
                    `Failed to fetch ${file}: ${response.statusText}`
                );
            this.innerHTML = await response.text();
        } catch (error) {
            this.innerHTML = "Page not found";
            console.error(error);
        }
    }
}

customElements.define("include-html", IncludeHTML);

function render() {
    let noteContainer = document.getElementById("content");
    if (noteContainer) {
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
                    <button onclick="deleteNote(${i})">Löschen</button>
                </div>
            `;
        }
    }
}

function renderTrash() {
    let noteContainer = document.getElementById("trash");
    if (noteContainer) {
        noteContainer.innerHTML = "";

        for (let i = 0; i < trashNames.length; i++) {
            const name = trashNames[i];
            const yournote = trashNotes[i];

            noteContainer.innerHTML += /*html*/ `
                <div class="cardNote">
                    <div class="container">
                        <label>Name: ${name}</label>
                        <textarea readonly rows="4" cols="50">${yournote}</textarea>
                    </div>
                    <div class="button1">
                        <button onclick="deleteNoteFromTrash(${i})">Löschen</button>
                        <button onclick="restoreNote(${i})">Wiederherstellen</button>
                    </div>
                </div>
            `;
        }
    }
}

function deleteNote(i) {
    trashNames.push(names[i]);
    trashNotes.push(yourNotes[i]);

    names.splice(i, 1);
    yourNotes.splice(i, 1);

    render();
    save();
    renderTrash();
}

function deleteNoteFromTrash(i) {
    trashNames.splice(i, 1);
    trashNotes.splice(i, 1);

    renderTrash();
    save();
}

function restoreNote(i) {
    names.push(trashNames[i]);
    yourNotes.push(trashNotes[i]);

    trashNames.splice(i, 1);
    trashNotes.splice(i, 1);

    render();
    save();
    renderTrash();
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

function save() {
    localStorage.setItem("names", JSON.stringify(names));
    localStorage.setItem("yourNotes", JSON.stringify(yourNotes));
    localStorage.setItem("trashNames", JSON.stringify(trashNames));
    localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
}

function load() {
    let namesAsText = localStorage.getItem("names");
    let yourNotesAsText = localStorage.getItem("yourNotes");
    let trashNamesAsText = localStorage.getItem("trashNames");
    let trashNotesAsText = localStorage.getItem("trashNotes");

    if (namesAsText && yourNotesAsText) {
        names = JSON.parse(namesAsText);
        yourNotes = JSON.parse(yourNotesAsText);
    }

    if (trashNamesAsText && trashNotesAsText) {
        trashNames = JSON.parse(trashNamesAsText);
        trashNotes = JSON.parse(trashNotesAsText);
    }
}

function autoResizeTextarea(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
}
