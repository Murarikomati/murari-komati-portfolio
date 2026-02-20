
import { SKILLS } from "@/lib/data";
import { TechPill } from "@/components/ui/TechPill";
import * as Icons from "lucide-react";
import Image from "next/image";

const CustomIcons: Record<string, React.ReactNode> = {
  Azure: (
    <div className="relative w-8 h-8">
      <img 
        src="https://img.icons8.com/?size=100&id=VLKafOkk3sBX&format=png&color=000000" 
        alt="Azure"
        className="object-contain w-full h-full filter dark:invert-[0.9]"
      />
    </div>
  ),
  AWS: (
    <div className="relative w-8 h-8">
      <img 
        src="https://img.icons8.com/?size=100&id=33039&format=png&color=000000" 
        alt="AWS"
        className="object-contain w-full h-full filter dark:invert-[0.9]"
      />
    </div>
  ),
  GCP: (
    <div className="relative w-8 h-8">
      <img 
        src="https://img.icons8.com/?size=100&id=20774&format=png&color=000000" 
        alt="GCP"
        className="object-contain w-full h-full"
      />
    </div>
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
