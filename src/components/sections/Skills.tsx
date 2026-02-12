import { SKILLS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import * as Icons from "lucide-react";

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-headline mb-4">Technical <span className="text-accent">Arsenal</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive stack of modern data engineering tools and cloud technologies 
            I use to build enterprise-grade data platforms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((skill, i) => {
            const IconComponent = (Icons as any)[skill.icon] || Icons.Cpu;
            return (
              <div 
                key={i} 
                className="group p-6 rounded-2xl border bg-card hover:border-accent/50 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold font-headline">{skill.name}</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">{skill.category}</p>
                  </div>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[85%] rounded-full group-hover:bg-accent transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}