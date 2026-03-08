import { RhythmicContinuity } from "../classes/RhythmicContinuity.js";
import { TPQ } from "./tpq.js";
import * as SM from "./scoreManager.js"

export const score = SM;

export function getTimeSignature() {
  return SM.getTimeSignatureAtCursor();
}

export function getSync(a, b, rhythmicUnit) {
  const ts = SM.getTimeSignatureAtCursor().toString();
  const continuity = new RhythmicContinuity([a, b], ts);
  const sync = continuity.sync();
  const tpqSync = sync.map((val) => { return { ticks: TPQ.toTPQ(val), pitch: 60 } });
  return tpqSync;
}

export function getFractioning(a, b, rhythmicUnit) {
  const ts = timeSignature || SM.getTimeSignatureAtCursor().toString();
  const continuity = new RhythmicContinuity([a, b], ts);
  const fractioning = continuity.fractioning();
  const tpqSync = fractioning.map((val) => { return { ticks: TPQ.toTPQ(val), pitch: 60 }; });
  return tpqSync
}

export function getBalancing(a, b, timeSignature) {
  const ts = timeSignature || SM.getTimeSignatureAtCursor().toString();
  const continuity = new RhythmicContinuity([a, b], ts);
  const balancing = continuity.balancing();
  const tpqSync = balancing.map((val) => { return { ticks: TPQ.toTPQ(val), pitch: 60 } })

  return tpqSync
}

export function getContracting(a, b, timeSignature) {
  const ts = timeSignature || SM.getTimeSignatureAtCursor().toString();
  const continuity = new RhythmicContinuity([a, b], ts);
  const contracting = continuity.contracting();
  const tpqSync = contracting.map((val) => { return { ticks: TPQ.toTPQ(val), pitch: 60 } })
  return tpqSync;
}
