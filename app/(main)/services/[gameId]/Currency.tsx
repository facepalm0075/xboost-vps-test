import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";

function Currency() {
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
  return (
    <div className="select-game">
      <div className="game-main">
        <div onClick={handleClick} className="game-btn cursor-pointer pl-5">
          <Image
            src="/usa-flag-icon.png"
            width={20}
            height={20}
            alt="cs2 icon"
            className="currency-img"
            style={{width:"29px",marginTop:"2px"}}
          />
          <div className="pl-3 mt-1">
            <span className="text-base font-semibold">USD</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              width={19}
              className="svg-inline--fa fa-github fa-w-16 fa-lg ml-2 -mt-1.5"
            />
          </div>
        </div>
        <div></div>
        <div ref={ref} className="game-items-main inline-block">
          <div className="game-items flex">
            <Image
              src="/usa-flag-icon.png"
              width={20}
              height={20}
              alt="cs2 icon"
              className="currency-img"
              style={{width:"29px"}}
            />
            <div className="pl-3">
              <span className="text-lg">USD</span>
            </div>
          </div>

          <div className="game-items flex">
            <Image
              src="/euro-flag-icon.png"
              width={27}
              height={27}
              alt="cs2 icon"
              className="currency-img"
              style={{width:"29px"}}
            />
            <div className="pl-3">
              <span className="text-lg">Euro</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Currency;
