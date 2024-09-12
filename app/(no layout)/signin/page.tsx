import "./styles.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import EmailLogin from "./EmailLogin";
import OauthBtns from "./OauthBtns";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type props = {
  searchParams: any;
};

type aem =
  | "Signin"
  | "OAuthSignin"
  | "OAuthCallback"
  | "OAuthCreateAccount"
  | "EmailCreateAccount"
  | "Callback"
  | "OAuthAccountNotLinked"
  | "EmailSignin"
  | "CredentialsSignin"
  | "SessionRequired";

const authErrorMessages = {
  Signin: "try signing in with a different account.(code: 100)",
  OAuthSignin: "try signing in with a different account.(code: 101)",
  OAuthCallback: "try signing in with a different account.(code: 102)",
  OAuthCreateAccount: "try signing in with a different account.(code: 103)",
  EmailCreateAccount: "try signing in with a different account.(code: 104)",
  Callback: "try signing in with a different account.(code: 105)",
  OAuthAccountNotLinked:
    "to confrim your identity, sign in with the same account you used originaly.(code: 106)",
  EmailSignin: "check your email inbox.(code: 107)",
  CredentialsSignin:
    "sign in faild, check the details you provided are correct.(code: 108)",
  SessionRequired: "please sign in to access this page.",
  defualt: "unable to sign in.",
};

const getAuthErrorMessage = (error: aem) => {
  if (!error) return;
  return authErrorMessages[error]
    ? authErrorMessages[error]
    : authErrorMessages.defualt;
};

async function SignInPage({ searchParams }: props) {
  const { callbackUrl = "/", error } = searchParams;
  const backClickHandler = ()=>{
    redirect(callbackUrl)
  }
  const authError = getAuthErrorMessage(error);
  return (
    <>
      <Image
        alt="Login Background"
        className="login-bg"
        src="/loginBg.jpg"
        width={1980}
        height={1080}
      />
      <div id="login">
        <div className="login-card">
          <Link href={callbackUrl}>
            <div className="close-login">
              <FontAwesomeIcon icon={faArrowLeftLong} className="t-icon" />
            </div>
          </Link>
          <div className="flex">
            <div style={{ width: "407px" }} className="login-clm-i">
              <Image
                src="/loginImage.png"
                width={407}
                height={450}
                alt="login-bg"
              />
            </div>
            <div style={{ width: "444px" }} className="px-10 py-5">
              <div className={`${!authError && "mt-4"}`}>
                <h4>Login</h4>
                <span className="">
                  To login or register, just enter your email address.
                </span>
                {authError && (
                  <div className="login-error">
                    <span>{authError}</span>
                  </div>
                )}
                <div className={`${authError ? "mt-3" : "mt-8 mb-5"}`}>
                  <EmailLogin callbackUrl={callbackUrl} />
                </div>
                <div className="flex continue-with">
                  <hr />
                  <span>Or Continue with</span>
                  <hr />
                </div>
                <OauthBtns callbackUrl={callbackUrl} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
