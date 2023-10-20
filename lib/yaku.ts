import { HandKind, TehaiPart, TileCounts, Wait } from "../types/mahjong";
import { getSuit, isHonor, isNine, isOne, numIndex } from "./util";
import { NullTile } from "./handBreakdown";

export type Yaku = {
  name: string;
  yakuman: number;
  han: number;
  menzen?: "menzen" | "kuisagari";
  checker?: (hand: TileCounts, breakdown: TehaiPart[]) => boolean;
};

export const ExistingYaku: Yaku[] = [
  { name: "立直", yakuman: 0, han: 1, menzen: "menzen" },
  { name: "一発", yakuman: 0, han: 1, menzen: "menzen" },
  { name: "自摸", yakuman: 0, han: 1, menzen: "menzen" },
  { name: "平和", yakuman: 0, han: 1, menzen: "menzen", checker: checkPinfu },
  { name: "タンヤオ", yakuman: 0, han: 1, checker: checkTanyao },
  { name: "一盃口", yakuman: 0, han: 1, menzen: "menzen", checker: checkIpeko },
  { name: "役牌", yakuman: 0, han: 1 },

  { name: "ダブル立直", yakuman: 0, han: 2, menzen: "menzen" },
  {
    name: "チャンタ",
    yakuman: 0,
    han: 2,
    menzen: "kuisagari",
    checker: (hand, breakdown) => {
      return checkChantas(hand, breakdown, ChantaKind.chanta);
    },
  },
  {
    name: "一気通貫",
    yakuman: 0,
    han: 2,
    menzen: "kuisagari",
    checker: checkIkki,
  },
  {
    name: "混老頭",
    yakuman: 0,
    han: 2,
    checker: (hand, breakdown) => {
      return checkChantas(hand, breakdown, ChantaKind.honroto);
    },
  },
  { name: "小三元", yakuman: 0, han: 2 },
  { name: "対々和", yakuman: 0, han: 2 },
  { name: "三色同順", yakuman: 0, han: 2, menzen: "kuisagari" },
  { name: "三色同刻", yakuman: 0, han: 2 },
  {
    name: "三暗刻",
    yakuman: 0,
    han: 2,
    checker: (hand, breakdown) => checkAnko(hand, breakdown, 3),
  },

  { name: "ホンイツ", yakuman: 0, han: 3, menzen: "kuisagari" },
  {
    name: "純チャン",
    yakuman: 0,
    han: 3,
    menzen: "kuisagari",
    checker: (hand, breakdown) => {
      return checkChantas(hand, breakdown, ChantaKind.junChan);
    },
  },
  {
    name: "二盃口",
    yakuman: 0,
    han: 3,
    menzen: "menzen",
    checker: (hand, breakdown) => {
      return checkChitoitsu(hand) && breakdown.length != 0;
    },
  },

  {
    name: "清一色",
    yakuman: 0,
    han: 6,
    menzen: "kuisagari",
    checker: checkChinitsu,
  },

  { name: "国士無双", yakuman: 1, han: 0, checker: checkKokushi },
  {
    name: "九蓮宝燈",
    yakuman: 1,
    han: 0,
    menzen: "menzen",
    checker: checkChurenpoto,
  },
  {
    name: "字一色",
    yakuman: 1,
    han: 0,
    checker: (hand, breakdown) =>
      checkChantas(hand, breakdown, ChantaKind.tsuiso),
  },
  { name: "緑一色", yakuman: 1, han: 0, checker: checkRyuiso },
  { name: "大三元", yakuman: 1, han: 0 },
  { name: "小四喜", yakuman: 1, han: 0 },
  {
    name: "四暗刻",
    yakuman: 1,
    han: 0,
    checker: (hand, breakdown) => checkAnko(hand, breakdown, 4),
  },
  { name: "四槓子", yakuman: 1, han: 0 },

  { name: "大四喜", yakuman: 1, han: 0 },
];

