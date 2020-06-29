import { Sample } from "./sample.js";

export class Scale {
  constructor(sound, scale, startNote) {
    this.sample = new Sample(sound);
    this.currNote = 0;
    this.scale = scale;
    this.startNote = startNote;
    this.reset();
  }

  playNote(amtToMove) {
    while (amtToMove > 0) {
      this.currNote = (this.currNote + 1) % this.scale.length;
      this.sample.changePitch(this.scale[this.currNote]);
      amtToMove--;
    }
    while (amtToMove < 0) {
      this.sample.changePitch(-this.scale[this.currNote]);
      this.currNote =
        (this.currNote - 1 + this.scale.length) % this.scale.length;
      amtToMove++;
    }
    this.sample.playSound();
  }

  reset() {
    this.sample.setPitch(this.startNote);
    this.currNote = 0;
  }

  changeScale(scale) {
    this.scale = scale;
  }

  changeStartNote(startNote) {
    this.startNote = startNote;
    this.reset();
  }

  changeInstrument(filename) {
    this.sample.changeSound(filename);
  }
}
