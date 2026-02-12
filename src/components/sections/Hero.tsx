import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Github } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-700" />
      
      <div className="relative z-10 max-w-4xl animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 border border-accent/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          Available for new opportunities
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 font-headline leading-tight">
          Architecting Robust <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient">Data Ecosystems</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          I'm a Data Engineer specializing in building scalable ETL pipelines, 
          real-time systems, and high-performance cloud data platforms.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" className="h-12 px-8 rounded-full font-medium">
            View My Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 rounded-full font-medium">
            <FileText className="mr-2 h-4 w-4" /> Download Resume
          </Button>
          <Button size="icon" variant="ghost" className="h-12 w-12 rounded-full">
            <Github className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="mt-20 w-full max-w-5xl px-4 animate-fade-in-up delay-300">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-2xl border bg-card/50 backdrop-blur-sm">
          <div className="text-center">
            <p className="text-3xl font-bold font-headline mb-1">5+</p>
            <p className="text-sm text-muted-foreground">Years Experience</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold font-headline mb-1">50+</p>
            <p className="text-sm text-muted-foreground">Pipelines Built</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold font-headline mb-1">10PB+</p>
            <p className="text-sm text-muted-foreground">Data Managed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold font-headline mb-1">3</p>
            <p className="text-sm text-muted-foreground">Cloud Platforms</p>
          </div>
        </div>
      </div>
    </section>
  );
}