
export const SKILLS = [
  { name: 'Azure Databricks / ADF', category: 'Cloud Platforms', icon: 'Cloud' },
  { name: 'PySpark / Spark SQL', category: 'Data Engineering', icon: 'Zap' },
  { name: 'Medallion Architecture', category: 'Data Engineering', icon: 'Workflow' },
  { name: 'LangGraph / CrewAI', category: 'Agentic AI', icon: 'Bot' },
  { name: 'RAG / Vector DBs', category: 'GenAI', icon: 'Sparkles' },
  { name: 'Python (OOP) / FastAPI', category: 'Programming', icon: 'Code' },
  { name: '880+ LeetCode Solved', category: 'Problem Solving', icon: 'Terminal' },
];

export const PROJECTS = [
  {
    id: 1,
    title: 'Customer Service RAG Chatbot',
    description: 'Enterprise-grade RAG system providing a natural language interface to MS SQL databases. Built with FastAPI and LangChain.',
    tech: ['Python', 'FastAPI', 'LangChain', 'MS SQL', 'FAISS'],
    category: 'GenAI',
    image: 'https://picsum.photos/seed/sql-chatbot/600/400',
    url: 'https://github.com/Murarikomati/Customer-Service-RAG-chatbot'
  },
  {
    id: 2,
    title: 'Agentic AI Workflow Automation',
    description: 'Autonomous multi-agent architecture using LangGraph and CrewAI to automate enterprise data ingestion and reasoning tasks.',
    tech: ['LangGraph', 'CrewAI', 'Python', 'Databricks'],
    category: 'Agentic AI',
    image: 'https://picsum.photos/seed/crew-ai/600/400',
    url: 'https://github.com/Murarikomati/Agentic-AI-Workflow-Automation'
  },
  {
    id: 3,
    title: 'Real-Time Movie Analytics ELT',
    description: 'Scalable cloud-native ELT platform using Amazon S3, Snowflake, and dbt. Built staging and analytics-ready layers using Kimball star schema models.',
    tech: ['S3', 'Snowflake', 'dbt', 'Kimball'],
    category: 'Data Engineering',
    image: 'https://picsum.photos/seed/netflix-elt/600/400',
    url: 'https://github.com/Murarikomati/Netflix_Data_Analysis-'
  },
  {
    id: 4,
    title: 'Real-Time Stock Market Data Pipeline',
    description: 'Developed near real-time streaming ingestion pipelines using Azure Event Hub. Implemented anomaly detection reducing analyst response by 50%.',
    tech: ['Event Hub', 'SQL Server', 'Fabric', 'Streaming'],
    category: 'Data Engineering',
    image: 'https://picsum.photos/seed/stock-stream/600/400',
    url: 'https://github.com/Murarikomati/wiki-to-azure-lake-pipeline'
  },
];

export const EXPERIENCE = [
  {
    company: 'Data Master Consulting Pvt Ltd',
    role: 'Data Engineer',
    period: 'Aug 2023 – Present',
    location: 'Maharashtra, India',
    summary: 'Architecting high-performance data backbones and integrating autonomous AI agents for enterprise automation.',
    highlights: [
      'Engineered scalable ETL pipelines using Databricks Medallion Architecture.',
      'Developed Agentic AI workflows reducing manual data auditing by 90%.',
      'Processed 100GB+ daily transactional data with Spark Structured Streaming.',
      'Optimized Delta Lake performance, reducing job latency by 40%.'
    ],
  },
  {
    company: 'EZData Advisory IT Services',
    role: 'Data Engineer',
    period: 'Jan 2023 – July 2023',
    location: 'Maharashtra, India',
    summary: 'Focused on cloud pipeline optimization and automated data quality assertions for enterprise clients.',
    highlights: [
      'Migrated legacy ADF pipelines to high-performance PySpark frameworks.',
      'Built automated data quality checks for BigQuery/GCP environments.',
      'Authored complex Spark SQL queries for regulatory reporting modules.'
    ],
  },
];

export const CERTIFICATIONS = [
  {
    name: 'Databricks Generative AI Fundamentals',
    issuer: 'Databricks',
    date: '2025',
    link: '#',
  },
  {
    name: 'Azure Data Engineer Associate',
    issuer: 'Microsoft',
    date: '2024',
    link: '#',
  },
  {
    name: 'Databricks Fundamentals',
    issuer: 'Databricks',
    date: '2025',
    link: '#',
  },
];

export const CONTACT_INFO = {
  email: 'murarikomati199ds@gmail.com',
  phone: '+91-9579345054',
  location: 'Solapur, Maharashtra, India',
  github: 'https://github.com/Murarikomati',
  linkedin: 'https://linkedin.com/in/komati-murari',
  leetcode: 'https://leetcode.com/u/komatimurari50/',
  resume: '/resume.pdf'
};
