import React from "react";
import { Select, Payment, Boostup } from "./svgs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */
import ProgressBar from "@ramonak/react-progress-bar";

type props = {
  number: number;
  clicked: (num: number) => void;
  duration: number;
};
function Btns({ number, clicked, duration }: props) {
  return (
    <div className="work-btn-main">
      <div
        className={`work-btn${number == 1 ? " work-active" : ""}`}
        onClick={() => clicked(1)}
      >
        <div className="work-btn-d1">
          <Select />
          <div className="work-btn-d2">
            <h3>Select Service</h3>
            <p>Choose one of our available services</p>
          </div>
        </div>
        {number == 1 ? (
          <ProgressBar
            completed={100}
            isLabelVisible={false}
            animateOnRender={true}
            className="progress"
            bgColor="white"
            borderRadius="5px"
            height="4px"
            width="123%"
            transitionDuration={`${duration}ms`}
            transitionTimingFunction="linear"
            baseBgColor="#313131"
          />
        ) : (
          ""
        )}
      </div>
      <FontAwesomeIcon icon={faArrowRight} className="w-icon" fontSize={24} />
      <div
        className={`work-btn${number == 2 ? " work-active" : ""}`}
        onClick={() => clicked(2)}
      >
        <div className="work-btn-d1">
          <Payment />
          <div className="work-btn-d2">
            <h3>Complete Payment</h3>
            <p>Shop through one of our solid payment methods.</p>
          </div>
        </div>
        {number == 2 ? (
          <ProgressBar
            completed={100}
            isLabelVisible={false}
            animateOnRender={true}
            className="progress w-fix2"
            bgColor="white"
            borderRadius="5px"
            height="4px"
            width="125%"
            transitionDuration="5s"
            transitionTimingFunction="linear"
            baseBgColor="#313131"
          />
        ) : (
          ""
        )}
      </div>
      <FontAwesomeIcon icon={faArrowRight} className="w-icon" />
      <div
        className={`work-btn${number == 3 ? " work-active" : ""}`}
        onClick={() => clicked(3)}
      >
        <div className="work-btn-d1">
          <Boostup />
          <div className="work-btn-d2">
            <h3>Boost up</h3>
            <p>Sit back, monitor the process and enjoy!</p>
          </div>
        </div>
        {number == 3 ? (
          <ProgressBar
            completed={100}
            isLabelVisible={false}
            animateOnRender={true}
            className="progress"
            bgColor="white"
            borderRadius="5px"
            height="4px"
            width="125%"
            transitionDuration="5s"
            transitionTimingFunction="linear"
            baseBgColor="#313131"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Btns;
