import "./styles.css";
import Image from "next/image";
import { Email } from "./svgs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Listener from "@/app/components/Listener";
import { Suspense } from "react";

function page() {
  return (
    <>
      <div>
        <div className="elipse1"></div>
      </div>
      <div className="contact-base contacts-banner">
        <Image
          src="/contact-abstract.png"
          width={419}
          height={306}
          alt="abstract image"
          className="contacts-abstract"
        />
        <Image
          src="/contacts-img.png"
          width={444}
          height={455}
          alt="contact image"
          className="contacts-img1"
        />
        <h1>Contact us online</h1>
        <p>
          At all times, our dedicated customer support team is ready to assist
          you.
          <br />
          Feel free to ask us anything; we`re here to help
        </p>
        <div className="contact-btn">Start Chat</div>
      </div>
      <div>
        <div className="elipse2"></div>
      </div>
      <div className="contact-base flex contacts-info">
        <div className="info-item">
          <Link href="">
            <FontAwesomeIcon
              icon={faUpRightFromSquare}
              className="info-item-svg"
            />
            <div className="contact-item-content">
              <Email />
              <br />
              <span>contact@xboost.gg</span>
            </div>
          </Link>
        </div>
        <div className="info-item">
          <Link href="">
            <FontAwesomeIcon
              icon={faUpRightFromSquare}
              className="info-item-svg"
            />
            <div className="contact-item-content">
              <Email />
              <br />
              <span>contact@xboost.gg</span>
            </div>
          </Link>
        </div>
        <div className="info-item">
          <Link href="">
            <FontAwesomeIcon
              icon={faUpRightFromSquare}
              className="info-item-svg"
            />
            <div className="contact-item-content">
              <Email />
              <br />
              <span>contact@xboost.gg</span>
            </div>
          </Link>
        </div>
        <div className="info-item">
          <Link href="">
            <FontAwesomeIcon
              icon={faUpRightFromSquare}
              className="info-item-svg"
            />
            <div className="contact-item-content">
              <Email />
              <br />
              <span>contact@xboost.gg</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="contact-base contacts-banner2">
        <Suspense>
          <Listener />
        </Suspense>
        <div className="contact-banner-content">
          <Image
            src="/Contact-Abstract2.png"
            width={383}
            height={302}
            alt="abstract image"
            className="contacts-abstract2"
          />
          <h2>Apply as booster</h2>
          <p>
            At all times, our dedicated customer support team is ready to assist
            you.
            <br /> Feel free to ask us anything; we`re here to help
          </p>
          <div className="contact-btn">Register</div>
        </div>
        <Image
          src="/contact-img2.png"
          width={474}
          height={455}
          alt="contact image"
          className="contact-img2"
        />
      </div>
      <div className="lets-connect">
        <h2>Let`s connect</h2>
        <p>Leave your message/question and your contacts, we`ll reply ASAP!</p>
        <div className="lets-connect-form">
          <form action="">
            <div className="float-left">
              <label className="con-text-lable" htmlFor="name">
                Full Name:
              </label>
              <br />
              <input
                placeholder="Enter your name..."
                name="name"
                id="name"
                className="con-text"
                type="text"
              />
            </div>
            <div className="float-left">
              <label className="con-text-lable" htmlFor="subject">
                The Subject:
              </label>
              <br />
              <input
                placeholder="Enter the subject..."
                name="subject"
                id="subject"
                className="con-text"
                type="text"
              />
            </div>
            <div>
              <label className="con-text-lable" htmlFor="email">
                Email Address:
              </label>
              <br />
              <input
                placeholder="Enter your email..."
                name="email"
                id="email"
                className="con-text"
                type="email"
              />
            </div>
            <br />
            <textarea
              placeholder="Write your message..."
              name=""
              id=""
            ></textarea>
            <br />
            <div className="float-left">
              <input
                className="con-check"
                type="checkbox"
                name="terms"
                id="terms"
              />
              <span>I agree with Terms of Use and Privacy Policy</span>
            </div>

            <button type="submit">Send Your Message</button>
            <div className="clear-both"></div>
          </form>
        </div>
      </div>
    </>
  );
}

export default page;
