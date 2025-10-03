import { BookOpen, GraduationCap, Stethoscope } from "lucide-react";

// JEE Advanced Data
export const jeeAdvancedTrends = [
  { year: "2019", general: 25000, obc: 18000, sc: 8000, st: 4000 },
  { year: "2020", general: 23000, obc: 16500, sc: 7500, st: 3800 },
  { year: "2021", general: 24500, obc: 17200, sc: 7800, st: 4100 },
  { year: "2022", general: 22000, obc: 15800, sc: 7200, st: 3600 },
  { year: "2023", general: 18156, obc: 9728, sc: 4170, st: 1668 },
];

// JEE Main Data
export const jeeMainTrends = [
  {
    year: "2021",
    general: 87.8992241,
    obc: 46.8825338,
    sc: 34.6728999,
    st: 38.52,
  },
  {
    year: "2022",
    general: 88.4121383,
    obc: 67.0090297,
    sc: 43.0820954,
    st: 26.7771328,
  },
  {
    year: "2023",
    general: 90.7788642,
    obc: 73.6114227,
    sc: 51.9776027,
    st: 37.2348772,
  },
  {
    year: "2024",
    general: 93.2362181,
    obc: 79.6757881,
    sc: 60.0923182,
    st: 46.697584,
  },
  {
    year: "2025",
    general: 93.1023262,
    obc: 79.4313582,
    sc: 61.1526933,
    st: 47.9026465,
  },
];

// NEET Data
export const neetTrends = [
  { year: "2021", general: 117, obc: 93, sc: 93, st: 93 },
  { year: "2022", general: 117, obc: 93, sc: 93, st: 93 },
  { year: "2023", general: 137, obc: 107, sc: 107, st: 107 },
  { year: "2024", general: 162, obc: 127, sc: 127, st: 127 },
  { year: "2025", general: 144, obc: 113, sc: 113, st: 113 },
];

export const examData = {
  "JEE-Advanced": {
    name: "JEE Advanced",
    icon: GraduationCap,
    description: "All India Rank based cutoffs for IIT admissions",
    trendData: jeeAdvancedTrends,
    yAxisLabel: "Rank",
    formatValue: (value: number) => `${value}`,
    currentYear: {
      general: 18156,
      obc: 9728,
      sc: 4170,
      st: 1668,
      change: { general: -2.3, obc: -1.9, sc: -2.8, st: -2.9 },
    },
  },
  "JEE-Main": {
    name: "JEE Main",
    icon: BookOpen,
    description: "Percentile based cutoffs for NIT, IIIT admissions",
    trendData: jeeMainTrends,
    yAxisLabel: "Percentile",
    formatValue: (value: number) => `${value}%`,
    currentYear: {
      general: 93.1,
      obc: 79.4,
      sc: 61.1,
      st: 47.9,
      change: { general: -0.1, obc: 4.0, sc: 7.5, st: 8.5 },
    },
  },
  NEET: {
    name: "NEET",
    icon: Stethoscope,
    description: "Score based cutoffs for medical college admissions",
    trendData: neetTrends,
    yAxisLabel: "Score",
    formatValue: (value: number) => `${value}`,
    currentYear: {
      general: 715,
      obc: 675,
      sc: 565,
      st: 545,
      change: { general: 0, obc: -0.7, sc: -0.9, st: -0.9 },
    },
  },
};

export const jeeAdvancedColleges = [
  {
    college: "IIT Delhi",
    cse: 126,
    ee: 605,
    me: 1862,
    ce: 4302,
    ranking: "#2",
  },
  {
    college: "IIT Bombay",
    cse: 66,
    ee: 433,
    me: 1834,
    ce: 4250,
    ranking: "#3",
  },

  {
    college: "IIT Kanpur",
    cse: 271,
    ee: 1146,
    me: 2771,
    ce: 6161,
    ranking: "#4",
  },
  {
    college: "IIT Kharagpur",
    cse: 466,
    ee: 1985,
    me: 4016,
    ce: 7774,
    ranking: "#5",
  },
  {
    college: "IIT Roorkee",
    cse: 592,
    ee: 2091,
    me: 3897,
    ce: 6870,
    ranking: "#6",
  },
];

export const jeeMainColleges = [
  {
    college: "NIT Trichy",
    cse: 99.9,
    ee: 99.5,
    me: 99.3,
    ce: 98.2,
    ranking: "#9",
  },
  {
    college: "NIT Surathkal",
    cse: 99.8,
    ee: 99.5,
    me: 99.2,
    ce: 98.4,
    ranking: "#17",
  },
  {
    college: "NIT Calicut",
    cse: 99.6,
    ee: 98.9,
    me: 99.1,
    ce: null,
    ranking: "#21",
  },
  {
    college: "NIT Warangal",
    cse: 99.8,
    ee: 99.3,
    me: 99.0,
    ce: 98.9,
    ranking: "#28",
  },
  {
    college: "IIIT Hyderabad",
    cse: 99.9,
    ee: null,
    me: null,
    ce: null,
    ranking: "#38",
  },
];

export const neetColleges = [
  { college: "AIIMS Delhi", mbbs: 710, bds: null, ranking: "#1" },
  { college: "AIIMS Mumbai", mbbs: 695, bds: null, ranking: "#2" },
  { college: "CMC Vellore", mbbs: 680, bds: null, ranking: "#3" },
  { college: "JIPMER Puducherry", mbbs: 670, bds: null, ranking: "#4" },
  { college: "KMC Manipal", mbbs: 630, bds: 580, ranking: "#5" },
];

// Extended college data for search functionality
