import Providers from "@/app/components/Providers";
import UserInfo from "./UserInfo";
import Logout from "./Logout";
import SidebarLinks from "./SidebarLinks";

function Sidebar() {
	return (
		<div className="user-profile-sidebar-container">
			<div className="relative h-full">
				<Providers>
					<UserInfo />
				</Providers>
				<SidebarLinks/>
				<Logout />
			</div>
		</div>
	);
}

export default Sidebar;
