import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Murari Komati | AI/ML & Data Engineer',
  description: 'AI/ML and Data Engineer specializing in Azure Databricks, GenAI, and Agentic AI workflows. Architecting scalable data platforms and LLM-powered solutions.',
  keywords: [
    'Murari Komati', 
    'Data Engineer', 
    'AI Engineer', 
    'Azure Databricks', 
    'LangGraph', 
    'PySpark', 
    'Agentic AI', 
    'MLOps', 
    'Data Architect'
  ],
  openGraph: {
    title: 'Murari Komati | AI/ML & Data Engineer Portfolio',
    description: 'Architecting Scalable AI & Data Ecosystems',
    images: ['https://picsum.photos/seed/murari-og/1200/630'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-accent/30 bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
