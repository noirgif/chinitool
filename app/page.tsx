'use client'
import Tehai from '@/components/Tehai'
import TehaiInput from '@/components/TehaiInput';
import { mahjongTile } from '@/types/mahjongTile';
import { useState } from 'react';

import { calculateShanten } from '@/lib/calculateShanten';

export default function Home() {
  const [tehai, setTehai]: [mahjongTile[], Function] = useState([{ suit: "pin", value: 1 }, { suit: "sou", value: 0 }]);
  let shantenText = ''
  if (tehai.length == 14) {
    let shanten = calculateShanten(tehai)
    switch (shanten) {
      case 0:
        shantenText = "聴牌"
        break
      case -1:
        shantenText = "和了"
        break
      default:
        shantenText = `${shanten}向聴`
    }
  }
  return (
    <>
      <div style={{ height: '120px', float: 'none' }}>
        <div style={{ height: '60px' }}><Tehai tiles={tehai} /></div>
        <TehaiInput setTehai={setTehai} />
      </div>
      <div style={{ height: '80px' }}>
        <h4 style={{ height: '48px' }}>
          {shantenText}
        </h4>
      </div>
    </>
  )
}
