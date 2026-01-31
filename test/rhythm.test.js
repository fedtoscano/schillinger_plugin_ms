import { RhythmicContinuity } from "../src/core/classes/RhythmicContinuity.js";

describe("Schillinger Rhythmic Continuity", () => {
  test("Deve generare la sequenza corretta per il risultante 3:2", () => {
    const rc = new RhythmicContinuity([3, 2], "4/4");
    const sync = rc.sync();

    expect(sync).toEqual([2, 1, 1, 2]);
  });
});
