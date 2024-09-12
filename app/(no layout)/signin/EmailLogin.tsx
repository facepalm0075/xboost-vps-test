"use client";

import { FormEvent, useState } from "react";
import { EmailFormLoginData } from "@/lib/schema";
import { signIn } from "next-auth/react";

type props = {
  callbackUrl: string;
};

function EmailLogin({ callbackUrl }: props) {
  const [validationError, setValidationError] = useState<string | null>(null);

  const clickHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidationError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const { email } = Object.fromEntries(formData);

    const { error: zodError } = EmailFormLoginData.safeParse({ email });
    if (zodError) {
      setValidationError("error");
      return;
    }

    signIn("email", { email, callbackUrl });
  };

  return (
    <form noValidate onSubmit={clickHandler}>
      <input
        placeholder="Email"
        type="email"
        id="email"
        name="email"
        autoComplete="email"
        style={validationError ? { border: "1px solid red" } : {}}
      />
      <br />
      {validationError && (
        <span className="login-valid-error">Invalid Email Address!</span>
      )}
      <button type="submit">Get Login Link</button>
    </form>
  );
}

export default EmailLogin;
