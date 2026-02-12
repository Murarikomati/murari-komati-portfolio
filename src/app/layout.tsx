import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Murari Komati | Engineering the Future of Data & Intelligence',
  description: 'AI/ML & Data Engineer focused on Azure Databricks, LangGraph, and Agentic AI. Architecting scalable data backbones for autonomous intelligence.',
  keywords: [
    'Murari Komati', 
    'Data Engineer', 
    'AI Solutions Engineer', 
    'Azure Databricks', 
    'LangGraph', 
    'Data Architect', 
    'Agentic AI', 
    'ETL Pipelines',
    'WIT Solapur'
  ],
  openGraph: {
    title: 'Murari Komati | Data & AI Engineering Portfolio',
    description: 'Engineering Scalable Foundations for the AI Era',
    images: ['https://picsum.photos/seed/murari-og/1200/630'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
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
