export const SKILLS = [
  { name: 'PySpark / Spark', category: 'Data Engineering', icon: 'Zap' },
  { name: 'Azure Databricks', category: 'Cloud Platforms', icon: 'Cpu' },
  { name: 'Delta Lake / DLT', category: 'Data Engineering', icon: 'Database' },
  { name: 'LangChain / LangGraph', category: 'GenAI & Agentic AI', icon: 'Bot' },
  { name: 'dbt / Dataform', category: 'Data Engineering', icon: 'Layers' },
  { name: 'Azure Data Factory', category: 'Cloud ETL', icon: 'Cloud' },
  { name: 'MLflow / Unity Catalog', category: 'MLOps', icon: 'Settings' },
  { name: 'Apache Kafka', category: 'Streaming', icon: 'Activity' },
  { name: 'Python / SQL', category: 'Languages', icon: 'Code' },
  { name: 'Airflow', category: 'Data Engineering', icon: 'Workflow' },
];

export const PROJECTS = [
  {
    id: 1,
    title: 'Enterprise Document Analytics & RAG Platform',
    description: 'Built an end-to-end document intelligence platform using Azure Databricks and LangChain. Enabled semantic search and question answering across 1,000+ enterprise documents using hybrid retrieval.',
    tech: ['Azure Databricks', 'LangChain', 'Azure AI Search', 'Python'],
    category: 'GenAI',
    image: 'https://picsum.photos/seed/rag/600/400',
  },
  {
    id: 2,
    title: 'Agentic AI Workflow Automation System',
    description: 'Designed LangGraph-based agentic workflows for automated data ingestion, reasoning, and validation. Reduced manual analytical effort by 90% and improved turnaround time by 4x.',
    tech: ['LangGraph', 'Python', 'MLflow', 'Azure'],
    category: 'Agentic AI',
    image: 'https://picsum.photos/seed/agent/600/400',
  },
  {
    id: 3,
    title: 'Medallion Architecture Migration',
    description: 'Architected Bronze-Silver-Gold data models supporting 500K+ daily records. Optimized partitioning and caching, improving query performance by 40% using Databricks SQL.',
    tech: ['Databricks', 'Delta Lake', 'ADF', 'SQL'],
    category: 'Data Engineering',
    image: 'https://picsum.photos/seed/medallion/600/400',
  },
];

export const EXPERIENCE = [
  {
    company: 'EZData Advisory IT Services',
    role: 'Data Engineer',
    period: 'Nov 2025 - Dec 2025',
    description: 'Migrated legacy ADF pipelines to scalable PySpark frameworks on BigQuery. Built reusable Dataform SQLX models with incremental logic and dependency management.',
  },
  {
    company: 'Data Master Consulting Pvt Ltd',
    role: 'Data Engineer',
    period: 'Nov 2023 - Oct 2025',
    description: 'Operated large-scale batch/real-time pipelines. Built Spark ML pipelines over 100GB+ datasets and applied LoRA-based fine-tuning to LLMs for domain-specific document intelligence.',
  },
  {
    company: 'Freelance / Projects',
    role: 'AI & Data Architect',
    period: '2023 - Present',
    description: 'Focused on LangGraph-based agents and MLOps automation. Developed semantic search engines and real-time validation systems for enterprise clients.',
  },
];

export const CERTIFICATIONS = [
  {
    name: 'Databricks Certified Data Engineer Associate',
    issuer: 'Databricks',
    date: '2024',
    link: '#',
  },
  {
    name: 'Azure Data Engineer Associate',
    issuer: 'Microsoft',
    date: 'In Progress',
    link: '#',
  },
  {
    name: 'Databricks Fundamentals',
    issuer: 'Databricks',
    date: '2023',
    link: '#',
  },
];
