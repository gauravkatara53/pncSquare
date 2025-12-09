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
  extraDates?: string[];
}

export const examData: ExamData[] = [
  {
    id: 1,
    name: "JEE Advanced",
    logo: "https://ik.imagekit.io/ak2ol9uti/logo/jee-adv-2026png",
    level: "National",
    date: "May 17, 2026",
    registrationDate: "April 2026 (exact dates to be announced)",
    category: "Engineering",
    conductedBy: "IIT Roorkee (2026)",
    overview:
      "JEE Advanced 2026 is conducted for admission to the Indian Institutes of Technology (IITs). Only top candidates from JEE Main 2026 are eligible.",
    eligibility:
      "Candidates must qualify JEE Main 2026 and rank among the top 2.5 lakh candidates (as per official criteria).",
    syllabus:
      "Physics, Chemistry, Mathematics (Class 11 & 12 level with advanced problem solving, as per latest JEE Advanced 2026 information brochure).",
    cutoff:
      "Varies every year across IITs, branches, and categories; 2026 cutoffs will be released after results.",
    register: "https://jeeadv.ac.in/",
    extraDates: ["Result: June 2026 (expected)"],
  },
  {
    id: 2,
    name: "JEE Main",
    logo: "https://ik.imagekit.io/ak2ol9uti/logo/jee-main.png",
    level: "National",
    date: "Session 1: January 21–30, 2026; Session 2: April 2–9, 2026",
    registrationDate:
      "Session 1: November–December 2025; Session 2: February–March 2026 (as per NTA schedule)",
    category: "Engineering",
    conductedBy: "NTA",
    overview:
      "JEE Main 2026 is conducted for admission to NITs, IIITs, GFTIs and also acts as the qualifying exam for JEE Advanced 2026.",
    eligibility:
      "Class 12 pass/appearing with PCM and other criteria as per the latest JEE Main 2026 information bulletin; no separate age limit specified by NTA (subject to institute rules).",
    syllabus:
      "Physics, Chemistry, Mathematics (largely based on Class 11 & 12 syllabus as notified in the JEE Main 2026 brochure).",
    register: "https://jeemain.nta.nic.in/",
    cutoff:
      "NITs/IIITs cutoffs and JEE Main qualifying percentile for JEE Advanced vary each year and will be released after the 2026 sessions.",
    extraDates: [
      "Session 1 result: February 2026 (expected)",
      "Session 2 result: April 20, 2026 (expected)",
    ],
  },
  {
    id: 3,
    name: "NEET-UG",
    logo: "https://ik.imagekit.io/ak2ol9uti/logo/neet-ug.png?tr=w-2000",
    level: "National",
    date: "May 3, 2026 (tentative – first Sunday of May)",
    registrationDate: "February–March 2026 (expected, as per NTA schedule)",
    category: "Medical",
    conductedBy: "NTA",
    overview:
      "NEET UG 2026 is the single entrance exam for admission to MBBS, BDS, AYUSH and other undergraduate medical courses in India.",
    eligibility:
      "Class 12 with Physics, Chemistry, Biology/Biotechnology and English, with minimum marks and age criteria as per the latest NEET UG 2026 notification.",
    syllabus:
      "Physics, Chemistry, Biology (largely based on Class 11 & 12 syllabus; detailed topics will be given in the NEET UG 2026 information bulletin).",
    register: "https://neet.nta.nic.in/",
    cutoff:
      "NEET UG cutoff (score and percentile) varies each year by category and will be notified with NEET 2026 results.",
    extraDates: [
      "Answer key: May 2026 (expected)",
      "Result: June 2026 (expected)",
    ],
  },
  {
    id: 4,
    name: "CLAT",
    logo: "https://ik.imagekit.io/ak2ol9uti/logo/cat-lgo.png",
    level: "National",
    date: "December 2025 / January 2026 (exact CLAT 2026 date to be checked from official schedule)",
    registrationDate:
      "Expected between July–November 2025 (for the CLAT 2026 cycle, as per Consortium pattern)",
    category: "Law",
    conductedBy: "Consortium of NLUs",
    overview:
      "Common Law Admission Test (CLAT) is conducted for admission to undergraduate and postgraduate law programmes offered by NLUs and many affiliated law colleges.",
    eligibility:
      "For CLAT UG: 10+2 or equivalent with minimum percentage as notified; for CLAT PG: LL.B. or equivalent law degree, with minimum marks as per latest brochure.",
    syllabus:
      "For CLAT UG: English, Current Affairs including General Knowledge, Legal Reasoning, Logical Reasoning, and Quantitative Techniques, as per the latest pattern.",
    register: "https://consortiumofnlus.ac.in/",
    cutoff:
      "NLU-wise and category-wise CLAT cutoffs change every year and are released after counselling.",
    extraDates: ["Counselling: after declaration of CLAT 2026 result"],
  },
  {
    id: 5,
    name: "CAT",
    logo: "https://ik.imagekit.io/ak2ol9uti/logo/cat%202025.png",
    level: "National",
    date: "Late November 2026 (expected, based on IIM CAT pattern)",
    registrationDate: "August–September 2026 (tentative)",
    category: "Management",
    conductedBy: "IIMs (rotational)",
    overview:
      "Common Admission Test (CAT) is conducted for admission to MBA/PGDM and related management programmes in IIMs and many top B-schools in India.",
    eligibility:
      "Bachelor’s degree with at least 50% marks (45% for reserved categories) or equivalent CGPA, or as per the latest CAT 2026 notification.",
    register: "https://iimcat.ac.in/",
    syllabus:
      "VARC (Verbal Ability & Reading Comprehension), DILR (Data Interpretation & Logical Reasoning), and Quantitative Aptitude as per the latest CAT pattern.",
    cutoff:
      "IIMs typically require high percentiles (often 95+ for general category in top IIMs), with institute-wise variation for 2026.",
  },
  {
    id: 6,
    name: "GATE",
    logo: "https://ik.imagekit.io/ak2ol9uti/logo/gate-2026.png",
    level: "National",
    date: "February 2026 (exact dates to be notified in GATE 2026 schedule)",
    registrationDate: "August–October 2025 (expected)",
    category: "Engineering/PG",
    conductedBy: "IISc/IITs (rotational)",
    overview:
      "Graduate Aptitude Test in Engineering (GATE) 2026 is conducted for admission to M.Tech/PhD programmes and for recruitment in various PSUs.",
    eligibility:
      "Bachelor’s degree in engineering/technology/science/related disciplines or in the final year, as per the latest GATE 2026 eligibility criteria.",
    register: "https://gate.iitk.ac.in/",
    syllabus:
      "Paper-specific engineering/science syllabus plus General Aptitude, as provided in the official GATE 2026 brochure.",
    cutoff:
      "Qualifying marks differ by paper and category; GATE 2026 cutoffs will be published after result declaration.",
    extraDates: ["Result: March 2026 (expected)"],
  },
  {
    id: 7,
    name: "NIFT Entrance Exam",
    logo: "https://ik.imagekit.io/ak2ol9uti/logo/meft.png",
    level: "National",
    date: "February 8, 2026",
    registrationDate:
      "November 2025 – early January 2026 (as per NIFT 2026 notification)",
    category: "Design",
    conductedBy: "National Testing Agency for NIFT",
    overview:
      "The NIFT Entrance Exam 2026 is conducted for admission into design and fashion technology programmes offered by National Institute of Fashion Technology campuses.",
    eligibility:
      "For UG: 10+2 or equivalent from a recognised board; for PG: a relevant undergraduate degree, with detailed criteria in the NIFT 2026 prospectus.",
    syllabus:
      "Creative Ability Test (CAT), General Ability Test (GAT), and Situation Test/Studio Test or interviews for some PG programmes, as per NIFT 2026 pattern.",
    cutoff:
      "Course- and campus-wise NIFT ranks/cutoffs are released after results and counselling each year.",
    register: "https://www.nift.ac.in/",
    extraDates: [
      "Admit card: January 2026 (expected)",
      "Stage 2 (interviews/studio test): May–June 2026 (tentative)",
    ],
  },
  {
    id: 8,
    name: "CUET-UG",
    logo: "https://ik.imagekit.io/ak2ol9uti/logo/cuet.png",
    level: "National",
    date: "May–June 2026 (tentative CUET UG 2026 exam window)",
    registrationDate: "March 2026 (application window expected in early March)",
    category: "All UG Courses",
    conductedBy: "NTA",
    overview:
      "Common University Entrance Test (CUET-UG) 2026 is conducted for admission to undergraduate programmes in central, state, deemed and participating private universities across India.",
    eligibility:
      "10+2 pass/appearing in 2026, with subject-specific requirements and minimum marks as per participating universities and the CUET UG 2026 information bulletin.",
    syllabus:
      "Language tests, domain-specific subject tests, and a general test (covering GK, reasoning, and basic mathematics), as per the latest CUET UG 2026 pattern.",
    cutoff:
      "University- and programme-wise CUET UG 2026 cutoffs will be released separately by participating institutions.",
    register: "https://cuet.samarth.ac.in/",
    extraDates: [
      "Result: July 2026 (tentative, as per current CUET UG schedule)",
    ],
  },
];
