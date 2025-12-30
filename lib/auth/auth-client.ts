import {
  adminClient,
  magicLinkClient,
  oneTapClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [
    adminClient(),
    oneTapClient({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      autoSelect: false,
      cancelOnTapOutside: true,
      context: "signin",
      promptOptions: {
        baseDelay: 1000,
        maxAttempts: 5,
      },
    }),
    magicLinkClient(),
  ],
});

export const { signIn, signUp, oneTap, useSession } = authClient;

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
