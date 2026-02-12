export const SKILLS = [
  // Cloud & Platforms
  { name: 'Azure (ADF, Databricks, Synapse)', category: 'Cloud Platforms', icon: 'Cloud' },
  { name: 'GCP (BigQuery, Dataform)', category: 'Cloud Platforms', icon: 'Globe' },
  { name: 'AWS', category: 'Cloud Platforms', icon: 'Server' },
  
  // Data Engineering
  { name: 'PySpark / Apache Spark', category: 'Data Engineering', icon: 'Zap' },
  { name: 'SQL / Spark SQL', category: 'Data Engineering', icon: 'Database' },
  { name: 'Delta Lake / Medallion Architecture', category: 'Data Engineering', icon: 'Workflow' },
  { name: 'Kafka / Streaming', category: 'Data Engineering', icon: 'Activity' },
  
  // GenAI & Agentic AI
  { name: 'LangChain / CrewAI', category: 'GenAI & Agentic AI', icon: 'Bot' },
  { name: 'LangGraph / RAG Systems', category: 'GenAI & Agentic AI', icon: 'Sparkles' },
  { name: 'Prompt Engineering / LLMs', category: 'GenAI & Agentic AI', icon: 'MessageSquare' },
  
  // MLOps
  { name: 'MLflow / Unity Catalog', category: 'Machine Learning & MLOps', icon: 'Cpu' },
];

export const PROJECTS = [
  {
    id: 1,
    title: 'Customer Service ChatBot – SQL Interface',
    description: 'Built a natural language interface for MS SQL databases using Python and LangChain. Translates user questions into SQL queries and returns results through a Streamlit UI.',
    tech: ['LangChain', 'Python', 'Streamlit', 'FAISS', 'MySQL'],
    category: 'GenAI',
    image: 'https://picsum.photos/seed/sql-chatbot/600/400',
  },
  {
    id: 2,
    title: 'CrewAI Job Search Assistant',
    description: 'Autonomous multi-agent system built with CrewAI. Automates job discovery, resume optimization, and interview preparation through specialized AI agents.',
    tech: ['CrewAI', 'LangChain', 'OpenAI API', 'Python', 'Pandas'],
    category: 'Agentic AI',
    image: 'https://picsum.photos/seed/crew-ai/600/400',
  },
  {
    id: 3,
    title: 'Intelligent Traffic Management System',
    description: 'Computer vision-based system that dynamically adjusts traffic signals based on real-time density using OpenCV.',
    tech: ['Python', 'OpenCV', 'Pygame', 'Numpy', 'Pandas'],
    category: 'Computer Vision',
    image: 'https://picsum.photos/seed/traffic-cv/600/400',
  },
];

export const EXPERIENCE = [
  {
    company: 'Data Master Consulting Pvt Ltd',
    role: 'Data Engineer - Full Time',
    period: 'Aug 2023 – Present',
    location: 'Maharashtra, India',
    summary: 'Architecting scalable ETL pipelines and building enterprise-grade GenAI solutions for high-performance data environments.',
    highlights: [
      'Designed and implemented scalable ETL pipelines using Azure Data Factory and Databricks, ingesting data from SAP HANA.',
      'Built near real-time pipelines with Kafka and Spark Structured Streaming, processing 100GB+ transactional data daily.',
      'Developed an end-to-end GenAI chatbot using LangChain and CrewAI, enabling context-aware Q&A via RAG architecture.',
      'Applied Delta Lake and SCD Type 2 logic for historical tracking and regulatory reporting.',
      'Integrated ML models into production using MLflow, increasing user engagement by 20%.'
    ],
  },
  {
    company: 'Data Master Consulting Pvt Ltd',
    role: 'Data Engineer Intern',
    period: 'Jan 2023 – July 2023',
    location: 'Maharashtra, India',
    summary: 'Optimized cloud ETL patterns and gained hands-on experience in the Azure ecosystem.',
    highlights: [
      'Assisted in development of automated data pipelines and data quality checks.',
      'Optimized SQL queries for high-performance data retrieval on Azure.',
      'Contributed to documentation and architectural planning for cloud migration.'
    ],
  },
];

export const CERTIFICATIONS = [
  {
    name: 'Databricks Fundamentals',
    issuer: 'Databricks',
    date: '2025',
    link: '#',
  },
  {
    name: 'Databricks Generative AI Fundamentals',
    issuer: 'Databricks',
    date: '2025',
    link: '#',
  },
  {
    name: 'Python Basics for Data Science',
    issuer: 'EDX Certification',
    date: '2022',
    link: '#',
  },
];

export const CONTACT_INFO = {
  email: 'murarikomati199ds@gmail.com',
  phone: '+91-9579345054',
  location: 'Solapur, Maharashtra, India',
  github: 'https://github.com/Murarikomati',
  linkedin: 'https://linkedin.com/in/komati-murari',
  leetcode: 'https://leetcode.com/u/komatimurari50/'
};
