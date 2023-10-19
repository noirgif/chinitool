import React from 'react';
import { mahjongTile } from '../types/mahjong'
import MahjongTile from './MahjongTile'

interface TehaiProps {
    tiles: mahjongTile[]
}

export default function Tehai({tiles}: TehaiProps) {
    // a little more space between the 13th and 14th tile
    if (tiles.length == 14) {
        return (
            <h4 style={{display: "inline-block", float: "left", height: '48px'}}>
                {tiles.slice(0, 13).map((tile, index) => (<MahjongTile key={index} suit={tile.suit} value={tile.value} />))}
                <div style={{marginLeft: '8px', display: 'inline-block'}} >
                    <MahjongTile suit={tiles[13].suit} value={tiles[13].value} />
                </div>
            </h4>
        )
    }

    return (
        <h4 style={{display: "inline-block", float: "left", height: '48px'}}>
            {tiles.slice(0, 13).map((tile, index) => (<MahjongTile key={index} suit={tile.suit} value={tile.value} />))}
        </h4>
    )
}
