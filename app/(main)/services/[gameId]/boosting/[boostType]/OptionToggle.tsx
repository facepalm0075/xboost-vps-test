"use client";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import {
	extraOptionAdded,
	extraOptionRemoved,
	gameNTypeDefiendCheck,
} from "@/app/redux/Features/ordersDetails/extraOptionSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { ToolTipEO } from "@/app/components/CostumToolTip";
import { useEffect } from "react";
import { extraOptionsType } from "@/app/components/types/Types";
import { titleCase } from "@/app/components/TitleCase";
type mainProps = {
	game: string;
	boostType: string;
	data: extraOptionsType;
};

export const OptionToggle = ({ game, data, boostType }: mainProps) => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(gameNTypeDefiendCheck({ gameName: game, boostType: boostType }));
	}, []);
	return (
		<div className="gameType-base eomain">
			<div className="flex flex-wrap">
				{data.map((item, key) => {
					return (
						<OptionToggleItem
							key={key}
							name={item.name}
							value={item.value}
							tooltip={item.tooltip}
							gameN={game}
							boostType={boostType}
						/>
					);
				})}
			</div>
		</div>
	);
};

type props = {
	name: string;
	value: string;
	tooltip: string;
	gameN: string;
	boostType: string;
};
const OptionToggleItem = ({ name, value, tooltip, gameN, boostType }: props) => {
	const nameer = useAppSelector((state) => state.extraOptionSlice.extraOptiontState);
	const dispatch = useAppDispatch();
	let isIn = false;
	nameer.map((item, key) => {
		if (item.gameName === gameN && item.boostType === boostType) {
			item.gameOptions?.map((item) => {
				if (item.optionName === name) {
					isIn = true;
				}
			});
		}
		return "";
	});
	const add = () => {
		dispatch(
			extraOptionAdded({
				game: gameN,
				type: boostType,
				option: { optionName: name, value: value },
			})
		);
	};
	const remove = () => {
		dispatch(extraOptionRemoved({ game: gameN, type: boostType, optionName: name }));
	};
	return (
		<div
			onClick={() => {
				if (isIn) {
					remove();
				} else {
					add();
				}
			}}
			className="eoItem"
		>
			<span className="text-white text-base block">
				{titleCase(name)}
				<ToolTipEO title={tooltip}>
					<FontAwesomeIcon icon={faQuestionCircle} />
				</ToolTipEO>
			</span>
			<div className="mt-6"></div>
			<span className={`eopers ${isIn && "eopers-active"}`}>{value}</span>
			<div className={`tgl-main ${isIn && "tgl-main-active"}`}>
				<div className={`${isIn && "tgl-main-active-div"}`}></div>
			</div>
		</div>
	);
};
