import Link from "next/link";
import Image from "next/image";
import React from "react";

type props = {
  id?: string;
};

function Footer({ id = "footer" }: props) {
  return (
    <>
      <div id={id}>
        <footer>
          <Link href={"/"}>
            <Image
              src="/LOGO.png"
              width={100}
              height={32.81}
              alt="Picture of the author"
            />
          </Link>
          <div className="footer-content">
            <p>
              Ready to elevate your account?
              <br />
              Choose on of our available services or contact our support if you
              are hesitant!
            </p>
            <div className="desktop-footer-menu-items">
              <Link href={"/"}>Home</Link>
              <Link href={"/"}>Work With Us</Link>
              <Link href={"/"}>Contacts</Link>
              <Link href={"/"}>Blog</Link>
            </div>
            <div className="footer-mid"></div>
          </div>
          <div className="footer-bottom">
            <p className="f-p-1">
              <span>l</span>
              <span>l</span>
              <span>l</span>
            </p>
            <p className="f-p-3">developed by Pouya</p>
            <p className="f-p-2">xBoost All Rights Reserved</p>
          </div>
        </footer>
      </div>
      <div>
        <div className="footer-ellipse1"></div>
        <div className="footer-ellipse2"></div>
      </div>
    </>
  );
}

export default Footer;
