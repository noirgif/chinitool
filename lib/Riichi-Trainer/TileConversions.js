/**
 * @file TileConversions.js
 * Code from Europhrys/Riichi-Trainer under GPL-3.0.
 */


/** @typedef {number} TileIndex A number between 0 and 37 representing a tile. 0, 10, and 20 are red fives, and 30 is the back of a tile. */

/**
 * Converts red fives to normal fives.
 * @param {TileIndex|TileIndex[]} tiles The tile index to convert, or an array of tile indexes.
 * @returns {TileIndex|TileIndex[]} The converted tile(s).
 */
export function convertRedFives(tiles) {
    if (typeof tiles === 'number') {
        if (tiles % 10 === 0) {
            return tiles + 5;
        }
    }

    if (typeof tiles === 'object' && tiles.length) {
        let result = tiles.slice();

        for (let i = 0; i < 30; i += 10) {
            result[i + 5] += result[i];
            result[i] = 0;
        }

        return result;
    }

    return tiles;
}