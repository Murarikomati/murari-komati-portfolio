
import { SKILLS } from "@/lib/data";
import { TechPill } from "@/components/ui/TechPill";
import * as Icons from "lucide-react";

const CustomIcons: Record<string, React.ReactNode> = {
  Azure: (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.483 21.3L14.04 4.1h.01a.343.343 0 01.312-.19c.123 0 .235.066.3.176l4.246 7.643-13.425 9.57zM18.91 11.728l3.655 6.58a.333.333 0 010 .324.364.364 0 01-.31.185l-7.53.003 4.185-7.092z" />
    </svg>
  ),
  AWS: (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.132 17.653c-1.393.844-3.155 1.157-5.012 1.157-2.618 0-4.99-.954-6.666-2.583-.244-.241-.09-.59.214-.526 1.764.372 3.864.551 5.316.551 1.636 0 3.83-.205 5.564-.783.333-.11.532.224.28.468-.224.218-.468.442-.696.656zm.864-2.833c-1.744.82-3.83.693-5.83.565-1.923-.122-3.7-.244-5.26-.013-.308.045-.443-.32-.192-.513 1.63-1.256 4.09-1.936 6.32-1.936 2.064 0 4.18.577 5.16 1.5.212.193.122.353-.2.4z" />
    </svg>
  ),
  GCP: (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0L2 5v14l10 5 10-5V5L12 0zm8.5 17.5l-8.5 4.25L3.5 17.5v-11L12 2.25l8.5 4.25v11zM12 11h7v2h-7v2l-4-3 4-3v2z" />
    </svg>
  ),
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 bg-muted/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4 border border-accent/20">
            Expertise
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-headline mb-6">Technical <span className="text-primary">Arsenal</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A specialized stack of modern data engineering tools and cloud architectures 
            powering enterprise intelligence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILLS.map((group, i) => {
            const CustomIcon = CustomIcons[group.icon];
            const IconComponent = (Icons as any)[group.icon] || Icons.Cpu;
            
            return (
              <div 
                key={i} 
                className="group p-8 rounded-[2.5rem] border bg-card/40 backdrop-blur-sm hover:border-primary/50 hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 text-primary">
                    {CustomIcon ? CustomIcon : <IconComponent className="h-6 w-6" />}
                  </div>
                  <h3 className="font-bold font-headline text-xl">{group.category}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <TechPill key={skill} label={skill} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
