export const SKILLS = [
  { name: 'Azure Data Factory', category: 'Cloud ETL', icon: 'Cloud' },
  { name: 'Azure Databricks', category: 'Big Data', icon: 'Cpu' },
  { name: 'Azure Synapse', category: 'Analytics', icon: 'BarChart' },
  { name: 'AWS Redshift', category: 'Warehousing', icon: 'Database' },
  { name: 'Google BigQuery', category: 'Warehousing', icon: 'Database' },
  { name: 'Apache Spark', category: 'Processing', icon: 'Zap' },
  { name: 'Apache Kafka', category: 'Streaming', icon: 'Activity' },
  { name: 'Python / PySpark', category: 'Languages', icon: 'Code' },
  { name: 'SQL', category: 'Languages', icon: 'Database' },
  { name: 'Terraform', category: 'Infrastructure', icon: 'Terminal' },
];

export const PROJECTS = [
  {
    id: 1,
    title: 'High-Throughput Fraud Detection',
    description: 'Designed a sub-second latency streaming pipeline processing 1M+ events/min. Reduced fraudulent transaction loss by 22% using Kafka and Spark Structured Streaming.',
    tech: ['Kafka', 'Spark', 'Python', 'AWS'],
    category: 'Streaming',
    image: 'https://picsum.photos/seed/p1/600/400',
  },
  {
    id: 2,
    title: 'Enterprise Data Lakehouse Migration',
    description: 'Lead the architectural migration of 500TB+ legacy on-prem data to Azure Medallion architecture (Delta Lake). Improved query performance by 40% using Databricks SQL.',
    tech: ['Azure', 'Databricks', 'ADF', 'SQL'],
    category: 'Cloud Migration',
    image: 'https://picsum.photos/seed/p2/600/400',
  },
  {
    id: 3,
    title: 'Supply Chain Optimization Engine',
    description: 'Built an end-to-end ELT framework for a global retailer. Unified data from 12+ sources into BigQuery, enabling real-time inventory tracking for 1,000+ stores.',
    tech: ['GCP', 'BigQuery', 'Python', 'Airflow'],
    category: 'Analytics',
    image: 'https://picsum.photos/seed/p3/600/400',
  },
];

export const EXPERIENCE = [
  {
    company: 'Global Data Solutions',
    role: 'Senior Data Engineer',
    period: '2021 - Present',
    description: 'Architecting multi-cloud data platforms for Fortune 500 clients. Mentoring a team of 5 engineers in modern DataOps practices.',
  },
  {
    company: 'TechFlow Analytics',
    role: 'Data Engineer',
    period: '2019 - 2021',
    description: 'Optimized healthcare ETL pipelines, reducing processing costs by 30% through Spark performance tuning and resource scaling.',
  },
  {
    company: 'Innovative Startups',
    role: 'Junior Data Engineer',
    period: '2017 - 2019',
    description: 'Automated 50+ manual data collection processes, saving 20+ man-hours per week for the business intelligence team.',
  },
];

export const CERTIFICATIONS = [
  {
    name: 'Microsoft Certified: Azure Data Engineer Associate',
    issuer: 'Microsoft',
    date: '2023',
    link: '#',
  },
  {
    name: 'Databricks Certified Data Engineer Professional',
    issuer: 'Databricks',
    date: '2023',
    link: '#',
  },
  {
    name: 'Google Cloud Professional Data Engineer',
    issuer: 'Google',
    date: '2022',
    link: '#',
  },
];
