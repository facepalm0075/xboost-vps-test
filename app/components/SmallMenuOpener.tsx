"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useOutsideClick } from "./customHooks/useClickedOut";

type props = {
	opened?: (status: boolean) => void;
	toggle?: boolean;
	width?: number;
	height?: number;
	rtl?: boolean;
	isTop?: boolean;
	itemsTop?: string;
	itemsClass?: string;
	fadeInClass?: string;
	fadeOutClass?: string;
	children: ReactNode;
	items: ReactNode;
	outClickIgnore?: boolean;
	inClickClose?: boolean;
	closerState?: number;
};
function SmallMenuOpener({
	opened,
	toggle = false,
	width = 150,
	height = 160,
	rtl = false,
	isTop = false,
	itemsTop = "7px",
	itemsClass = "SmallMenuOpener-items",
	fadeInClass = "SmallMenuOpener-e",
	fadeOutClass = "SmallMenuOpener-d",
	children,
	items,
	outClickIgnore,
	inClickClose,
	closerState,
}: props) {
	const [leftDir, setLeftDir] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const mainRef = useOutsideClick(
		() => {},
		() => {
			if (outClickIgnore) return;
			close();
		}
	);
	const childRef = useOutsideClick(
		() => {
			open();
		},
		() => {}
	);
	const itemsRef = useOutsideClick(
		() => {
			if (inClickClose) close();
		},
		() => {}
	);
	const open = () => {
		if (isOpen && toggle) {
			close();
		} else {
			itemsRef.current!.className = `${itemsClass} ${fadeInClass}`;
			setTimeout(() => {
				itemsRef.current!.className = `${itemsClass} SmallMenuOpener-items-activated`;
			}, 305);
			setIsOpen(true);
			opened && opened(true);
		}
	};

	const close = () => {
		itemsRef.current!.className = `${itemsClass} ${fadeOutClass}`;
		setIsOpen(false);
		opened && opened(false);
	};
	useEffect(() => {
		let min = width - childRef.current!.clientWidth;
		if (min < 0) {
			min = 0;
		}
		setLeftDir(min);
	}, []);

	useEffect(() => {
		close();
	}, [closerState]);
	return (
		<div ref={mainRef} className="SmallMenuOpener-c">
			{isTop && (
				<div className="relative">
					<div
						ref={itemsRef}
						style={{
							width: `${width}px`,
							height: `${height}px`,
							transform: `translate(${rtl ? `-${leftDir}px` : "0px"},-${height + 20}px)`,
						}}
						className={itemsClass}
					>
						{items}
					</div>
				</div>
			)}
			<div ref={childRef} className="SmallMenuOpener-main">
				{children}
			</div>
			{!isTop && (
				<div className="relative">
					<div
						ref={itemsRef}
						style={{
							width: `${width > 0 ? width + "px" : "100%"}`,
							height: `${height > 0 ? height + "px" : "auto"}`,
							transform: `translate(${rtl ? `-${leftDir}px` : "0px"},${itemsTop})`,
						}}
						className={itemsClass}
					>
						{items}
					</div>
				</div>
			)}
		</div>
	);
}

export default SmallMenuOpener;
