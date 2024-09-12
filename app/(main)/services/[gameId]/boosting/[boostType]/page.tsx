import { titleCase } from "@/app/components/TitleCase";
import "./styles.css";
import DesiredRank from "./DesiredRank";
import { OptionToggle } from "./OptionToggle";
import StoreProvider from "@/app/redux/Provider";
import DesiredWins from "./DesiredWins";
import selectRankData from "@/public/orders_data.json";
import DesiredWinsUnranked from "./DesiredWinsUnranked";
import OptionDropdown from "./OptionDropdown";
import prisma from "@/src/lib/db";
import {
  boostingOrderJson,
  extraOptionsType,
  options2Type,
} from "@/app/components/types/Types";
import Checkout from "./Checkout";
import OrderDetails from "./OrderDetails";
import SelectRange from "./SelectRange";
import DesiredLVLRange from "./DesiredLVLRange";

type props = {
  params: { gameId: string; boostType: string };
};

export type dbRes = {
  id: number;
  orderedInId: string | null;
  img: string;
  name: string;
  details: string;
  pageImg: string;
  Data: boostingOrderJson;
  extraOptions: extraOptionsType;
  extraOptions2: options2Type;
};

async function page({ params }: props) {
  // const games = await prisma.boostingOrders.create({
  //   data: {
  //     name:"unrank-wins",
  //     orderedInId:"28920728-bf2a-4b77-b970-92b039843de5",
  //     Data:{"max-wins":20},
  //     details:"Challenger player will Boost you to your desired unrank wins.",
  //     extraOptions:data["extra-options"],
  //     extraOptions2:data2,
  //     img:"",
  //     pageImg:"",
  //   },
  // });
  // console.log(games);
  const gameId = params.gameId.replaceAll("-", " ");
  const boostType = params.boostType.replaceAll("-", " ");
  const dbitems = await prisma.boostingOrders.findFirst({
    where: {
      orderedIn: {
        game: {
          name: gameId,
        },
      },
      name: boostType,
    },
  });

  if (!dbitems) {
    return (
      <>
        <div>bakhtim</div>
      </>
    );
  }
  const res: dbRes = dbitems! as unknown as dbRes;

  return (
    <>
      <StoreProvider>
        <div className="gameType-main flex">
          <div className="mt-7 mr-3 pr-4 w-3/4">
            {res.name === "rank boost" ? (
              <>
                <DesiredRank gameN={gameId} data={res.Data.ranksData} />
                <div className="gameTypeSpace"></div>
              </>
            ) : (
              ""
            )}
            {res.name === "rank wins" ? (
              <>
                <DesiredWins
                  gameN={gameId}
                  data={res.Data.ranksData}
                  maxWins={res.Data.maxWins}
                />
                <div className="gameTypeSpace"></div>
              </>
            ) : (
              ""
            )}
            {res.name === "unrated matches" ? (
              <>
                <DesiredWinsUnranked
                  gameN={gameId}
                  maxWins={res.Data.unrankMaxWins.wins}
                />
                <div className="gameTypeSpace"></div>
              </>
            ) : (
              ""
            )}
            {res.name === "level boost" ? (
              <>
                <DesiredLVLRange
                  gameN={gameId}
                  dis={res.Data.lvlRange.dis}
                  maxNum={res.Data.lvlRange.maxNum}
                />
                <div className="gameTypeSpace"></div>
              </>
            ) : (
              ""
            )}

            <div className="gameType-cont">
              <h2>Extra Options</h2>
              <div className="">
                <div className="">
                  <div className="gameType-base eomain">
                    <OptionDropdown gameN={gameId} data={res.extraOptions2} />
                  </div>
                </div>
                <div className="mt-4">
                  <OptionToggle game={gameId} data={res.extraOptions} />
                </div>
              </div>
            </div>
            <div className="gameTypeSpace"></div>
          </div>
          <div style={{ width: "30%" }} className="mt-7 relative">
            <Checkout gameN={gameId} boostType={boostType} dbData={res} />
          </div>
        </div>
      </StoreProvider>
      <div className="flex">
        <div className="mr-3 pr-4 w-3/4">
          <OrderDetails />
        </div>
        <div style={{ width: "30%" }}></div>
      </div>
    </>
  );
}

export default page;
