"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import LowerCase from "@/app/components/LowerCase";
import { titleCase } from "@/app/components/TitleCase";

type props = {
  currentGame: string;
  allGames: string[];
};

function GameClick({ currentGame, allGames }: props) {
  const ref = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    setTimeout(() => {
      ref.current?.classList.add("game-active");
    }, 10);
  };
  useEffect(() => {
    document.addEventListener("click", () => {
      ref.current?.classList.remove("game-active");
    });
  }, []);
  const gameImage = ("/gameIcons/" + LowerCase(currentGame)).toLowerCase();
  return (
    <>
      <div className="select-game">
        <div className="game-main">
          <div onClick={handleClick} className="game-btn cursor-pointer pl-5">
            <Image
              src={gameImage}
              width={27}
              height={27}
              alt={`"${currentGame} icon`}
            />
            <div className="pl-3 mt-1">
              <span className="text-base font-semibold">{currentGame}</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                width={19}
                className="svg-inline--fa fa-github fa-w-16 fa-lg ml-2 -mt-1.5"
              />
            </div>
          </div>
          <div></div>
          <div ref={ref} className="game-items-main inline-block">
            {allGames.map((item, key) => {
              const gameImage2 = ("/gameIcons/" + LowerCase(item)).toLowerCase();
              return (
                <Link key={key} href={`${""}/services/${item.split(" ").join("-").toLowerCase()}/boosting`}>
                  <div className="game-items flex">
                    <Image
                      src={gameImage2}
                      width={27}
                      height={27}
                      alt={`"${item} icon`}
                    />
                    <div className="pl-3">
                      <span className="text-lg">{titleCase(item)}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default GameClick;
