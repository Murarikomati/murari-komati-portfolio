export const SKILLS = [
  { 
    category: 'Azure', 
    icon: 'Azure', 
    skills: ['Azure Databricks', 'Azure Data Factory', 'Azure DevOps', 'Azure Event Hub', 'Microsoft Fabric'] 
  },
  { 
    category: 'GCP', 
    icon: 'GCP', 
    skills: ['BigQuery', 'Dataflow', 'Dataform', 'Dataproc'] 
  },
  { 
    category: 'AWS', 
    icon: 'AWS', 
    skills: ['S3', 'Glue', 'EC2'] 
  },
  { 
    category: 'Core Data Engineering', 
    icon: 'Zap', 
    skills: ['PySpark', 'Spark SQL', 'Medallion Architecture', 'Delta Lake', 'dbt', 'Snowflake', 'Kimball Star Schema'] 
  },
  { 
    category: 'AI & LLM Specialization', 
    icon: 'Bot', 
    skills: ['LangGraph', 'CrewAI', 'LangChain', 'RAG Systems', 'Vector Databases', 'FAISS'] 
  },
  { 
    category: 'Programming & DevOps', 
    icon: 'Code', 
    skills: ['Python (Advanced)', 'FastAPI', 'REST APIs', 'Terraform', 'Git', 'Pytest', 'CI/CD'] 
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
    description: 'Designed a cloud-native ELT platform using S3, Snowflake, and dbt. Built staging and analytics layers using Kimball star schema models to enable high-performance analytics with production-grade modular transformations.',
    tech: ['S3', 'Snowflake', 'dbt', 'Kimball'],
    category: 'Data Engineering',
    image: '/assets/real-time-movie-analytics-elt-platform.png',
    url: 'https://github.com/Murarikomati/Netflix_Data_Analysis-'
  },
  {
    id: 4,
    title: 'Real-Time Stock Market Data Pipeline',
    description: 'Developed streaming ingestion pipelines using Azure Event Hub to process high-frequency stock data. Integrated outputs with SQL Server and Microsoft Fabric, reducing response time by 50%.',
    tech: ['Azure Event Hub', 'SQL Server', 'Fabric', 'Streaming'],
    category: 'Data Engineering',
    image: '/assets/real-time-stock-market-data-pipeline.png',
    url: 'https://github.com/Murarikomati/wiki-to-azure-lake-pipeline'
  },
];

export const EXPERIENCE = [
  {
    company: 'Data Master Consulting Pvt Ltd',
    role: 'Data Engineer',
    period: 'Nov 2023 – Oct 2025',
    location: 'Maharashtra, India',
    summary: 'Architected high-scale Medallion platforms on Azure and integrated Agentic AI for autonomous data reasoning.',
    highlights: [
      'Architected Azure Databricks Medallion pipelines supporting 500K+ daily transactions with 70% query speedup.',
      'Integrated Agentic AI workflows using LangGraph and CrewAI to automate 90% of data auditing tasks.',
      'Optimized Spark workloads (liquid clustering, broadcast joins), reducing cloud compute costs by 30%.',
      'Implemented CI/CD via Azure DevOps YAML, reducing deployment effort by 45% across Dev/QA/Prod.',
      'Automated SLA monitoring using ADF triggers and ServiceNow, ensuring 100% pipeline reliability.'
    ],
  },
  {
    company: 'EZData Advisory IT Services and Consulting Pvt Ltd',
    role: 'Data Engineer',
    period: 'Nov 2025 – Dec 2025',
    location: 'Uttar Pradesh, India',
    summary: 'Modernized enterprise data modeling on BigQuery and Looker, eliminating manual maintenance and standardizing transformation logic.',
    highlights: [
      'Migrated legacy ADF pipelines to PySpark/BigQuery, eliminating 100% of manual maintenance.',
      'Built reusable Dataform SQLX models and dependency chains, reducing logic duplication by 40%.',
      'Implemented automated DQ checks (uniqueness, referential integrity), reducing downstream issues by 35%.',
      'Delivered curated datasets to Looker, improving dashboard query performance by 30%.'
    ],
  }
];

export const CERTIFICATIONS = [
  {
    name: 'Databricks Generative AI Fundamentals',
    issuer: 'Databricks',
    date: '2023',
    link: '#',
  },
  {
    name: 'Azure Data Engineer Associate',
    issuer: 'Microsoft',
    date: '2022',
    link: '#',
  },
  {
    name: 'Databricks Fundamentals',
    issuer: 'Databricks',
    date: '2023',
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
