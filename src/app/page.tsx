import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import SkillMatcher from "@/components/sections/SkillMatcher";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <SkillMatcher />
      <section className="py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold font-headline">Ready to build something <span className="text-accent">legendary</span>?</h2>
          <p className="text-muted-foreground text-lg">
            I'm always open to discussing new data engineering challenges, 
            technical architecture, or high-performance systems.
          </p>
          <div className="flex justify-center gap-4">
            <button className="h-14 px-10 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all">
              Hire Me Now
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}