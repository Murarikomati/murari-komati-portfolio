'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, CheckCircle2, ExternalLink, Award, Code, Linkedin, RefreshCw } from "lucide-react";
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
    setResult(null);
    
    try {
      const output = await matchSkillsToJobDescription({ jobDescription });
      setResult(output);
      toast({ title: "Analysis Complete", description: "Recruiter Cheat Sheet generated." });
    } catch (error: any) {
      console.error("Matcher Error:", error);
      toast({ 
        title: "Scan Interrupted", 
        description: error.message || "AI analysis failed. Please check your network.", 
        variant: "destructive" 
      });
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <section id="ai-matcher" className="py-24 px-4 bg-muted/20 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 text-accent font-bold tracking-wider uppercase text-xs bg-accent/15 px-4 py-1.5 rounded-full border border-accent/20">
              <Sparkles className="h-3.5 w-3.5" /> Intelligence Engine
            </div>
            <h2 className="text-4xl md:text-6xl font-bold font-headline leading-tight">
              Recruiter <span className="text-primary">Deep Scan</span>
            </h2>
            <p className="text-foreground/90 text-lg leading-relaxed max-w-xl font-medium">
              Mapping your requirements to my <span className="text-primary font-bold">experience, certifications, and live code</span> in real-time.
            </p>
            
            <div className="space-y-4">
              <Textarea 
                placeholder="Paste the full job description here..." 
                className="min-h-[300px] bg-card border-border/60 rounded-2xl resize-none p-6 focus:ring-accent shadow-xl text-base"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                suppressHydrationWarning
              />
              <Button 
                onClick={handleMatch} 
                disabled={isMatching}
                size="lg"
                className="w-full h-16 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/30 hover:scale-[1.01] transition-all bg-primary text-white"
              >
                {isMatching ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Analyzing Technical Fit...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-6 w-6" /> Generate Matcher Report
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="flex-1 w-full lg:sticky lg:top-24 min-h-[600px]">
            {result ? (
              <Card className="border-primary/40 bg-card shadow-2xl overflow-hidden animate-fade-in-up">
                <CardHeader className="bg-primary/10 border-b p-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-2xl font-bold text-primary">
                        <CheckCircle2 className="h-6 w-6" /> Recruiter Cheat Sheet
                      </CardTitle>
                      <CardDescription className="text-foreground/80 font-bold">Tailored for Murari Komati</CardDescription>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Fit Score</div>
                      <Badge className="bg-primary text-white font-black text-xl px-4 py-2 rounded-xl shadow-lg">
                        {result.matchScore}%
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-10 max-h-[650px] overflow-y-auto custom-scrollbar">
                  <div className="space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-primary">Value Proposition</h4>
                    <p className="text-base leading-relaxed text-foreground font-bold">{result.impactSummary}</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-primary">Matching Skills</h4>
                    <div className="flex flex-wrap gap-2.5">
                      {result.matchedSkills.map((skill, i) => (
                        <Badge key={i} className="bg-accent text-accent-foreground border-none py-2 px-5 font-bold shadow-md text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-primary">Evidence & Proof Points</h4>
                    <div className="space-y-4">
                      {result.matchedProjects.map((project, i) => (
                        <div key={i} className="bg-primary/5 p-5 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all group shadow-sm">
                          <p className="font-bold text-base mb-2 text-primary">{project.title}</p>
                          <p className="text-sm text-foreground/90 leading-relaxed font-semibold">{project.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {result.relevantCertifications.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-primary">Validated Credentials</h4>
                      <div className="flex flex-wrap gap-2.5">
                        {result.relevantCertifications.map((cert, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-xs bg-accent/20 text-accent border border-accent/40 px-4 py-2 rounded-xl font-bold">
                            <Award className="h-3.5 w-3.5" /> {cert}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-primary">Deep Dive Links</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {result.recommendedLinks.map((link, i) => (
                        <a 
                          key={i} 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between p-4 rounded-2xl border border-border bg-background hover:border-primary hover:bg-primary/5 transition-all shadow-sm"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                              {link.name === 'LinkedIn' ? <Linkedin className="h-5 w-5" /> : link.name === 'LeetCode' ? <Code className="h-5 w-5" /> : <ExternalLink className="h-5 w-5" />}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-foreground">{link.name}</p>
                              <p className="text-[10px] text-foreground/70 font-bold">{link.context}</p>
                            </div>
                          </div>
                          <ExternalLink className="h-4 w-4 text-foreground/50 group-hover:text-primary transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant="ghost" 
                    className="w-full rounded-2xl text-xs hover:text-primary hover:bg-primary/10 py-6 font-bold uppercase tracking-widest transition-colors border mt-4"
                    onClick={() => {
                      setResult(null);
                      setJobDescription("");
                    }}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" /> Reset & New Scan
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full border-2 border-dashed border-border rounded-[3rem] flex flex-col items-center justify-center p-12 text-center space-y-8 min-h-[600px] bg-card/40 backdrop-blur-xl">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full animate-pulse" />
                  <div className="relative w-24 h-24 rounded-3xl bg-muted flex items-center justify-center border border-border shadow-inner">
                    <Sparkles className="h-12 w-12 text-primary opacity-40" />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-2xl font-bold font-headline text-foreground">Ready for Deep Scan</p>
                  <p className="text-foreground/70 text-sm max-w-[320px] mx-auto leading-relaxed font-bold">
                    Paste a job description to generate a real-time <span className="text-primary font-bold">Recruiter Cheat Sheet</span> mapping technical mastery.
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
