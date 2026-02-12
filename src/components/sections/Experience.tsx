"use client"

import { EXPERIENCE } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-1 mb-2">Career Journey</Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-headline">Professional <span className="text-primary italic">Trajectory</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Architecting scalable data foundations and AI systems for high-performance enterprises.
          </p>
        </div>

        <div className="relative space-y-16 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {EXPERIENCE.map((exp, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              {/* Dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card text-primary shadow-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -translate-x-1/2 z-10 transition-transform group-hover:scale-125 duration-300">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl border border-border/50 bg-card hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{exp.role}</h3>
                    <div className="text-primary font-bold">{exp.company}</div>
                  </div>
                  <Badge variant="outline" className="w-fit border-primary/30 text-primary bg-primary/5 font-bold">
                    {exp.period}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1.5 font-medium text-foreground/80">
                    <Calendar className="w-4 h-4 text-primary" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-foreground/80">
                    <MapPin className="w-4 h-4 text-primary" />
                    {exp.location}
                  </span>
                </div>

                <p className="text-foreground/90 leading-relaxed mb-6 font-medium text-base">
                  {exp.summary}
                </p>

                <ul className="space-y-3">
                  {exp.highlights.map((highlight, hIndex) => (
                    <li key={hIndex} className="flex items-start gap-3 text-sm text-foreground/80 bg-muted/30 p-3 rounded-xl border border-border/20">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="font-medium">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
