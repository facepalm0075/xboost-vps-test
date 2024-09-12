"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faGraduationCap,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import GameClick from "./GameClick";
import Link from "next/link";
import { titleCase } from "@/app/components/TitleCase";
import { usePathname } from "next/navigation";
import Currency from "./Currency";
import { ToolTipLG } from "@/app/components/CostumToolTip";

type props = {
  params: { gameId: string };
  allGames:string[];
};

function GameNavbar({ params,allGames }: props) {
  const gameId = titleCase(params.gameId.replaceAll("-"," "));
  const router = usePathname().split("/");
  const page = router[3];
  const hrefName = "boosting";
  return (
    <>
      <div id="game-nav-fixer"></div>
      <div id="game-nav" className="service-navbar flex">
        <div className="w-1/3">
          <GameClick allGames={allGames} currentGame={gameId} />
        </div>
        <div className="w-1/3">
          <div className="service-type flex h-full justify-center">
            {/*<span>
              <Link
                href={`http://localhost:3000/services/apex-legends/${hrefName}`}
              >
                <div
                  className={`type-btn ${
                    page == "boosting" && "type-btn-active"
                  }`}
                >
                  <span>
                    <FontAwesomeIcon
                      icon={faTrophy}
                      width={21}
                      className="svg-inline--fa fa-github fa-w-16 fa-lg ml-2 -mt-1.5"
                    />
                    Boosting
                  </span>
                </div>
              </Link>
            </span>
          <ToolTipLG title="Coming Soon">
            <span>
              <Link href="./coaching" style={{ pointerEvents: "none" }}>
                <div className="type-btn type-btn-diactive">
                  <span>
                    <FontAwesomeIcon
                      icon={faGraduationCap}
                      width={21}
                      className="svg-inline--fa fa-github fa-w-16 fa-lg ml-2 -mt-1.5"
                    />
                    Coaching
                  </span>
                </div>
              </Link>
            </span>
          </ToolTipLG>
          <ToolTipLG title="Coming Soon">
            <span>
              <Link href="./coaching" style={{ pointerEvents: "none" }}>
                <div className="type-btn type-btn-diactive">
                  <span>
                    <FontAwesomeIcon
                      icon={faAddressCard}
                      width={21}
                      className="svg-inline--fa fa-github fa-w-16 fa-lg ml-2 -mt-1.5"
                    />
                    Accounts
                  </span>
                </div>
              </Link>
            </span>
          </ToolTipLG> */}
          </div>
        </div>
        <div className="w-1/3">
          <div className="service-navbar-btns float-right">
            <Currency />
          </div>
        </div>
      </div>
    </>
  );
}

export default GameNavbar;
