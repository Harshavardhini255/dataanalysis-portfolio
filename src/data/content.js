const GH = 'https://github.com/Harshavardhini255'

export const meta = {
  firstName: 'Harsha',
  lastName: 'Vardhini',
  name: 'Harsha Vardhini',
  monogram: 'HV',
  role: 'Data Analyst',
  tagline: 'Python · SQL · Power BI · Business Intelligence',
  location: 'Tirunelveli, India',
  email: 'harshabalan205@gmail.com',
  phone: '+91 63833 70780',
  phoneRaw: '6383370780',
  github: GH,
  availability: 'Available for work',
}

export const about = {
  paragraphs: [
    `I am a junior data analyst with hands-on experience in data cleaning, exploratory data analysis, statistical modelling, Power BI dashboard development, and AI-driven analytics.`,
    `I work with Python, SQL, Excel, Power BI, and data-visualisation tools to transform raw datasets into meaningful business insights. My experience also spans conversational AI analytics with large language models, prompt engineering, data pipelines, and business-interestelligence reporting.`,
    `I enjoy studying data to identify patterns, understand business problems, and build interactive dashboards that support data-driven decisions.`,
  ],
}

export const capabilities = [
  {
    n: '01',
    title: 'Data Analytics',
    text: 'Data cleaning, wrangling, EDA, ETL, statistical analysis and insight generation from raw records.',
  },
  {
    n: '02',
    title: 'Business Intelligence',
    text: 'Interactive Power BI dashboards, KPI cards, DAX, slicers, drill-through reports and reporting.',
  },
  {
    n: '03',
    title: 'Python Analytics',
    text: 'Python-based analysis with Pandas, NumPy, Matplotlib and Seaborn for exploratory and statistical work.',
  },
  {
    n: '04',
    title: 'SQL & Databases',
    text: 'Querying, joins, subqueries, normalisation, query optimisation, DDL/DML and relational design.',
  },
  {
    n: '05',
    title: 'AI-Driven Analytics',
    text: 'Large language models, prompt engineering, conversational data analysis and AI-driven insights.',
  },
]

export const skillGroups = [
  {
    label: 'Programming',
    skills: ['Python', 'SQL', 'Java'],
  },
  {
    label: 'Data Analysis',
    skills: ['Pandas', 'NumPy', 'MS Excel', 'Data Cleaning', 'ETL', 'EDA', 'A/B Testing', 'Statistical Modelling'],
  },
  {
    label: 'Visualisation & BI',
    skills: ['Power BI', 'DAX', 'Power Query', 'KPI Cards', 'Slicers', 'Drill-through', 'Matplotlib', 'Seaborn', 'Tableau', 'Streamlit'],
  },
  {
    label: 'Databases & Cloud',
    skills: ['MySQL', 'BigQuery', 'Database Design', 'Query Optimisation', 'Data Pipelines'],
  },
  {
    label: 'AI & NLP',
    skills: ['LLMs', 'Prompt Engineering', 'Conversational AI', 'NLP', 'Machine Learning'],
  },
  {
    label: 'Tools',
    skills: ['Git', 'GitHub', 'Google Colab', 'Jupyter', 'VS Code'],
  },
]

export const experience = [
  {
    role: 'Data Analyst Intern',
    company: 'InGage Technologies Pvt Ltd',
    place: 'Chennai, India',
    period: 'Jun 2026 — Jul 2026',
    highlight: 'IoT Energy Analytics',
    bullets: [
      'Collected and structured IoT energy-consumption data using Wokwi and ThingSpeak.',
      'Cleaned, preprocessed and analysed the data with Python, Pandas and NumPy in Google Colab.',
      'Identified key KPIs and energy-usage patterns.',
      'Built interactive Power BI dashboards for energy-consumption trends and usage variation.',
      'Generated data-driven insights for energy management.',
    ],
  },
  {
    role: 'Data Analyst Intern',
    company: 'VOIS · AICTE Program',
    place: 'Remote',
    period: 'Sep 2025 — Oct 2025',
    highlight: 'Conversational AI Analytics',
    bullets: [
      'Performed conversational data analysis using LLMs and prompt engineering.',
      'Extracted AI-driven business insights from structured datasets.',
      'Delivered 15+ analytical reports to stakeholders.',
      'Analysed 50,000+ records using Python, Pandas, NumPy and SQL.',
      'Designed data-cleaning and transformation workflows.',
      'Improved data accuracy by 25%.',
    ],
  },
  {
    role: 'Data Analyst Intern',
    company: 'IPCS Global Pvt Ltd',
    place: 'Tirunelveli, India',
    period: 'Jul 2025 — Aug 2025',
    highlight: 'End-to-End Analytics',
    bullets: [
      'Performed end-to-end data cleaning, wrangling and EDA on business datasets.',
      'Resolved 200+ data-quality issues across multiple tables.',
      'Built interactive Power BI dashboards and visualisations.',
      'Used Matplotlib and Seaborn to analyse business trends.',
      'Applied descriptive statistics, statistical modelling and A/B testing.',
      'Supported a 20% improvement in business-performance reporting.',
    ],
  },
]

