
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
    if (!jobDescription.trim() || jobDescription.length < 30) {
      toast({ 
        title: "More Detail Needed", 
        description: "Please paste a job description (at least 30 characters).", 
        variant: "destructive" 
      });
      return;
    }

    setIsMatching(true);
    setResult(null);
    
    try {
      const output = await matchSkillsToJobDescription({ jobDescription });
      setResult(output);
      toast({ title: "Analysis Complete", description: "Deep Scan report generated." });
    } catch (error: any) {
      console.error("Matcher Error:", error);
      toast({ 
        title: "Scan Interrupted", 
        description: "The AI engine is currently busy. Please try again in a few seconds.", 
        variant: "destructive" 
      });
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <section id="ai-matcher" className="py-24 px-4 bg-muted/20 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 text-accent font-bold tracking-wider uppercase text-xs bg-accent/10 px-4 py-1.5 rounded-full border border-accent/40">
              <Sparkles className="h-3.5 w-3.5" /> Intelligence Engine
            </div>
            <h2 className="text-4xl md:text-6xl font-bold font-headline leading-tight">
              Recruiter <span className="text-primary">Deep Scan</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              Mapping your requirements to my <span className="text-foreground font-semibold">2.5+ years of experience</span> and <span className="text-foreground font-semibold">880+ DSA solved problems</span>.
            </p>
            
            <div className="space-y-4">
              <Textarea 
                placeholder="Paste the Job Description (JD) here to verify fit..." 
                className="min-h-[300px] bg-card border-border/60 rounded-2xl resize-none p-6 focus:ring-accent shadow-xl text-base text-foreground placeholder:text-muted-foreground"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                suppressHydrationWarning
              />
              <Button 
                onClick={handleMatch} 
                disabled={isMatching}
                size="lg"
                className="w-full h-16 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all bg-primary text-white hover:bg-primary/90"
              >
                {isMatching ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Performing Technical Audit...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-6 w-6" /> Run Deep Scan Analysis
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="flex-1 w-full lg:sticky lg:top-24 min-h-[600px]">
            {result ? (
              <Card className="border-primary/40 bg-zinc-900 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] overflow-hidden animate-fade-in-up">
                <CardHeader className="bg-gradient-to-r from-primary/40 to-accent/40 border-b border-border/50 p-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-2xl font-bold text-white">
                        <CheckCircle2 className="h-6 w-6 text-accent" /> Recruiter Cheat Sheet
                      </CardTitle>
                      <CardDescription className="text-zinc-100 font-medium">Tailored Analysis for Murari Komati</CardDescription>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-accent mb-1">Compatibility</div>
                      <Badge className="bg-accent text-accent-foreground font-black text-xl px-4 py-2 rounded-xl shadow-lg shadow-accent/40">
                        {result.matchScore}%
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-10 max-h-[650px] overflow-y-auto custom-scrollbar bg-zinc-900">
                  <div className="space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-accent">Value Proposition</h4>
                    <p className="text-base leading-relaxed text-zinc-100 font-medium">{result.impactSummary}</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-accent">Matching Core Competencies</h4>
                    <div className="flex flex-wrap gap-2.5">
                      {result.matchedSkills.map((skill, i) => (
                        <Badge key={i} className="bg-primary text-white border-none py-2 px-5 font-bold hover:bg-primary/80 transition-colors shadow-md text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-accent">Technical Proof Points</h4>
                    <div className="space-y-4">
                      {result.matchedProjects.map((project, i) => (
                        <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-accent/40 transition-all group">
                          <p className="font-bold text-base mb-2 text-primary group-hover:text-accent transition-colors">{project.title}</p>
                          <p className="text-sm text-zinc-300 leading-relaxed font-medium">{project.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-accent">Deep Dive Evidence</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {result.recommendedLinks.map((link, i) => (
                        <a 
                          key={i} 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-accent hover:bg-accent/10 transition-all shadow-sm"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                              {link.name.includes('LeetCode') ? <Code className="h-6 w-6" /> : link.name.includes('LinkedIn') ? <Linkedin className="h-6 w-6" /> : <ExternalLink className="h-6 w-6" />}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white">{link.name}</p>
                              <p className="text-[11px] text-zinc-400 font-medium">{link.context}</p>
                            </div>
                          </div>
                          <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-accent transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant="ghost" 
                    className="w-full rounded-2xl text-xs text-zinc-400 hover:text-accent hover:bg-accent/10 py-8 font-bold uppercase tracking-widest transition-colors border border-dashed border-white/10"
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
              <div className="h-full border-2 border-dashed border-border/50 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center space-y-8 min-h-[600px] bg-card/10 backdrop-blur-xl">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
                  <div className="relative w-24 h-24 rounded-3xl bg-muted flex items-center justify-center border border-border/50 shadow-inner">
                    <Sparkles className="h-12 w-12 text-primary opacity-40" />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-2xl font-bold font-headline text-foreground">Awaiting Technical Input</p>
                  <p className="text-muted-foreground text-sm max-w-[320px] mx-auto leading-relaxed">
                    Paste a job description to trigger a <span className="text-primary font-semibold">Technical Audit</span> of my engineering capabilities and DSA mastery.
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
