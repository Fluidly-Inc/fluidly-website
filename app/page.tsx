import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Equation } from "@/components/sections/Equation";
import { Pillars } from "@/components/sections/Pillars";
import { OSLayers } from "@/components/sections/OSLayers";
import { DecisionTrace } from "@/components/sections/DecisionTrace";
import { Healthcare } from "@/components/sections/Healthcare";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Equation />
        <Pillars />
        <OSLayers />
        <DecisionTrace />
        <Healthcare />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
