"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { oneTap } from "@/lib/auth/auth-client";

function GoogleOneTap() {
  const router = useRouter();

  useEffect(() => {
    oneTap({
      fetchOptions: {
        headers: {
          "Referrer-Policy": "no-referrer-when-downgrade",
        },
        onError: ({ error }) => {
          toast.error(error.message || "An error occurred");
        },
        onSuccess: () => {
          toast.success("Successfully signed in");
          router.push("/");
        },
      },
      onPromptNotification: (notification) => {
        console.warn(
          "Prompt was dismissed or skipped. Consider displaying an alternative sign-in option.",
          notification,
        );
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default GoogleOneTap;
