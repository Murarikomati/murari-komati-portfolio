import { Card, CardContent } from "@/components/ui/card";
import { User, Target, Rocket } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-headline mb-4">Behind the <span className="text-primary">Data</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I bridge the gap between complex raw data and actionable business intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-muted/30 border-none shadow-none">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Target className="text-primary h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl font-headline">The Mission</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                My goal is to build data systems that are not just "working," but are performant, 
                scalable, and cost-effective. I believe data should be an asset, not a bottleneck.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/30 border-none shadow-none">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Rocket className="text-accent h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl font-headline">The Approach</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I specialize in Cloud-native architectures (Azure, AWS, GCP) using a 
                code-first approach with Python and SQL to automate everything from 
                ingestion to validation.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/30 border-none shadow-none">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <User className="text-primary h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl font-headline">The Professional</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                With 5+ years of experience, I've seen data evolve from batch-only to 
                real-time streams. I stay ahead of the curve by mastering GenAI and 
                Modern Data Stack tools.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
