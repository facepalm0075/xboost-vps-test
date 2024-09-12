"use client";
import "./styles.css";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

type props = {
  faqs: { question: string; answer: string }[];
};

function Faqs({ faqs }: props) {
  const elRefs = useRef<HTMLDivElement[]>([]);
  elRefs.current = [];
  const addRefs = (i: HTMLDivElement) => {
    if (i && !elRefs.current.includes(i)) {
      elRefs.current.push(i);
    }
  };
  const elRefs2 = useRef<HTMLDivElement[]>([]);
  elRefs2.current = [];
  const addRefs2 = (i: HTMLDivElement) => {
    if (i && !elRefs2.current.includes(i)) {
      elRefs2.current.push(i);
    }
  };
  const clickHandle = (id: number) => {
    const item = elRefs.current[id];
    item.className == "faq-a"
      ? (item.className = "faq-a faq-a-active")
      : (item.className = "faq-a");

    const item2 = elRefs2.current[id];
    item2.className == "openicon float-right inline"
      ? (item2.className = "openicon float-right inline openicon-active")
      : (item2.className = "openicon float-right inline");
  };
  useEffect(() => {}, []);
  return (
    <div className="faq-main">
      {faqs.map((item, key) => {
        return (
          <div key={key} className="faq-item">
            <div onClick={() => clickHandle(key)} className="faq-q">
              <div className="faq-m">
                <div className="openicon float-right inline" ref={addRefs2}>
                  <FontAwesomeIcon icon={faChevronDown} className="t-icon" />
                </div>
                <h4>{item.question}</h4>
              </div>
              <div ref={addRefs} className="faq-a">
                <div>
                  <div className="mt-2"></div>
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Faqs;
