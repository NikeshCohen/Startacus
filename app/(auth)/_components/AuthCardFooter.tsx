import React from "react";

import Link from "next/link";

function AuthCardFooter() {
  return (
    <div className="bg-primary/5 p-4 rounded-lg">
      <p className="text-muted-foreground text-sm text-center">
        By signing in, you agree to our{" "}
        <Link
          href="/tos#terms-of-service"
          className="text-primary hover:underline"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/tos#privacy-policy"
          className="text-primary hover:underline"
        >
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}

export default AuthCardFooter;
