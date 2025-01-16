"use client";
import SmallMenuOpener from "@/app/components/SmallMenuOpener";
import React, { useEffect, useState } from "react";
import jsonData from "@/public/booster_questions.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { DiscordUser, EmailFormLoginData } from "@/lib/schema";

type props = {
	nextCall: number;
	next: (item: string | string[]) => void;
};
type sProps = props & { data: string };
type aProps = props & { data: string[] };
type aProps2 = props & { data: [string, string] };
type extraDataType = { extraData: any[] };

export function StartStage({ next, nextCall, data }: sProps) {
	const [first, setFirst] = useState(true);
	const [input, setInput] = useState(data);

	const submiter = () => {
		if (input.length > 2) {
			next(input);
		}
	};

	useEffect(() => {
		if (first) {
			setFirst(false);
			return;
		}

		submiter();
	}, [nextCall]);
	return (
		<>
			<div>
				<p>Choose a name for your booster account.</p>
				<input
					className="bform-stages-txt mt-2"
					type="text"
					name="name"
					placeholder="Your name..."
					spellCheck="false"
					value={input}
					onChange={(e) => {
						setInput(e.target.value);
					}}
				/>
			</div>
		</>
	);
}

export function EmailnDiscord({ next, nextCall, data }: aProps2) {
	const [first, setFirst] = useState(true);
	const [input, setInput] = useState(data);

	const { error: zodError } = EmailFormLoginData.safeParse({ email: input[0] });
	const { error: zodError2 } = DiscordUser.safeParse({ discordId: input[1] });

	const submiter = () => {
		if (zodError) {
		} else {
			if (zodError2) {
				console.log(input[1], zodError2);
			} else {
				next(input);
			}
		}
	};

	useEffect(() => {
		if (first) {
			setFirst(false);
			return;
		}

		submiter();
	}, [nextCall]);
	return (
		<>
			<div>
				<input
					className="bform-stages-txt mt-2"
					type="email"
					name="email"
					placeholder="Email address..."
					spellCheck="false"
					value={input[0]}
					onChange={(e) =>
						setInput((prev) => {
							return [(prev[0] = e.target.value), prev[1]];
						})
					}
				/>
				<br />
				<br />
				<input
					className="bform-stages-txt mt-2"
					type="text"
					name="name"
					placeholder="Discord ID..."
					spellCheck="false"
					value={input[1]}
					onChange={(e) =>
						setInput((prev) => {
							return [prev[0], (prev[1] = e.target.value)];
						})
					}
				/>
			</div>
		</>
	);
}

export function Country({ next, nextCall, data }: sProps) {
	const countries = jsonData.countries;
	const [selectedCountry, setSelectedCountry] = useState(() => data);
	const [closer, setCloser] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const [first, setFirst] = useState(true);

	useEffect(() => {
		if (first) {
			setFirst(false);
			return;
		}

		if (selectedCountry !== "__ SELECT __") {
			next(selectedCountry);
		}
	}, [nextCall]);

	useEffect(() => {
		document?.querySelector("#bform-stages-dropdown")?.addEventListener("keydown", (event: any) => {
			const country: any = document.querySelector(
				`#contryId${String(event.key).toLocaleUpperCase()}`
			);
			if (country) country.scrollIntoView({ behavior: "smooth", block: "start" });
		});
	}, []);

	const clickHandler = (item: string) => {
		setSelectedCountry(item);
		setCloser((prev) => prev + 1);
	};

	const openHandler = (status: boolean) => {
		setIsOpen(status);
	};
	return (
		<>
			<div
				style={{ outline: "unset" }}
				tabIndex={0}
				id="bform-stages-dropdown"
				className="bform-stages-dropdown-c"
			>
				<SmallMenuOpener
					opened={openHandler}
					rtl={true}
					toggle={true}
					isTop={false}
					width={0}
					height={200}
					itemsClass="bform-stages-dropdown-items-c"
					outClickIgnore={false}
					itemsTop="5px"
					inClickClose={true}
					closerState={closer}
					items={
						<>
							{countries.map((item, index) => {
								return (
									<div
										className="bform-stages-dropdown-item"
										id={`contryId${item.charAt(0)}`}
										key={index}
										onClick={() => clickHandler(item)}
									>
										{item}
									</div>
								);
							})}
						</>
					}
				>
					<div
						className={`bform-stages-dropdown-main ${isOpen ? "bform-stages-dropdown-main-active" : ""}`}
					>
						{selectedCountry}
						<div className="float-right">
							<FontAwesomeIcon
								style={isOpen ? { transform: "rotate(180deg)" } : {}}
								icon={faChevronDown}
							/>
						</div>
					</div>
				</SmallMenuOpener>
			</div>
		</>
	);
}

