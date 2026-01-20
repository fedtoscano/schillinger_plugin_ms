class Pitch {
  constructor(step, octave, alter = 0){
    this.step = step; // "A", "B", "C", ecc...
    this.octave = octave; // 1, 2, 3, ecc...
    this.alter = alter; // -1, 0, +1 (flat, natural, sharp)

    this.#validate();
  }

  #validate(){
    const validSteps = ["A", "B", 'C', "D", "E", "F", "G"];
    const validAlter = [-1, 0, +1];

    if(!validSteps.includes(this.step))
      throw new Error("Invalid pitch step");
    if(!validAlter.includes(this.alter))
      throw new Error("Invalid alter");
    if(!Number.isInteger(this.octave))
      throw new Error("Invalid octave range");
  }

  toString(){
    let acc;
    switch (this.alter) {
      case 0:
        acc = "";
        break;

      case -1:
        acc = "b";
        break;
      
      case +1:
        acc = "#";
        break;
    }

    return `${this.step}${acc}${this.octave}`
  }
}
