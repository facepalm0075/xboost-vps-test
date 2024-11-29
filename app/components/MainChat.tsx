"use client";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import UserChatForm from "./UserChatForm";
import AdminChatForm from "../(panel)/components/AdminChatForm";
import SoundPlayer from "./SoundPlayer";
import useLocalStorage from "./customHooks/useLocalStorage";
import ClientChatStartBtn from "./ClientChatStartBtn";
import axios from "axios";

type props = {
	use: "admin" | "user";
	adminCred?: string;
	sendTo?: string;
	adminStartedChat?: (chat: string) => void;
};
function MainChat({ use, sendTo, adminStartedChat, adminCred }: props) {
	const [id, setId] = useState<string | null>(null);
	const [started, setStarted] = useState(false);
	const [chatItem, setChatItem] = useState<any[]>([]);
	const [socket, setSocket] = useState<any>(null);
	const [notif, setNotif] = useState(0);
	const [isFull, setIsfull] = useState(false);
	const [local, setLocal] = useLocalStorage("chatSessionId", null);
	const [local2, setLocal2] = useLocalStorage("chatUserName", null);

	let socketRef = useRef<any>(null);

	const startHandler = async () => {
		setSocket(io("http://localhost:3002"));
		const prevChats = await axios({
			method: "GET",
			url: `http://localhost:3002/api/chats?roomId=${use === "user" ? local : sendTo}&skip=0&take=5`,
		});
		setChatItem((prev) =>
			prevChats.data.message
				.map((item: any) => {
					let who = "";
					if (use === "user") {
						if (item.sender === local2) who = "you";
					} else {
						if (item.sender === adminCred) who = "you";
					}
					return { message: item.content, sender: who };
				})
				.reverse()
		);
	};

	const chatStartHanlder = (value: string | null) => {
		if (value) {
			setLocal2(value);
		}
		startHandler();
	};

	useEffect(() => {
		socket?.emit("connection-test", (response: any) => {
			if (response.status === "ok") {
				socketRef.current = socket;
				if (!sendTo) {
					socket.emit("client-join-room", local, local2, (response: any) => {
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
			displayMessage(message, "other");
			setNotif((prev) => prev + 1);
		});
	}, [socket]);

	const senderHandler = (input: string) => {
		if (input !== "") {
			if (id) {
				let cred = local2;
				if (use === "admin") {
					cred = adminCred!;
				}
				socket.emit("send-message", input, id, cred);
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
					{use === "user" && (
						<>
							<ClientChatStartBtn
								showInput={local2 ? false : true}
								submitHandler={chatStartHanlder}
							/>
						</>
					)}
					{use === "admin" && isFull && <div>already another admin chatting</div>}
				</>
			)}
		</div>
	);
}

export default MainChat;
