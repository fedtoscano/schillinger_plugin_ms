/**
 * MuseScore computes Duration values in TPQ (Ticks Per Quarter)
 * But the Plugin Adapter returns a Fraction
 * */
class Duration {
  constructor(value, dots = 0) {
    //MuseScore gives a Fraction as Duration
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
