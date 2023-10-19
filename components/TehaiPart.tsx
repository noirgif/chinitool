import { HandKind, MahjongTehaiPart } from "@/types/mahjong";
import MahjongTile from "./MahjongTile";

export default function TehaiPart({
    start,
    open,
    wait,
    kind
}: MahjongTehaiPart) {
    switch (kind) {
        case HandKind.shuntsu:
            return (
                <div className="flex flex-row gap-1">
                    <MahjongTile suit={start.suit} value={start.value} />
                    <MahjongTile suit={start.suit} value={start.value + 1} />
                    <MahjongTile suit={start.suit} value={start.value + 2} />
                </div>
            )
        case HandKind.koutsu:
            return (
                <div className="flex flex-row gap-1">
                    <MahjongTile suit={start.suit} value={start.value} />
                    <MahjongTile suit={start.suit} value={start.value} />
                    <MahjongTile suit={start.suit} value={start.value} />
                </div>
            )
        case HandKind.toitsu:
            return (
                <div className="flex flex-row gap-1">
                    <MahjongTile suit={start.suit} value={start.value} />
                    <MahjongTile suit={start.suit} value={start.value} />
                </div>
            )
        default:
    }
}