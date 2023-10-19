import React from 'react'
import { mahjongSuit, mahjongTile } from '../types/mahjong'
import Image from 'next/image'

export default function MahjongTile({suit, value}: mahjongTile) {
    let tileName = ''
    if (value === 0) {
        switch (suit) {
            case mahjongSuit.man:
                tileName = "aka3"
                break
            case mahjongSuit.pin:
                tileName = "aka1"
                break
            case mahjongSuit.sou:
                tileName = "aka2"
                break
            default:
                throw new Error("Invalid suit")
        }
    } else {
        tileName = `${mahjongSuit[suit]}${value}`
    }

    return (
            <Image src={`/pai-images/${tileName}-66-90-l.png`} alt={tileName} height={30} width={22} style={{float: 'left'}} />
    )
};