export function countChitoitsuYaku(hand: TileCounts): {
  han: number;
  yakuman: number;
  yaku: Yaku[];
} {
  let han = 2;
  let yakuman = 0;
  let yaku: Yaku[] = [];
  //
  return { han, yakuman, yaku };
}

export function countNormalHandYaku(
  hand: TileCounts,
  breakdown: TehaiPart[]
): { han: number; yakuman: number; yaku: Yaku[] } {
  let han = 0;
  let yakuman = 0;
  let yaku: Yaku[] = [];

  return { han, yakuman, yaku };
}

export function checkChitoitsu(
  hand: TileCounts,
  breakdown?: TehaiPart[]
): boolean {
  // check for chitoitsu
  for (let i = 0; i < hand.length; ++i) {
    if (hand[i] != 2 && hand[i] != 0) {
      return false;
    }
  }
  return true;
}

export function checkIpeko(hand: TileCounts, breakdown: TehaiPart[]): boolean {
  if (checkChitoitsu(hand, breakdown)) return false;
  const shuntsuCount = Array(38).fill(0);
  for (let part of breakdown) {
    if (part.kind == HandKind.shuntsu) {
      shuntsuCount[part.start]++;
      if (shuntsuCount[part.start] >= 2) {
        return true;
      }
    }
  }
  return false;
}

export function checkChinitsu(
  hand: TileCounts,
  breakdown?: TehaiPart[]
): boolean {
  let suit = null;
  for (let i = 0; i < hand.length; ++i) {
    if (hand[i] != 0) {
      if (suit !== null && getSuit(i) != suit) {
        return false;
      } else if (suit === null) suit = getSuit(i);
    }
  }
  return true;
}

export function checkTanyao(
  hand: TileCounts,
  breakdown?: TehaiPart[]
): boolean {
  for (let i = 0; i < hand.length; ++i) {
    if (isOne(i) || isNine(i) || isHonor(i)) {
      return false;
    }
  }
  return true;
}

enum ChantaKind {
  chanta,
  junChan,
  honroto,
  chinroto,
  tsuiso,
}

export function checkChantas(
  hand: TileCounts,
  breakdown: TehaiPart[],
  chantaKind: ChantaKind
): boolean {
  let hasHonor = false;
  let hasNumber = false;
  let hasShuntsu = false;

  if (!breakdown) {
    // for chitoitsu counting
    for (let i = 0; i < hand.length; ++i) {
      if (isOne(i) || isNine(i)) {
        hasNumber = true;
        continue;
      }
      if (isHonor(i)) {
        hasHonor = true;
        continue;
      }
      return false;
    }
  } else {
    for (let part of breakdown) {
      if (part.kind == HandKind.shuntsu) {
        if (isOne(part.start) || numIndex(part.start) == 7) {
          hasNumber = true;
          hasShuntsu = true;
          continue;
        }
        return false;
      } else {
        if (isOne(part.start) || isNine(part.start)) {
          hasNumber = true;
          continue;
        }
        if (isHonor(part.start)) {
          hasHonor = true;
          continue;
        }
        return false;
      }
    }
  }

  switch (chantaKind) {
    case ChantaKind.chanta:
      return hasShuntsu && hasHonor;
    case ChantaKind.junChan:
      return hasShuntsu && !hasHonor;
    case ChantaKind.chinroto:
      return !hasShuntsu && !hasHonor;
    case ChantaKind.honroto:
      return !hasShuntsu && hasNumber && hasHonor;
    case ChantaKind.tsuiso:
      return !hasNumber && hasHonor;
  }
}

export function checkKokushi(
  hand: TileCounts,
  breakdown?: TehaiPart[]
): boolean {
  const kokushiTiles = [1, 9, 11, 19, 21, 29, 31, 32, 33, 34, 35, 36, 37];
  let double = false;

  for (let tile of kokushiTiles) {
    if (hand[tile] == 0) return false;
    if (hand[tile] == 2) {
      if (double) return false;
      double = true;
    }
  }
  return true;
}

