'use client';

import { EXPERIENCE } from "@/lib/data";
import { MapPin, Calendar, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="py-24 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold font-headline mb-6">Professional <span className="text-secondary">Journey</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            A chronological narrative of building enterprise data backbones and AI infrastructures.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent md:translate-x-[-0.5px]" />

          <div className="space-y-20">
            {EXPERIENCE.map((exp, i) => (
              <div 
                key={i} 
                className={cn(
                  "relative flex flex-col md:flex-row items-start gap-8 md:gap-16 group",
                  i % 2 !== 0 ? "md:flex-row-reverse" : ""
                )}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-background border-2 border-primary z-10 translate-x-[-6px] md:translate-x-[-6px] group-hover:scale-150 transition-transform group-hover:bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]" />

                <div className={cn(
                  "hidden md:block w-1/2",
                  i % 2 !== 0 ? "text-left pl-8" : "text-right pr-8"
                )}>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-primary bg-primary/5 px-4 py-1.5 rounded-full border border-primary/20">
                    <Calendar className="h-4 w-4" /> {exp.period}
                  </span>
                </div>

                <div className="w-full md:w-1/2 pl-12 md:pl-0">
                  <div className={cn(
                    "p-8 rounded-[2rem] border bg-card/50 backdrop-blur-md transition-all duration-500 cursor-default",
                    hoveredIndex === i ? "border-primary shadow-2xl shadow-primary/10 translate-y-[-4px]" : "border-border/50"
                  )}>
                    <div className="space-y-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/80">{exp.role}</span>
                        <h3 className="text-2xl font-bold font-headline">{exp.company}</h3>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {exp.location}</span>
                        <span className="md:hidden flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {exp.period}</span>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {exp.summary}
                      </p>

                      <div className={cn(
                        "overflow-hidden transition-all duration-700 ease-in-out",
                        hoveredIndex === i ? "max-h-[600px] opacity-100 mt-6 pt-6 border-t border-border" : "max-h-0 opacity-0"
                      )}>
                        <div className="space-y-4">
                          {exp.highlights?.map((highlight, j) => (
                            <div key={j} className="flex gap-3 text-xs leading-relaxed text-foreground/90">
                              <ChevronRight className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {hoveredIndex !== i && (
                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary/50 animate-pulse pt-2">
                          + Hover to reveal impact details
                        </p>
                      )}
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
