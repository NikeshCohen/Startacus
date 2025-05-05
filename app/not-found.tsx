import React from "react";

import Image from "next/image";

function page() {
  return (
    <section className="layout flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-primary scroll-m-20 text-3xl font-semibold tracking-tight">
        404 | Not Found
      </h2>
      <p className="text-muted-foreground mb-8 text-center text-sm font-light">
        Mmmm, we could not find what you are looking for
      </p>

      <Image
        src="/404.gif"
        alt="404"
        width={404}
        height={404}
        className="rounded-md"
        unoptimized
      />
    </section>
  );
}

export default page;
