import { TileIndex } from "@/types/mahjong";

export function Man(value: number): TileIndex {
  return value;
}

export function Pin(value: number): TileIndex {
  return value + 10;
}

export function Sou(value: number): TileIndex {
  return value + 20;
}

export function Honor(value: number): TileIndex {
  return value + 30;
}

export function isOne(tile: TileIndex): boolean {
  return tile % 10 == 1 && tile < 30;
}

export function isNine(tile: TileIndex): boolean {
  return tile % 10 == 9 && tile < 30;
}

export function isHonor(tile: TileIndex): boolean {
  return tile > 30;
}

export function getSuit(tile: TileIndex): number {
  return Math.floor(tile / 10);
}

// return the number of the tile, ignoring the suit
// e.g. numIndex(11 /* 1p */) = 1, numIndex(23 /* 3s */) = 3
export function numIndex(tile: TileIndex): number {
  return tile % 10;
}
