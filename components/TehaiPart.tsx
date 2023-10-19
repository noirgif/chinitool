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
                <div className="flex flex-row" style={{margin: '5px'}}>
                    <MahjongTile key='1' suit={start.suit} value={start.value} />
                    <MahjongTile key='2' suit={start.suit} value={start.value + 1} />
                    <MahjongTile key='3' suit={start.suit} value={start.value + 2} />
                </div>
            )
        case HandKind.koutsu:
            return (
                <div className="flex flex-row" style={{margin: '5px'}}>
                    <MahjongTile key='1' suit={start.suit} value={start.value} />
                    <MahjongTile key='2' suit={start.suit} value={start.value} />
                    <MahjongTile key='3' suit={start.suit} value={start.value} />
                </div>
            )
        case HandKind.toitsu:
            return (
                <div className="flex flex-row" style={{margin: '5px'}}>
                    <MahjongTile key='1' suit={start.suit} value={start.value} />
                    <MahjongTile key='2' suit={start.suit} value={start.value} />
                </div>
            )
        default:
    }
}