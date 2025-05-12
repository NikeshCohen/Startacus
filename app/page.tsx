import About from "@/components/home/About";
import FAQ from "@/components/home/Faq";
import Hero from "@/components/home/Hero";
import TechCards from "@/components/home/TechCards";

function Page() {
  return (
    <section className="layout">
      <Hero />
      <About />
      <TechCards />
      <FAQ />
    </section>
  );
}

export default Page;
