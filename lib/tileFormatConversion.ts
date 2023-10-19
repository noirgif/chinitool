/**
 * Convert a hand from mahjongTile to the format used by the calculator
 */

import { mahjongSuit, mahjongTile } from "../types/mahjong"
import { TileCounts, TileIndex } from "../types/mahjong"

export function convertToCalculatorTile(tile: mahjongTile): TileIndex {
    switch (tile.suit) {
        case mahjongSuit.man:
            return tile.value
        case mahjongSuit.pin:
            return tile.value + 10
        case mahjongSuit.sou:
            return tile.value + 20
        default:
            return tile.value + 30
    }
}

export function convertToCalculatorFormat(hand: mahjongTile[]): TileCounts {
    const result: TileCounts = Array(38).fill(0)
    for (let tile of hand) {
        result[convertToCalculatorTile(tile)]++
    }
    return result
}

export function convertToMahjongTile(tile: TileIndex): mahjongTile {
    if (tile >= 0 && tile < 10) {
        return {
            suit: mahjongSuit.man,
            value: tile
        }
    } else if (tile >= 10 && tile < 20) {
        return {
            suit: mahjongSuit.pin,
            value: tile - 10
        }
    } else if (tile >= 20 && tile < 30) {
        return {
            suit: mahjongSuit.sou,
            value: tile - 20
        }
    } else if (tile >= 31 && tile < 38) {
        return {
            suit: mahjongSuit.honor,
            value: tile - 30
        }
    } else {
        throw new Error("Invalid tile")
    }
}

export function convertToMahjongHand(hand: TileCounts): mahjongTile[] {
    const result: mahjongTile[] = []
    for (let tile: TileIndex = 0; tile < hand.length; ++tile) {
        result.push(...Array(hand[tile]).fill(convertToMahjongTile(tile)))
    }
    return result
}