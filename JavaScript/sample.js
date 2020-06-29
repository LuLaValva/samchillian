export class Sample {
  constructor(sound) {
    this.pitch = 0;
    this.audioCtx = window.webkitAudioContext
      ? new window.webkitAudioContext()
      : new window.AudioContext();
    this.changeSound(sound);
  }

  playSound() {
    var sound = this.audioCtx.createBufferSource();
    sound.buffer = this.buffer;
    sound.connect(this.audioCtx.destination);
    sound.detune.value = this.pitch;
    sound.start(0);
  }

  changePitch(val) {
    this.pitch += val;
  }

  setPitch(val) {
    this.pitch = val;
  }

  changeSound(sound) {
    fetch(sound)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        this.audioCtx
          .decodeAudioData(buffer)
          .then(decodedData => (this.buffer = decodedData));
      });
  }
}
