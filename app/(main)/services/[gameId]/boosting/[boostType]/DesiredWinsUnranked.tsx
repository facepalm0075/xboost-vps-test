"use client";
import SelectWins from "./SelectWins";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import {
  gameDefiendCheck,
  unrankWinsChanged,
} from "@/app/redux/Features/extraOptions/gameDetailsSlice";
import { useEffect } from "react";
import { BoostingPage } from "../svgs";

type props = {
  gameN: string;
  maxWins: number;
};
function SelectWinsUnranked({ gameN, maxWins }: props) {
  const mainNameer = useAppSelector((state) => state.gameDetails);
  const nameer = mainNameer.gameDetails;
  const dispatch = useAppDispatch();
  let number = 0;
  nameer.map((item) => {
    if (item.gameName === gameN) {
      number = item.gameUnrankedWins!;
    }
  });
  const winHandler = (num: number) => {
    dispatch(unrankWinsChanged({ game: gameN, win: num }));
  };

  const initValue = 1;
  useEffect(() => {
    nameer.map((item) => {
      if (item.gameName === gameN) {
        if (!item.gameUnrankedWins) {
          dispatch(unrankWinsChanged({ game: gameN, win: initValue }));
        }
      }
    });
  });
  return (
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
  );
}

export default SelectWinsUnranked;
