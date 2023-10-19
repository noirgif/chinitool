'use client'

import Tehai from "@/components/Tehai";
import TehaiInput from "@/components/TehaiInput"
import { mahjongTile } from "@/types/mahjong";
import { useState } from "react";

export default function Advice() {
    const [tehai, setTehai]: [mahjongTile[], Function] = useState([]);
    return (
        <>
            <div className="Desktop1 p-6 bg-stone-300 shadow justify-center items-start gap-5">
                <div className="Frame2 self-stretch grow shrink basis-0 flex-col justify-start items-center gap-3 flex">
                    <div className="Frame3 self-stretch h-40 px-10 py-5 flex-col justify-start items-center gap-2.5 flex">
                        <Tehai tiles={tehai} />
                    </div>
                    <div className="TehaiInput w-120 justify-center items-center gap-2 inline-flex">
                        <div className=" text-center text-black text-2xl font-normal font-['Inter']">手牌：</div>
                        <TehaiInput setTehai={setTehai} />
                        <div className="S text-center text-black text-2xl font-normal font-['Inter']">s</div>
                    </div>
                    <div className=" self-stretch text-center text-black text-4xl font-normal font-['Inter']">聴牌</div>
                    <div className="ResultTable w-96 h-96 relative border-black">
                        <div className="Frame w-96 h-96 left-0 top-0 absolute">
                            <div className="Rectangle1 w-96 h-96 left-0 top-0 absolute bg-gray-200 shadow border-4 border-neutral-400" />
                            <div className="Line2 w-96 h-px left-[3.06px] top-[77.83px] absolute border border-neutral-400"></div>
                            <div className="Line3 w-96 h-px left-[4.08px] top-[306.89px] absolute border border-neutral-400"></div>
                            <div className="Line4 w-96 h-px left-[359.35px] top-0 absolute origin-top-left rotate-90 border border-neutral-400"></div>
                            <div className="Line5 w-96 h-px left-[997.40px] top-[2.22px] absolute origin-top-left rotate-90 border border-neutral-400"></div>
                        </div>
                        <div className="ExpectedValue h-96 left-[997.40px] top-[77.83px] absolute">
                            <div className=" w-64 h-56 left-0 top-0 absolute text-center text-black text-4xl font-normal font-['Inter']">8000</div>
                            <div className=" w-64 h-56 left-[-0px] top-[229.05px] absolute text-center text-black text-4xl font-normal font-['Inter']">5818</div>
                        </div>
                        <div className="Machi w-96 h-96 left-[490.02px] top-[90.06px] absolute">
                            <div className="Ten5s w-96 h-14 left-0 top-0 absolute">
                                <img className="Sou56690SEmb1 w-8 h-12 left-0 top-0 absolute" src="https://via.placeholder.com/33x50" />
                                <div className=" w-60 h-12 left-[6.13px] top-[2.22px] absolute text-center text-black text-4xl font-normal font-['Inter']">4枚</div>
                                <div className=" w-56 h-14 left-[225.62px] top-0 absolute text-center text-black text-4xl font-normal font-['Inter']">32000</div>
                            </div>
                            <div className="Ten5s w-96 h-14 left-0 top-[315.78px] absolute">
                                <img className="Sou56690SEmb1 w-8 h-12 left-0 top-0 absolute" src="https://via.placeholder.com/33x50" />
                                <div className=" w-60 h-12 left-[6.13px] top-[2.22px] absolute text-center text-black text-4xl font-normal font-['Inter']">4枚</div>
                                <div className=" w-56 h-14 left-[225.62px] top-0 absolute text-center text-black text-4xl font-normal font-['Inter']">32000</div>
                            </div>
                            <div className="Ten6s w-96 h-14 left-0 top-[76.72px] absolute">
                                <img className="Sou66690SEmb1 w-8 h-12 left-0 top-0 absolute" src="https://via.placeholder.com/33x50" />
                                <div className=" w-60 h-12 left-[6.13px] top-0 absolute text-center text-black text-4xl font-normal font-['Inter']">2枚</div>
                                <div className=" w-56 h-14 left-[225.62px] top-0 absolute text-center text-black text-4xl font-normal font-['Inter']">12000</div>
                            </div>
                            <div className="Ten9s w-96 h-14 left-0 top-[146.77px] absolute">
                                <img className="Sou96690SEmb1 w-8 h-12 left-0 top-0 absolute" src="https://via.placeholder.com/33x50" />
                                <div className=" w-60 h-12 left-[6.13px] top-[2.22px] absolute text-center text-black text-4xl font-normal font-['Inter']">2枚</div>
                                <div className=" w-56 h-14 left-[225.62px] top-[-0px] absolute text-center text-black text-4xl font-normal font-['Inter']">12000</div>
                            </div>
                        </div>
                        <img className="Dahai4s w-7 h-11 left-[244px] top-[187.50px] absolute" src="https://via.placeholder.com/30x45" />
                        <img className="Dahai1s w-7 h-11 left-[244px] top-[371.50px] absolute shadow border-black" src="https://via.placeholder.com/30x45" />
                        <div className="TableColumns w-96 h-20 left-[4.08px] top-[3.34px] absolute">
                            <div className=" w-96 h-20 left-0 top-0 absolute text-center text-black text-4xl font-normal font-['Inter']">打</div>
                            <div className=" w-96 h-20 left-[355.27px] top-0 absolute text-center text-black text-4xl font-normal font-['Inter']">待ち</div>
                            <div className=" w-72 h-20 left-[993.32px] top-0 absolute text-center text-black text-4xl font-normal font-['Inter']">期待値</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}