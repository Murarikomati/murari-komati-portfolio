"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { matchSkillsToJobDescription, MatchSkillsToJobDescriptionOutput } from "@/ai/flows/match-skills-to-job-description";
import { Search, Loader2, CheckCircle2, Link as LinkIcon, Briefcase, Award } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function SkillMatcher() {
  const [jobDescription, setJobDescription] = useState("");
  const [isMatching, setIsMatching] = useState(false);
  const [result, setResult] = useState<MatchSkillsToJobDescriptionOutput | null>(null);

  const handleMatch = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Empty Input",
        description: "Please paste a job description to start the scan.",
        variant: "destructive"
      });
      return;
    }

    setIsMatching(true);
    setResult(null);

    try {
      const data = await matchSkillsToJobDescription({ jobDescription });
      setResult(data);
      toast({
        title: "Scan Complete",
        description: "Recruiter Cheat Sheet generated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Analysis Failed",
        description: error.message || "Something went wrong during the AI scan.",
        variant: "destructive"
      });
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <section id="ai-matcher" className="py-24 px-4 bg-muted/30 border-y border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-accent/20 text-accent border-accent/30 px-4 py-1 mb-2">Deep Scan AI</Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-foreground">Recruiter <span className="text-accent italic">Deep Scan</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Paste a Job Description below to instantly see how my engineering profile aligns with your requirements.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Card className="border-border/40 bg-card shadow-2xl overflow-hidden h-full">
            <CardHeader className="bg-muted/50 pb-6 border-b border-border/40">
              <CardTitle className="text-foreground">Job Description Input</CardTitle>
              <CardDescription className="text-muted-foreground/80">Input the JD for context-aware alignment mapping.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <Textarea 
                placeholder="Paste the full job description here..."
                className="min-h-[400px] bg-background border-border/40 focus:ring-accent text-foreground text-base leading-relaxed"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                suppressHydrationWarning
              />
              <Button 
                className="w-full h-14 text-lg font-bold bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl transition-all shadow-lg shadow-accent/20"
                onClick={handleMatch}
                disabled={isMatching}
              >
                {isMatching ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing Alignment...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Generate Recruiter Cheat Sheet
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-8 min-h-[400px]">
            {!result && !isMatching && (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-border/30 rounded-3xl opacity-50">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Search className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-muted-foreground">Ready for Scan</h3>
                <p className="text-muted-foreground/70">Matching results will appear here after analysis.</p>
              </div>
            )}

            {isMatching && (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-4">
                <Loader2 className="h-12 w-12 text-accent animate-spin" />
                <p className="text-accent font-medium text-lg animate-pulse">Running semantic analysis on 150+ data points...</p>
              </div>
            )}

            {result && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <Card className="border-accent/40 bg-accent/5 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="58"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-muted/20"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="58"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={364}
                            strokeDashoffset={364 - (364 * result.matchScore) / 100}
                            className="text-accent transition-all duration-1000 ease-out"
                          />
                        </svg>
                        <span className="absolute text-3xl font-bold text-foreground">{result.matchScore}%</span>
                      </div>
                      <div className="flex-1 text-center md:text-left space-y-3">
                        <h3 className="text-2xl font-bold text-foreground">Match Compatibility</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {result.impactSummary}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid sm:grid-cols-2 gap-6">
                  <Card className="bg-card border-border/40">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-accent">
                        <CheckCircle2 className="w-5 h-5" />
                        <CardTitle className="text-sm font-bold uppercase tracking-wider">Top Matched Skills</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2 pt-2">
                      {result.matchedSkills.map((skill, i) => (
                        <Badge key={i} className="bg-accent text-accent-foreground hover:bg-accent/80 font-bold px-3 py-1 text-sm border-none">
                          {skill}
                        </Badge>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border/40">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-accent">
                        <Award className="w-5 h-5" />
                        <CardTitle className="text-sm font-bold uppercase tracking-wider">Certifications</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      {result.relevantCertifications.map((cert, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-foreground font-medium">
                          <CheckCircle2 className="w-4 h-4 text-accent/70 shrink-0" />
                          {cert}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-card border-border/40">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-accent">
                      <Briefcase className="w-5 h-5" />
                      <CardTitle className="text-sm font-bold uppercase tracking-wider">Evidence & Project Proof</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-2">
                    {result.matchedProjects.map((project, i) => (
                      <div key={i} className="p-4 rounded-xl bg-muted/40 border border-border/30 space-y-1">
                        <h4 className="font-bold text-foreground flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent" />
                          {project.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{project.reason}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="grid sm:grid-cols-2 gap-6">
                  {result.recommendedLinks.map((link, i) => (
                    <a 
                      key={i} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/40 hover:border-accent/50 hover:bg-accent/5 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                        <LinkIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-foreground text-sm group-hover:text-accent transition-colors">{link.name}</div>
                        <div className="text-xs text-muted-foreground">{link.context}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
