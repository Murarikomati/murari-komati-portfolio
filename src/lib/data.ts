export const SKILLS = [
  { name: 'Azure Databricks', category: 'Cloud Platforms', icon: 'Cpu' },
  { name: 'Azure Data Factory', category: 'Cloud ETL', icon: 'Cloud' },
  { name: 'Python / SQL', category: 'Languages', icon: 'Code' },
  { name: 'PySpark / Spark', category: 'Data Engineering', icon: 'Zap' },
  { name: 'LangChain / CrewAI', category: 'GenAI & Agentic AI', icon: 'Bot' },
  { name: 'Delta Lake / DLT', category: 'Data Engineering', icon: 'Database' },
  { name: 'Apache Kafka', category: 'Streaming', icon: 'Activity' },
  { name: 'MLflow / Unity Catalog', category: 'MLOps', icon: 'Settings' },
  { name: 'Microsoft Fabric', category: 'Cloud Platforms', icon: 'Box' },
  { name: 'OpenCV / Pygame', category: 'Computer Vision', icon: 'Eye' },
];

export const PROJECTS = [
  {
    id: 1,
    title: 'Customer Service ChatBot',
    description: 'Natural Language Interface for Databases using Python and LangChain. Translates questions to SQL queries and returns results via Streamlit UI. Enabling context-aware Q&A from PDFs and databases via RAG architecture.',
    tech: ['LangChain', 'Python', 'Streamlit', 'MySQL', 'FAISS'],
    category: 'Gen AI',
    image: 'https://picsum.photos/seed/chatbot-sql-data/600/400',
  },
  {
    id: 2,
    title: 'CrewAI Job Search Assistant',
    description: 'Autonomous LLM-powered agents built with CrewAI and LangChain to discover jobs, optimize resumes, and prepare for interviews. Uses a smart multi-agent system for personalized career optimization.',
    tech: ['CrewAI', 'LangChain', 'OpenAI', 'Python', 'Pandas'],
    category: 'Agentic AI',
    image: 'https://picsum.photos/seed/agent-job-search/600/400',
  },
  {
    id: 3,
    title: 'Traffic Management System',
    description: 'Intelligent system that dynamically adjusts traffic signals based on real-time traffic density using computer vision techniques. Built with OpenCV and Python for smart city infrastructure.',
    tech: ['Python', 'OpenCV', 'Pygame', 'Numpy', 'Image Processing'],
    category: 'Computer Vision',
    image: 'https://picsum.photos/seed/smart-traffic-vision/600/400',
  },
];

export const EXPERIENCE = [
  {
    company: 'Data Master Consulting Pvt Ltd',
    role: 'Data Engineer (Full-Time & Intern)',
    period: 'Aug 2023 – Apr 2024',
    description: 'Designed and implemented scalable ETL pipelines using Azure Data Factory and Databricks. Built near real-time pipelines with Kafka processing 100GB+ daily. Developed end-to-end GenAI solutions with LangChain and CrewAI.',
  },
  {
    company: 'EZData Advisory IT Services',
    role: 'Data Engineer Associate',
    period: 'Jan 2023 – July 2023',
    description: 'Migrated legacy pipelines to scalable PySpark frameworks on BigQuery. Built reusable Dataform models with incremental logic.',
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
    issuer: 'EDX / IBM',
    date: '2022',
    link: '#',
  },
];
