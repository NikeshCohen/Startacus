import About from "@/components/home/About";
import CallToAction from "@/components/home/Cta";
import FAQ from "@/components/home/Faq";
import FeaturesBento from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import TechCards from "@/components/home/TechCards";

function Page() {
  return (
    <section className="layout">
      <Hero />
      <About />
      <FeaturesBento />
      <TechCards />
      <CallToAction />

      <FAQ />
    </section>
  );
}

export default Page;
