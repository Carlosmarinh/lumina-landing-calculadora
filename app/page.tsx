import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BudgetCalculator } from "@/components/BudgetCalculator";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-emerald-500/20 selection:text-emerald-700">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div id="tratamentos" className="scroll-mt-16">
          <BudgetCalculator />
        </div>
        <Features />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
