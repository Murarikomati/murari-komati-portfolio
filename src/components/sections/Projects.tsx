"use client"

import { useState } from "react";
import { PROJECTS } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { TechPill } from "@/components/ui/TechPill";

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(PROJECTS.map(p => p.category)))];

  const filteredProjects = filter === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 px-4 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/20">
              Portfolio
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-white">Featured <span className="text-primary">Impact</span></h2>
            <p className="text-zinc-400 max-w-xl text-lg">
              Production-ready solutions ranging from SQL-integrated LLMs to autonomous 
              multi-agent systems.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                onClick={() => setFilter(cat)}
                className="rounded-full h-10 px-6 font-bold transition-all"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group border-zinc-800 overflow-hidden hover:border-primary/60 transition-all flex flex-col bg-zinc-900/40 backdrop-blur-sm shadow-2xl rounded-[2.5rem]">
              <div className="relative aspect-video overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  data-ai-hint={project.category}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 z-10">
                  <TechPill label={project.category} className="bg-primary text-white border-none shadow-lg px-4 py-1.5" />
                </div>
              </div>
              <CardHeader className="relative pb-2">
                <CardTitle className="font-headline text-2xl font-bold text-white leading-tight">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-medium">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <TechPill key={t} label={t} />
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-4 flex gap-3 pb-8 px-6">
                <Button size="sm" variant="outline" className="flex-1 rounded-full border-zinc-800 hover:bg-zinc-800 text-white font-bold h-12 text-xs" asChild>
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> Code
                  </a>
                </Button>
                <Button size="sm" className="flex-1 rounded-full shadow-xl shadow-primary/30 bg-primary text-white font-bold h-12 text-xs transition-all hover:scale-[1.02]">
                  <ExternalLink className="mr-2 h-4 w-4" /> Case Study
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
