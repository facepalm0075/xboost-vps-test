"use client";
import { EmailFormLoginData } from "@/lib/schema";
import React, { useEffect, useState } from "react";

type props = {
	submitHandler: (value: string | null) => void;
	showInput: boolean;
};
function ClientChatStartBtn({ showInput, submitHandler }: props) {
	const [value, setValue] = useState<string | null>(null);
	const [Loaded, setLoaded] = useState(false);
	useEffect(() => {
		if (typeof window !== "undefined") {
			setLoaded(true);
		}
	}, []);

	return (
		<div>
			{Loaded && (
				<>
					{showInput && (
						<input
							type="text"
							value={value ? value : ""}
							onChange={(e) => {
								setValue(e.target.value);
							}}
						/>
					)}
					<button
						onClick={() => {
							const { error: zodError } = EmailFormLoginData.safeParse({ email: value });
							if (zodError && showInput) {
								console.log(zodError);
								console.log({ value });
								return;
							}
							submitHandler(value);
						}}
					>
						Start Chat
					</button>
				</>
			)}
		</div>
	);
}

export default ClientChatStartBtn;
