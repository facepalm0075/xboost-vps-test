import Providers from "@/app/components/Providers";
import UserInfo from "./UserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEllipsisV,
	faRightFromBracket,
	faChartLine,
	faBell,
	faBasketShopping,
} from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import Logout from "./Logout";

function Sidebar() {
	return (
		<div className="user-profile-sidebar-container">
			<div className="relative h-full">
				<Providers>
					<UserInfo />
				</Providers>
				<div className="profile-sidebar-links">
					<Link href="/profile/dashboard">
						<div className="profp-profc-item">
							<FontAwesomeIcon icon={faChartLine} className="mr-1" />
							Dashboard
						</div>
					</Link>
					<Link href="/profile/orders">
						<div className="profp-profc-item">
							<FontAwesomeIcon icon={faBasketShopping} className="mr-1" />
							Orders
						</div>
					</Link>

					<Link href="/profile/notifications">
						<div className="profp-profc-item">
							<FontAwesomeIcon icon={faBell} className="mr-1" />
							Notification
							<div className="prof-item-notif2">
								<span>2</span>
							</div>
						</div>
					</Link>
				</div>
        <Logout/>
			</div>
		</div>
	);
}

export default Sidebar;
