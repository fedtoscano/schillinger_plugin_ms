/**
 * Converter layer for rhythmical values, from integer
 * to TPQ (Ticks Per Quarter)
 * */

export class TPQ {
  //standard Musescore 4 Value
  static TPQ_VAL = 480;

  constructor() {}

  static toTPQ(qLen) {
    return qLen * TPQ.TPQ_VAL;
  }
}
