import { Card, CardContent } from "@/components/ui/card";
import { Brain, Database, Rocket, ShieldCheck } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-headline mb-4">Professional <span className="text-primary">Summary</span></h2>
          <p className="text-muted-foreground max-w-4xl mx-auto text-lg leading-relaxed">
            AI / ML and Data Engineer with hands-on experience building scalable data platforms, Databricks-based ML systems, and GenAI solutions. Dedicated to transforming complex data requirements into scalable cloud solutions using Azure, Python, and Apache Spark, with a strong focus on high-availability architectures and Agentic AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-muted/30 border-none shadow-none group hover:bg-muted/50 transition-colors">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Database className="text-primary h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl font-headline">Data Engineering</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Expert in Medallion architectures, Azure Data Factory, and PySpark-based ETL frameworks for high-throughput enterprise data.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/30 border-none shadow-none group hover:bg-muted/50 transition-colors">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Rocket className="text-accent h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl font-headline">Cloud & MLOps</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Architecting cloud solutions on Azure and GCP with unified governance using Unity Catalog and production-grade MLOps pipelines.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/30 border-none shadow-none group hover:bg-muted/50 transition-colors">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Brain className="text-primary h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl font-headline">Agentic AI</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Building autonomous agent workflows and RAG systems using LangChain, CrewAI, and LangGraph for complex reasoning tasks.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
