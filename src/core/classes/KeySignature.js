class KeySignature {
  static #accidentalsLookupTable = {
    C: {
      major: [0],
      minor: [3, "b"],
    },
    "C#": {
      major: [7, "#"],
      minor: [4, "#"],
    },
    Db: {
      major: [5, "b"],
      minor: [8, "b"],
    },
    D: {
      major: [2, "#"],
      minor: [1, "b"],
    },
    "D#": {
      major: [9, "#"],
      minor: [6, "#"],
    },
    Eb: {
      major: [3, "b"],
      minor: [6, "b"],
    },
    E: {
      major: [4, "#"],
      minor: [1, "#"],
    },
    F: {
      major: [1, "b"],
      minor: [4, "b"],
    },
    "F#": {
      major: [6, "#"],
      minor: [3, "#"],
    },
    Gb: {
      major: [6, "b"],
      minor: [9, "b"],
    },
    G: {
      major: [1, "#"],
      minor: [2, "b"],
    },
    Ab: {
      major: [4, "b"],
      minor: [7, "b"],
    },
    A: {
      major: [3, "#"],
      minor: [0],
    },
    Bb: {
      major: [2, "b"],
      minor: [5, "b"],
    },
    B: {
      major: [5, "#"],
      minor: [2, "#"],
    },
    Cb: {
      major: [7, "b"],
      minor: [10, "b"],
    },
  };

  constructor(tonic, mode) {
    this.tonic = tonic;
    this.mode = mode;
    this.accidentals = this.getAccidentals(this.tonic, this.mode);
    this.#validate();
  }

  #validate() {
    const availableSteps = ["A", "B", "C", "D", "E", "F", "G"];
    if (!availableSteps.includes(this.tonic))
      throw new Error("Invalid tonic tone");

    if (!["major", "minor"].includes(this.mode))
      throw new Error("Invalid key mode");
  }

  getAccidentals(tonic, mode) {
    const arr = this.accidentalsLookupTable[tonic][mode];
    return `${arr[0]}${arr[1]}`;
  }

  toString() {
    return `${this.tonic}${this.mode}`;
  }
}