export const projects = [
  {
    n: '01',
    title: 'HR Analytics Dashboard',
    category: 'Analytics Platform',
    stack: 'Python · SQL · Excel · Power BI · Streamlit',
    year: '2026',
    img: 'w3',
    href: `${GH}/hr-analytics-dashboard`,
    desc: 'End-to-end HR analytics application covering ETL, attrition, performance and compensation KPIs with an interactive Streamlit explorer.',
  },
  {
    n: '02',
    title: 'Customer Churn Analysis',
    category: 'Predictive Analytics',
    stack: 'SQL · Python · Pandas · Power BI · Random Forest',
    year: '2026',
    img: 'w4',
    href: `${GH}/churn-analysis`,
    desc: 'Analysed customer behaviour to find churn drivers, build a Random Forest model and segment users by risk.',
  },
  {
    n: '03',
    title: 'Conversational Data Analytics',
    category: 'AI · NLP',
    stack: 'LLM · NLP · Prompt Engineering',
    year: '2025',
    img: 'w1',
    href: `${GH}/VOIS_AICTE_Oct2025_MajorProject_Harshavardini_S`,
    desc: 'AI-driven analytics that lets stakeholders query structured data in natural language and get automated insights.',
  },
  {
    n: '04',
    title: 'Blinkit Sales Dashboard',
    category: 'BI Dashboard',
    stack: 'Power BI · DAX · Data Modelling',
    year: '2025',
    img: 'w2',
    href: null,
    desc: 'Interactive dashboard analysing $1.2M in sales across 8,500+ SKUs, with KPI cards, DAX measures and four slicer dimensions.',
  },
  {
    n: '05',
    title: 'Netflix Content Analysis',
    category: 'Exploratory Analysis',
    stack: 'Python · Pandas · NumPy · Matplotlib · Seaborn',
    year: '2025',
    img: 'w3',
    href: null,
    desc: 'EDA over 8,800+ titles — trends, genres and release patterns with 10+ pipeline transformations and rich statistical plots.',
  },
  {
    n: '06',
    title: 'Flipkart Market Scraping',
    category: 'Web Scraping · ETL',
    stack: 'Python · Scraping · ETL · Power BI',
    year: '2025',
    img: 'w4',
    href: null,
    desc: 'Scraped product and pricing data, applied ETL and cleaning, then surfaced category trends in Power BI.',
  },
  {
    n: '07',
    title: 'Library Management System',
    category: 'Database Design',
    stack: 'SQL · MySQL',
    year: '2024',
    img: 'w2',
    href: null,
    desc: 'Normalised relational database with DDL/DML, key constraints, complex queries, optimisation and reporting workflows.',
  },
]

export const education = [
  {
    degree: 'B.E. Electronics & Communication',
    school: 'Government College of Engineering',
    place: 'Tirunelveli',
    period: '2023 — 2027',
    note: 'CGPA 8.1 / 10.0',
  },
  {
    degree: 'Higher Secondary Certificate',
    school: 'Mary Matha Matric Hr Sec School',
    place: 'Tirunelveli',
    period: 'Mar 2023',
    note: '90%',
  },
  {
    degree: 'Secondary School Certificate',
    school: 'Mary Matha Matric Hr Sec School',
    place: 'Tirunelveli',
    period: 'Mar 2021',
    note: '90%',
  },
]

export const certifications = [
  { title: 'Google Cloud Data Analytics', issuer: 'Google', date: 'May 2026' },
  { title: 'Data Visualisation: Empowering Business with Effective Insights', issuer: 'Tata Group / Forage', date: 'Apr 2026' },
  { title: 'Python for Data Visualization', issuer: 'Udemy', date: 'Jul 2025' },
  { title: 'Python for Data Analysis', issuer: 'Udemy', date: 'Jun 2025' },
  { title: 'SQL for Data Analytics', issuer: 'Udemy', date: 'May 2025' },
  { title: 'MS Excel', issuer: 'Microsoft', date: 'Apr 2025' },
]

export const interests = [
  'Data Analytics',
  'Business Intelligence',
  'Dashboard Development',
  'AI-Driven Analysis',
  'Statistical Modelling',
  'Large Language Models',
  'Database Management',
  'Query Optimisation',
  'Data Pipelines',
  'Data Engineering',
]

export const currentFocus = {
  heading: 'Current focus',
  statement: [
    'Building practical analytics solutions that combine data, visualisation, and AI to turn complex information into clear, useful insight.',
  ],
}

export const activities = [
  {
    title: 'National Service Scheme (NSS)',
    role: 'Active Member',
    place: 'Government College of Engineering, Tirunelveli',
  },
  {
    title: 'Symposium',
    role: 'Coordinator',
    place: 'Government College of Engineering, Tirunelveli',
  },
]