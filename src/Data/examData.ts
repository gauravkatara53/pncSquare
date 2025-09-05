export interface ExamData {
  id: number;
  name: string;
  logo: string;
  level: string;
  date: string;
  registrationDate: string;
  category: string;
  conductedBy: string;
  overview: string;
  eligibility: string;
  syllabus: string;
  cutoff: string;
  register?: string;
}

export const examData: ExamData[] = [
  {
    id: 1,
    name: "JEE Advanced",
    logo: "https://jeeadv.ac.in/images/logo2025.png",
    level: "National",
    date: "June 4, 2024",
    registrationDate: "April 30 - May 9, 2024",
    category: "Engineering",
    conductedBy: "IIT Delhi (2024)",
    overview:
      "JEE Advanced is conducted for admission to the Indian Institutes of Technology (IITs). Only top candidates from JEE Main are eligible.",
    eligibility:
      "Candidates must qualify JEE Main and rank among the top 2.5 lakh candidates.",
    syllabus:
      "Physics, Chemistry, Mathematics (Class 11 & 12 NCERT level with advanced problem solving).",
    cutoff: "Varies every year across IITs and categories.",
    register: "https://jeeadv.ac.in/",
  },
  {
    id: 2,
    name: "JEE Main",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP4ZJKjjeMl88NzYsFu42WqQYwvMMkEexUtQ&s",
    level: "National",
    date: "January & April 2024 ",
    registrationDate: "Nov 2023 (Session 1), Feb 2024 (Session 2)",
    category: "Engineering",
    conductedBy: "NTA",
    overview:
      "JEE Main is conducted for admission to NITs, IIITs, GFTIs and also acts as a qualifying exam for JEE Advanced.",
    eligibility: "Class 12 pass/appearing with PCM. No age limit.",
    syllabus: "Physics, Chemistry, Mathematics (NCERT + higher level).",
    register: "https://jeemain.nta.nic.in/",
    cutoff: "NITs/IIITs cutoff varies, used for JEE Advanced eligibility.",
  },
  {
    id: 3,
    name: "NEET-UG",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTojOxybPKN-X3ZBl29AoEZrFTADChDVfeYfz712plAKwPZLwbJvk5PEEdNJgDZBKsXnVM&usqp=CAU",
    level: "National",
    date: "May 7, 2024",
    registrationDate: "March - April 2024",
    category: "Medical",
    conductedBy: "NTA",
    overview:
      "NEET UG is the single entrance exam for admission to MBBS, BDS, AYUSH and other medical courses across India.",
    eligibility: "Class 12 with PCB and English. Min age 17 years.",
    syllabus: "Physics, Chemistry, Biology (NCERT Class 11 & 12).",
    register: "https://neet.nta.nic.in/",
    cutoff: "Varies yearly, approx 50th percentile for general category.",
  },
  {
    id: 4,
    name: "CLAT",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgM4DBkYcYX98avQs1_rmS9zdsWs1T0yLsUfEddvQnSeF_mGzfjtbZOR44Z7WoFypbLKo&usqp=CAU",
    level: "National",
    date: "December 3, 2023",
    registrationDate: "July - November 2023",
    category: "Law",
    conductedBy: "Consortium of NLUs",
    overview:
      "Common Law Admission Test (CLAT) is conducted for admission to undergraduate and postgraduate law programs in NLUs and other law colleges.",
    eligibility: "10+2 with minimum 45% (UG). LL.B. degree for PG.",
    syllabus:
      "English, Current Affairs, Legal Reasoning, Logical Reasoning, Quantitative Techniques.",
    register: "https://consortiumofnlus.ac.in/",
    cutoff: "NLU cutoffs vary by category and state quota.",
  },
  {
    id: 5,
    name: "CAT",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpSfbOHs6RWgUr4FIOuiyn5R1cwo6UBtmGbQ&s",
    level: "National",
    date: "November 26, 2023",
    registrationDate: "August - September 2023",
    category: "Management",
    conductedBy: "IIMs (rotational)",
    overview:
      "Common Admission Test (CAT) is for admission to MBA/PGDM programs in IIMs and many top B-schools in India.",
    eligibility: "Bachelor’s degree with 50% (45% for reserved).",
    register: "https://iimcat.ac.in/",
    syllabus: "VARC, DILR, Quantitative Aptitude.",
    cutoff: "IIMs generally require 95+ percentile (general).",
  },
  {
    id: 6,
    name: "GATE",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxzbYGGBPX45lLObLhiTNVq4Cjpd-Y6MXKzg&s",
    level: "National",
    date: "February 2024",
    registrationDate: "Aug - Oct 2023",
    category: "Engineering/PG",
    conductedBy: "IISc/IITs (rotational)",
    overview:
      "Graduate Aptitude Test in Engineering (GATE) is conducted for admission to M.Tech/PhD programs and PSU recruitments.",
    eligibility:
      "Bachelor’s degree in engineering/science. Final year students eligible.",
    register: "https://gate.iitb.ac.in/",
    syllabus: "Subject-specific + General Aptitude.",
    cutoff: "Depends on stream, usually 25-35 marks out of 100.",
  },
  {
    id: 7,
    name: "NIFT Entrance Exam",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLlTPwG5efI-dHsPQLzUQHMuid4qEtqxSD7gxHCnQPzJVyWKGKpmZYQAz8xZ5R1x8jMdc&usqp=CAU",
    level: "National",
    date: "February 2024",
    registrationDate: "Nov 2023 - Jan 2024",
    category: "Design",
    conductedBy: "National Institute of Fashion Technology",
    overview:
      "NIFT exam is conducted for admission into design and fashion technology programs offered by NIFTs.",
    eligibility: "10+2 for UG, Graduation for PG.",
    syllabus: "Creative Ability Test, General Ability Test, Situation Test.",
    cutoff: "Depends on course and campus.",
    register: "https://nift.ac.in/",
  },
  {
    id: 8,
    name: "CUET-UG",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpQKeyeYe-dq4Hxbg8SkSFlhwUb5HXcS6wag&s",
    level: "National",
    date: "May - June 2024",
    registrationDate: "Feb - March 2024",
    category: "All UG Courses",
    conductedBy: "NTA",
    overview:
      "Common University Entrance Test (CUET-UG) is for admission into central, state, deemed and private universities across India.",
    eligibility: "10+2 pass/appearing.",
    syllabus: "Language, Subject-Specific Tests, General Test.",
    cutoff: "University-wise cutoff varies.",
    register: "https://cuet.samarth.ac.in/",
  },
];
