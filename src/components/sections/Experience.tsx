'use client';

import { EXPERIENCE } from "@/lib/data";
import { MapPin, Calendar, ChevronRight, Briefcase, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="py-24 px-4 overflow-hidden bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/20">
            <Briefcase className="h-3 w-3" /> Career Path
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-headline mb-6">Professional <span className="text-primary">Journey</span></h2>
          <p className="text-foreground/80 max-w-2xl mx-auto text-lg leading-relaxed">
            A chronological narrative of building enterprise data backbones and autonomous AI systems.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent md:translate-x-[-0.5px] opacity-40" />

          <div className="space-y-16">
            {EXPERIENCE.map((exp, i) => (
              <div 
                key={i} 
                className={cn(
                  "relative flex flex-col md:flex-row items-start gap-8 md:gap-16 group transition-all duration-500",
                  i % 2 !== 0 ? "md:flex-row-reverse" : ""
                )}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-10 translate-x-[-7.5px] group-hover:scale-125 transition-all duration-300 group-hover:bg-primary" />

                <div className={cn(
                  "hidden md:block w-1/2",
                  i % 2 !== 0 ? "text-left pl-12" : "text-right pr-12"
                )}>
                  <div className="sticky top-24">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/30">
                      <Calendar className="h-4 w-4" /> {exp.period}
                    </span>
                    <p className="mt-4 text-xs font-bold uppercase tracking-widest text-foreground/70">{exp.location}</p>
                  </div>
                </div>

                <div className="w-full md:w-1/2 pl-12 md:pl-0">
                  <div className={cn(
                    "p-8 rounded-[2.5rem] border bg-card shadow-xl transition-all duration-500 cursor-pointer relative overflow-hidden",
                    hoveredIndex === i ? "border-primary/50 -translate-y-2" : "border-border/60"
                  )}>
                    <div className="relative z-10 space-y-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{exp.role}</span>
                        <h3 className="text-2xl md:text-3xl font-bold font-headline">{exp.company}</h3>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/70">
                        <span className="flex items-center gap-1.5 md:hidden font-medium text-primary"><Calendar className="h-4 w-4" /> {exp.period}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {exp.location}</span>
                      </div>

                      <p className="text-base text-foreground/90 leading-relaxed font-medium">
                        {exp.summary}
                      </p>

                      <div className={cn(
                        "grid transition-all duration-500 ease-in-out",
                        hoveredIndex === i ? "grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-primary/20" : "grid-rows-[0fr] opacity-0"
                      )}>
                        <div className="overflow-hidden space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                            <Sparkles className="h-3 w-3" /> Core Contributions
                          </h4>
                          <div className="space-y-4">
                            {exp.highlights?.map((highlight, j) => (
                              <div key={j} className="flex gap-3 text-sm leading-relaxed text-foreground/90 group/item">
                                <ChevronRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover/item:translate-x-1" />
                                <span className="font-medium">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
