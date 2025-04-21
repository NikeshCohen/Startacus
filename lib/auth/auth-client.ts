import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, useSession } = createAuthClient();

export const signInGithub = async () => {
  const data = await signIn.social({
    provider: "github",
  });

  return data;
};
