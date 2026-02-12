import { CERTIFICATIONS } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Award, ExternalLink } from "lucide-react";

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-4 bg-muted/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-headline mb-4">Professional <span className="text-secondary">Validation</span></h2>
          <p className="text-muted-foreground">Global certifications from industry-leading cloud providers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, i) => (
            <Card key={i} className="group hover:border-primary/50 transition-all cursor-default">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <a href={cert.link} className="text-muted-foreground hover:text-primary">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <h3 className="font-bold font-headline mb-1 leading-tight">{cert.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{cert.issuer}</span>
                  <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                  <span>{cert.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
