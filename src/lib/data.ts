
export const SKILLS = [
  { 
    category: 'Azure Ecosystem', 
    icon: 'Cloud', 
    skills: ['Azure Databricks', 'Azure Data Factory', 'Azure DevOps', 'Azure Event Hub', 'Microsoft Fabric'] 
  },
  { 
    category: 'GCP & AWS', 
    icon: 'Layers', 
    skills: ['BigQuery', 'Dataflow', 'Dataform', 'Dataproc', 'AWS S3', 'Glue', 'EC2'] 
  },
  { 
    category: 'Data Engineering Core', 
    icon: 'Zap', 
    skills: ['PySpark', 'Spark SQL', 'Medallion Architecture', 'Delta Lake', 'dbt', 'Snowflake', 'Kimball Star Schema'] 
  },
  { 
    category: 'Agentic AI & LLMs', 
    icon: 'Bot', 
    skills: ['LangGraph', 'CrewAI', 'LangChain', 'RAG Systems', 'Vector Databases', 'FAISS'] 
  },
  { 
    category: 'Programming & DevTools', 
    icon: 'Code', 
    skills: ['Python (Advanced)', 'FastAPI', 'REST APIs', 'Terraform', 'Git', 'Pytest', 'CI/CD'] 
  },
  { 
    category: 'Problem Solving', 
    icon: 'Terminal', 
    skills: ['880+ LeetCode Problems', 'DSA Proficiency', 'Top 17% Rating', 'System Design'] 
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: 'Customer Service RAG Chatbot',
    description: 'Built a natural language interface for enterprise MS SQL databases using Python, FastAPI, and LangChain. Enabled context-aware Q&A over massive documentation using RAG and vector embeddings.',
    tech: ['Python', 'FastAPI', 'LangChain', 'MS SQL', 'FAISS'],
    category: 'GenAI',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000',
    url: 'https://github.com/Murarikomati/Customer-Service-RAG-chatbot'
  },
  {
    id: 2,
    title: 'Agentic AI Workflow Automation',
    description: 'Designed autonomous multi-agent systems for data reasoning using LangGraph and CrewAI. Automated complex data ingestion and validation workflows on Databricks platforms.',
    tech: ['LangGraph', 'CrewAI', 'Python', 'Databricks'],
    category: 'Agentic AI',
    image: 'https://images.unsplash.com/photo-1676277791608-ac54525aa94d?q=80&w=1000',
    url: 'https://github.com/Murarikomati/Agentic-AI-Workflow-Automation'
  },
  {
    id: 3,
    title: 'Real-Time Movie Analytics ELT Platform',
    description: 'Designed and implemented a scalable cloud-native ELT platform using Amazon S3, Snowflake, and dbt to process large-scale movie metadata, ratings, and user interaction datasets. Built raw, staging, and analytics-ready layers using dimensional models based on Kimball star schema principles to enable high-performance analytics. Implemented data quality tests, governance rules, and modular dbt transformations to deliver trusted, production-grade analytical datasets.',
    tech: ['S3', 'Snowflake', 'dbt', 'Kimball'],
    category: 'Data Engineering',
    image: 'https://images.unsplash.com/photo-1551288049-bbbda540d3ad?q=80&w=1000',
    url: 'https://github.com/Murarikomati/Netflix_Data_Analysis-'
  },
  {
    id: 4,
    title: 'Real-Time Stock Market Data Pipeline',
    description: 'Developed near real-time streaming ingestion pipelines using Azure Event Hub to process high-frequency stock market data. Implemented anomaly detection and automated alerting mechanisms, reducing response time by 50%. Integrated streaming outputs with SQL Server and Microsoft Fabric to ensure analytics-ready reporting.',
    tech: ['Azure Event Hub', 'SQL Server', 'Fabric', 'Streaming'],
    category: 'Data Engineering',
    image: 'https://images.unsplash.com/photo-1611974717484-788cff6b4200?q=80&w=1000',
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
    role: 'Data Engineer Intern (Full-time)',
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
