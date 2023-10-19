import { HandKind, TileCounts, Wait } from "../types/mahjong";
import { isValidBreakdown, Man, Pin, Sou, Honor, NullTile, winningHandBreakdownHelper } from "../lib/handBreakdown";

describe("isValidBreakdown", () => {
    test('empty hand is valid', () => {
        let hand = Array(38).fill(0)
        expect(isValidBreakdown(hand)).toBe(true)
    })

    test('should return true for valid breakdowns', () => {
        let hand = [3, 1, 1, 1, 1, 1, 1, 1, 4, ...Array(29).fill(0)]
        expect(isValidBreakdown(hand)).toBe(true)
        hand = [3, 0, 2, 1, 1, 1, 1, 1, 4, ...Array(29).fill(0)]
        expect(isValidBreakdown(hand)).toBe(true)
        hand = [0, 2, ...Array(36).fill(0)]
        expect(isValidBreakdown(hand)).toBe(true)
    })

    test('should return true for a sequence', () => {
        let hand = [0, 0, 1, 1, 1, ...Array(33).fill(0)]
        expect(isValidBreakdown(hand)).toBe(true)
    })

    test('return true for a sequence and a pair', () => {
        let hand = [0, 1, 1, 1, 2, ...Array(33).fill(0)]
        expect(isValidBreakdown(hand)).toBe(true)
    })

    test('should return false for invalid breakdowns', () => {
        let hand = [0, 1,...Array(36).fill(0)]
        expect(isValidBreakdown(hand)).toBe(false)
    })

    test('cannot connect different suits', () => {
        let hand = [...Array(8).fill(0), 1, 1, 1, ...Array(27).fill(0)]
        expect(isValidBreakdown(hand)).toBe(false)
    })

    test('cannot connect honors to make a shuntsu', () => {
        let hand = [...Array(30).fill(0), 1, 1, 1, ...Array(5).fill(0)]
        expect(isValidBreakdown(hand)).toBe(false)
    })
})


describe("winningHandBreakdownHelper", () => {
    test('Should break down a pair', () => {
        let hand = [2, ...Array(37).fill(0)]
        let result = winningHandBreakdownHelper(hand, NullTile, false).next().value
        expect(result).toEqual([{
            start: 0,
            open: false,
            wait: Wait.finished,
            kind: HandKind.toitsu,
            waitTile: NullTile
        }])
    })

    test('Should break down a open pair', () => {
        let hand = [0, 0, 1, ...Array(35).fill(0)]
        let result = winningHandBreakdownHelper(hand, 2, true).next().value
        expect(result).toEqual([{
            start: 2,
            open: true,
            wait: Wait.tanki,
            kind: HandKind.toitsu,
            waitTile: 2
        }])
    })

    test('Should break down a concealed sequence', () => {
        let hand = [0, 0, 1, 1, 1, ...Array(33).fill(0)]
        let result = winningHandBreakdownHelper(hand, NullTile, false).next().value
        expect(result).toContainEqual({
            start: 2,
            open: false,
            wait: Wait.finished,
            kind: HandKind.shuntsu,
            waitTile: NullTile
        })
    })

    test('Should break down a concealed triplet', () => {
        let hand = [0, 2, 3, ...Array(35).fill(0)]
        let result = winningHandBreakdownHelper(hand, NullTile, false).next().value
        expect(result).toContainEqual({
            start: 1,
            open: false,
            wait: Wait.finished,
            kind: HandKind.toitsu,
            waitTile: NullTile
        })
        expect(result).toContainEqual({
            start: 2,
            open: false,
            wait: Wait.finished,
            kind: HandKind.koutsu,
            waitTile: NullTile
        })
    })

    test('Should break down an open triplet', () => {
        let hand = [0, 2, 2, ...Array(35).fill(0)]
        let result = winningHandBreakdownHelper(hand, 1, true).next().value
        expect(result).toContainEqual({
            start: 1,
            open: true,
            wait: Wait.shanpon,
            kind: HandKind.koutsu,
            waitTile: 1
        })
    })

    test('Should break down a concealed sequence with a pair', () => {
        let hand = [0, 1, 1, 1, 2, ...Array(33).fill(0)]
        let result = winningHandBreakdownHelper(hand, NullTile, false).next().value
        expect(result).toContainEqual({
            start: 1,
            open: false,
            wait: Wait.finished,
            kind: HandKind.shuntsu,
            waitTile: NullTile
        })
    })

    test('Should break down an open sequence with a pair', () => {
        let hand = [0, 1, 0, 1, 2, ...Array(33).fill(0)]
        let result = winningHandBreakdownHelper(hand, 2, true).next().value
        expect(result).toContainEqual({
            start: 1,
            open: true,
            wait: Wait.kanchan,
            kind: HandKind.shuntsu,
            waitTile: 2
        })
    })

    test('Should break down nobetan machi', () => {
        let hand = [0, 1, 1, 1, 1, ...Array(33).fill(0)]
        let result = winningHandBreakdownHelper(hand, 4, false).next().value
        expect(result).toContainEqual({
            start: 4,
            open: false,
            wait: Wait.tanki,
            kind: HandKind.toitsu,
            waitTile: 4
        })
    })

    test('Should break down sequence like 11123444 in two ways', () => {
        let hand = [0, 3, 1, 1, 3, 0, 0, 0, 0, ...Array(29).fill(0)]
        let result = Array.from(winningHandBreakdownHelper(hand, NullTile, false))
        expect(result).toContainEqual([
            {
                start: 4,
                open: false,
                wait: Wait.finished,
                kind: HandKind.toitsu,
                waitTile: NullTile
            }, {
                start: 2,
                open: false,
                wait: Wait.finished,
                kind: HandKind.shuntsu,
                waitTile: NullTile
            }, {
                start: 1,
                open: false,
                wait: Wait.finished,
                kind: HandKind.koutsu,
                waitTile: NullTile
            }
        ])
        expect(result.length).toBe(2)
    })

    test('Should break down open handed sequence like 1112344 + 4 in 3 ways: tanki, ryanmen, shanpon', () => {
        let hand = [0, 3, 1, 1, 2, 0, 0, 0, 0, ...Array(29).fill(0)]
        let result = Array.from(winningHandBreakdownHelper(hand, 4, false))
        expect(result).toContainEqual([
            {
                start: 2,
                open: false,
                wait: Wait.finished,
                kind: HandKind.shuntsu,
                waitTile: NullTile
            }, {
                start: 1,
                open: false,
                wait: Wait.finished,
                kind: HandKind.koutsu,
                waitTile: NullTile
            }, {
                start: 4,
                open: false,
                wait: Wait.tanki,
                kind: HandKind.toitsu,
                waitTile: 4
            }
        ])
        expect(result).toContainEqual([
            {
                start: 4,
                open: false,
                wait: Wait.finished,
                kind: HandKind.toitsu,
                waitTile: NullTile
            }, {
                start: 1,
                open: false,
                wait: Wait.finished,
                kind: HandKind.koutsu,
                waitTile: NullTile
            }, {
                start: 2,
                open: false,
                wait: Wait.ryanmen,
                kind: HandKind.shuntsu,
                waitTile: 4
            }
        ])
        expect(result.length).toBe(3)
    })

    test('Should break down sequence like 11122233355566 in two ways', () => {
        let hand = [0, 3, 3, 2, 0, 3, 2, 0, 0, 0, 0, ...Array(27).fill(0)]
        let result = Array.from(winningHandBreakdownHelper(hand, 3, false))
        expect(result.length).toBe(2)
    })
})