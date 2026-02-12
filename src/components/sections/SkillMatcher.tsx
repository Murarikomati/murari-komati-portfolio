"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { matchSkillsToJobDescription, type MatchSkillsToJobDescriptionOutput } from "@/ai/flows/match-skills-to-job-description";
import { useToast } from "@/hooks/use-toast";

export default function SkillMatcher() {
  const [jobDescription, setJobDescription] = useState("");
  const [isMatching, setIsMatching] = useState(false);
  const [result, setResult] = useState<MatchSkillsToJobDescriptionOutput | null>(null);
  const { toast } = useToast();

  const handleMatch = async () => {
    if (!jobDescription.trim()) {
      toast({ title: "Error", description: "Please enter a job description", variant: "destructive" });
      return;
    }

    setIsMatching(true);
    try {
      const output = await matchSkillsToJobDescription({ jobDescription });
      setResult(output);
    } catch (error) {
      toast({ title: "Error", description: "Failed to process matching. Try again.", variant: "destructive" });
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <section id="ai-matcher" className="py-24 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 text-accent font-semibold tracking-wider uppercase text-sm">
              <Sparkles className="h-4 w-4" /> AI Recruitment Assistant
            </div>
            <h2 className="text-4xl font-bold font-headline">Find the Perfect <span className="text-primary">Match</span></h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Recruiters: Paste your job description below, and my AI assistant will instantly highlight my most relevant skills and projects that align with your requirements.
            </p>
            
            <div className="space-y-4">
              <Textarea 
                placeholder="Paste the job description here..." 
                className="min-h-[200px] bg-background border-border rounded-xl resize-none p-4"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <Button 
                onClick={handleMatch} 
                disabled={isMatching}
                className="w-full h-12 rounded-xl text-md font-semibold"
              >
                {isMatching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing Portfolio...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" /> Match Skills & Projects
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="flex-1 w-full">
            {result ? (
              <Card className="border-accent/20 bg-accent/5 overflow-hidden animate-fade-in-up">
                <CardHeader className="bg-accent/10 border-b border-accent/10">
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent" /> Match Result
                  </CardTitle>
                  <CardDescription>Generated specifically for this role</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Key Strengths</h4>
                    <p className="text-sm leading-relaxed">{result.summary}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Highly Relevant Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.matchedSkills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="bg-background border shadow-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Matching Case Studies</h4>
                    <ul className="space-y-2">
                      {result.matchedProjects.map((project, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-accent">•</span> {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-12 text-center space-y-4 min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-muted-foreground opacity-50" />
                </div>
                <p className="text-muted-foreground max-w-[200px]">Results will appear here after analysis</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}