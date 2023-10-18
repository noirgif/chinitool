/**
 * Convert a hand from mahjongTile to the format used by the calculator
 */

import { mahjongTile } from "@/types/mahjongTile";

type TileCounts = Array<number>
type TileIndex = number

export function convertToCalculatorFormat(hand: mahjongTile[]): TileCounts {
    let result: TileCounts = Array(38).fill(0)
    for (let tile of hand) {
        switch (tile.suit) {
            case "man":
                result[tile.value]++
                break
            case "pin":
                result[tile.value + 10]++
                break
            case "sou":
                result[tile.value + 20]++
                break
            case "honor":
                result[tile.value + 31]++
                break
            default:
                throw new Error("Invalid suit")
        }
    }
    return result
}

export function convertToMahjongTile(tile: TileIndex): mahjongTile {
    if (tile >= 0 && tile < 10) {
        return {
            suit: "man",
            value: tile
        }
    } else if (tile >= 10 && tile < 20) {
        return {
            suit: "pin",
            value: tile - 10
        }
    } else if (tile >= 20 && tile < 30) {
        return {
            suit: "sou",
            value: tile - 20
        }
    } else if (tile >= 31 && tile < 38) {
        return {
            suit: "honor",
            value: tile - 31
        }
    } else {
        throw new Error("Invalid tile")
    }
}

export function convertToMahjongHand(hand: TileCounts): mahjongTile[] {
    let result: mahjongTile[] = []
    for (let tile: TileIndex = 0; tile < hand.length; ++tile) {
        result.push(...Array(hand[tile]).fill(convertToMahjongTile(tile)))
    }
    return result
}