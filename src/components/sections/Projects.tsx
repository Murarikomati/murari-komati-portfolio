"use client"

import { useState } from "react";
import { PROJECTS } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(PROJECTS.map(p => p.category)))];

  const filteredProjects = filter === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 px-4 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="text-4xl font-bold font-headline mb-4">Featured <span className="text-primary">Impact</span></h2>
            <p className="text-muted-foreground max-w-xl">
              Production-ready solutions ranging from SQL-integrated LLMs to real-time 
              infrastructure optimization.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                onClick={() => setFilter(cat)}
                className="rounded-full h-10 px-6"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group border-border/50 overflow-hidden hover:border-primary/50 transition-all flex flex-col bg-card/50 backdrop-blur-sm">
              <div className="relative aspect-video overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  data-ai-hint={project.category}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-4 left-4 z-10">
                  <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">{project.category}</Badge>
                </div>
              </div>
              <CardHeader className="relative">
                <CardTitle className="font-headline text-2xl font-bold">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground text-base leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Badge key={t} className="text-[10px] font-bold tracking-tight bg-primary/20 text-primary border border-primary/30 py-1 px-3">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-4 flex gap-3">
                <Button size="sm" variant="ghost" className="flex-1 rounded-lg hover:bg-primary/10 transition-colors">
                  <Github className="mr-2 h-4 w-4" /> Code
                </Button>
                <Button size="sm" className="flex-1 rounded-lg shadow-lg shadow-primary/20">
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