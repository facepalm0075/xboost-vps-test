import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";

type props = {
	status: string;
};

function OrderProgres({ status }: props) {
	let level = 1;
	switch (status) {
		case "not paid":
			level = 1;
			break;
		case "paid":
			level = 2;
			break;
		case "completed":
			level = 3;
			break;

		default:
			break;
	}
	return (
		<div className="flex items-center order-progress-container mt-8">
			<div className="flex items-center order-progress-num-c">
				<div className="order-progress-num order-progress-num-c-c">
					<span>{level >= 1 ? <FontAwesomeIcon icon={faCheck} /> : 1}</span>
				</div>
				<span>Select Order</span>
			</div>
			<div
				className={`flex items-center order-progress-line-c ${level >= 1 && "order-progress-line-c-a"}`}
			>
				<div className="order-progress-line"></div>
				<FontAwesomeIcon icon={faArrowRight} />
			</div>
			<div className="flex items-center order-progress-num-c">
				<div className={`order-progress-num ${level >= 2 && "order-progress-num-c-c"}`}>
					<span>{level >= 2 ? <FontAwesomeIcon icon={faCheck} /> : 2}</span>
				</div>
				<span>Make Payment</span>
			</div>
			<div
				className={`flex items-center order-progress-line-c ${level >= 2 && "order-progress-line-c-a"}`}
			>
				<div className="order-progress-line"></div>
				<FontAwesomeIcon icon={faArrowRight} />
			</div>
			<div
				className={`flex items-center order-progress-num-c ${level === 1 && "order-progress-disable"}`}
			>
				<div className={`order-progress-num ${level >= 3 && "order-progress-num-c-c"}`}>
					<span>{level >= 3 ? <FontAwesomeIcon icon={faCheck} /> : 3}</span>
				</div>
				<span>Completed</span>
			</div>
		</div>
	);
}

export default OrderProgres;
