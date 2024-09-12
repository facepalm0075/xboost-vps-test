import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type prop = {
  number: number;
};

function Page1({ number }: prop) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.6 }}
    >
      <div className="work-page">
        <Image
          src="/WorkBG.png"
          width={500}
          height={500}
          alt="work-bg-img"
          className="bg-t"
        />
        <div className="w-p-c">
          <div className="work-page-d1">
            <div>
              <h4>Choose Your Desired Service</h4>
              <p>
                You can customize your experience to the way you see
                fit.Personalization ranges from watching your account through a
                stream or quick delivery of your boosting service (and more!).
                <br />
              </p>
              <span>
                <ul>
                  <li>Free additional customizations.</li>
                  <li>Solid and secure payment gateways.</li>
                </ul>
              </span>
            </div>
          </div>
          <div className="work-page-d2">
            <Image
              src="/SelectOrder.png"
              width={550}
              height={550}
              alt="select order image"
              className="w-p-i"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Page1;
