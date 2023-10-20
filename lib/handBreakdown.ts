import {
  HandKind,
  MahjongTehaiPart,
  TehaiPart,
  Wait,
  mahjongTile,
} from "../types/mahjong";
import { TileCounts, TileIndex } from "../types/mahjong";
import {
  convertToCalculatorFormat,
  convertToCalculatorTile,
  convertToMahjongTile,
} from "./tileFormatConversion";
import { numIndex } from "./util";
import { isHonor, isOne, isNine, Man, Pin, Sou } from "./util";

export const NullTile = 30;

// a easy sanity check for the breakdown
export function isValidBreakdown(hand: TileCounts): boolean {
  for (let i = 0; i < hand.length; ++i) {
    if (hand[i] != 1) continue;

    // not considering kokushi
    if (isHonor(i)) return false;

    // is there is one 8/9 tile without a 7, then it is a wrong breakdown
    if (isOne(i)) {
      if (hand[i + 1] == 0 || hand[i + 2] == 0) return false;
    } else if (isNine(i)) {
      if (hand[i - 1] == 0 || hand[i - 2] == 0) return false;
    } else if (hand[i - 1] == 0 && hand[i + 1] == 0)
      // if there is one tile without a neighbor, then it is a wrong breakdown
      return false;
  }

  return true;
}

export function findPair(
  hand: TileCounts,
  winningTile: TileIndex,
  open: boolean
): TehaiPart | null {
  for (let i = 0; i < hand.length; ++i) {
    if (hand[i] >= 2) {
      return {
        start: i,
        open: i == winningTile ? open : false,
        wait: i == winningTile ? Wait.tanki : Wait.finished,
        kind: HandKind.toitsu,
        waitTile: winningTile,
      };
    }
  }
  return null;
}

export function countRemainingTiles(hand: TileCounts): number {
  let result = 0;
  for (let i = 0; i < hand.length; ++i) {
    result += hand[i];
  }
  return result;
}

/**
 * If their are open mentsu, they should not be included in the hand
 * Red five MUST BE converted to black five
 * @param hand the hand, in calculator format, without the winning tile, only look for the pairs when there are just 2 tiles remaining
 * @param winningTile the winning tile
 * @param open if the hand is open
 */
