import Image from "next/image";
import { amiko } from "@/app/Font";
import { lato } from "@/app/Font";
import "./index.css";
import data from "@/public/games.json";
import faqs_data from "@/public/faqs_data.json";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { BoostingIcon, Coaching, Accounts } from "@/app/components/svgs";
import WorkSliderMain from "@/app/components/work-slider/WorkSliderMain";
import Faqs from "@/app/components/faqs/Faqs";
import Script from "next/script";
import GameCard from "./GameCard";
import Benefits from "@/app/components/Benefits";
import "@/app/components/benefits.css";
import GotoBtn from "./GotoBtn";
import prisma from "@/src/lib/db";

export default async function Home() {
  return (
    <main>
      <div className={`hero ${amiko.className}`}>
        <div className="hero-left">
          <h1 className={amiko.className}>
            the best
            <br /> <span className="rgb-span">boosting platform</span>
            <br /> out there!
          </h1>
          <p className={lato.className}>
            We boost your account, swift and legit, with the best professional
            players on our roster.
            <br />
            so what are you waiting for? get one of our boosting services.
          </p>
          <GotoBtn>
            <div className="heroBtn">
              <span className="rgb-span2">Boost Now</span>
            </div>
          </GotoBtn>
        </div>
        <Image
          src="/hero3.png"
          width={778}
          height={550}
          alt="hero image"
          className="hero-image"
        />
      </div>
      <div>
        <h2 id="gametop">
          Select <span>Game</span>
        </h2>
        <p className="h2-p">
          Select the game you`re playing to see our offers!
        </p>
        <div className="game-card-main">
          {data.games.map((game, key) => {
            return (
              <GameCard
                key={key}
                h1={game.h1}
                imgSize={game.imgSize}
                imgSrc={game.imgSrc}
                imgStyle={game.imgStyle}
              />
            );
          })}
          <div className="clear-both"></div>
        </div>
      </div>
      <div style={{ marginTop: "180px" }}>
        <h2>
          Our <span>Services</span>{" "}
          {/* <FontAwesomeIcon icon={faHeadset} className="t-icon" /> */}
        </h2>
        <p className="h2-p">
          On top of our boosting service, we also offer coaching and top-ranking
          accounts for sale
        </p>
        <div className="services-container">
          <div className="service-item">
            <BoostingIcon />
            <h3>Boosting</h3>
            <p className="cal-p14">
              We rank up your account, with the best professional players, so
              you can have a smooth & worry-free experience with us.
            </p>

            <GotoBtn>
              <div className="service-btn">Boost Now</div>
            </GotoBtn>
          </div>
          <div className="service-vl"></div>
          <div className="service-item">
            <Coaching />
            <h3>Coaching</h3>
            <p className="cal-p14">
              Want to get better at your game? Hire on of our professional
              old-timers to guide you through your journey on becoming a Pro
              faster/better!
            </p>
            <GotoBtn>
              <div className="service-btn">Hire Now</div>
            </GotoBtn>
          </div>
          <div className="service-vl"></div>
          <div className="service-item">
            <Accounts />
            <h3>Accounts</h3>
            <p className="cal-p14">
              Wether you’re an old-timer returning to the game, or a new player
              looking to skip the time-consuming grind, We’ve got you covered
              with our spec’d out accounts!
            </p>
            <GotoBtn>
              <div className="service-btn">Browse Accounts</div>
            </GotoBtn>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "220px" }}>
        <h2>
          How It <span>Works</span>
        </h2>
        <p className="h2-p">
          We keep the Process easy and fast, just 3 simple steps.
        </p>
        <WorkSliderMain />
      </div>
      <Benefits />
      <div style={{ marginTop: "280px" }}>
        <h2>
          Frequently Asked <span>Questions</span>
        </h2>
        <div className="faqs-container">
          <div className="faqs-c-i">
            <Faqs faqs={faqs_data.home1} />
          </div>
          <div className="faqs-c-i">
            <Faqs faqs={faqs_data.home2} />
          </div>
        </div>
      </div>

      <div style={{ height: "300px" }}></div>
    </main>
  );
}
