class Duration {
  constructor(value, dots = 0) {
    // value è l'oggetto Fraction che arriva da MuseScore
    this.value = this.convertToTicks(value); 
    this.dots = dots;
  }

  toTicks(fraction) {
    return (fraction.numerator * 1920) / fraction.denominator;
  }

  toMSFraction() {
    return { numerator: this.value, denominator: 1920 };
  }
}
