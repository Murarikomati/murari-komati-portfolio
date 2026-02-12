export const SKILLS = [
  { name: 'PySpark / Spark', category: 'Big Data & ETL', icon: 'Zap' },
  { name: 'Delta Lake / DLT', category: 'Big Data & ETL', icon: 'Database' },
  { name: 'Airflow / dbt Core', category: 'Big Data & ETL', icon: 'Workflow' },
  { name: 'Azure (Databricks, ADF)', category: 'Cloud Platforms', icon: 'Cloud' },
  { name: 'GCP (BigQuery, Dataform)', category: 'Cloud Platforms', icon: 'Globe' },
  { name: 'Kafka / Event Hub', category: 'Streaming', icon: 'Activity' },
  { name: 'Medallion Architecture', category: 'Data Modeling', icon: 'Layers' },
  { name: 'Kimball / SCD 1/2', category: 'Data Modeling', icon: 'GitGraph' },
  { name: 'Python / SQL', category: 'Languages', icon: 'Code' },
  { name: 'Power BI / Looker', category: 'Visualization', icon: 'BarChart' },
];

export const PROJECTS = [
  {
    id: 1,
    title: 'Real-Time Movie Analytics ELT Platform',
    description: 'Designed and implemented a scalable cloud-native ELT platform (Netflix-style) using Amazon S3, Snowflake, and dbt to process large-scale movie metadata, ratings, and user interaction datasets. Built raw, staging, and analytics-ready layers using dimensional models based on Kimball star schema principles.',
    tech: ['Amazon S3', 'Snowflake', 'dbt', 'Kimball Schema', 'Data Governance'],
    category: 'Big Data',
    image: 'https://picsum.photos/seed/movie-analytics/600/400',
  },
  {
    id: 2,
    title: 'Real-Time Stock Market Data Pipeline',
    description: 'Developed near real-time streaming ingestion pipelines using Azure Event Hub to process high-frequency stock market data. Implemented anomaly detection and automated alerting mechanisms, reducing analyst response time by 50%. Integrated streaming outputs with SQL Server and Microsoft Fabric.',
    tech: ['Azure Event Hub', 'Microsoft Fabric', 'SQL Server', 'Streaming', 'Anomaly Detection'],
    category: 'FinTech',
    image: 'https://picsum.photos/seed/stock-pipeline/600/400',
  },
  {
    id: 3,
    title: 'CrewAI Job Search Assistant',
    description: 'Autonomous LLM-powered agents built with CrewAI and LangChain to discover jobs, optimize resumes, and prepare for interviews. Uses a smart multi-agent system for personalized career optimization.',
    tech: ['CrewAI', 'LangChain', 'OpenAI', 'Python', 'Pandas'],
    category: 'Agentic AI',
    image: 'https://picsum.photos/seed/agent-job-search/600/400',
  },
];

export const EXPERIENCE = [
  {
    company: 'EZData Advisory IT Services and Consulting Pvt Ltd',
    role: 'Data Engineer - Full Time',
    period: 'Nov 2025 – Dec 2025',
    location: 'Uttar Pradesh, India',
    highlights: [
      'Migrated legacy ADF pipelines to PySpark-based ETL frameworks on Incorta and BigQuery, enabling API-driven ingestion and eliminating manual pipeline maintenance by 100%.',
      'Built reusable Dataform SQLX models, functions, and dependency chains, reducing duplicate transformation logic by 40%.',
      'Implemented data quality checks (uniqueness, not_null, referential integrity) and incremental load frameworks, reducing data issues reported by 35%.',
      'Delivered curated, analytics-ready datasets to BigQuery and integrated with Looker, improving dashboard query performance by 30%.'
    ],
  },
  {
    company: 'Data Master Consulting Pvt Ltd',
    role: 'Data Engineer - Full Time',
    period: 'Nov 2023 – Oct 2025',
    location: 'Maharashtra, India',
    highlights: [
      'Designed and delivered batch and real-time ETL pipelines using Azure Data Factory, Databricks, DBT Cloud, Delta Live Tables, and Kafka, automating ingestion from SAP HANA, SFTP, and APIs with 100% automation.',
      'Architected and optimized Medallion Architecture (Bronze-Silver-Gold) using partitioning, liquid clustering, and caching, improving query performance by 70% and supporting 500K+ daily transactions.',
      'Processed 100GB+ datasets using PySpark and Spark SQL (broadcast joins, predicate pushdown), reducing compute costs by 30%.',
      'Implemented CI/CD pipelines using Azure DevOps YAML across Dev-QA-Prod environments, reducing deployment effort by 45%.',
      'Delivered Power BI dashboards and curated Gold-layer datasets, improving sales and financial insights by 40%.',
      'Automated pipeline monitoring and alerting using ADF triggers and ServiceNow, implementing dbt freshness checks for SLA adherence.'
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
