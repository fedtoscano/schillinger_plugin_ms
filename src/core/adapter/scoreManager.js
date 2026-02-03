// scoreManager.js
export function insertNote(score, note, pos,track = 0) {
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

export function insertContinuity(continuity){
  if(!curScore) return -1
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
