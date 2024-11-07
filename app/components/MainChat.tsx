"use client";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import UserChatForm from "./UserChatForm";
import AdminChatForm from "../(panel)/components/AdminChatForm";
import SoundPlayer from "./SoundPlayer";
import useLocalStorage from "./customHooks/useLocalStorage";

type props = {
	use: "admin" | "user";
	sendTo?: string;
	adminStartedChat?: (chat: string) => void;
};
function MainChat({ use, sendTo, adminStartedChat }: props) {
	const [id, setId] = useState<string | null>(null);
	const [started, setStarted] = useState(false);
	const [chatItem, setChatItem] = useState<any[]>([]);
	const [socket, setSocket] = useState<any>(null);
	const [notif, setNotif] = useState(0);
	const [isFull, setIsfull] = useState(false);
	const [local, setLocal] = useLocalStorage("fistChatroomUUID", null);
	let socketRef = useRef<any>(null);

	const startHandler = async () => {
		setSocket(io("http://localhost:3002"));
	};

	useEffect(() => {
		socket?.emit("connection-test", (response: any) => {
			if (response.status === "ok") {
				socketRef.current = socket;
				if (!sendTo) {
					socket.emit("client-join-room", (response: any) => {
						setId(response.room);
						if (!local) {
							setLocal(response.roomUU);
						}
						setStarted(true);
					});
				} else {
					setId(sendTo!);
					socket.emit("admin-join-room", sendTo!, (response: any) => {
						if (response === "joined") {
							setStarted(true);
							setIsfull(false);
							if (adminStartedChat) {
								adminStartedChat(sendTo!);
							}
						} else {
							setStarted(false);
							setIsfull(true);
						}
					});
				}
			}
		});
		socket?.on("receive-message", (message: string) => {
			setNotif((prev) => prev + 1);
			displayMessage(message, "other");
		});
	}, [socket]);

	const senderHandler = (input: string) => {
		if (input !== "") {
			if (id) {
				let isAdmin = false;
				if (use === "admin") {
					isAdmin = true;
				}
				socket.emit("send-message", input, id, isAdmin);
				displayMessage(input, "you");
			}
		}
	};

	const displayMessage = (message: string, sender: string) => {
		setChatItem((prev) => [...prev, { message: message, sender: sender }]);
	};

	useEffect(() => {
		if (use === "admin") {
			startHandler();
		}
	}, []);

	useEffect(() => {
		return () => {
			if (socketRef) {
				socketRef?.current?.disconnect();
			}
		};
	}, [socketRef]);
	return (
		<div>
			<SoundPlayer changer={notif} volume={0.3} />
			{started ? (
				<>
					{use === "user" ? (
						<UserChatForm chatItem={chatItem} senderHandler={senderHandler} />
					) : (
						<AdminChatForm chatItem={chatItem} senderHandler={senderHandler} />
					)}
				</>
			) : (
				<>
					{use === "user" && <div onClick={startHandler}>start chat</div>}
					{use === "admin" && isFull && <div>already another admin chatting</div>}
				</>
			)}
		</div>
	);
}

export default MainChat;
