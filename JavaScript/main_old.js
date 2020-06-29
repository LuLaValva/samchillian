import { Scale } from "./scale.js";
import { SCALES } from "./scales_list.js";

let scale;

const startScale = "C MAJOR";

window.onload = function() {
  scale = new Scale(
    "Sound/SM64/05.wav",
    SCALES[startScale].noteDistances,
    SCALES[startScale].start_note
  );
  keyMapTable();
  scaleSelect();
};

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

function keyMapTable() {
  var elem = document.getElementById("key-map");
  let str = "<table>";
  for (let item in keymap) {
    str += `<tr><th>${item}</th><th>${keymap[item]}</th></tr>`;
  }
  str += "</table>";
  elem.innerHTML = str;
  elem.addEventListener("click", () => {});
}

function scaleSelect() {
  var center = document.getElementById("scale-select");
  var i = 0;
  var rotationAmt = 360 / Object.keys(SCALES).length;

  for (let item in SCALES) {
    let element = document.createElement("div");
    element.innerHTML = item;
    element.addEventListener("click", () => {
      scale.changeNotes(SCALES[item].noteDistances);
      scale.changeStartNote(SCALES[item].start_note);
      let currSelected = document.getElementsByClassName("selected-scale");
      for (let i = 0; i < currSelected.length; i++) {
        currSelected[i].classList.remove("selected-scale");
      }
      element.classList.add("selected-scale");
    });

    element.style.transform = `translate(0,-45vmin) rotate(${rotationAmt *
      i++}deg)`;
    center.appendChild(element);

    if (item == startScale) {
      element.classList.add("selected-scale");
    }
  }
}
