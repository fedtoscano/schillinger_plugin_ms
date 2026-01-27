export default class TimeSignature {
  constructor(timeStr) {
    console.log({ timeStr });
    const num = parseInt(timeStr.split("/")[0]);
    const den = parseInt(timeStr.split("/")[1]);
    console.log({ num, den });
    if (!Number.isInteger(num) || num <= 0)
      throw new Error("Numerator must be a positive integer");
    if (!Number.isInteger(den) || !this.isValidDenominator(den))
      throw new Error("Incorrect Denominator Value");

    this.numerator = num;
    this.denominator = den;
  }

  get beatsPerBar() {
    return this.numerator;
  }

  isValidDenominator(den) {
    return den % 2 === 0 || den % 3 === 0;
  }

  toString() {
    return `${this.numerator}/${this.denominator}`;
  }

  static fromString(str) {
    const parts = str.split("/");
    if (parts.length !== 2) throw new Error("Invalid format");
    const num = parseInt(parts[0], 10);
    const den = parseInt(parts[1], 10);

    return new TimeSignature(num, den);
  }
}
