"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

type props = {
	itemsShow: number;
	reqUrl: string;
	itemsCount: number;
	loading: (status: boolean) => void;
	done: (data: any[]) => void;
	error: (code: number, message: string) => void;
	elemId: string;
};

function Pagination({ itemsCount, itemsShow, reqUrl, loading, done, elemId, error }: props) {
	const [loaded, setLoaded] = useState(false);
	const [currentP, setCurrentP] = useState(1);
	const [firstTime, setFirstTime] = useState(false);
	const [err, setError] = useState(false);
	let maxPages = [];
	for (let index = 0; index < Math.ceil(itemsCount / itemsShow); index++) {
		maxPages.push(index + 1);
	}
	const first = maxPages[0];
	const last = maxPages[maxPages.length - 1];
	const sender = async (skip: number) => {
		setLoaded(() => false);
		loading(false);
		const response = await axios({
			method: "GET",
			url: `${reqUrl}?skip=${skip}&take=${itemsShow}`,
			validateStatus: () => true,
		})
		if (response.status === 200) {
			done(response.data.Message);
		}else{
			error(response.status,response.data.Message)
			setError(true)
		}
		setLoaded(() => true);
		loading(true);
	};
	useEffect(() => {
		sender(0);
		setFirstTime(true);
	}, []);
	useEffect(() => {
		let skip = (currentP - 1) * itemsShow;
		sender(skip);
		if (firstTime) {
			goto();
		}
	}, [currentP]);

	const goto = () => {
		const gmtp = document.getElementById(elemId)!;
		const top = Math.floor(
			gmtp.getBoundingClientRect().top + document.documentElement.scrollTop
		);
		window.scrollTo({
			top: top - 95,
			left: 0,
			behavior: "smooth",
		});
	};

	const beet = (
		<span className="block mx-1 text-lg" style={{ transform: "translateY(5px)" }}>
			...
		</span>
	);

	if (err) {
		return <></>;
	}
	return (
		<>
			{maxPages.length > 1 && (
				<div className="flex justify-center mb-10 pagination-nums">
					{currentP > first && (
						<>
							<span style={{ textAlign: "right" }} className="pagination-ars">
								<FontAwesomeIcon
									onClick={() => {
										setCurrentP((prev) => prev - 1);
									}}
									icon={faAngleLeft}
								/>
								<br />
								<span>Previous</span>
							</span>
						</>
					)}
					{
						<div
							onClick={() => setCurrentP(maxPages[0])}
							className={`
             ${currentP === maxPages[0] && "pagination-nums-a"}
             ${!loaded && "pointer-events-none"}
             `}
						>
							{maxPages[0]}
						</div>
					}
					{
						<>
							{currentP - 1 > first && (
								<>
									{currentP - 1 > first && beet}
									<div
										onClick={() => setCurrentP(currentP - 1)}
										className={`
										${!loaded && "pointer-events-none"}
										`}
									>
										{currentP - 1}
									</div>
								</>
							)}

							{currentP !== first && currentP !== last && (
								<div className={"pagination-nums-a pointer-events-none"}>
									{currentP}
								</div>
							)}

							{currentP + 1 < last && (
								<>
									<div
										onClick={() => setCurrentP(currentP + 1)}
										className={`
							 		${!loaded && "pointer-events-none"}
							 `}
									>
										{currentP + 1}
									</div>
									{currentP + 1 < last && beet}
								</>
							)}
						</>
					}
					{
						<div
							onClick={() => setCurrentP(maxPages[maxPages.length - 1])}
							className={`
             ${currentP === maxPages[maxPages.length - 1] && "pagination-nums-a"}
             ${!loaded && "pointer-events-none"}
             `}
						>
							{maxPages[maxPages.length - 1]}
						</div>
					}
					{currentP < last && (
						<>
							<span className="pagination-ars">
								<FontAwesomeIcon
									onClick={() => {
										setCurrentP((prev) => prev + 1);
									}}
									icon={faAngleRight}
								/>
								<br />
								<span>Next</span>
							</span>
						</>
					)}
				</div>
			)}
		</>
	);
}

export default Pagination;
