"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function MobileNavBar() {
  const clickHandler = () => {
    const item = document.getElementById("mmc")!;
    item.classList.remove("mmc-deactive");
    item.classList.add("mmc-active");
    const item2 = document.getElementById("mmcc")!;
    item2.classList.remove("mmcc-deactive");
    item2.classList.add("mmcc-active");
    const body = document.getElementById("body")!;
    body.setAttribute("style", "overflow-y: hidden;");
  };

  return (
    <>
      <div onClick={clickHandler} className="burg-container">
        <FontAwesomeIcon icon={faBars} className="burg" />
      </div>
    </>
  );
}

export default MobileNavBar;
