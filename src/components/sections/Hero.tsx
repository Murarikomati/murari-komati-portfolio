import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Github, Linkedin, Code } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/15 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-[120px] animate-pulse delay-700" />
      
      <div className="relative z-10 max-w-5xl animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-8 border border-accent/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          Murari Komati | AI/ML & Data Engineer
        </div>
        
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 font-headline leading-[1.1]">
          Architecting Scalable <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient">AI & Data Systems</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Specializing in building production-grade <span className="text-foreground font-medium">Data Platforms</span>, Databricks ML systems, and <span className="text-foreground font-medium">Agentic AI</span> workflows.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" className="h-14 px-10 rounded-full font-bold text-md shadow-lg shadow-primary/20" asChild>
            <a href="#projects">View My Impact <ArrowRight className="ml-2 h-5 w-5" /></a>
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-10 rounded-full font-bold text-md bg-background/50 backdrop-blur-sm">
            <FileText className="mr-2 h-5 w-5" /> Download Resume
          </Button>
          <div className="flex gap-2 ml-2">
            <Button size="icon" variant="ghost" className="h-12 w-12 rounded-full border" asChild>
              <a href="https://github.com/Murarikomati" target="_blank" rel="noopener noreferrer"><Github className="h-6 w-6" /></a>
            </Button>
            <Button size="icon" variant="ghost" className="h-12 w-12 rounded-full border" asChild>
              <a href="https://linkedin.com/in/komati-murari" target="_blank" rel="noopener noreferrer"><Linkedin className="h-6 w-6" /></a>
            </Button>
            <Button size="icon" variant="ghost" className="h-12 w-12 rounded-full border" asChild>
              <a href="https://leetcode.com/u/komatimurari50/" target="_blank" rel="noopener noreferrer"><Code className="h-6 w-6" /></a>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-24 w-full max-w-5xl px-4 animate-fade-in-up delay-300">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-10 rounded-3xl border bg-card/40 backdrop-blur-md shadow-2xl">
          <div className="text-center">
            <p className="text-4xl font-bold font-headline mb-2 text-primary">90%</p>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Manual Effort Reduced</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold font-headline mb-2 text-accent">4x</p>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Faster Turnaround</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold font-headline mb-2 text-secondary">500K+</p>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Daily Data Records</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold font-headline mb-2 text-primary">MLOps</p>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Unity Catalog Expert</p>
          </div>
        </div>
      </div>
    </section>
  );
}
