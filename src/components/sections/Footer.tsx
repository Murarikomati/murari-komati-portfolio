import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="py-16 px-4 border-t bg-card">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white font-headline text-sm">EH</div>
            <span className="font-bold text-lg font-headline tracking-tight">EngineerHub Portfolio</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs">
            Designing and implementing high-availability data infrastructure for modern businesses.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-bold font-headline text-sm uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#skills" className="hover:text-primary transition-colors">Skills</a></li>
              <li><a href="#projects" className="hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#experience" className="hover:text-primary transition-colors">Experience</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold font-headline text-sm uppercase tracking-widest">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Resume</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold font-headline text-sm uppercase tracking-widest">Stay Connected</h4>
          <div className="flex gap-2">
            <Button size="icon" variant="outline" className="rounded-full"><Linkedin className="h-4 w-4" /></Button>
            <Button size="icon" variant="outline" className="rounded-full"><Github className="h-4 w-4" /></Button>
            <Button size="icon" variant="outline" className="rounded-full"><Twitter className="h-4 w-4" /></Button>
            <Button size="icon" variant="outline" className="rounded-full"><Mail className="h-4 w-4" /></Button>
          </div>
          <p className="text-xs text-muted-foreground">© 2024 EngineerHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}