import React from "react";

import GoogleOneTap from "./_components/GoogleOneTap";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleOneTap />
      {children}
    </>
  );
}

export default layout;
