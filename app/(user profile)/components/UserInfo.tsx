"use client";

import LoginLoading from "@/app/components/LoginLoading";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faRightFromBracket,
  faChartLine,
  faBell,
  faBasketShopping,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function UserInfo() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <LoginLoading />;
  }
  return (
    <>
      <div>
        <div className="flex justify-center">
          <div className="ud-profile-pic">
            <span className="ud-profile-pic-span">
              {session?.user?.name && session?.user?.name[0]}
            </span>
            {session?.user?.image && (
              <Image
                src={session?.user?.image}
                alt="profile image"
                width={107}
                height={107}
              />
            )}
          </div>
        </div>
        <div className="text-center">
          {session?.user?.name && (
            <div className="ud-name">{session?.user?.name}</div>
          )}
          {session?.user?.email && (
            <div className="ud-email">{session?.user?.email}</div>
          )}
          <div className="ud-mode">User Mode</div>
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
      </div>
    </>
  );
}

export default UserInfo;
