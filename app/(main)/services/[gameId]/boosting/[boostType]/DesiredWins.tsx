"use client";
import { md, rnkDet } from "@/app/components/types/Types";
import RankSelect from "./RankSelect";
import SelectWins from "./SelectWins";
import { BoostingPage, RightARROW } from "../svgs";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import {
  gameDefiendCheck,
  rankWinsChanged,
} from "@/app/redux/Features/extraOptions/gameDetailsSlice";
import { useEffect, useState } from "react";

type mainProps = {
  gameN: string;
  data: md[];
  maxWins: number;
};

function DesiredWins({ gameN, data, maxWins }: mainProps) {
  const mainNameer = useAppSelector((state) => state.gameDetails);
  const nameer = mainNameer.gameDetails;
  let number = 0;
  nameer.map((item) => {
    if (item.gameName === gameN) {
      number = item.gameRankWins?.wins!;
    }
  });
  const dispatch = useAppDispatch();

  const CurrentHandler = (item: rnkDet) => {
    let currentGame: number = 1;
    nameer.map((item) => {
      if (item.gameName === gameN) {
        currentGame = item.gameRankWins?.wins!;
      }
    });

    dispatch(
      rankWinsChanged({
        game: gameN,
        rankNwin: {
          currentRank: item,
          wins: currentGame,
        },
      })
    );
  };
  const winHandler = (num: number) => {
    let currentGame2: rnkDet = {
      rankNumber: 10,
      rankImage: "string",
      rankName: "string",
      rankStar: "string",
    };
    nameer.map((item) => {
      if (item.gameName === gameN) {
        currentGame2 = item.gameRankWins?.currentRank!;
      }
    });

    dispatch(
      rankWinsChanged({
        game: gameN,
        rankNwin: {
          currentRank: currentGame2,
          wins: num,
        },
      })
    );
  };
  const initVal = {
    currentRank: {
      rankNumber: data[0].rankNums[0].mmr,
      rankImage: data[0].rankNums[0].img,
      rankName: data[0].rankName,
      rankStar: data[0].rankNums[0].content,
    },
    wins: 1,
  };

  useEffect(() => {
    nameer.map((item) => {
      if (item.gameName === gameN) {
        if (!item.gameRankWins) {
          dispatch(rankWinsChanged({ game: gameN, rankNwin: initVal }));
        } else if (!item.gameRankWins.currentRank) {
          dispatch(rankWinsChanged({ game: gameN, rankNwin: initVal }));
        }
      }
    });
  });

  return (
    <div className="flex items-center">
      <div className="w-1/2">
        <RankSelect
          currentChanged={CurrentHandler}
          name={gameN}
          data={data}
          type="current"
          mmrEnabled={false}
          desiredChanged={() => {}}
          usage="single"
          mainNameer={mainNameer}
          lastRank={true}
        />
      </div>
      <div className="selectRank-arrow">
        <RightARROW />
      </div>
      <div className="w-1/2">
        <div className="gameType-base win-select">
          <div className="flex items-center win-select-title">
            <BoostingPage />
            <div className="ml-3">
              <h3>Wins Amount</h3>
              <p>Select the number of desired wins</p>
            </div>
          </div>
          <div className="h-16"></div>
          <SelectWins
            maxNum={maxWins}
            cNum={number}
            name={gameN}
            numberChanged={winHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default DesiredWins;
