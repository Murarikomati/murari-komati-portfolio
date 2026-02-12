export const SKILLS = [
  // Cloud & Platforms
  { name: 'Azure (ADF, Databricks, Synapse)', category: 'Cloud Platforms', icon: 'Cloud' },
  { name: 'GCP (BigQuery, Dataform)', category: 'Cloud Platforms', icon: 'Globe' },
  { name: 'AWS', category: 'Cloud Platforms', icon: 'Server' },
  
  // Data Engineering
  { name: 'PySpark / Apache Spark', category: 'Data Engineering', icon: 'Zap' },
  { name: 'SQL / Spark SQL', category: 'Data Engineering', icon: 'Database' },
  { name: 'Delta Lake / Medallion Architecture', category: 'Data Engineering', icon: 'Workflow' },
  { name: 'Kafka', category: 'Data Engineering', icon: 'Activity' },
  
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
    description: 'Built a natural language interface for MS SQL databases using Python and LangChain. Translates user questions into SQL queries and returns results through a Streamlit UI, effectively bridging the gap between non-technical users and complex data.',
    tech: ['LangChain', 'Python', 'Streamlit', 'FAISS', 'MySQL'],
    category: 'GenAI',
    image: 'https://picsum.photos/seed/sql-chatbot/600/400',
  },
  {
    id: 2,
    title: 'CrewAI Job Search Assistant',
    description: 'Autonomous multi-agent system built with CrewAI and LangChain. Automates job discovery, resume optimization, and interview preparation by orchestrating multiple specialized AI agents for deep market analysis.',
    tech: ['CrewAI', 'LangChain', 'OpenAI API', 'Python', 'Pandas'],
    category: 'Agentic AI',
    image: 'https://picsum.photos/seed/crew-ai/600/400',
  },
  {
    id: 3,
    title: 'Intelligent Traffic Management System',
    description: 'Computer vision-based system that dynamically adjusts traffic signals based on real-time density. Built with OpenCV to process video feeds and optimize urban flow, reducing congestion in simulated environments.',
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
    highlights: [
      'Designed and implemented scalable ETL pipelines using Azure Data Factory and Databricks, ingesting data from SAP HANA and APIs into ADLS Gen2.',
      'Built near real-time pipelines with Kafka and Spark Structured Streaming, processing 100GB+ transactional data daily.',
      'Developed an end-to-end GenAI chatbot using LangChain and CrewAI, enabling context-aware Q&A via RAG architecture.',
      'Applied Delta Lake and SCD Type 2 logic for historical tracking and regulatory reporting.',
      'Created interactive Power BI dashboards surfacing Gold-layer data for executive insights.',
      'Integrated ML models into production using MLflow for versioning and deployment, increasing user engagement by 20%.'
    ],
  },
  {
    company: 'Data Master Consulting Pvt Ltd',
    role: 'Data Engineer Intern',
    period: 'Jan 2023 – July 2023',
    location: 'Maharashtra, India',
    highlights: [
      'Assisted in the development of automated data pipelines and basic data quality checks.',
      'Gained hands-on experience with Azure cloud services and SQL query optimization.'
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
