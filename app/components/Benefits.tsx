import { BoostingIcon} from "./svgs";

function Benefits() {
  return (
    <div style={{ marginTop: "150px" }}>
        <h2>
          Benefits of choosing <span>xBoost</span>
        </h2>
        <p className="h2-p text-center">
          Here are some of the benefits to choosing xboost over our
          counterparts.
        </p>
        <div className="benef-main">
          <div className="benef-row">
            <div style={{ width: "40%" }} className="benef-item">
              <BoostingIcon />
              <h3>Affordable Prices</h3>
              <p>
                We provide competitive pricing made possible by our vast roster
                of players and high demand of customers.
              </p>
            </div>
            <div className="benef-dot"></div>
            <div style={{ width: "60%" }} className="benef-item">
              <BoostingIcon />
              <h3>Utilizing Efficient & Legit Players</h3>
              <p>
                One of the main concerns of boosting customers is the legitimacy
                of the players playing on thier accounts. xBoost closely
                monitors the boosting roster provided to our customers, ensuring
                a stress-free experience for everybody.
              </p>
            </div>
          </div>
          <div className="benef-row-hori"></div>
          <div className="benef-row">
            <div style={{ width: "60%" }} className="benef-item">
              <BoostingIcon />
              <h3>Safe & Secure Payment Gateway</h3>
              <p>
                You don’t need to worry about paying through non-trusted payment
                gateways and going through shady websites. We believe in a happy
                & smooth reciprocal transaction with our customers.
              </p>
            </div>
            <div className="benef-dot"></div>
            <div style={{ width: "40%" }} className="benef-item">
              <BoostingIcon />
              <h3>24/7 Support</h3>
              <p>
                We offer round-the-clock support for our customers, answering
                questions and solving problems that may occur; Selecting the
                appropriate service, payment process and more...
              </p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Benefits