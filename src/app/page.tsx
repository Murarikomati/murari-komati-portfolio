import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import SkillMatcher from "@/components/sections/SkillMatcher";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Experience />
      <SkillMatcher />
      <section className="py-32 px-4 text-center bg-gradient-to-b from-transparent to-muted/20">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold font-headline">Ready to Scale Your <span className="text-accent underline decoration-accent/30 underline-offset-8">Data Vision</span>?</h2>
          <p className="text-muted-foreground text-lg">
            I'm currently open to senior data engineering opportunities and 
            collaborations on high-performance cloud architectures.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <button className="h-14 px-10 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
              Get In Touch
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
