"use client";
import faqs_data from "@/public/faqs_data.json";
import Faqs from "@/app/components/faqs/Faqs";
import { useState } from "react";
import { motion } from "framer-motion";

function OrderDetails() {
  const [number, setNumber] = useState(1);
  return (
    <>
      <div className="gameTypeSpace"></div>
      <div className="order-details-main">
        <div className="order-details-btns flex">
          <h2
            onClick={() => setNumber(1)}
            className={`order-details-btns-h2 ${number == 1 ? "odbh-active" : null}`}
          >
            What you`ll get
          </h2>
          <h2
            onClick={() => setNumber(2)}
            className={`order-details-btns-h2 ${number == 2 ? "odbh-active" : null}`}
          >
            Requirements
          </h2>
          <h2
            onClick={() => setNumber(3)}
            className={`order-details-btns-h2 ${number == 3 ? "odbh-active" : null}`}
          >
            More info
          </h2>
        </div>
        <hr />
        <div className="pt-6">
          {number == 1 ? <OrderDetailspg /> : null}
          {number == 2 ? <OrderDetailspg /> : null}
          {number == 3 ? <OrderDetailspg /> : null}
        </div>
      </div>
      <div className="gameTypeSpace"></div>
      <div className="gameType-cont">
        <h2>FAQs</h2>
        <Faqs faqs={faqs_data.Apex} />
      </div>
    </>
  );
}

export function OrderDetailspg() {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.6 }}
    >
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia odio
        nulla dolore. Perspiciatis, sit necessitatibus! Sit molestiae, tempora
        rerum magnam voluptatibus voluptas obcaecati quos laudantium fuga ut
        architecto similique corrupti! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Mollitia odio nulla dolore. Perspiciatis, sit
        necessitatibus! Sit molestiae, tempora rerum magnam voluptatibus
        voluptas obcaecati quos laudantium fuga ut architecto similique
        corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Mollitia odio nulla dolore. Perspiciatis, sit necessitatibus! Sit
        molestiae, tempora rerum magnam voluptatibus voluptas obcaecati quos
        laudantium fuga ut architecto similique corrupti! Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Mollitia odio nulla dolore.
        Perspiciatis, sit necessitatibus! Sit molestiae, tempora rerum magnam
        voluptatibus voluptas obcaecati quos laudantium fuga ut architecto
        similique corrupti! Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Mollitia odio nulla dolore. Perspiciatis, sit necessitatibus! Sit
        molestiae, tempora rerum magnam voluptatibus voluptas obcaecati quos
        laudantium fuga ut architecto similique corrupti!
      </div>
    </motion.div>
  );
}

export default OrderDetails;
