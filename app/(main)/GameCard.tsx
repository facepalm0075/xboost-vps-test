import Link from "next/link";
import Image from "next/image";

type props = {
  h1: string;
  imgSize: number[];
  imgStyle: { transform: string };
  imgSrc: string;
};

function GameCard({ h1, imgSize, imgStyle, imgSrc }: props) {
  return (
    <Link href="">
      <div className="game-card">
        <h3>{h1}</h3>
        <Image
          src={"/link-icon.png"}
          width={60}
          height={60}
          alt="link icon"
          className="game-card-link"
        />
        <Image
          src={`/${imgSrc}`}
          width={imgSize[0]}
          height={imgSize[1]}
          alt={h1}
          className="game-img"
          style={imgStyle}
        />
        <div className="game-highlight1"></div>
        <div className="game-highlight2"></div>
      </div>
    </Link>
  );
}

export default GameCard;
