import { RhythmicContinuity } from "../classes/RhythmicContinuity.js";
import { TPQ } from "./tpq.js";

export function getSync(a, b) {
  const continuity = new RhythmicContinuity([a, b], "4/4");
  const sync = continuity.sync();
  console.log({ continuity });
  console.log("continuity", sync);
  const tpqSync = sync.map((val) => {
    return TPQ.toTPQ(val);
  });

  console.log("mapped TPQ CONTINUITY", tpqSync);
}
