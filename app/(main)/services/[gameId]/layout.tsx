import NavBar from "@/app/(main)/NavBar";
import GameNavbar from "./GameNavbar";
import "./styles.css";
import Script from "next/script";
import prisma from "@/src/lib/db";
import React from "react";
type props = {
  params: { gameId: string };
  children: React.ReactNode;
};

export default async function Layout({ children, params }: props) {
  const dbitems = await prisma.games.findMany({
    select: {
      name: true,
    },
    orderBy: {
      id: "desc",
    },
  });
  return (
    <>
      <GameNavbar allGames={dbitems.map((i) => i.name)} params={params} />
      {children}
    </>
  );
}
