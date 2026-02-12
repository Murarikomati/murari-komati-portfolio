import { Card, CardContent } from "@/components/ui/card";
import { User, Target, Rocket } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-headline mb-4">Professional <span className="text-primary">Summary</span></h2>
          <p className="text-muted-foreground max-w-4xl mx-auto text-lg leading-relaxed">
            Data Engineer with proven experience designing scalable, cloud-native data platforms and production-grade ETL pipelines for BFSI and enterprise environments. Strong expertise in data modeling, distributed processing, data quality frameworks, and observability, with a consistent record of improving reliability, performance, and analytical readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-muted/30 border-none shadow-none">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Target className="text-primary h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl font-headline">Impact Focused</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Consistent record of improving reliability and performance, reducing compute costs by up to 30% through optimized distributed processing.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/30 border-none shadow-none">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Rocket className="text-accent h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl font-headline">Modern Stack</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Expertise in Medallion Architecture, Spark SQL, and cloud-native tools like Databricks and BigQuery for high-throughput data ingestion.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/30 border-none shadow-none">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <User className="text-primary h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl font-headline">Enterprise Grade</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Implementing production-grade CI/CD pipelines and data quality assertions to ensure reliable and compliant data platforms.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
