"use client";
import { signIn } from "next-auth/react";
import { DiscordSVG, GoogleSVG, TwitchSVG } from "./svgs";

type props = {
  callbackUrl: string;
};
function OauthBtns({ callbackUrl }: props) {
  return (
    <div className="oAuth-container flex justify-center mt-4">
      <span onClick={() => signIn("google", { callbackUrl })}>
        <GoogleSVG />
      </span>
      <span>
        <DiscordSVG />
      </span>
      <span>
        <TwitchSVG />
      </span>
    </div>
  );
}

export default OauthBtns;
