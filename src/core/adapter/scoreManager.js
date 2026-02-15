// scoreManager.js
export function insertNote(score, note, pos, track = 0) {
  if (!score) {
    console.error("No score is present!");
    return;
  }

  score.startCmd();
  try {
    let cursor = score.newCursor();
    cursor.track = track;
    cursor.rewind(pos);

    cursor.setDuration(1, note.ticks);
    cursor.addNote(note.pitch);

  } catch (error) {
    console.error("Error occurred during note insertion", error);
  }
  score.endCmd();
}

export function insertContinuity(continuity) {
  if (!curScore) return -1
  const C = curScore.newCursor();
  C.rewind('selection_start');
  curScore.startCmd();
  continuity.forEach(note => {
    //1920 = quarter note!
    C.setDuration(note, 1920);
    C.addNote(72);
  });

  curScore.endCmd();
}

export function getTimeSignatureAtCursor() {
  if (!curScore) {
    console.error("No score is present!");
    return { numerator: 4, denominator: 4, toString: function() { return "4/4"; } };
  }

  var cursor = curScore.newCursor();
  cursor.rewind("selection_start");
  var measure = cursor.measure;

  if (measure && measure.timesig) {
    return {
      numerator: measure.timesig.numerator,
      denominator: measure.timesig.denominator,
      toString: function() {
        return this.numerator + "/" + this.denominator;
      }
    };
  }

  var firstMeasure = curScore.firstMeasure;
  if (firstMeasure && firstMeasure.timesig) {
    return {
      numerator: firstMeasure.timesig.numerator,
      denominator: firstMeasure.timesig.denominator,
      toString: function() {
        return this.numerator + "/" + this.denominator;
      }
    };
  }

  return {
    numerator: 4,
    denominator: 4,
    toString: function() { return "4/4"; }
  };
}
