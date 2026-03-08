/**
 * Converter layer for rhythmical values, from integer
 * to TPQ (Ticks Per Quarter)
 * */

export class TPQ {
  //standard Musescore 4 Value
  static TPQ_VAL = 480;

  static NOTE_DURATIONS = {
    QUARTER: 480,
    EIGHTH: 240,
    HALF: 960
  };

  constructor() { }

  static toTPQ(qLen) {
    return qLen * TPQ.TPQ_VAL;
  }

  static getNoteDuration(type = 'EIGHTH') {
    return TPQ.NOTES_DURATIONS?.[type] ?? TPQ.NOTE_DURATIONS.EIGHTH;
  }

  static ticksToDuration(ticks) {
    return 480 * 4 / ticks;
  }
}
