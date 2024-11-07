import { useEffect, useRef } from "react";

export const useOutsideClick = (inside: () => void, outside: () => void) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				outside();
			} else {
				inside();
			}
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [outside, inside]);

	return ref;
};
