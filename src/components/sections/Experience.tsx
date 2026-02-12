'use client';

import { EXPERIENCE } from "@/lib/data";
import { Briefcase, MapPin, Calendar, ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="py-24 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold font-headline mb-6">The Professional <span className="text-secondary">Journey</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A chronological timeline of building scalable data systems and AI-driven infrastructures.
          </p>
        </div>

        <div className="relative">
          {/* Main vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent hidden md:block" />

          <div className="space-y-24">
            {EXPERIENCE.map((exp: any, i) => (
              <div 
                key={i} 
                className={cn(
                  "relative flex flex-col md:flex-row items-center gap-8 md:gap-16 group transition-all duration-500",
                  i % 2 !== 0 ? "md:flex-row-reverse" : ""
                )}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-4px] md:left-1/2 md:ml-[-8px] w-4 h-4 rounded-full bg-primary border-4 border-background z-10 hidden md:block group-hover:scale-150 transition-transform shadow-[0_0_15px_rgba(var(--primary),0.5)]" />

                {/* Date/Period (Desktop side) */}
                <div className={cn(
                  "hidden md:block w-1/2 text-right",
                  i % 2 !== 0 ? "text-left" : "text-right"
                )}>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/50 border border-border text-sm font-bold text-primary">
                    <Calendar className="h-4 w-4" /> {exp.period}
                  </div>
                </div>

                {/* Content Card */}
                <div className="w-full md:w-1/2">
                  <div className={cn(
                    "relative p-8 rounded-3xl border bg-card/40 backdrop-blur-md transition-all duration-500 hover:shadow-2xl hover:border-primary/30",
                    hoveredIndex === i ? "scale-[1.02] bg-card/60" : "scale-100"
                  )}>
                    <div className="space-y-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary/80">{exp.role}</span>
                        <h3 className="text-2xl font-bold font-headline group-hover:text-primary transition-colors">{exp.company}</h3>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {exp.location}</span>
                        <span className="md:hidden flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {exp.period}</span>
                      </div>

                      {/* Journey Description (Simplified) */}
                      <p className="text-sm text-muted-foreground/80 leading-relaxed italic border-l-2 border-primary/20 pl-4">
                        {i === 0 
                          ? "Scaling enterprise data lakes and leading GenAI implementations for predictive insights." 
                          : "Foundational training in cloud ETL patterns and Azure ecosystem optimization."}
                      </p>

                      {/* Hidden details revealed on hover/expanded */}
                      <div className={cn(
                        "overflow-hidden transition-all duration-500 space-y-3 pt-4",
                        hoveredIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                      )}>
                        {exp.highlights?.map((highlight: string, j: number) => (
                          <div key={j} className="flex gap-3 text-sm leading-relaxed">
                            <ArrowRight className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Mobile Indicator */}
                      <div className="md:hidden mt-4 pt-4 border-t border-border flex justify-between items-center text-xs font-bold uppercase text-primary">
                        <span>Tap to view details</span>
                        <ArrowRight className="h-4 w-4" />
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