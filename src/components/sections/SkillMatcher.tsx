'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, CheckCircle2, ExternalLink, Award, Code, Linkedin } from "lucide-react";
import { matchSkillsToJobDescription, type MatchSkillsToJobDescriptionOutput } from "@/ai/flows/match-skills-to-job-description";
import { useToast } from "@/hooks/use-toast";

export default function SkillMatcher() {
  const [jobDescription, setJobDescription] = useState("");
  const [isMatching, setIsMatching] = useState(false);
  const [result, setResult] = useState<MatchSkillsToJobDescriptionOutput | null>(null);
  const { toast } = useToast();

  const handleMatch = async () => {
    if (!jobDescription.trim() || jobDescription.length < 50) {
      toast({ 
        title: "More Detail Needed", 
        description: "Please paste a complete job description (at least 50 characters).", 
        variant: "destructive" 
      });
      return;
    }

    setIsMatching(true);
    setResult(null); // Clear previous result
    
    try {
      const output = await matchSkillsToJobDescription({ jobDescription });
      setResult(output);
      toast({ title: "Analysis Complete", description: "Profile mapped successfully." });
    } catch (error: any) {
      console.error("Matcher Error:", error);
      toast({ 
        title: "Scan Interrupted", 
        description: error.message || "The model took too long to respond. Please try a shorter job description.", 
        variant: "destructive" 
      });
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <section id="ai-matcher" className="py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 text-accent font-semibold tracking-wider uppercase text-xs bg-accent/10 px-3 py-1 rounded-full">
              <Sparkles className="h-3.5 w-3.5" /> Intelligence Engine
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-headline leading-tight">
              Recruiter <span className="text-primary">Deep Scan</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Instantly map your job requirements to my <span className="text-foreground font-medium">experience, certifications, and licenses</span>.
            </p>
            
            <div className="space-y-4">
              <Textarea 
                placeholder="Paste the full job description here..." 
                className="min-h-[300px] bg-background border-border rounded-2xl resize-none p-6 focus:ring-accent shadow-inner text-sm"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <Button 
                onClick={handleMatch} 
                disabled={isMatching}
                className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.01] transition-transform"
              >
                {isMatching ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Analyzing Deep Fit...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-6 w-6" /> Run Deep Scan Matcher
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="flex-1 w-full lg:sticky lg:top-24 min-h-[500px]">
            {result ? (
              <Card className="border-accent/30 bg-card shadow-2xl overflow-hidden animate-fade-in-up">
                <CardHeader className="bg-gradient-to-r from-accent/20 to-primary/20 border-b border-border p-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <CheckCircle2 className="h-6 w-6 text-accent" /> Recruiter Cheat Sheet
                      </CardTitle>
                      <CardDescription className="text-foreground/70">Tailored analysis for Murari Komati</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-background/50 font-bold">{result.matchScore}% Match</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8 max-h-[600px] overflow-y-auto custom-scrollbar">
                  <div>
                    <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-primary mb-3">Pitch / Value Prop</h4>
                    <p className="text-sm leading-relaxed text-foreground/90 font-medium">{result.impactSummary}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-primary mb-3">Matching Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.matchedSkills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="bg-muted border py-1 px-3">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-primary mb-3">Project Proof Points</h4>
                    <div className="space-y-4">
                      {result.matchedProjects.map((project, i) => (
                        <div key={i} className="bg-muted/50 p-4 rounded-xl border border-border">
                          <p className="font-bold text-sm mb-1">{project.title}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{project.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {result.relevantCertifications.length > 0 && (
                    <div>
                      <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-primary mb-3">Verified Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.relevantCertifications.map((cert, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs bg-accent/5 text-accent border border-accent/20 px-3 py-1.5 rounded-lg">
                            <Award className="h-3 w-3" /> {cert}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-primary mb-3">Evidence Links</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {result.recommendedLinks.map((link, i) => (
                        <a 
                          key={i} 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between p-3 rounded-xl border border-border bg-background hover:border-primary transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                              {link.name === 'LeetCode' ? <Code className="h-4 w-4" /> : link.name === 'LinkedIn' ? <Linkedin className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                            </div>
                            <div>
                              <p className="text-xs font-bold">{link.name}</p>
                              <p className="text-[10px] text-muted-foreground">{link.context}</p>
                            </div>
                          </div>
                          <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant="ghost" 
                    className="w-full rounded-xl text-xs"
                    onClick={() => {
                      setResult(null);
                      setJobDescription("");
                    }}
                  >
                    Reset & Start New Scan
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full border-2 border-dashed border-border rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center space-y-6 min-h-[500px] bg-card/10 backdrop-blur-sm">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                  <div className="relative w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                    <Sparkles className="h-10 w-10 text-muted-foreground opacity-50" />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xl font-bold font-headline">Awaiting Scan Request</p>
                  <p className="text-muted-foreground text-sm max-w-[300px]">
                    Paste a JD to generate a real-time <span className="text-foreground">Recruiter Cheat Sheet</span> mapping certifications and code.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
