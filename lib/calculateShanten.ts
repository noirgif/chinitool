import { mahjongTile } from "@/types/mahjong"
import { convertToCalculatorFormat } from "./tileFormatConversion"
import { calculateStandardShanten } from "./Riichi-Trainer/ShantenCalculator"

export function calculateShanten(hand: mahjongTile[]): number {
    let handCounts = convertToCalculatorFormat(hand)
    return calculateStandardShanten(handCounts)
}