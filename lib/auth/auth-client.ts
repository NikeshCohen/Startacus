import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [adminClient()],
});

export const { signIn, signUp, useSession } = authClient;

export const signInGithub = async (callbackURL: string) => {
  const response = await signIn.social({
    provider: "github",
    callbackURL,
  });

  return response;
};

export const signInGoogle = async (callbackURL: string) => {
  const response = await signIn.social({
    provider: "google",
    callbackURL,
  });

  return response;
};
