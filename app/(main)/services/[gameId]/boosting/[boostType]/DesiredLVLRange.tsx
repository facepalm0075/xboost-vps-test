"use client";
import SelectRange from "./SelectRange";
import { BoostingPage } from "../svgs";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { gameDefiendCheck, lvlRangeChanged } from "@/app/redux/Features/ordersDetails/lvlBoost";
import { useEffect } from "react";

type Props = {
	gameN: string;
	dis: number;
	maxNum: number;
};

function DesiredLVLRange({ gameN, dis, maxNum }: Props) {
	const mainNameer = useAppSelector((state) => state.lvlBoost);
	const nameer = mainNameer.lvlBoostState;
	const dispatch = useAppDispatch();
	const initVal = [1, dis + 1];
	useEffect(() => {
		dispatch(gameDefiendCheck(gameN));
		nameer.map((item) => {
			if (item.gameName === gameN) {
				if (!item.gameLVLrange) {
					dispatch(lvlRangeChanged({ game: gameN, lvlRange: initVal }));
				} else if (item.gameLVLrange.length == 0) {
					dispatch(lvlRangeChanged({ game: gameN, lvlRange: initVal }));
				}
			}
		});
	});

	let arr: number[] = [];
	nameer.map((item) => {
		if (item.gameName === gameN) {
			arr = item.gameLVLrange!;
		}
	});
	const send = (items: number[]) => {
		if (items[0] > 0 && items[1] <= maxNum)
			dispatch(lvlRangeChanged({ game: gameN, lvlRange: items }));
	};

	const changeHandler = (items: number[]) => {
		send(items);
	};

	const cHandler = (item: number) => {
		send([arr[0] + item, arr[1]]);
	};

	const cmHandler = (event: any) => {
		const c = Number(event.target.value);
		if (c > 0 && c <= maxNum - dis) {
			if (c <= arr[1] - dis) {
				send([c, arr[1]]);
			} else {
				send([c, c + dis]);
			}
		}
	};

	const dHandler = (item: number) => {
		send([arr[0], arr[1] + item]);
	};

	const dmHandler = (event: any) => {
		const c = Number(event.target.value);
		if (c <= maxNum && c >= dis + 1) {
			if (c - dis >= arr[0]) {
				send([arr[0], c]);
			} else {
				send([c - dis, c]);
			}
		}
	};

	return (
		<div className="gameType-base win-select">
			<div className="flex items-center win-select-title">
				<div style={{ width: "290px" }} className="flex items-center">
					<BoostingPage />
					<div className="ml-3">
						<h3>Level Amount</h3>
						<p>Select the Number of Desired Level</p>
					</div>
				</div>
				<div className="flex items-center ml-12">
					<div>
						<span>From :</span>
						<div
							style={{ width: "170px" }}
							className="flex justify-center mt-3 selectRank-input"
						>
							<button>
								<span
									onClick={() => {
										if (arr[0] > 1) {
											cHandler(-1);
										}
									}}
								>
									-
								</span>
							</button>
							<input type="number" value={arr[0]} onChange={cmHandler} min={0} />
							<button>
								<span
									onClick={() => {
										if (arr[0] < arr[1] - dis) {
											cHandler(1);
										} else {
											if (arr[1] < maxNum) {
												dHandler(1);
											}
										}
									}}
								>
									+
								</span>
							</button>
						</div>
					</div>
					<span className="mx-3 dlr-span">_</span>
					<div>
						<span>To :</span>
						<div
							style={{ width: "170px" }}
							className="flex justify-center mt-3 selectRank-input"
						>
							<button>
								<span
									onClick={() => {
										if (arr[1] - dis > arr[0]) {
											dHandler(-1);
										} else {
											if (arr[0] > 1) {
												cHandler(-1);
											}
										}
									}}
								>
									-
								</span>
							</button>
							<input type="number" value={arr[1]} onChange={dmHandler} min={0} />
							<button>
								<span
									onClick={() => {
										if (arr[1] < maxNum) {
											dHandler(1);
										}
									}}
								>
									+
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="h-16"></div>
			<SelectRange maxNum={maxNum} dis={dis} cNum={arr} changed={changeHandler} />
		</div>
	);
}

export default DesiredLVLRange;
