import { RhythmicContinuity } from "../classes/RhythmicContinuity.js";

export function getSync(a, b) {
  const continuity = new RhythmicContinuity([a, b], "4/4");
  const sync = continuity.sync();
  console.log({ continuity });
  console.log("continuity", sync);
}
