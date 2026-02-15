import { RhythmicContinuity } from "../classes/RhythmicContinuity.js";
import { TPQ } from "./tpq.js";
import * as SM from "./scoreManager.js"

export const score = SM;

export function getSync(a, b) {
  const continuity = new RhythmicContinuity([a, b], "4/4");
  const sync = continuity.sync();
  const tpqSync = sync.map((val) => {
    return TPQ.toTPQ(val);
  });

  return tpqSync;
}

export function getFractioning(a, b) {
  const continuity = new RhythmicContinuity([a, b], "4/4");
  const fractioning = continuity.fractioning();
  const tpqSync = fractioning.map((val) =>
    TPQ.toTPQ(val)
  )

  return tpqSync
}

export function getBalancing(a, b) {
  const continuity = new RhythmicContinuity([a, b], "4/4");
  const balancing = continuity.balancing();
  const tpqSync = balancing.map((val) =>
    TPQ.toTPQ(val)
  )

  return tpqSync
}

export function getContracting(a, b) { }
