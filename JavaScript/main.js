import { Scale } from "./scale.js";
import { SCALES, NOTES } from "./scales_list.js";

let scale;

const startNote = "C";
const startScale = "Major";

window.onload = function() {
  scale = new Scale("Sound/SM64/0D.wav", SCALES[startScale], NOTES[startNote]);
  makeNoteSelect();
  makeScaleSelect();
  setupSettings();
  setupSoundChange();
};

function makeNoteSelect() {
  let container = document.getElementById("note-select");

  let color = 200;
  let colorChange = -(100 / Object.keys(NOTES).length);
  for (let item in NOTES) {
    let element = document.createElement("div");
    element.innerHTML = item;
    element.addEventListener("click", () => {
      scale.changeStartNote(NOTES[item]);
      scale.reset();
      var currSelectedNote = document.getElementById("selected-note");
      if (currSelectedNote != null) {
        currSelectedNote.id = null;
      }
      element.id = "selected-note";
    });
    container.appendChild(element);

    if (item == startNote) {
      element.id = "selected-note";
    }

    element.style.backgroundColor = `rgb(${color}, ${color}, 255)`;
    color += colorChange;
  }
}

function makeScaleSelect() {
  let container = document.getElementById("scale-select");

  let color = 100;
  let colorChange = 100 / Object.keys(SCALES).length;
  for (let item in SCALES) {
    let element = document.createElement("div");
    element.innerHTML = item;
    element.addEventListener("click", () => {
      scale.changeScale(SCALES[item]);
      scale.reset();
      var currSelectedNote = document.getElementById("selected-scale");
      if (currSelectedNote != null) {
        currSelectedNote.id = null;
      }
      element.id = "selected-scale";
    });
    container.appendChild(element);

    if (item == startScale) {
      element.id = "selected-scale";
    }

    element.style.backgroundColor = `rgb(${color}, ${color}, ${color})`;
    color += colorChange;
  }
}

function setupSettings() {
  let settings = document.getElementById("settings");
  let button = document.getElementById("settings-button");
  settings.addEventListener("click", function(e) {
    e = window.event || e;
    if (this === e.target) {
      document.getElementById("settings").style.display = "none";
      document.getElementById("settings-button").classList.remove("selected");
    }
  });

  button.addEventListener("click", () => {
    button.classList.add("selected");
    settings.style.display = "flex";
  });
}

function setupSoundChange() {
  let input = document.getElementById("input-sound-filname");
  document
    .getElementById("submit-sound-filename")
    .addEventListener("click", () => {
      scale.changeInstrument(`Sound/SM64/${input.value}.wav`);
      setTimeout(() => scale.playNote(0), 100);
    });
}

/* Samchillian Stuff */

let lastChange = 0;
let keymap = {
  v: -8,
  a: -4,
  s: -3,
  d: -2,
  f: -1,
  " ": 0,
  j: 1,
  k: 2,
  l: 3,
  ";": 4,
  n: 8,
  g: "repeat",
  h: "repeat",
  r: "zero"
};

document.addEventListener("keydown", e => {
  var change = keymap[e.key];
  switch (typeof change) {
    case "string":
      switch (change) {
        case "repeat":
          change = lastChange;
          break;
        case "zero":
          change = 0;
          scale.reset();
          break;
      }
    // no break, because we still play note and change lastChange
    case "number":
      scale.playNote(change);
      lastChange = change;
      break;
  }
});
