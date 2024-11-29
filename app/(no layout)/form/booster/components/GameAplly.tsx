"use client";
import React, { useState } from "react";
import StageManager from "../stages/StageManager";

const data = ["apex legends", "valorant", "rainbow six siege"];

function GameAplly() {
	const [selected, setSelected] = useState(false);
	const [game, setGame] = useState("");

	const handleSelect = (item: string) => {
		setGame(item);
		setSelected(true);
	};

	if (!selected) {
		return (
			<>
				<h1 className="text-center text-neutral-50 text-2xl">Select a Game :</h1>
				<div className="flex gap-4 flex-wrap">
					{data.map((i, index) => {
						return (
							<div key={index} onClick={() => handleSelect(i)}>
								{i}
							</div>
						);
					})}
				</div>
			</>
		);
	}

	return <StageManager game={game} />;
}

export default GameAplly;
