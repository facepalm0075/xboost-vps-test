"use client";
import React, { useState } from "react";

type props = {
	chatItem: any[];
	senderHandler: (input: string) => void;
};
function UserChatForm({ chatItem, senderHandler }: props) {
	const [input, setInput] = useState("");
	return (
		<div className="w-80 m-auto my-8 rounded-sm bg-slate-700 p-3 text-white">
			<div className="bg-white text-black h-48 overflow-y-auto my-3">
				{chatItem.length > 0 &&
					chatItem.map((item, index) => {
						return (
							<div key={index} className={`${item.sender === "you" && "text-right"}`}>
								{item.message}
							</div>
						);
					})}
			</div>
			<div className="flex">
				<input
					value={input}
					onChange={(e) => setInput(e.currentTarget.value)}
					className="bg-black text-white"
					type="text"
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							senderHandler(input);
							setInput("");
						}
					}}
				/>
				<div
					onClick={() => {
						senderHandler(input);
						setInput("");
					}}
					className="p-2 ml-2 bg-slate-400 text-black cursor-pointer"
				>
					send
				</div>
			</div>
		</div>
	);
}

export default UserChatForm;
