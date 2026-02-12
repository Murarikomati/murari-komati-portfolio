export const SKILLS = [
  { name: 'Azure Data Factory', category: 'ETL', icon: 'Cloud' },
  { name: 'AWS Redshift', category: 'Data Warehouse', icon: 'Database' },
  { name: 'Google BigQuery', category: 'Data Warehouse', icon: 'Database' },
  { name: 'Apache Spark', category: 'Processing', icon: 'Zap' },
  { name: 'Databricks', category: 'Processing', icon: 'Cpu' },
  { name: 'Python', category: 'Languages', icon: 'Code' },
  { name: 'PySpark', category: 'Languages', icon: 'Code' },
  { name: 'SQL', category: 'Languages', icon: 'Database' },
  { name: 'Kafka', category: 'Streaming', icon: 'Activity' },
  { name: 'Azure Synapse', category: 'Analytics', icon: 'BarChart' },
];

export const PROJECTS = [
  {
    id: 1,
    title: 'Real-time Fraud Detection Pipeline',
    description: 'Built a high-throughput streaming pipeline using Kafka and Spark Streaming to detect fraudulent transactions in sub-seconds.',
    tech: ['Kafka', 'Spark', 'Python', 'AWS'],
    category: 'Streaming',
    image: 'https://picsum.photos/seed/p1/600/400',
  },
  {
    id: 2,
    title: 'Enterprise Data Lake Migration',
    description: 'Architected and executed the migration of 500TB+ on-prem data to Azure Data Lake Storage using ADF and Databricks.',
    tech: ['Azure', 'Databricks', 'ADF', 'SQL'],
    category: 'Cloud Migration',
    image: 'https://picsum.photos/seed/p2/600/400',
  },
  {
    id: 3,
    title: 'Supply Chain Analytics Engine',
    description: 'Developed an end-to-end analytics platform to optimize logistics and inventory management using BigQuery and Python.',
    tech: ['GCP', 'BigQuery', 'Python', 'Looker'],
    category: 'Analytics',
    image: 'https://picsum.photos/seed/p3/600/400',
  },
];

export const EXPERIENCE = [
  {
    company: 'Tech Giants Inc.',
    role: 'Senior Data Engineer',
    period: '2021 - Present',
    description: 'Leading data architecture for global cloud infrastructure projects.',
  },
  {
    company: 'DataFlow Systems',
    role: 'Data Engineer',
    period: '2019 - 2021',
    description: 'Designed scalable ETL pipelines for healthcare data analysis.',
  },
  {
    company: 'InnoStream startups',
    role: 'Junior Data Engineer',
    period: '2017 - 2019',
    description: 'Automated data collection and cleaning processes using Python.',
  },
];