import About from "@/components/home/About";
import Hero from "@/components/home/Hero";
import TechCards from "@/components/home/TechCards";

function Page() {
  return (
    <section className="layout">
      <Hero />
      <About />
      <TechCards />
    </section>
  );
}

export default Page;