export function* winningHandBreakdownHelper(
  hand: TileCounts,
  winningTile: TileIndex,
  open: boolean
): IterableIterator<TehaiPart[]> {
  if (winningTile != NullTile) {
    hand[winningTile]++;
  }

  let remainingTiles = countRemainingTiles(hand);

  if (remainingTiles == 0) {
    yield [];
    return;
  }

  if (!isValidBreakdown(hand)) {
    return;
  }

  if (winningTile != NullTile) {
    hand[winningTile]--;
  }

  // use winning tile first
  if (winningTile != NullTile) {
    // shanpon wait
    if (hand[winningTile] >= 2) {
      hand[winningTile] -= 2;
      for (let breakdown of winningHandBreakdownHelper(hand, NullTile, open)) {
        breakdown.push({
          start: winningTile,
          open: open,
          wait: Wait.pon,
          kind: HandKind.koutsu,
          waitTile: winningTile,
        });
        yield breakdown;
      }
      hand[winningTile] += 2;
    }
    // tanki wait
    if (hand[winningTile] >= 1 && remainingTiles % 3 == 2) {
      hand[winningTile]--;
      for (let breakdown of winningHandBreakdownHelper(hand, NullTile, open)) {
        breakdown.push({
          start: winningTile,
          open: open,
          wait: Wait.tanki,
          kind: HandKind.toitsu,
          waitTile: winningTile,
        });
        yield breakdown;
      }
      hand[winningTile]++;
    }

    if (isHonor(winningTile)) return;

    // shuntsu wait
    if (
      numIndex(winningTile) <= 7 &&
      hand[winningTile + 1] > 0 &&
      hand[winningTile + 2] > 0
    ) {
      hand[winningTile + 1]--;
      hand[winningTile + 2]--;
      for (let breakdown of winningHandBreakdownHelper(hand, NullTile, open)) {
        breakdown.push({
          start: winningTile,
          open: open,
          wait: numIndex(winningTile) == 7 ? Wait.penchan : Wait.ryanmen,
          kind: HandKind.shuntsu,
          waitTile: winningTile,
        });
        yield breakdown;
      }
      hand[winningTile + 1]++;
      hand[winningTile + 2]++;
    }
    if (
      numIndex(winningTile) >= 2 &&
      numIndex(winningTile) <= 8 &&
      hand[winningTile + 1] > 0 &&
      hand[winningTile - 1] > 0
    ) {
      hand[winningTile + 1]--;
      hand[winningTile - 1]--;
      for (let breakdown of winningHandBreakdownHelper(hand, NullTile, open)) {
        breakdown.push({
          start: winningTile - 1,
          open: open,
          wait: Wait.kanchan,
          kind: HandKind.shuntsu,
          waitTile: winningTile,
        });
        yield breakdown;
      }
      hand[winningTile + 1]++;
      hand[winningTile - 1]++;
    }
    if (
      numIndex(winningTile) >= 3 &&
      hand[winningTile - 1] > 0 &&
      hand[winningTile - 2] > 0
    ) {
      hand[winningTile - 1]--;
      hand[winningTile - 2]--;
      for (let breakdown of winningHandBreakdownHelper(hand, NullTile, open)) {
        breakdown.push({
          start: winningTile - 2,
          open: open,
          wait: numIndex(winningTile) == 3 ? Wait.penchan : Wait.ryanmen,
          kind: HandKind.shuntsu,
          waitTile: winningTile,
        });
        yield breakdown;
      }
      hand[winningTile - 1]++;
      hand[winningTile - 2]++;
    }
    return;
  }

  // concealed triplets
  for (let i = 0; i < hand.length; ++i) {
    if (i == NullTile) continue;

    if (hand[i] > 0) {
      // concealed triplet
      if (hand[i] >= 3) {
        hand[i] -= 3;
        for (let breakdown of winningHandBreakdownHelper(
          hand,
          winningTile,
          open
        )) {
          breakdown.push({
            start: i,
            open: false,
            wait: Wait.finished,
            kind: HandKind.koutsu,
            waitTile: NullTile,
          });
          yield breakdown;
        }
        hand[i] += 3;
      }

      // concealed pair
      if (hand[i] >= 2 && remainingTiles % 3 == 2) {
        hand[i] -= 2;
        for (let breakdown of winningHandBreakdownHelper(
          hand,
          winningTile,
          open
        )) {
          breakdown.push({
            start: i,
            open: false,
            wait: Wait.finished,
            kind: HandKind.toitsu,
            waitTile: NullTile,
          });
          yield breakdown;
        }
        hand[i] += 2;
      }

      // all remaining tiles being used for concealed sequence
      // since we can only have 1 triplet or 1 pair, this ensures the uniqueness of the breakdown
      if (
        i <= Man(7) ||
        (i >= Pin(1) && i <= Pin(7)) ||
        (i >= Sou(1) && i <= Sou(7))
      ) {
        if (hand[i + 1] >= hand[i] && hand[i + 2] >= hand[i]) {
          let tmp = hand[i];
          hand[i] = 0;
          hand[i + 1] -= tmp;
          hand[i + 2] -= tmp;
          for (let breakdown of winningHandBreakdownHelper(
            hand,
            winningTile,
            open
          )) {
            for (let j = 0; j < tmp; ++j)
              breakdown.push({
                start: i,
                open: false,
                wait: Wait.finished,
                kind: HandKind.shuntsu,
                waitTile: NullTile,
              });
            yield breakdown;
          }
          hand[i] = tmp;
          hand[i + 1] += tmp;
          hand[i + 2] += tmp;
        }
      }

      break;
    }
  }
}

export function* winningHandBreakdown(
  hand: mahjongTile[],
  winningTile: mahjongTile,
  open: boolean
): IterableIterator<MahjongTehaiPart[]> {
  const handCounts = convertToCalculatorFormat(hand);
  const winningTileIndex = convertToCalculatorTile(winningTile);
  for (let breakdown of winningHandBreakdownHelper(
    handCounts,
    winningTileIndex,
    open
  )) {
    yield breakdown.map(toMahjongTehaiPart);
  }
}

export function toMahjongTehaiPart(part: TehaiPart): MahjongTehaiPart {
  return {
    start: convertToMahjongTile(part.start),
    open: part.open,
    wait: part.wait,
    kind: part.kind,
    waitTile:
      part.waitTile == NullTile ? null : convertToMahjongTile(part.waitTile),
  };
}
