import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, useSession } = createAuthClient();

// Export the full client instance
export const authClient = createAuthClient();

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
