export enum mahjongSuit {
    man,
    pin,
    sou,
    honor
}

export type mahjongTile = {
    suit: mahjongSuit,
    value: number
}

export enum Wait {
    tanki,
    ryanmen,
    kanchan,
    penchan,
    shanpon,
    finished
}

export enum HandKind {
    shuntsu,
    koutsu,
    kantsu,
    toitsu
}

export interface MahjongTehaiPart {
    start: mahjongTile
    open: boolean
    wait: Wait
    kind: HandKind
    waitTile: mahjongTile | null
}

// for easier calculation
export type TileCounts = Array<number>
export type TileIndex = number

export interface TehaiPart {
    start: TileIndex
    open: boolean
    wait: Wait
    kind: HandKind
    waitTile: TileIndex
}