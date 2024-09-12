import "./styles.css";
import BgFix from "./BgFix";
import Image from "next/image";
import { BoostingPage } from "./svgs";
import Link from "next/link";
import Benefits from "@/app/components/Benefits";
import "@/app/components/benefits.css";
import Faqs from "@/app/components/faqs/Faqs";
import "@/app/components/faqs/styles.css";
import faqs_data from "@/public/faqs_data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuttleSpace } from "@fortawesome/free-solid-svg-icons";
import { titleCase } from "@/app/components/TitleCase";
import prisma from "@/src/lib/db";

type props = {
  params: { gameId: string };
};
async function page({ params }: props) {
  const gameId = params.gameId.replaceAll("-", " ");
  const dbitems = await prisma.boostingOrders.findMany({
    where: {
      orderedIn: {
        game: {
          name: gameId,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
    include: {
      orderedIn: {
        select: {
          bgSrc: true,
        },
      },
    },
  });
  return (
    <>
      <BgFix src={dbitems[0]?.orderedIn?.bgSrc} />
      <div className="container">
        <div className="mt-24">
          <h2 className="text-left">Choose {gameId} Boosting Service</h2>
          <p>select one of our many boosting services you need</p>
        </div>
        <div>
          {dbitems.map((item, key) => {
            return (
              <div key={key} className="item-con mt-10">
                <Link href="./boosting/rank-boost">
                  <div className="item-content">
                    <Image
                      src="/bg-ai.png"
                      width={300}
                      height={300}
                      alt="card-bg"
                      className="cont-img1"
                    />
                    <Image
                      src="/AncientRank.png"
                      width={150}
                      height={150}
                      alt="item-image"
                      className="cont-img2"
                    />
                    <h3>{titleCase(item.name)}</h3>
                    <p className="order-card-p">{item.details}</p>
                  </div>
                </Link>
              </div>
            );
          })}
          <div className="clear-both"></div>
        </div>
        <Benefits />

        <div style={{ marginTop: "180px" }}>
          <h2>
            FAQs About <span>{gameId} Boosting</span>
          </h2>
          <div className="mt-10 w-1/2 m-auto">
            <Faqs faqs={faqs_data.Apex} />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
