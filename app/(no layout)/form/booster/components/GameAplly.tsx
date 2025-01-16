"use client";
import React, { useState } from "react";
import StageManager from "../stages/StageManager";
import data from "@/public/booster_questions.json";
import LowerCase from "@/app/components/LowerCase";
import Image from "next/image";
import { titleCase } from "@/app/components/TitleCase";

// const gameNames = [...Object.keys(data.games), ...Object.keys(data.games)];
const gameNames = Object.keys(data.games);

function GameAplly() {
	const [selected, setSelected] = useState(false);
	const [game, setGame] = useState("");

	const handleSelect = (item: string) => {
		setGame(item);
		setSelected(true);
	};

	const reset = () => {
		setGame("");
		setSelected(false);
	};

	if (!selected) {
		return (
			<>
				<h1 className="text-center text-neutral-50 text-3xl mb-10 font-semibold">
					Select a Game :
				</h1>
				<div className="grid gap-x-5 gap-y-14 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
					{gameNames.map((i, index) => {
						const gameImage = ("/gameIcons/" + LowerCase(i)).toLowerCase();

						return (
							<div key={index} className="game-aplly-c">
								<div className="flex justify-center h-full">
									<div className="block sm:max-2xl:inline-flex 2xl:inline-flex w-full sm:max-2xl:w-auto 2xl:w-auto">
										<div className="flex flex-col justify-between h-full items-center sm:max-2xl:items-start 2xl:items-start">
											<Image src={gameImage} width={40} height={40} alt={`"${i} icon`} />
											<span className="~text-base/lg">{titleCase(i)}</span>

											<div
												className="game-aplly-c-div bform-nextbtn w-full sm:max-2xl:w-32 2xl:w-32 "
												onClick={() => handleSelect(i)}
											>
												Apply Now
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</>
		);
	}

	return <StageManager game={game} reset={reset} />;
}

export default GameAplly;
