"use client";

import { signIn, useSession } from "next-auth/react";
import LoggedIn from "./LoggedIn";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {LoginLoading} from "./Loadings";

function LoginBtn() {
	const [changes, setChanges] = useState(0);
	const pathname = usePathname();
	let url = encodeURIComponent(pathname);
	useEffect(() => {
		url = encodeURIComponent(pathname);
		setChanges((prev) => prev + 1);
	}, [pathname]);
	const { data: session, status } = useSession();
	if (status === "loading") {
		return <LoginLoading />;
	}
	if (status === "authenticated") {
		return <LoggedIn path={pathname} />;
	}
	return (
		<div className="desktop-menu-login">
			<Link href={`/signin?callbackUrl=${url}`}>
				<span className="sign">Sign Up</span>
			</Link>
			<Link href={`/signin?callbackUrl=${url}`}>
				<span className="login">Login</span>
			</Link>
		</div>
	);
}

export default LoginBtn;
