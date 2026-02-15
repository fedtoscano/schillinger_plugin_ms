import Continuity from "./Continuity.js";
import TimeSignature from "./TimeSignature.js";
import * as rmethods from "../rhythm/methods.js";

export class RhythmicContinuity extends Continuity {
  constructor(generators, time_signature) {
    super();
    this.generators = rmethods.sortGenerators(generators);
    this.time_signature = new TimeSignature(time_signature);
  }

  /**
   * Bynary or multiple sync, from array of generators
   *
   */
  sync(multiple = false) {
    const cp = rmethods.getCommonProduct(this.generators);
    // if(multiple)
    // let complementaryFactors = this.generators.map(g => ~~(cp / g));
    //TODO consider how getRhythmicResultantFromGenerators changes with multiple sync
    const resultant = rmethods.getRhythmicResultantFromGenerators(
      cp,
      this.generators,
    );
    const bars = rmethods.replaceRests(resultant);
    return bars;
  }

  fractioning() {
    if (!this.checkValidGeneratorsNumber()) return -1;
    //for this assignment we assume that generators are already ordered
    const maj = this.generators[0];
    const min = this.generators[1];
    const majStr = rmethods.generateRhythmSequence(maj, maj * maj);
    const bAttacks = majStr.reduce((acc, beat, i) => {
      if (beat === 1) acc.push(i);
      return acc;
    }, []);

    const minStr = rmethods.generateFractioningFromMinorGenerator(
      maj,
      min,
      bAttacks,
    );

    const continuity = rmethods.mergeRhythmicalContinuities([
      majStr, ...minStr
    ]);

    return rmethods.replaceRests(continuity);
  }

  balancing(maj, min) {
    if (!this.checkValidGeneratorsNumber()) return -1;
    const majGen = this.generators[0];
    const minGen = this.generators[1];
    //fractioning + bynary sync
    let continuity = this.fractioning(majGen, minGen);
    continuity = [
      ...continuity,
      this.sync(majGen, minGen),
      [majGen] * (majGen - minGen),
    ];
  }

  expanding() {
    if (!this.checkValidGeneratorsNumber()) return -1;
    const maj = this.generators[0];
    const min = this.generators[1];
    //bynary sync + fractioning
    let continuity = this.sync();
  }

  contracting() { }

  // -------------------- UTILS --------------------------
  checkValidGeneratorsNumber(number = 2) {
    if (this.generators.length !== number) {
      console.error("The number of generators is not valid", {
        size: this.generators.length,
        expected: number,
      });
      return false;
    }
    return true;
  }
}
