import { Card, CardContent } from "@/components/ui/card";
import { Brain, Database, Rocket } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-headline mb-4">Professional <span className="text-primary">Summary</span></h2>
          <p className="text-muted-foreground max-w-4xl mx-auto text-lg leading-relaxed">
            AI / ML and Data Engineer with hands-on experience building scalable data platforms, Databricks-based ML systems, and GenAI solutions. Strong expertise in distributed data processing, data modeling, MLOps, and Agentic AI workflows, delivering reliable, analytics-ready and AI-ready datasets for enterprise use cases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-muted/30 border-none shadow-none">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Database className="text-primary h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl font-headline">Data Engineering</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Architecting Medallion (Bronze-Silver-Gold) models and scalable PySpark-based ETL frameworks for high-throughput enterprise data.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/30 border-none shadow-none">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Rocket className="text-accent h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl font-headline">MLOps & Cloud</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Streamlining model lifecycles with MLflow, Unity Catalog, and Databricks Model Serving across Azure and GCP platforms.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/30 border-none shadow-none">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Brain className="text-primary h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl font-headline">GenAI & Agentic AI</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Building context-aware RAG systems and autonomous Agentic AI workflows using LangChain, LangGraph, and LoRA fine-tuning.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
