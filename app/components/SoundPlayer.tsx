"use client";

import React, { useRef, useEffect } from "react";

type props = {
	changer: number;
	volume?: number;
};
const SoundPlayer = ({ changer, volume = 0.5 }: props) => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const playAudio = async () => {
		if (audioRef.current) {
			audioRef.current.volume = volume;
			await audioRef.current.play();
		}
	};
	useEffect(() => {
		if (changer > 0) {
			playAudio();
		}
	}, [changer]);

	return (
		<div>
			<audio className="hidden" ref={audioRef} src="/sounds/message.wav" />
		</div>
	);
};

export default SoundPlayer;
