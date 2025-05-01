import React from "react";

import Image from "next/image";

function page() {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen layout">
      <h2 className="font-semibold text-primary text-3xl tracking-tight scroll-m-20">
        404 | Not Found
      </h2>
      <p className="mb-8 font-light text-muted-foreground text-sm text-center">
        Mmmm, we could not find what you are looking for
      </p>

      <Image
        src="/404.gif"
        alt="404"
        width={404}
        height={404}
        className="rounded-md"
      />
    </section>
  );
}

export default page;