export function Servers({ next, nextCall, data, extraData }: aProps & extraDataType) {
	const cData = extraData as string[];
	const [selected, setSelected] = useState<string[]>(data);
	const [first, setFirst] = useState(true);

	useEffect(() => {
		if (first) {
			setFirst(false);
			return;
		}

		if (selected.length > 0) {
			next(selected);
		}
	}, [nextCall]);

	const clickHandler = (item: string) => {
		if (selected.includes(item)) {
			const res = selected.filter((i) => i !== item);
			setSelected(res);
		} else {
			setSelected([...selected, item]);
		}
	};
	return (
		<>
			<div className="inline-flex gap-6 flex-wrap justify-between bform-stages-radio-items-c">
				{cData.map((item, index) => {
					return (
						<div
							className={`bform-stages-radio-items
								${selected.includes(item) ? "bform-stages-radio-items-active" : ""}`}
							onClick={() => {
								clickHandler(item);
							}}
							key={index}
						>
							{item}
						</div>
					);
				})}
			</div>
		</>
	);
}

export function Platforms({ next, nextCall, data, extraData }: aProps & extraDataType) {
	const pData = extraData as string[];
	const [selected, setSelected] = useState<string[]>(data);
	const [first, setFirst] = useState(true);

	useEffect(() => {
		if (first) {
			setFirst(false);
			return;
		}

		if (selected.length > 0) {
			next(selected);
		}
	}, [nextCall]);

	const clickHandler = (item: string) => {
		if (selected.includes(item)) {
			const res = selected.filter((i) => i !== item);
			setSelected(res);
		} else {
			setSelected([...selected, item]);
		}
	};
	return (
		<>
			<div className="inline-flex gap-6 flex-wrap justify-between bform-stages-radio-items-c">
				{pData.map((item, index) => {
					return (
						<div
							className={`bform-stages-radio-items
								${selected.includes(item) ? "bform-stages-radio-items-active" : ""}`}
							onClick={() => {
								clickHandler(item);
							}}
							key={index}
						>
							{item}
						</div>
					);
				})}
			</div>
		</>
	);
}

export function Rank({ next, nextCall, data, extraData }: sProps & extraDataType) {
	const pData = extraData as string[];
	const [selected, setSelected] = useState<string>(data);
	const [first, setFirst] = useState(true);

	useEffect(() => {
		if (first) {
			setFirst(false);
			return;
		}

		if (selected.length > 0) {
			next(selected);
		}
	}, [nextCall]);

	const clickHandler = (item: string) => {
		setSelected(item);
	};
	return (
		<>
			<div className="inline-flex gap-6 flex-wrap justify-between bform-stages-radio-items-c">
				{pData.map((item, index) => {
					return (
						<div
							className={`bform-stages-radio-items
								${selected.includes(item) ? "bform-stages-radio-items-active" : ""}`}
							onClick={() => {
								clickHandler(item);
							}}
							key={index}
						>
							{item}
						</div>
					);
				})}
			</div>
		</>
	);
}

export function TextArea({ next, nextCall, data }: sProps) {
	const [first, setFirst] = useState(true);
	const [input, setInput] = useState(data);

	const submiter = () => {
		if (input.length > 2) {
			next(input);
		}
	};

	useEffect(() => {
		if (first) {
			setFirst(false);
			return;
		}

		submiter();
	}, [nextCall]);
	return (
		<>
			<textarea
				placeholder="Max Character 300"
				style={{ width: "100%", minHeight: "150px", maxHeight: "150px" }}
				className="bform-stages-txt bform-stages-txtarea"
				spellCheck="false"
				value={input}
				onChange={(e) => {
					setInput(e.target.value);
				}}
			></textarea>
		</>
	);
}

export function FinishStage() {
	return (
		<>
			<div>submit the form. </div>
		</>
	);
}
