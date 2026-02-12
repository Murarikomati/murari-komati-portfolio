import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="py-16 px-4 border-t bg-card">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white font-headline text-sm">MK</div>
            <span className="font-bold text-lg font-headline tracking-tight">Murari Komati</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
            Data Engineer • AI/ML Specialist • Cloud Architect
            Dedicated to building high-performance data infrastructure.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-bold font-headline text-sm uppercase tracking-widest text-primary">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#skills" className="hover:text-primary transition-colors">Skills</a></li>
              <li><a href="#projects" className="hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#experience" className="hover:text-primary transition-colors">Experience</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold font-headline text-sm uppercase tracking-widest text-primary">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href={CONTACT_INFO.leetcode} target="_blank" className="hover:text-primary transition-colors flex items-center gap-1">LeetCode <ExternalLink className="h-3 w-3" /></a></li>
              <li><a href={CONTACT_INFO.github} target="_blank" className="hover:text-primary transition-colors flex items-center gap-1">GitHub <ExternalLink className="h-3 w-3" /></a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Resume</a></li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold font-headline text-sm uppercase tracking-widest text-primary">Let's Connect</h4>
          <div className="flex flex-col gap-3">
            <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors">
              <Mail className="h-4 w-4" /> {CONTACT_INFO.email}
            </a>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="rounded-full h-10 w-10 hover:border-primary hover:text-primary" asChild>
                <a href={CONTACT_INFO.linkedin} target="_blank"><Linkedin className="h-4 w-4" /></a>
              </Button>
              <Button size="icon" variant="outline" className="rounded-full h-10 w-10 hover:border-primary hover:text-primary" asChild>
                <a href={CONTACT_INFO.github} target="_blank"><Github className="h-4 w-4" /></a>
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-4">© 2024 Murari Komati. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
