'use client'
import Tehai from '@/components/Tehai'
import TehaiInput from '@/components/TehaiInput';
import { mahjongTile } from '@/types/mahjong';
import { useState } from 'react';

import { calculateShanten } from '@/lib/calculateShanten';
import { toMahjongTehaiPart, winningHandBreakdown, winningHandBreakdownHelper } from '@/lib/handBreakdown';
import TehaiPart from '@/components/TehaiPart';
import { convertToCalculatorFormat, convertToCalculatorTile } from '@/lib/tileFormatConversion';
import { countYaku } from '@/lib/yaku';

export default function Home() {
  const [tehai, setTehai]: [mahjongTile[], Function] = useState([]);
  let shantenText = ''
  let breakdownComponent: JSX.Element[] = []
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

    let breakdownCount = 0
    const hand = convertToCalculatorFormat(tehai.slice(0, 13))
    const hand14 = convertToCalculatorFormat(tehai)
    for (let breakdown of winningHandBreakdownHelper(hand, convertToCalculatorTile(tehai[13]), false)) {
      const yaku_result = countYaku(hand14, breakdown)
      const yaku_strings = yaku_result.yakuman ? yaku_result.yakuman_name : yaku_result.yaku
      breakdownComponent.push(
        <li key={breakdownCount} style={{display: 'flex', flexDirection: 'row', gap: '1px'}}>
          {breakdown.map((part, i) => <TehaiPart key={i} {...toMahjongTehaiPart(part)} />)}
          {yaku_strings.map((yaku, i) => <span key={i} className='flex mx-1'>{yaku}</span>)}
        </li>
      )
      breakdownCount++

      if (breakdownCount > 10) {
        break
      }
    }
  }

  return (
    <>
      <div className="Tehai" style={{ height: '120px', float: 'none' }}>
        <div style={{ height: '60px' }}><Tehai tiles={tehai} /></div>
        <TehaiInput setTehai={setTehai} />
      </div>
      <div style={{ height: '80px' }}>
        <h4 style={{ height: '48px' }}>
          {shantenText}
        </h4>
      </div>
      <ul>
        {breakdownComponent}
      </ul>
      <div>
        {}
      </div>
    </>
  )
}
