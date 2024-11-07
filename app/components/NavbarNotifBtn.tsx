"use client";
import React, { useEffect, useState } from "react";
import { faBell as bellReg } from "@fortawesome/free-regular-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { readNotifs } from "./clientNotifs/NotifRead";
import NotifStatus from "./clientNotifs/showNotifs";
import ClearNotifBtn from "./clientNotifs/ClearNotifBtn";
import SmallMenuOpener from "./SmallMenuOpener";
import { LoginLoading } from "./Loadings";
import axios from "axios";

type PropsHead = {
	isOpened: boolean;
};

function Head({ isOpened }: PropsHead) {
	const [first, setFirst] = useState(0);
	const clickHandler = () => {
		if (first < 1) {
			readNotifs();
		}
		setFirst(1);
	};
	return (
		<div onClick={clickHandler} className="logged-notifications relative">
			<div className="prof-pic-notif">
				<NotifStatus />
			</div>
			{isOpened ? (
				<FontAwesomeIcon icon={faBell} className="mr-1" />
			) : (
				<FontAwesomeIcon icon={bellReg} className="mr-1" />
			)}
		</div>
	);
}

function Items({ isOpened }: PropsHead) {
	const [stage, setStage] = useState(1);
	const [data, setData] = useState([]);

	const sender = async () => {
		const res = await axios({
			method: "GET",
			url: "/api/notification/getAll?skip=0&take=5",
		});
		setData(res.data.Message);
		setStage(3);
	};

	useEffect(() => {
		if (isOpened) {
			setStage(2);
			sender();
		} else {
			setTimeout(() => {
				setStage(1);
			}, 350);
		}
	}, [isOpened]);
	return (
		<>
			{stage === 2 && (
				<div
					style={{
						display: "inline-block",
						left: "50%",
						top: "50%",
						transform: "translate(-50%,-50%)",
						position: "absolute",
					}}
				>
					<LoginLoading />
				</div>
			)}

			{stage === 3 &&
				data.map((item: any, index) => {
					return (
						<div className="logged-notifications-items" key={index}>
							{item.subject}
						</div>
					);
				})}
		</>
	);
}

function NavbarNotifBtn() {
	const [is, setIs] = useState(false);
	const clickHandler = (status: boolean) => {
		setIs(status);
	};
	return (
		<>
			<SmallMenuOpener
				rtl={true}
				toggle={true}
				opened={clickHandler}
				items={<Items isOpened={is} />}
			>
				<ClearNotifBtn>
					<Head isOpened={is} />
				</ClearNotifBtn>
			</SmallMenuOpener>
		</>
	);
}

export default NavbarNotifBtn;
