"use client";

import React, { Children, MutableRefObject, ReactNode, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import MainChat from "@/app/components/MainChat";
import SoundPlayer from "@/app/components/SoundPlayer";

type props = {
	coock: string | undefined;
};
function MainChatAdmin({ coock }: props) {
	const [chats, setChats] = useState<string[]>([]);
	const [fullChats, setFullChats] = useState<string[]>([]);
	const [showComponentA, setShowComponentA] = useState(true);
	const [chatTo, setChatTo] = useState<string | null>(null);
	const [notifMessage, setNotifMessage] = useState<{ room: string; message: string; id: number }[]>(
		[]
	);
	const [notif, setNotif] = useState(0);
	const [socket, setSocket] = useState<any>(null);

	let chatToRef = useRef<string | null>(null);
	let socketRef = useRef<any>(null);

	const adminConnect = async () => {
		const token = coock;
		setSocket(
			io("http://localhost:3002/panel", {
				auth: {
					token: token,
				},
			})
		);
	};

	useEffect(() => {
		socket?.on("get-all-rooms", (array: string[], fullRooms: string[]) => {
			setChats(array.filter((item) => item !== null));
			setFullChats(fullRooms.filter((item) => item !== null));
		});

		socket?.on("notifMessage", (room: string, message: string) => {
			setNotifMessage((prev) => [...prev, { room: room, message: message, id: prev.length + 1 }]);
			if (chatToRef.current !== room) {
				setNotif((prev) => prev + 1);
			}
		});

		socket?.on("new-room", (id: string) => {
			if (id) {
				setChats((prev) => {
					if (prev.indexOf(id) === -1) {
						return [...prev, id];
					}
					return prev;
				});
				setNotifMessage((prev) => [
					...prev,
					{ room: id, message: "started chat", id: prev.length + 1 },
				]);
				setNotif((prev) => prev + 1);
			}
		});

		socket?.on("room-full", (room: string) => {
			setFullChats((prev) => {
				if (prev.indexOf(room) === -1) {
					return [...prev, room];
				}
				return prev;
			});
		});

		socket?.on("delete-room", (id: string) => {
			chatToRemover(id);
			setChats((prev) => prev.filter((item) => item !== id));
		});
	}, [socket]);

	useEffect(() => {
		adminConnect();
	}, []);

	useEffect(() => {
		return () => {
			if (socketRef) {
				socketRef?.current?.disconnect();
			}
		};
	}, [socketRef]);

	const chatToRemover = (id: string | null | undefined) => {
		const chatter = chatToRef.current;
		if (id) {
			if (id === chatter) {
				setChatTo(null);
				chatToRef.current = null;
			}
		}
	};

	const joinHandler = (id: string) => {
		setChatTo(id);
		chatToRef.current = id;
		setShowComponentA(!showComponentA);
		setNotifMessage((prev) => {
			return prev.filter((item) => item.room !== id);
		});
	};

	const adminSchatHandler = (chat: string) => {
		socket?.emit("chat-started", chat);
	};

	return (
		<div className="flex">
			<SoundPlayer changer={notif} />
			<div className="border-blue-500 border-r-2" style={{ width: "280px" }}>
				{chats?.map((item, index) => {
					return (
						<div key={item}>
							{item && (
								<FullNotifer fullChats={fullChats} room={item} key={item}>
									<div className="min-w-44 p-2 bg-slate-600" onClick={() => joinHandler(item)}>
										<span>
											user {index + 1}
											<br />
											<Notifer key={item} room={item} allNotifs={notifMessage} />
										</span>
									</div>
								</FullNotifer>
							)}
						</div>
					);
				})}
			</div>
			<div style={{ width: "400px", height: "500px" }} className="bg-slate-700">
				{chatTo && (
					<>
						<div className="p-3">
							<span>
								chatting to : <br /> <span>{chatTo}</span>
							</span>
						</div>
						<br />
						{showComponentA ? (
							<MainChat
								key={chatTo}
								use="admin"
								adminStartedChat={adminSchatHandler}
								sendTo={chatTo}
							/>
						) : (
							<MainChat
								key={chatTo}
								use="admin"
								adminStartedChat={adminSchatHandler}
								sendTo={chatTo}
							/>
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default MainChatAdmin;

type nProps = {
	room: string;
	allNotifs: {
		room: string;
		message: string;
	}[];
};

const Notifer = ({ room, allNotifs }: nProps) => {
	const notifs = allNotifs.map((item) => {
		if (item.room === room) {
			return item.message;
		}
		return null;
	});
	const result = notifs.filter((item) => item !== null);
	return (
		<>
			<div>
				{result.length > 0 && (
					<>
						{result.length} {result[result.length - 1]}
					</>
				)}
			</div>
		</>
	);
};

type fProps = {
	room: string;
	fullChats: string[];
	children: ReactNode;
};

const FullNotifer = ({ room, fullChats, children }: fProps) => {
	let isIn = false;
	if (fullChats.includes(room)) {
		isIn = true;
	} else {
		isIn = false;
	}
	console.log("isin :" + isIn);
	return (
		<>
			<div style={isIn ? { border: "1px solid red", pointerEvents: "none" } : {}}>
				{isIn && (
					<>
						"another admin talking" <br />
					</>
				)}

				{children}
			</div>
		</>
	);
};
