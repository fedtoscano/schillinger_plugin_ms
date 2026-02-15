/**
 *  This method creates arrays of '0' (rests) and '1' (beats) for multiple
 *  monomial periodicities
 *
 *  @param int cp
 *  @param array generators
 *  @returns array
 * */
export function getRhythmicResultantFromGenerators(cp, generators) {
  let individualRhythmStrings = [];
  generators.forEach((g) => {
    individualRhythmStrings.push(generateRhythmSequence(g, cp));
  });

  console.log({ individualRhythmStrings });

  return mergeRhythmicalContinuities(individualRhythmStrings);
}

/**
 *  This method returns an array of integers where '1' marks a periodic
 *  rhythm attack every 'generator' steps.
 *
 *  @param int gen
 *  @param int cp
 *  @returns array
 * */
export function generateRhythmSequence(generator, cp) {
  const result = [];
  for (let i = 0; i < cp; i++) result.push(i % generator === 0 ? 1 : 0);
  return result;
}


export function generateFractioningFromMinorGenerator(maj, min, bAttacks) {
  const arr = [];
  const maxLen = maj * maj;
  const rhythmLen = maj * min;
  for (const index of bAttacks) {
    const group = index !== 0 ? Array(index).fill(0) : [];
    group.splice(index, 0, ...generateRhythmSequence(min, rhythmLen));

    if (group.length > maxLen) break;
    group.push(...Array(maxLen - group.length).fill(0));
    arr.push(group);
  }
  return arr;
}

/**
 *  Given 'n' rhythm continuities as arrays of '0' and '1', returns an array
 *  that represents the superimposition of said continuities
 *
 *  @param array continuities
 *  @returns array
 * */
export function mergeRhythmicalContinuities(continuities) {
  console.info("mergeRhythmicalContinuities");
  console.log({ continuities });

  if (continuities.length === 0) return [];

  //assuming all continuities have same length
  return continuities[0].map((_, i) =>
    //maps 1 if one continuity has 0 at given index, else 0
    continuities.some((c) => c[i] === 1) ? 1 : 0,
  );
}

/**
 *  This method sums up consecutive rests and in a given continuity
 *  and adds them to the previous beat value, creating a rhythmic continuity
 *  where rests extend the previous note duration.
 *  Example: Input -> [1, 0, 0, 1, 0, 0, 1]
 *            Outpud -> [3, 3, 1]
 *
 *  @param {array} continuity
 *  @returns {array}
 * */
export function replaceRests(continuity) {
  let result = [];
  let i = 0;

  while (i < continuity.length) {
    let count = 0;
    if (continuity[i] === 1) {
      count = 1;
      while (i + count < continuity.length && continuity[i + count] === 0)
        count += 1;
      result.push(count);
      i += count;
    } else i += 1;
  }

  return result;
}

/**
 * Takes an array of integers as generators and sorts them from
 * major to minor
 * @param {array<int>} generators
 * */
export function sortGenerators(generators) {
  if (!generators.every((g) => Number.isInteger(g)))
    console.error("not every generator is integer!", generators);

  return [...generators].sort((a, b) => a > b);
}

/**
 * Takes an array of integers and returns the minimum common product between them
 */
export function getCommonProduct(numbers) {
  const mcd = (a, b) => {
    while (b !== 0) {
      a %= b;
      [a, b] = [b, a];
    }
    return a;
  };

  const cp = (a, b) => (a * b) / mcd(a, b);

  return numbers.reduce((acc, curr) => cp(acc, curr));
}
