"use client"

import Image from "next/image";
import { PROJECTS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-4 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-4">
            <Badge className="bg-secondary/20 text-secondary border-secondary/30 px-4 py-1">Featured Work</Badge>
            <h2 className="text-4xl md:text-6xl font-bold font-headline">Engineering <span className="text-secondary italic">Excellence</span></h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Showcasing production-grade data pipelines and autonomous AI agents designed for scalability.
            </p>
          </div>
          <Button variant="ghost" className="group text-secondary hover:text-secondary hover:bg-secondary/10 font-bold">
            View All Projects <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <Card key={project.id} className="group overflow-hidden border-border/40 bg-card hover:border-secondary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/5 flex flex-col h-full">
              <div className="relative aspect-video overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-secondary border-secondary/20 font-bold px-3 py-1">
                  {project.category}
                </Badge>
              </div>

              <CardHeader className="p-6">
                <CardTitle className="text-xl font-bold group-hover:text-secondary transition-colors line-clamp-2 min-h-[3.5rem] text-foreground">
                  {project.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="px-6 pb-6 flex-grow">
                <p className="text-foreground/80 leading-relaxed text-sm mb-6 line-clamp-3 font-medium">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20 font-bold">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex gap-4 mt-auto">
                <Button className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold rounded-xl shadow-lg shadow-secondary/10">
                  <ExternalLink className="mr-2 w-4 h-4" /> Live Demo
                </Button>
                <Button variant="outline" size="icon" className="border-border/40 text-foreground hover:bg-muted rounded-xl">
                  <Github className="w-5 h-5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
