"use client";

import { rnkDet,op,op2,rnk,rnkw,ExtraOptionsState } from "@/app/components/types/Types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";



const initialState = {
  gameDetails: [],
} satisfies ExtraOptionsState as ExtraOptionsState;

export const gameDetailsSlice = createSlice({
  name: "gameDetails",
  initialState,
  reducers: {
    gameDefiendCheck: (state, action: PayloadAction<string>) => {
      let isIn = false;
      state.gameDetails.map((item) => {
        if (item.gameName === action.payload) {
          isIn = true;
        }
      });
      if (!isIn) {
        state.gameDetails = [
          ...state.gameDetails,
          {
            gameName: action.payload,
            gameOptions: [],
            gameOptions2: [],
            gameRanks: { currentRank: undefined, desiredRank: undefined },
            gameRankWins: { currentRank: undefined, wins: undefined },
            gameUnrankedWins: undefined,
            gameLVLrange: [],
          },
        ];
      }
    },
    extraOptionAdded: (
      state,
      action: PayloadAction<{ game: string; option: op }>
    ) => {
      gameDetailsSlice.caseReducers.gameDefiendCheck(state, {
        payload: action.payload.game,
        type: action.type,
      });
      state.gameDetails = state.gameDetails.map((item) => {
        if (item.gameName === action.payload.game) {
          let arr = [action.payload.option];
          if (item.gameOptions) {
            arr = [...item.gameOptions, action.payload.option];
          }
          return {
            ...item,
            gameOptions: arr,
          };
        } else {
          return item;
        }
      });
    },
    extraOptionRemoved: (
      state,
      action: PayloadAction<{ game: string; optionName: string }>
    ) => {
      state.gameDetails = state.gameDetails.map((item1) => {
        if (item1.gameName === action.payload.game) {
          let removed = item1.gameOptions?.filter(
            (item) => item.optionName != action.payload.optionName
          );
          return {
            ...item1,
            gameOptions: removed,
          };
        } else {
          return item1;
        }
      });
    },
    option2Changed: (
      state,
      action: PayloadAction<{
        game: string;
        items: {
          optionName: string;
          optionContent: string;
          optionValue: string;
        }[];
      }>
    ) => {
      state.gameDetails = state.gameDetails.map((item) => {
        if (item.gameName === action.payload.game) {
          let arr = action.payload.items;
          return {
            ...item,
            gameOptions2: arr,
          };
        } else {
          return item;
        }
      });
    },
    rankChanged: (
      state,
      action: PayloadAction<{ game: string; ranks: rnk }>
    ) => {
      gameDetailsSlice.caseReducers.gameDefiendCheck(state, {
        payload: action.payload.game,
        type: action.type,
      });
      state.gameDetails = state.gameDetails.map((item) =>
        item.gameName === action.payload.game
          ? {
              ...item,
              gameRanks: action.payload.ranks,
            }
          : item
      );
    },
    rankWinsChanged: (
      state,
      action: PayloadAction<{ game: string; rankNwin: rnkw }>
    ) => {
      gameDetailsSlice.caseReducers.gameDefiendCheck(state, {
        payload: action.payload.game,
        type: action.type,
      });
      state.gameDetails = state.gameDetails.map((item) =>
        item.gameName === action.payload.game
          ? {
              ...item,
              gameRankWins: action.payload.rankNwin,
            }
          : item
      );
    },
    unrankWinsChanged: (
      state,
      action: PayloadAction<{ game: string; win: number }>
    ) => {
      gameDetailsSlice.caseReducers.gameDefiendCheck(state, {
        payload: action.payload.game,
        type: action.type,
      });
      state.gameDetails = state.gameDetails.map((item) =>
        item.gameName === action.payload.game
          ? {
              ...item,
              gameUnrankedWins: action.payload.win,
            }
          : item
      );
    },
    lvlRangeChanged: (
      state,
      action: PayloadAction<{ game: string; lvlRange: number[] }>
    ) => {
      gameDetailsSlice.caseReducers.gameDefiendCheck(state, {
        payload: action.payload.game,
        type: action.type,
      });
      state.gameDetails = state.gameDetails.map((item) =>
        item.gameName === action.payload.game
          ? {
              ...item,
              gameLVLrange: action.payload.lvlRange,
            }
          : item
      );
    },
  },
});

export const {
  extraOptionAdded,
  extraOptionRemoved,
  option2Changed,
  rankChanged,
  gameDefiendCheck,
  rankWinsChanged,
  unrankWinsChanged,
  lvlRangeChanged,
} = gameDetailsSlice.actions;

export default gameDetailsSlice.reducer;