export function checkChurenpoto(
  hand: TileCounts,
  breakdown?: TehaiPart[]
): boolean {
  let suit = null;
  let dup = false;
  const churenpotoTiles = [0, 3, ...Array(7).fill(1), 3];

  for (let i = 0; i < hand.length; ++i) {
    if (hand[i] == 0) continue;
    if (suit !== null && getSuit(i) != suit) {
      return false;
    } else if (suit === null) suit = getSuit(i);

    if (hand[i] == churenpotoTiles[numIndex(i)]) {
      continue;
    } else if (hand[i] == churenpotoTiles[numIndex(i)] + 1) {
      if (dup) return false;
      dup = true;
    } else {
      return false;
    }
  }
  return true;
}

// TODO: to fix it to be more accurate
export function checkMenzen(hand: TileCounts, breakdown: TehaiPart[]): boolean {
  for (let part of breakdown) {
    if (part.wait == Wait.finished && part.open) {
      return false;
    }
  }
  return true;
}

export function checkPinfu(hand: TileCounts, breakdown: TehaiPart[]): boolean {
  if (!breakdown) return false;

  for (let part of breakdown) {
    if (part.kind == HandKind.shuntsu) {
      if (part.wait != Wait.finished && part.wait != Wait.ryanmen) {
        return false;
      }
      continue;
    } else if (part.kind == HandKind.toitsu) {
      if (part.start >= 35 || part.wait != Wait.finished) {
        return false;
      }
      continue;
    }
    return false;
  }
  return true;
}

export function checkAnko(
  hand: TileCounts,
  breakdown: TehaiPart[],
  requiredAnko: number
): boolean {
  if (!breakdown) return false;

  let ankoCount = 0;

  for (let part of breakdown) {
    if (
      (part.kind == HandKind.koutsu || part.kind == HandKind.kantsu) &&
      !part.open
    ) {
      ankoCount++;
    }
  }
  return ankoCount == requiredAnko;
}

export function checkIkki(hand: TileCounts, breakdown: TehaiPart[]): boolean {
  const ikki_count = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  for (let part of breakdown) {
    if (part.kind == HandKind.shuntsu && numIndex(part.start) % 3 == 1) {
      ikki_count[getSuit(part.start)][Math.floor(numIndex(part.start) / 3)]++;
    }
  }
  for (let suit = 0; suit < ikki_count.length; ++suit) {
    let itsu = true;
    for (let count of ikki_count[suit]) {
      if (count == 0) itsu = false;
    }
    if (itsu) return true;
  }
  return false;
}

export function checkRyuiso(
  hand: TileCounts,
  breakdown?: TehaiPart[]
): boolean {
  const ryuisoTiles = [22, 23, 24, 26, 28, 36];
  let ryuisoTileCount = 0;
  for (let tile of ryuisoTiles) {
    ryuisoTileCount += hand[tile];
  }
  return ryuisoTileCount == 14;
}

export function countYaku(
  hand: TileCounts,
  breakdown: TehaiPart[]
): { han: number; yakuman: number; yaku: string[]; yakuman_name: string[] } {
  let han = 0;
  let yakuman = 0;
  const countedYaku: string[] = [];
  const countedYakuman: string[] = [];
  let menzen = checkMenzen(hand, breakdown);

  for (let yaku of ExistingYaku) {
    if (yaku.menzen == "menzen" && !menzen) continue;

    if (yaku.checker) {
      if (yaku.checker(hand, breakdown)) {
        if (yaku.menzen == "kuisagari" && !menzen) han += yaku.han - 1;
        else han += yaku.han;
        yakuman += yaku.yakuman;
        if (yaku.yakuman) countedYakuman.push(yaku.name);
        else countedYaku.push(yaku.name);
      }
    }
  }

  return { han, yakuman, yaku: countedYaku, yakuman_name: countedYakuman };
}
