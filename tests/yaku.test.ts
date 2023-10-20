import { checkIkki } from "../lib/yaku"
import { NullTile } from "../lib/handBreakdown"
import { HandKind, Wait } from "../types/mahjong"

test("Ikkitsuukan check", () => {
    let breakdown = [{
        start: 27,
        open: false,
        wait: Wait.finished,
        kind: HandKind.shuntsu,
        waitTile: NullTile
    }, {
        start: 24,
        open: false,
        wait: Wait.finished,
        kind: HandKind.toitsu,
        waitTile: NullTile,
    }, {
        start: 21,
        open: false,
        wait: Wait.finished,
        kind: HandKind.shuntsu,
        waitTile: NullTile
    }, {
        start: 21,
        open: false,
        wait: Wait.finished,
        kind: HandKind.shuntsu,
        waitTile: NullTile
    }, {
        start: 24,
        open: false,
        wait: Wait.ryanmen,
        kind: HandKind.shuntsu,
        waitTile: 24
    }]

    expect(checkIkki([], breakdown)).toBe(true)

})