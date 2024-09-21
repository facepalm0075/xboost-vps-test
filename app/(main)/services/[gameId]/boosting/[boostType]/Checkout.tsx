"use client";

import { ArrowBlue } from "../svgs";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { titleCase } from "@/app/components/TitleCase";
import { dbRes } from "./page";
import { op, op2, rnk, rnkw } from "@/app/redux/Features/extraOptions/gameDetailsSlice";
import { signIn, useSession } from "next-auth/react";
type props = {
    gameN: string;
    boostType: string;
    dbData: dbRes;
};
type slce = {
    gameName: string;
    gameOptions?: op[];
    gameOptions2?: op2[];
    gameRanks?: rnk;
    gameRankWins?: rnkw;
    gameUnrankedWins?: number | undefined;
    gameLVLrange?: number[];
};

function Checkout({ gameN, boostType, dbData }: props) {
    const [loading, setLoading] = useState(1);
    if (loading === 2) {
        const resize_ob = new ResizeObserver(function (entries) {
            const item = document.getElementById("gtcont")!;
            const item2 = document.getElementById("checkout-c1i")!;
            if (item2) {
                let height =
                    item.clientHeight -
                    (item2.getBoundingClientRect().top - item.getBoundingClientRect().top);

                item2.style.height = `${height}px`;
            }
        });
        setLoading(3);
        resize_ob.observe(document.querySelector("#gtcont")!);
    }

    useEffect(() => {
        setLoading(2);
    }, []);

    const mainNameer = useAppSelector((state) => state.gameDetails);
    const nameer = mainNameer.gameDetails;
    let data: slce = { gameName: "" };

    nameer.map((item) => {
        if (item.gameName === gameN) {
            console.log(gameN);
            data = item;
        }
    });
    let result = data;

    //---------------------------------------------------------------------------

    // calcing price main

    const calcPrice = (boostType: string) => {
        switch (boostType) {
            case "rank boost":
                return applyer(rankPrice());
        }
        return 0.0;
    };

    //applyer

    const applyer = (item: number) => {
        const op1app = tOptions(item);
        return op1app;
    };

    //applying toggle options

    const tOptions = (item: number) => {
        const ops = result?.gameOptions!;
        if (ops) {
            if (ops.length > 0) {
                let sum = item;
                ops.map((item1) => {
                    // for % options
                    if (item1.value.includes("%")) {
                        let num = Number(item1.value.replace("%", ""));
                        let operator = (item / 100) * num;
                        sum += operator;
                    }
                });
                return sum;
            }
        }
        return item;
    };

    //applying dropdown options

    const dOptions = (item: number) => {};

    // calcing rank price
    const priceData = [];
    const rankPrice = () => {
        const data = dbData.Data.ranksData;
        const userData = result?.gameRanks!;
        let gain: string = "";
        let resPrice = 0;
        result?.gameOptions2?.map((item3, key) => {
            if (item3.optionName.includes("Gain")) {
                const str = item3.optionValue;
                gain = str.replace(/\D/g, "");
            }
        });
        let rpGain = Number(gain);
        if (rpGain == 123456789) {
            data.map((item) => {
                item.rankNums.map((item2) => {
                    if (
                        item2.mmr >= userData.currentRank!.rankNumber &&
                        item2.mmr < userData.desiredRank!.rankNumber
                    ) {
                        resPrice += item2.pricePerWin;
                    }
                });
            });
        } else {
        }

        return Number(resPrice);
    };
    async function postData(url = "", data = {}) {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(data),
        });

        const json = await response.json();
        return json;
    }

    async function getresponse(data: any) {
        postData("http://localhost:3001/api/add-order/", data).then((res) => {
            console.log(res.Message);
        });
    }

    const { data: session, status } = useSession();
    const handleCheckout = () => {
        if (status === "authenticated") {
            getresponse({
                gameName: "apex legends",
                boostType: "rank boost",
                boostDetails: {
                    currentRank: 2,
                    desiredRank: 13000,
                    dropDownOptions: [
                        { optionName: "Platform", optionContent: "PC" },
                        { optionName: "RR Amount", optionContent: "41-60 RR" },
                        { optionName: "Server", optionContent: "Africa" },
                    ],
                    toggleOptions: [
                        { optionName: "streaming" },
                        { optionName: "play offline" },
                        { optionName: "express delivery" },
                    ],
                },
            });
        } else if (status === "loading") {
        } else {
            signIn();
        }
    };
    const price = calcPrice(boostType);

    return (
        <div id="checkout-c1i" className="checkout-c1">
            <div className="checkout-c2">
                <div className="gameType-base checkout">
                    <h4 className="text-center text-white text-lg mt-3 font-bold">Checkout</h4>
                    <div style={{ marginBottom: "30px" }} className="det-base w-t-w">
                        {boostType == "rank boost" ? (
                            <>
                                <Image
                                    src={`/ranksimages/${result?.gameRanks?.currentRank?.rankImage}`}
                                    alt="archon rank"
                                    width={35}
                                    height={45}
                                    className=""
                                />
                                <span>{`${result?.gameRanks?.currentRank?.rankName} ${result?.gameRanks?.currentRank?.rankStar}`}</span>
                                <ArrowBlue />
                                <Image
                                    src={`/ranksimages/${result?.gameRanks?.desiredRank?.rankImage}`}
                                    alt="archon rank"
                                    width={35}
                                    height={45}
                                    className=""
                                />
                                <span>{`${result?.gameRanks?.desiredRank?.rankName} ${result?.gameRanks?.desiredRank?.rankStar}`}</span>
                            </>
                        ) : (
                            ""
                        )}
                        {boostType == "rank wins" ? (
                            <>
                                <Image
                                    src={`/ranksimages/${result?.gameRankWins?.currentRank?.rankImage}`}
                                    alt="archon rank"
                                    width={35}
                                    height={45}
                                    className=""
                                />
                                <span>{`${result?.gameRankWins?.currentRank?.rankName} ${result?.gameRankWins?.currentRank?.rankStar}`}</span>
                                <ArrowBlue />
                                <span>
                                    {`${result?.gameRankWins?.wins}`}
                                    <span className="wtw-s-span">Wins</span>
                                </span>
                            </>
                        ) : (
                            ""
                        )}
                        {boostType == "unrated matches" ? (
                            <>
                                <span>{`Unrated`}</span>
                                <ArrowBlue />
                                <span>
                                    {`${result?.gameUnrankedWins}`}
                                    <span className="wtw-s-span">Wins</span>
                                </span>
                            </>
                        ) : (
                            ""
                        )}
                        {boostType == "level boost" ? (
                            <>
                                <span>{`Level ${
                                    result?.gameLVLrange != undefined ? result?.gameLVLrange[0] : ""
                                }`}</span>
                                <ArrowBlue />
                                <span>{`Level ${
                                    result?.gameLVLrange != undefined ? result?.gameLVLrange[1] : ""
                                }`}</span>
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                    <div>
                        {result?.gameOptions2?.map((item, key) => {
                            if (item.optionValue.includes("calc")) return;
                            return (
                                <div key={key} className="checkoutDetails">
                                    <span>
                                        <span className="checkoutDetails-label-t">{`${item.optionName}: `}</span>
                                        {item.optionContent}
                                    </span>
                                    <span className="checkoutDetails-label">
                                        {item.optionValue}
                                    </span>
                                </div>
                            );
                        })}
                        {result?.gameOptions?.map((item, key) => {
                            return (
                                <div key={key} className="checkoutDetails">
                                    <span>{titleCase(item.optionName)}</span>
                                    <span className="checkoutDetails-label">{item.value}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ marginTop: "30px" }} className="det-base checkout-time">
                        <FontAwesomeIcon icon={faClock} className="t-icon" />
                        <span>Completion Time :</span>
                        <strong>~ 12 day, 10hrs</strong>
                    </div>
                    <div className="promo">
                        <input placeholder="Promo Code" className="promo-txt" type="text" />
                        <input className="promo-btn" type="submit" value="Apply" />
                    </div>
                    <div className="discount">
                        <div>
                            <span>Discount :</span>
                            <strong>10%</strong>
                        </div>
                        {/* <div>
              <span>Promo Code :</span>
              <strong>15%</strong>
            </div> */}
                    </div>
                    <div className="total">
                        <span>Total Price :</span>
                        <div className="price">
                            <span>$250.50</span>
                            <strong>${price}</strong>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div onClick={handleCheckout} className="checkout-final">
                            <span>Checkout (${price})</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
