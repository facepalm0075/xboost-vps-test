"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { TypeAnimation } from "react-type-animation";
import { boosterFormSubmit } from "../actions/submit";
import Link from "next/link";
import { motion } from "framer-motion";
import {
	StartStage,
	EmailnDiscord,
	Country,
	Servers,
	Platforms,
	Rank,
	TextArea,
	FinishStage,
} from "./Stages";
import booster_questions from "@/public/booster_questions.json";

export type boosterFormType = {
	start: string;
	EmailnDiscord: [string, string];
	Country: string;
	Server: string[];
	Platform: string[];
	Rank: string;
	TextArea: string;
};

type animationType = {
	initial: {
		x: number;
		opacity: number;
	};
	animate: {
		x: number;
		opacity: number;
	};
};

type mainProp = {
	game: string;
	reset: () => void;
};

type qDataTye = {
	type: string;
	title: string;
	innerText: string;
	items: any[];
	enabled: boolean;
}[];

function StageManager({ game, reset }: mainProp) {
	const [state, setState] = useState<boosterFormType>({
		start: "",
		EmailnDiscord: ["", ""],
		Country: "__ SELECT __",
		Server: [],
		Platform: [],
		Rank: "",
		TextArea: "",
	});
	const [nextCall, setNextCall] = useState(0);
	const [stageName, setStageName] = useState("start");
	const [stage, setStage] = useState(0);
	const [animation, setAnimation] = useState<animationType>({
		initial: { x: 20, opacity: 0 },
		animate: { x: 0, opacity: 1 },
	});

	const prevStyle = {
		initial: { x: -20, opacity: 0 },
		animate: { x: 0, opacity: 1 },
	};
	const nextStyle = {
		initial: { x: 20, opacity: 0 },
		animate: { x: 0, opacity: 1 },
	};
	const startStyle = {
		initial: { x: 0, opacity: 0 },
		animate: { x: 0, opacity: 1 },
	};

	const qData: any = booster_questions;
	const questions: qDataTye = qData.games[game].questions.filter((i: any) => {
		if (i.enabled) {
			return i;
		} else {
		}
	});

	const nextCallTrigger = () => {
		setNextCall((prev) => prev + 1);
	};

	const next = (item: any) => {
		if (questions.length - 1 > stage) {
			setState((prevState) => ({
				...prevState,
				[stageName]: item,
			}));
			console.log({
				...state,
				[stageName]: item,
			});
			setAnimation((prev) => nextStyle);
			setStageName((prev) => questions[stage + 1].type);
			setStage((prev) => prev + 1);
		}
	};
	const prev = () => {
		setAnimation((prev) => prevStyle);
		setStageName((prev) => questions[stage - 1].type);
		setStage((prev) => {
			return prev - 1;
		});
	};

	const nextBtn = (
		<>
			<div className="flex gap-2 items-baseline">
				<div className="bform-nextbtn" onClick={nextCallTrigger}>
					next
				</div>
				<div className="text-xs whitespace-nowrap text-neutral-50">press ENTER</div>
				<div className="w-full">
					<div className="float-right" style={{ color: "var(--theme-main-color)" }}>
						{stage + 1} / {questions.length}
					</div>
				</div>
			</div>
		</>
	);

	useEffect(() => {
		const element = document.getElementById("bform-stages");
		element?.focus();
		document?.querySelector("#bform-stages")?.addEventListener("keydown", (event: any) => {
			if (event.key !== "Enter") return;

			nextCallTrigger();
		});
	}, []);

	const submiter = async () => {
		const res = await boosterFormSubmit(state, game);
		console.log(res?.message);
	};
	return (
		<>
			<Wrapper animation={startStyle}>
				<div tabIndex={0} id="bform-stages" className="bform-stages-container">
					<div className="flex gap-3 items-start">
						<div
							style={{ borderRight: "1px solid #999", marginTop: "9px" }}
							className="pr-4 text-xl text-neutral-50 cursor-pointer"
							onClick={stage > 0 ? prev : reset}
						>
							<FontAwesomeIcon icon={faArrowLeft} />
						</div>

						<div key={stage}>
							{stage === 0 ? (
								<h2>Welcome Stranger</h2>
							) : (
								<TypeAnimation sequence={[questions[stage].title, 1000]} speed={50} wrapper="h2" />
							)}
						</div>
					</div>
					<div className="bform-line"></div>

					<div className="my-6 px-4">
						{stageName === "start" && (
							<>
								<StartStage next={next} nextCall={nextCall} data={state.start} />
							</>
						)}
						{stageName === "EmailnDiscord" && (
							<>
								<Wrapper animation={animation}>
									<EmailnDiscord next={next} nextCall={nextCall} data={state.EmailnDiscord} />
								</Wrapper>
							</>
						)}
						{stageName === "Country" && (
							<>
								<Wrapper animation={animation}>
									<Country next={next} nextCall={nextCall} data={state.Country} />
								</Wrapper>
							</>
						)}
						{stageName === "Server" && (
							<>
								<Wrapper animation={animation}>
									<Servers
										next={next}
										nextCall={nextCall}
										data={state.Server}
										extraData={questions[stage].items}
									/>
								</Wrapper>
							</>
						)}
						{stageName === "Platform" && (
							<>
								<Wrapper animation={animation}>
									<Platforms
										next={next}
										nextCall={nextCall}
										data={state.Platform}
										extraData={questions[stage].items}
									/>
								</Wrapper>
							</>
						)}
						{stageName === "Rank" && (
							<>
								<Wrapper animation={animation}>
									<Rank
										next={next}
										nextCall={nextCall}
										data={state.Rank}
										extraData={questions[stage].items}
									/>
								</Wrapper>
							</>
						)}
						{stageName === "TextArea" && (
							<>
								<Wrapper animation={animation}>
									<TextArea next={next} nextCall={nextCall} data={state.TextArea} />
								</Wrapper>
							</>
						)}
						{stageName === "finish" && (
							<>
								<Wrapper animation={animation}>
									<FinishStage />
								</Wrapper>
							</>
						)}
					</div>

					{stage < questions.length - 1 ? (
						nextBtn
					) : (
						<>
							<div onClick={submiter}>
								submit{" "}
								<div className="float-right" style={{ color: "var(--theme-main-color)" }}>
									{stage + 1} / {questions.length}
								</div>
							</div>
						</>
					)}
					<div className="flex justify-center pt-12">
						<Link href={"/"}>
							<span className="px-3 py-2 bg-zinc-800 text-neutral-50 rounded">back to home</span>
						</Link>
					</div>
				</div>
			</Wrapper>
		</>
	);
}

type props = {
	animation?: animationType;
	children: ReactNode;
};

function Wrapper({ children, animation }: props) {
	let anime: animationType = {
		initial: { x: 20, opacity: 0 },
		animate: { x: 0, opacity: 1 },
	};
	if (animation) {
		anime = animation;
	}
	return (
		<>
			<motion.div
				initial={anime.initial}
				animate={anime.animate}
				transition={{ ease: "easeInOut", duration: 0.6 }}
			>
				{children}
			</motion.div>
		</>
	);
}

export default StageManager;
