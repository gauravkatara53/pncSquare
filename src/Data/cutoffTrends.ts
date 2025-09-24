// Strong types for cutoff trends

export type CutoffDataType = {
  year: string;
  jeeMain: number;
  neet: number;
  cat: number;
  gate: number;
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
  { year: "2020", jeeMain: 90.37, neet: 147, cat: 99.5, gate: 28.5 },
  { year: "2021", jeeMain: 87.89, neet: 138, cat: 99.6, gate: 26.1 },
  { year: "2022", jeeMain: 88.41, neet: 117, cat: 99.7, gate: 25.0 },
  { year: "2023", jeeMain: 90.77, neet: 137, cat: 99.7, gate: 32.5 },
  { year: "2024", jeeMain: 93.23, neet: 162, cat: 99.8, gate: 29.2 },
];

export const examCards: ExamCardType[] = [
  {
    name: "JEE Main",
    currentCutoff: "93.23%",
    previousCutoff: "90.77%",
    change: "+2.7%",
    trending: "up",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    desc: "Qualifying Percentile (General/UR)",
  },
  {
    name: "NEET",
    currentCutoff: "162",
    previousCutoff: "137",
    change: "+18.2%",
    trending: "up",
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
  // {
  //   name: "GATE",
  //   currentCutoff: "29.2",
  //   previousCutoff: "32.5",
  //   change: "-10.1%",
  //   trending: "down",
  //   color: "text-orange-600",
  //   bgColor: "bg-orange-50",
  //   desc: "Qualifying Marks (General, CSE)",
  // },
];
