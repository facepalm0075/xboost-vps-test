"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";

function Logout() {
	return (
		<div
			onClick={() => signOut({ callbackUrl: "/" })}
			className="profp-profc-item profilepage-logout"
			style={{backgroundColor:"unset"}}
		>
			<FontAwesomeIcon icon={faRightFromBracket} className="mr-1" />
			Logout
		</div>
	);
}

export default Logout;
