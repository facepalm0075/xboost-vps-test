import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faBars,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import MobileNavBar from "./MobileNavBar";
import CloseMMBtn from "@/app/components/CloseMMBtn";
import CloseMMRight from "@/app/components/CloseMMRight";
import MMCCDropDown from "@/app/components/MMCCDropDown";
import LoginBtn from "@/app/components/LoginBtn";
import Providers from "../components/Providers";

type props = {
  id?: string;
  id2?: string;
  headerClass?:string
};

function NavBar({ id = "navbar",id2 = "MHeader",headerClass="" }: props) {
  return (
    <div id={id}>
      <Image
        src="/Abstract-Design.png"
        width={1000}
        height={483}
        alt="bg-img"
        className="bg-img"
      />
      <div style={id == "sec" ?{height:"95px"}:{}} className="space1"></div>
      <div id="h-height-fix"></div>
      <header id={id2} className={`${headerClass}`}>
        <Link href={"/"}>
          <Image
            src="/LOGO.png"
            width={100}
            height={32.81}
            alt="Picture of the author"
            className="logo"
          />
        </Link>

        <Providers>
          <LoginBtn />
        </Providers>
        <div className="desktop-menu-items">
          <Link className="" id="link0" href={"/"}>
            Home
          </Link>
          <Link
            className=""
            id="link1"
            href={"/services/rainbow-six-siege/boosting"}
          >
            Services
          </Link>
          <Link className="" id="link2" href={"/contacts?s=workWithUs"}>
            Work with us
          </Link>
          <Link className="" id="link3" href={"/contacts"}>
            Contacts
          </Link>
          <Link className="" id="link4" href={"/blog"}>
            Blog
          </Link>
        </div>
      </header>
      <nav>
        <div className="flex items-center justify-between">
          <MobileNavBar />
          <div className="pl-4">
            <Link href={"/"}>
              <Image
                src="/LOGO.png"
                width={90}
                height={30}
                alt="Picture of the author"
                className="logo"
              />
            </Link>
          </div>
          <div className="">
            <div className="desktop-menu-login">
              <a href="#login">
                <span className="login">Login</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="nav-replace"></div>
      <div id="mmc" className="mobile-menu-container">
        <CloseMMRight />
        <div id="mmcc" className="mmc-card">
          <div className="relative">
            <div className="mmcci-fix">
              <CloseMMBtn />
              <div className="mmcci-fix-logo w-full">
                <Image
                  src="/LOGO.png"
                  width={90}
                  height={30}
                  alt="Picture of the author"
                  className=""
                />
                <h2>
                  Next Level <span>Boosting Experience</span>
                </h2>
              </div>
            </div>
            <Image
              src="/mmccBG2.jpg"
              width={450}
              height={100}
              alt="Picture of the author"
              className="mmcc-image"
            />
          </div>
          <Link href={""}>
            <div className="mmcc-link">
              Home
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </Link>
          <MMCCDropDown />
          <Link href={""}>
            <div className="mmcc-link">
              Work With us
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </Link>
          <Link href={""}>
            <div className="mmcc-link">
              Contacts
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </Link>
          <Link href={""}>
            <div className="mmcc-link">
              Blog
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
