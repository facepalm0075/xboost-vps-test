"use client";
import React, { useState } from "react";
import SmallMenuOpener from "./SmallMenuOpener";
import MainChat from "./MainChat";

function MainChatHolder() {
	const [is, setIs] = useState(false);
	const clickHandler = (status: boolean) => {
		setIs(status);
	};
	return (
		<div className="main-chat-holder">
			<SmallMenuOpener
				rtl={true}
				toggle={true}
				opened={clickHandler}
				isTop={true}
				width={300}
				height={300}
				itemsClass="main-user-chat-mo"
				outClickIgnore={true}
				items={
					<>
						<div>
							<MainChat use="user" />
						</div>
					</>
				}
			>
				btn
			</SmallMenuOpener>
		</div>
	);
}

export default MainChatHolder;
