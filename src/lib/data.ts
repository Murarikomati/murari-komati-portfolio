export const SKILLS = [
  // Data Engineering
  { name: 'PySpark / Apache Spark', category: 'Data Engineering', icon: 'Zap' },
  { name: 'dbt / Delta Lake', category: 'Data Engineering', icon: 'Database' },
  { name: 'Delta Live Tables / Airflow', category: 'Data Engineering', icon: 'Workflow' },
  { name: 'Kafka', category: 'Data Engineering', icon: 'Activity' },
  
  // Cloud
  { name: 'Azure (Databricks, ADF)', category: 'Cloud Platforms', icon: 'Cloud' },
  { name: 'GCP (BigQuery, Dataform)', category: 'Cloud Platforms', icon: 'Globe' },
  
  // ML & MLOps
  { name: 'MLflow / Unity Catalog', category: 'Machine Learning & MLOps', icon: 'Server' },
  { name: 'Spark MLlib / Scikit-learn', category: 'Machine Learning & MLOps', icon: 'Brain' },
  { name: 'Databricks Model Serving', category: 'Machine Learning & MLOps', icon: 'Cpu' },
  
  // GenAI & Agentic AI
  { name: 'RAG Systems / LangChain', category: 'GenAI & Agentic AI', icon: 'Bot' },
  { name: 'LangGraph / Embeddings', category: 'GenAI & Agentic AI', icon: 'Sparkles' },
  { name: 'Prompt Engineering / LoRA', category: 'GenAI & Agentic AI', icon: 'MessageSquare' },
];

export const PROJECTS = [
  {
    id: 1,
    title: 'Enterprise Document Analytics & RAG Platform',
    description: 'Built an end-to-end document intelligence platform using Azure Databricks, LangChain, and Azure AI Search. Enabled semantic search and question answering across 1,000+ enterprise documents using embeddings and hybrid retrieval. Implemented chunking strategies and conversational memory to support business-facing analytical workflows.',
    tech: ['Azure Databricks', 'LangChain', 'Azure AI Search', 'Embeddings', 'RAG'],
    category: 'GenAI',
    image: 'https://picsum.photos/seed/enterprise-rag/600/400',
  },
  {
    id: 2,
    title: 'Agentic AI Workflow Automation System',
    description: 'Designed LangGraph-based agentic workflows for automated data ingestion, reasoning, validation, and reporting. Created a multi-step reasoning system that orchestrates tool execution and data validation, significantly reducing manual effort and turnaround time.',
    tech: ['LangGraph', 'Agentic AI', 'Python', 'LLMs', 'Automation'],
    category: 'Agentic AI',
    image: 'https://picsum.photos/seed/agentic-workflow/600/400',
  },
];

export const EXPERIENCE = [
  {
    company: 'EZData Advisory IT Services and Consulting Pvt Ltd',
    role: 'Data Engineer - Full Time',
    period: 'Nov 2025 – Dec 2025',
    location: 'Uttar Pradesh, India',
    highlights: [
      'Migrated legacy Azure Data Factory pipelines into scalable PySpark-based ETL frameworks on BigQuery and Incorta, enabling API-driven ingestion and fully automated refreshes.',
      'Built reusable Dataform SQLX models with incremental logic and dependency management, reducing duplicated transformation effort and improving consistency.',
      'Implemented data quality checks covering uniqueness, null handling, and referential integrity, significantly reducing downstream analytics issues.',
      'Delivered curated, analytics-ready datasets integrated with Looker, improving dashboard performance and analyst productivity.'
    ],
  },
  {
    company: 'Data Master Consulting Pvt Ltd',
    role: 'Data Engineer - Full Time',
    period: 'Nov 2023 – Oct 2025',
    location: 'Maharashtra, India',
    highlights: [
      'Designed and operated large-scale batch and near real-time data pipelines using Azure Data Factory, Databricks, Delta Live Tables, dbt, and Kafka.',
      'Ingested data from SAP HANA, APIs, SFTP, and enterprise systems into ADLS Gen2 with end-to-end automation.',
      'Architected Medallion (Bronze-Silver-Gold) data models with optimized partitioning, clustering, and caching, supporting 500K+ daily records.',
      'Built Spark ML pipelines on Azure Databricks for feature engineering, model training, and inference over 100GB+ datasets.',
      'Performed distributed hyperparameter tuning using Optuna and Ray Tune integrated with Spark ML workflows.',
      'Applied LoRA-based fine-tuning to adapt large language models for domain-specific document intelligence use cases.',
      'Designed Agentic AI workflows using LangGraph to orchestrate multi-step reasoning, tool execution, and data validation.',
      'Tracked experiments and model versions using MLflow and governed lifecycle management with Unity Catalog.',
      'Deployed models using Databricks Model Serving and Spark-based batch inference pipelines.',
      'Implemented CI/CD pipelines, monitoring, alerts, and SLA checks to ensure data reliability and production stability.'
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
    name: 'Machine Learning at Scale',
    issuer: 'Databricks',
    date: '2025',
    link: '#',
  },
  {
    name: 'Advanced Machine Learning Operations',
    issuer: 'Databricks',
    date: '2025',
    link: '#',
  },
  {
    name: 'Generative AI',
    issuer: 'Databricks',
    date: '2025',
    link: '#',
  },
  {
    name: 'Microsoft Fabric Training',
    issuer: 'Microsoft',
    date: '2024',
    link: '#',
  },
  {
    name: 'Azure Data Engineer Associate',
    issuer: 'Microsoft',
    date: 'In Progress',
    link: '#',
  },
];
