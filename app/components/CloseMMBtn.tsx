"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { CloseMM } from "./CloseMM";

function CloseMMBtn() {
  return (
    <div className="mm-close-btn">
      <FontAwesomeIcon icon={faClose} className="t-icon" onClick={CloseMM} />
    </div>
  );
}

export default CloseMMBtn;
