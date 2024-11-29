"use client";
import SmallMenuOpener from "@/app/components/SmallMenuOpener";
import React, { useEffect, useState } from "react";
import jsonData from "@/public/booster_questions.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export function StartStage() {
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
				/>
			</div>
		</>
	);
}

export function EmailnDiscord() {
	return (
		<>
			<div>
				<input
					className="bform-stages-txt mt-2"
					type="email"
					name="email"
					placeholder="Email address..."
					spellCheck="false"
				/>
				<br />
				<br />
				<input
					className="bform-stages-txt mt-2"
					type="text"
					name="name"
					placeholder="Discord ID..."
					spellCheck="false"
				/>
			</div>
		</>
	);
}

export function Country() {
	const countries = jsonData.countries;
	const [selectedCountry, setSelectedCountry] = useState(() => countries[0]);
	const [closer, setCloser] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

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

export function Servers() {
	const data = ["US North", "EU West", "me", "East Asia", "Australia"];
	const [selected, setSelected] = useState("");
	const clickHandler = (item: string) => {
		setSelected(item);
	};
	return (
		<>
			<div className="inline-flex gap-6 flex-wrap justify-between bform-stages-radio-items-c">
				{data.map((item, index) => {
					return (
						<div
							className={`bform-stages-radio-items
								${item === selected ? "bform-stages-radio-items-active" : ""}`}
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

export function Platforms() {
	return (
		<>
			<div>radio baxes </div>
		</>
	);
}

export function Rank() {
	return (
		<>
			<div>rank </div>
		</>
	);
}

export function TextArea() {
	return (
		<>
			<div>text area </div>
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
