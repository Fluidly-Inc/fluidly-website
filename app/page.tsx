import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Shift } from "@/components/sections/Shift";
import { ProcessMonitor } from "@/components/sections/ProcessMonitor";
import { OSLayers } from "@/components/sections/OSLayers";
import { Simulation } from "@/components/sections/Simulation";
import { DecisionTrace } from "@/components/sections/DecisionTrace";
import { Healthcare } from "@/components/sections/Healthcare";
import { FAQ } from "@/components/sections/FAQ";
import { Playground } from "@/components/sections/Playground";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Shift />
        <ProcessMonitor />
        <OSLayers />
        <Simulation />
        <DecisionTrace />
        <Healthcare />
        <FAQ />
        <Playground />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
