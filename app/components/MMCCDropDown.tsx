"use client";

import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRef } from "react";

function MMCCDropDown() {
  const elRefs = useRef<HTMLDivElement>(null);
  const elRefs2 = useRef<HTMLDivElement>(null);
  const elRefs3 = useRef<HTMLDivElement>(null);

  const clickHandler = () => {
    const item = elRefs.current!;
    item.className == "mmcc-link-c"
      ? (item.className = "mmcc-link-c mmcc-link-c-a")
      : (item.className = "mmcc-link-c");

    const item2 = elRefs2.current!;
    item2.className == "mmcc-link"
      ? (item2.className = "mmcc-link mmcc-link-a")
      : (item2.className = "mmcc-link");

    const item3 = elRefs3.current!;
    item3.className == "mmcc-lin"
      ? (item3.className = "mmcc-lin mmcc-lin-a")
      : (item3.className = "mmcc-lin");
  };
  return (
    <div onClick={clickHandler} className="mmcc-link" ref={elRefs2}>
      <div ref={elRefs3} className="mmcc-lin">
        Services
        <FontAwesomeIcon
          style={{ right: "0px" }}
          className="mmcc-link-svg"
          icon={faChevronDown}
        />
      </div>
      <div ref={elRefs} className="mmcc-link-c">
        <div className="overflow-hidden">
          <Link href={""}>
            <div className="mmcc-link2">
              Dota 2
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </Link>
          <Link href={""}>
            <div className="mmcc-link2">
              Apex Legends
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </Link>
          <Link href={""}>
            <div className="mmcc-link2">
              Rainbow Six Siege
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MMCCDropDown;
