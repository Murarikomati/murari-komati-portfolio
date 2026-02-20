'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import * as React from 'react';

const MkLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "AI Matcher", href: "#ai-matcher" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-8",
      isScrolled ? "py-4 bg-background/80 backdrop-blur-md border-b" : "py-6 bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2 text-foreground">
          <MkLogo className="h-10 w-10" />
          <span className="font-bold text-xl font-headline tracking-tight hidden sm:block">Murari Komati</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden sm:flex rounded-full px-6"><Link href="#contact">Let's Connect</Link></Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background border-b md:hidden animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-lg font-medium py-2 px-4 hover:bg-muted rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild className="w-full rounded-full py-6 mt-2"><Link href="#contact">Let's Connect</Link></Button>
          </div>
        </div>
      )}
    </nav>
  );
}
