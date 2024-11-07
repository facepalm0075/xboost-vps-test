"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleInfo,
	faXmark,
	faCircleCheck,
	faCircleXmark,
	faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { slce } from "../(main)/services/[gameId]/boosting/[boostType]/Checkout";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { addOrderJsonForm } from "./AddOrderJsomForm";
import { AddOrderSubmitLoading } from "./Loadings";
import { useRouter } from "next/navigation";
import React from "react";
import { getNotifications } from "./clientNotifs/getNotifs";

type props = {
	gameName: string;
	boostType: string;
};

function CheckoutForm({ gameName, boostType }: props) {
	const [componenState, setComponentState] = useState(1);
	const [inputData, setInputData] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const [responseData, setResponseData] = useState({ json: { Message: "", Id: "" }, code: 0 });
	const router = useRouter();

	let data: slce = { gameName: "", gameOptions: [], gameOptions2: [] };

	// rank boost
	const mainNameer = useAppSelector((state) => state.rankBoostSlice);
	const nameer = mainNameer.rankBoostState;
	nameer?.forEach((item) => {
		if (item.gameName === gameName) {
			data.gameRanks = item.gameRanks;
		}
	});

	// rank wins
	const mainNameer2 = useAppSelector((state) => state.rankWinsSlice);
	const nameer2 = mainNameer2.rankWinsState;
	nameer2.forEach((item) => {
		if (item.gameName === gameName) {
			data.gameRankWins = item.gameRankWins;
		}
	});

	// level boost
	const mainNameer3 = useAppSelector((state) => state.lvlBoost);
	const nameer3 = mainNameer3.lvlBoostState;
	nameer3.forEach((item) => {
		if (item.gameName === gameName) {
			data.gameLVLrange = item.gameLVLrange;
		}
	});

	const OptionMainNameer = useAppSelector((state) => state.extraOptionSlice);
	const OptionNameer = OptionMainNameer.extraOptiontState;

	OptionNameer.forEach((item2) => {
		if (item2.gameName === gameName && item2.boostType === boostType) {
			data.gameOptions = item2.gameOptions;
			data.gameOptions2 = item2.gameOptions2;
		}
	});
	let result = data;
	async function postData(url = "", data = {}) {
		const response = await fetch(url, {
			method: "POST",
			mode: "cors",
			body: JSON.stringify(data),
		});

		const json = await response.json();
		const status = response.status;
		return { json: json, code: status };
	}

	async function getresponse(data: any) {
		postData("/api/add-order/", data).then((res) => {
			setIsLoading(false);
			setResponseData(res);
			setComponentState(2);
			if (res.code === 200) {
				// Make sure we're in the browser
				if (typeof window !== "undefined") {
					router.push(`/profile/orders/` + res.json.Id);
				}
			}
		});
	}
	const submitHandler = () => {
		if (inputData !== "") {
			setIsLoading(true);
			const dabbe = addOrderJsonForm({ gameName, boostType, inputData, result });
			getresponse(dabbe);
		}
	};
	const closeHandler = () => {
		const element = document.getElementById("cfc");
		element?.classList.remove("checkout-form-container-a");
		setInputData("");
		setComponentState(1);
	};
	return (
		<div id="cfc" className="checkout-form-container">
			<div className="checkout-form">
				<div onClick={closeHandler} className="checkout-form-close">
					<FontAwesomeIcon icon={faXmark} className="t-icon" />
				</div>
				{componenState === 1 && (
					<>
						<div className="px-5">
							<p className="cfpd my-5">
								We need some of your game account credentilas, it help you to place
								order to multiple accounts. Don`t worry it can be changed later and
								it will remove automaticly from our database after order gets done.
							</p>

							<p className="cfpt">Your game account username or email :</p>
							<input
								spellCheck={false}
								type="text"
								value={inputData}
								placeholder="Username or Email..."
								onChange={(e) => {
									setInputData(e.target.value);
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter") submitHandler();
								}}
							/>
						</div>
						<div className="flex justify-center">
							<div
								onClick={submitHandler}
								className="checkout-form-btn"
								style={isLoading ? { pointerEvents: "none" } : {}}
							>
								{isLoading ? (
									<>
										<AddOrderSubmitLoading />
									</>
								) : (
									<>submit checkout</>
								)}
							</div>
						</div>
					</>
				)}

				{componenState === 2 && (
					<>
						<div className="p-5">
							{responseData.code === 200 && (
								<>
									<div
										className="checkout-form-info"
										style={{ backgroundColor: "green" }}
									>
										<FontAwesomeIcon icon={faCircleCheck} className="t-icon" />
										<span>Order added sucssesfuly.</span>
									</div>
									<div className="mt-2">
										order added; redirecting to order page...
									</div>
								</>
							)}

							{responseData.code === 403 && (
								<>
									<div
										className="checkout-form-info"
										style={{ backgroundColor: "blue" }}
									>
										<FontAwesomeIcon icon={faInfoCircle} className="t-icon" />
										<span>duplicate my nigger.</span>
									</div>
									<div className="mt-2">
										alredy have active order trash noob retarder nigrou
									</div>
								</>
							)}

							{responseData.code !== 403 && responseData.code !== 200 && (
								<>
									<div
										className="checkout-form-info"
										style={{ backgroundColor: "red" }}
									>
										<FontAwesomeIcon icon={faInfoCircle} className="t-icon" />
										<span>error</span>
									</div>
									<div className="mt-2">{responseData.json.Message}</div>
								</>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default CheckoutForm;
