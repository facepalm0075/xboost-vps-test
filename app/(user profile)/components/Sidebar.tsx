import Providers from "@/app/components/Providers";
import UserInfo from "./UserInfo";

function Sidebar() {
  return (
    <div className="user-profile-sidebar-container">
      <Providers>
        <UserInfo />
      </Providers>
    </div>
  );
}

export default Sidebar;
