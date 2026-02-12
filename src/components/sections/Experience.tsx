import { EXPERIENCE } from "@/lib/data";
import { Briefcase, MapPin } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-headline mb-4">Professional <span className="text-secondary">Experience</span></h2>
          <p className="text-muted-foreground">My professional journey across diverse sectors and tech environments.</p>
        </div>

        <div className="space-y-12">
          {EXPERIENCE.map((exp: any, i) => (
            <div key={i} className="relative pl-8 md:pl-0">
              {/* Vertical line for mobile */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:hidden" />
              
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12">
                <div className="text-sm font-medium text-muted-foreground pt-1">
                  {exp.period}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold font-headline text-xl">{exp.company}</h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-primary font-medium">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5" /> {exp.role}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" /> {exp.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {exp.highlights?.map((highlight: string, j: number) => (
                      <li key={j} className="text-sm text-muted-foreground leading-relaxed relative pl-5 before:content-['•'] before:absolute before:left-0 before:text-primary before:font-bold">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
