'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Loader2, CheckCircle2, ExternalLink, Github, Linkedin, Code, RefreshCw } from "lucide-react";
import { matchSkillsAction } from "@/app/actions"; // Import the new Server Action
import { type MatchSkillsToJobDescriptionOutput } from "@/ai/flows/match-skills-to-job-description";
import { useToast } from "@/hooks/use-toast";
import { TechPill } from "@/components/ui/TechPill";

export default function SkillMatcher() {
  const [jobDescription, setJobDescription] = useState("");
  const [isMatching, setIsMatching] = useState(false);
  const [result, setResult] = useState<MatchSkillsToJobDescriptionOutput | null>(null);
  const { toast } = useToast();

  const handleMatch = async () => {
    if (!jobDescription.trim() || jobDescription.length < 30) {
      toast({ 
        title: "Input Required", 
        description: "Please paste a job description to start the scan.", 
        variant: "destructive" 
      });
      return;
    }

    setIsMatching(true);
    setResult(null);
    
    try {
      // Use the Server Action instead of the direct function call
      const output = await matchSkillsAction(jobDescription);
      setResult(output);
      toast({ title: "Scan Complete", description: "Your Recruiter Cheat Sheet is ready." });
    } catch (error: any) {
      console.error("Matcher Error:", error);
      toast({ 
        title: "Scan Failed", 
        description: "AI analysis failed. Please try a different Job Description.", 
        variant: "destructive" 
      });
    } finally {
      setIsMatching(false);
    }
  };

  const getIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('github')) return <Github className="h-4 w-4" />;
    if (lower.includes('linkedin')) return <Linkedin className="h-4 w-4" />;
    if (lower.includes('leetcode')) return <Code className="h-4 w-4" />;
    return <ExternalLink className="h-4 w-4" />;
  };

  return (
    <section id="ai-matcher" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(13,148,136,0.05),transparent)]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs bg-primary/10 px-4 py-2 rounded-lg border border-primary/30">
              <Sparkles className="h-4 w-4" /> Intelligence Engine
            </div>
            <h2 className="text-4xl md:text-6xl font-bold font-headline leading-tight">
              Recruiter <span className="text-primary">Deep Scan</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              Mapping your requirements to my <span className="text-foreground font-semibold">2.5+ years of experience,</span> specialized <span className="text-foreground font-semibold">AI certifications,</span> and <span className="text-foreground font-semibold">880+ DSA solutions.</span>
            </p>
            
            <div className="space-y-4">
              <Textarea 
                placeholder="Paste the full job description here..." 
                className="min-h-[300px] rounded-3xl resize-none p-6 focus:ring-primary shadow-2xl placeholder:text-muted-foreground"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                suppressHydrationWarning
              />
              <Button 
                onClick={handleMatch} 
                disabled={isMatching}
                size="lg"
                className="w-full h-16 rounded-full text-lg font-bold shadow-2xl shadow-primary/30 hover:scale-[1.01] transition-all bg-primary text-primary-foreground"
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
              <Card className="shadow-2xl overflow-hidden animate-fade-in-up rounded-[2.5rem]">
                <CardHeader className="bg-primary/10 border-b border-primary/20 p-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                        <CheckCircle2 className="h-6 w-6 text-primary" /> Recruiter Cheat Sheet
                      </CardTitle>
                      <CardDescription className="text-muted-foreground font-medium">Verified Analysis: Murari Komati</CardDescription>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Fit Score</div>
                      <div className="bg-primary text-primary-foreground font-black text-2xl px-4 py-2 rounded-xl shadow-lg border-none">
                        {result.matchScore}%
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-6 max-h-[650px] overflow-y-auto custom-scrollbar">
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-primary">Core Value Proposition</h4>
                    <p className="text-lg leading-relaxed font-medium">{result.impactSummary}</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-primary">Matched Engineering Skills</h4>
                    <div className="flex flex-wrap gap-2.5">
                      {result.matchedSkills.map((skill, i) => (
                        <TechPill key={i} label={skill} />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-primary">Evidence & Proof Points</h4>
                    <div className="space-y-4">
                      {result.matchedProjects.map((project, i) => (
                        <div key={i} className="bg-muted/50 p-6 rounded-3xl border hover:border-primary/50 transition-all">
                          <p className="font-bold text-lg mb-2 text-primary">{project.title}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed font-medium">{project.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-primary">Technical Deep Dive Links</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {result.recommendedLinks.map((link, i) => (
                        <a 
                          key={i} 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between p-5 rounded-3xl border bg-muted/30 hover:bg-muted transition-all shadow-sm"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all text-primary">
                              {getIcon(link.name)}
                            </div>
                            <div>
                              <p className="text-sm font-bold">{link.name}</p>
                              <p className="text-[11px] text-muted-foreground font-medium">{link.context}</p>
                            </div>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant="ghost" 
                    className="w-full rounded-full text-xs text-muted-foreground hover:text-primary hover:bg-primary/10 py-8 font-bold uppercase tracking-widest transition-colors border-dashed border mt-4"
                    onClick={() => {
                      setResult(null);
                      setJobDescription("");
                    }}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" /> Reset Analysis & New Scan
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full border-2 border-dashed rounded-[3rem] flex flex-col items-center justify-center p-12 text-center space-y-8 min-h-[600px] bg-muted/30 backdrop-blur-xl">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
                  <div className="relative w-24 h-24 rounded-3xl bg-background flex items-center justify-center border shadow-inner">
                    <Sparkles className="h-12 w-12 text-primary opacity-40" />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-2xl font-bold font-headline">Awaiting Requirements</p>
                  <p className="text-muted-foreground text-sm max-w-[320px] mx-auto leading-relaxed font-medium">
                    Paste a JD to generate a <span className="text-primary font-bold">Technical Audit</span> of my 2.5+ years of engineering impact and DSA mastery.
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
