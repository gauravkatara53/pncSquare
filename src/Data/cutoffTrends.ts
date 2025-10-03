// Strong types for cutoff trends

export type CutoffDataType = {
  year: string;
  jeeMain: number;
  neet: number;
  cat: number;
  iit: number;
};

export type ExamCardType = {
  name: string;
  currentCutoff: string;
  previousCutoff: string;
  change: string;
  trending: "up" | "down"; // ✅ only allows these values
  color: string;
  bgColor: string;
  desc: string;
};

export const cutoffData: CutoffDataType[] = [
  {
    year: "2025",
    jeeMain: 93.1,
    neet: 144,
    cat: 99.8,
    iit: 74,
  },
  {
    year: "2024",
    jeeMain: 93.23,
    neet: 162,
    cat: 99.8,
    iit: 109,
  },
  {
    year: "2023",
    jeeMain: 90.78,
    neet: 137,
    cat: 99.7,
    iit: 86,
  },
  {
    year: "2022",
    jeeMain: 88.41,
    neet: 117,
    cat: 99.7,
    iit: 55,
  },
  {
    year: "2021",
    jeeMain: 87.9,
    neet: 138,
    cat: 99.6,
    iit: 63,
  },
];

export const examCards: ExamCardType[] = [
  {
    name: "JEE Main",
    currentCutoff: "93.10%",
    previousCutoff: "93.23%",
    change: "-0.14%",
    trending: "down",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    desc: "Qualifying Percentile (General/UR)",
  },
  {
    name: "NEET",
    currentCutoff: "144",
    previousCutoff: "162",
    change: "-11.11%",
    trending: "down",
    color: "text-green-600",
    bgColor: "bg-green-50",
    desc: "Qualifying Marks (General/UR, Govt. MBBS)",
  },
  {
    name: "CAT",
    currentCutoff: "99.8%",
    previousCutoff: "99.7%",
    change: "+0.1%",
    trending: "up",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    desc: "Top IIMs Final Cutoff",
  },
  {
    name: "IIT",
    currentCutoff: "74",
    previousCutoff: "109",
    change: "-30.34%",
    trending: "down",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    desc: "Qualifying Marks (General)",
  },
];
