import React from "react";

function page() {
  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <h3 className="text-lg">Startacus</h3>

      <h1 className="text-center text-3xl font-bold">
        The
        <span className="text-primary relative mx-1 inline-block stroke-current text-4xl font-extrabold uppercase">
          fastest
          <svg
            className="absolute -bottom-0.5 max-h-1.5 w-full"
            viewBox="0 0 55 5"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0.652466 4.00002C15.8925 2.66668 48.0351 0.400018 54.6853 2.00002"
              stroke-width="2"
            ></path>
          </svg>
        </span>
        way to <br className="hidden md:block" /> get your startup battle ready
      </h1>
    </section>
  );
}

export default page;
