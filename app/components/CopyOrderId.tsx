"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { ToolTipEO } from "./CostumToolTip";
function CopyOrderId() {
	const [status, setStatus] = useState("copy");
	const copyToClipBord = () => {
		const element = document.getElementById("order-id");
		navigator.clipboard.writeText(element?.innerText!);
		setStatus("copied to clipboard");
		setTimeout(() => {
			setStatus("copy");
		}, 1500);
	};
	return (
		<ToolTipEO title={status}>
			<FontAwesomeIcon icon={faCopy} className="t-icon" onClick={copyToClipBord} />
		</ToolTipEO>
	);
}

export default CopyOrderId;
