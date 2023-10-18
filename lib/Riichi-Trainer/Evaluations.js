/**
 * @file Evaluations.js
 * Code from Europhrys/Riichi-Trainer under GPL-3.0.
 */

import { getRandomItem } from "./Utils";

/** @typedef {{value:number, tiles:number[]}} UkeireObject */

/**
 * Determines the best tile to discard when given tiles with equal ukeire.
 * @param {UkeireObject[]} ukeireObjects The ukeire objects for each discard.
 * @param {TileIndex} dora The current dora.
 */
export function evaluateBestDiscard(ukeireObjects, dora = -1) {
    let ukeire = ukeireObjects.map(o => o.value);
    let bestUkeire = Math.max(...ukeire);
    let bests = [];

    for (let i = 0; i < ukeire.length; i++) {
        if (ukeire[i] === bestUkeire) {
            bests.push(i);
        }
    }

    if (!bests.length) return -1;
    if (bests.length === 1) return bests[0];

    // Avoid suggesting to discard the dora.
    if (bests.indexOf(dora) > -1) bests.splice(bests.indexOf(dora), 1);

    // Suggest discarding winds first, then dragons, if any are present.
    if (bests.indexOf(32) > -1) return 32;
    if (bests.indexOf(33) > -1) return 33;
    if (bests.indexOf(34) > -1) return 34;
    if (bests.indexOf(31) > -1) return 31;
    if (bests.indexOf(35) > -1) return 35;
    if (bests.indexOf(36) > -1) return 36;
    if (bests.indexOf(37) > -1) return 37;

    // Suggest discarding terminals.
    for (let i = 1; i < 10; i += 8) {
        for (let j = 0; j < 3; j++) {
            let tile = j + i;

            if (bests.indexOf(tile) > -1) return tile;
        }
    }

    // Suggest discarding twos and eights.
    for (let i = 2; i < 10; i += 6) {
        for (let j = 0; j < 3; j++) {
            let tile = j + i;

            if (bests.indexOf(tile) > -1) return tile;
        }
    }

    // Suggest a random remaining tile (all are between 3 and 7)
    return getRandomItem(bests);
}
