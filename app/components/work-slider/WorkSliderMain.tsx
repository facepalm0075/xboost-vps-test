"use client";
import React, { useEffect, useState } from "react";
import Btns from "./Btns";
import Tabs from "./Tabs";
import "./styles.css";

export default function WorkSliderMain() {
  const [tabNum, setTabNum] = useState(1);
  const [id, setId] = useState(0);
  const duration = 5000;
  const click = (num: number) => {
    if (num != tabNum) {
      window.clearTimeout(id);
    }
    setTabNum(num);
  };
  useEffect(() => {
    setId(
      Number(
        window.setTimeout(() => {
          if (tabNum < 3) setTabNum(tabNum + 1);
          else {
            setTabNum(1);
          }
        }, duration)
      )
    );
  }, [tabNum]);

  return (
    <div className="work-main">
      <Btns duration={duration} number={tabNum} clicked={click} />
      <Tabs number={tabNum} />
    </div>
  );
}
