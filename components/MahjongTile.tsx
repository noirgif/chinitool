import React from 'react'
import { mahjongTile } from '../types/mahjongTile'

export default function MahjongTile({suit, value}: mahjongTile) {
    let tileName = ''
    if (value === 0) {
        switch (suit) {
            case 'man':
                tileName = "aka3"
                break
            case 'pin':
                tileName = "aka1"
                break
            case 'sou':
                tileName = "aka2"
                break
            default:
                throw new Error("Invalid suit")
        }
    } else {
        tileName = `${suit}${value}`
    }

    return (
            <img src={`/pai-images/${tileName}-66-90-l.png`} style={{height: '48px', float:'left'}} alt={tileName} />
    )
};