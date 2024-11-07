"use client";

export default function presistState(name: string) {
	const getLocalState = () => {
		if (typeof window !== "undefined") {
			const local = localStorage.getItem(name);
			if (local) {
				return JSON.parse(local) as any;
			}
		}
		return [];
	};

	const localStateSaver = (state: any[]) => {
		if (typeof window !== "undefined") {
			localStorage.setItem(name, JSON.stringify(state));
		}
	};

	return [getLocalState, localStateSaver];
}
