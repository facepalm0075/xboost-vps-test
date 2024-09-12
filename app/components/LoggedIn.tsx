"use client";
import { useSession, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faRightFromBracket,
  faChartLine,
  faCartShopping,
  faBell,
  faBasketShopping,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Link from "next/link";

type props = {
  path: string;
};

function LoggedIn({ path }: props) {
  const elRefs = useRef<HTMLDivElement>(null);
  const pathname = path;
  let id = "not";
  if (["/profile"]?.some((path) => pathname.startsWith(path))) {
    id = "sec";
  }
  useEffect(() => {
    document.addEventListener(
      "click",
      (
        e: globalThis.MouseEvent | React.MouseEvent<HTMLElement, HTMLElement>
      ) => {
        e = e as React.MouseEvent<HTMLElement, HTMLElement>;
        var target = e.target as HTMLElement,
          ElID = target?.parentElement?.id;
        if (ElID === "UserProfile") {
          return;
        } else {
          const item = elRefs.current!;
          item.className == "profile-content profile-content-a"
            ? (item.className = "profile-content")
            : "";
        }
      },
      false
    );
  }, []);

  const clickHandler = () => {
    const item = elRefs.current!;
    item.className == "profile-content"
      ? (item.className = "profile-content profile-content-a")
      : "";
  };

  const { data: session } = useSession();
  return (
    <>
      <div id="UserProfile" className="desktop-menu-logged float-right">
        <div
          id="UserProfile"
          className="profile-container"
          onClick={clickHandler}
        >
          <div id="UserProfile" className="profile">
            <div id="UserProfile" className="profile-pic">
              <span id="UserProfile" className="profile-pic-span">
                {session?.user?.name && session?.user?.name[0]}
              </span>
              {session?.user?.image && (
                <Image
                  id="UserProfile"
                  src={session?.user?.image}
                  alt="profile image"
                  width={38}
                  height={38}
                />
              )}
              <div id="UserProfile" className="prof-pic-notif">
                <span>2</span>
              </div>
            </div>

            <FontAwesomeIcon
              id="UserProfile"
              icon={faEllipsisV}
              className="ml-3"
            />
          </div>
          <div id="UserProfile" className="profile-content" ref={elRefs}>
            <div id="UserProfile" className="profc-top">
              {session?.user?.name && (
                <div id="UserProfile">
                  {session?.user?.name}{" "}
                  {session?.user?.email && <span>{session?.user?.email}</span>}
                </div>
              )}
            </div>
            <Link href="/profile/dashboard">
              <div className="profc-item">
                <FontAwesomeIcon icon={faChartLine} className="mr-1" />
                Dashboard
              </div>
            </Link>
            <div className="profc-item">
              <FontAwesomeIcon icon={faBasketShopping} className="mr-1" />
              Orders
            </div>

            <div className="profc-item">
              <FontAwesomeIcon icon={faBell} className="mr-1" />
              Notification
              <div className="prof-item-notif2">
                <span>2</span>
              </div>
            </div>

            <div
              onClick={() => signOut(id == "sec" ? { callbackUrl: "/" } : {})}
              style={{ borderTop: "1px solid #2d2d2d" }}
              className="profc-item"
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="mr-1" />
              Logout
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoggedIn;
