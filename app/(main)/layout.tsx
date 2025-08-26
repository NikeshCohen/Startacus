import React from "react";

import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default layout;
