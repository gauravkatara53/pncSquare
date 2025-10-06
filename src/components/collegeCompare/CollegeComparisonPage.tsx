"use client";
import { useState, useMemo, memo } from "react";
import {
  ArrowLeft,
  MapPin,
  Star,
  TrendingUp,
  Users,
  Building,
  Phone,
  Mail,
  Globe,
  Award,
  CheckCircle,
  Filter,
} from "lucide-react";

interface College {
  id: number;
  name: string;
  location: string;
  type: string;
  logo: string;
  ranking: number;
  rating: number;
}

interface CollegeComparisonPageProps {
  colleges: College[];
  onNavigate: (page: string, data?: unknown) => void;
}

interface BranchPlacement {
  branch: string;
  averagePackage: string;
  highestPackage: string;
  medianPackage: string;
  placedStudents: string;
}

interface CutoffData {
  year: string;
  quota: string;
  subcategory: string;
  seatType: string;
  round: string;
  openingRank: number;
  closingRank: number;
}

interface CollegeDetails {
  established?: number;
  affiliation?: string;
  accreditation?: string;
  totalFees?: string;
  averagePackage?: string;
  highestPackage?: string;
  topRecruiters?: string[];
  cutoffJEE?: string;
  totalStudents?: string;
  facultyRatio?: string;
  campusArea?: string;
  facilities?: string[];
  courses?: string[];
  website?: string;
  email?: string;
  phone?: string;
  branchPlacements?: BranchPlacement[];
  cutoffs?: CutoffData[];
}

// Extended college data with branch-wise placements and cutoffs
const collegeDetails: Record<number, CollegeDetails> = {
  1: {
    established: 1961,
    affiliation: "Autonomous",
    accreditation: "NAAC A++, NBA",
    totalFees: "₹8.5 Lakhs",
    averagePackage: "₹18.5 LPA",
    highestPackage: "₹1.8 Crore",
    topRecruiters: ["Google", "Microsoft", "Goldman Sachs", "Amazon"],
    cutoffJEE: "JEE Advanced Rank 100-500",
    totalStudents: "9,000+",
    facultyRatio: "1:8",
    campusArea: "320 acres",
    facilities: [
      "Library",
      "Labs",
      "Sports Complex",
      "Hostel",
      "Wi-Fi",
      "Auditorium",
    ],
    courses: ["B.Tech", "M.Tech", "MBA", "Ph.D"],
    website: "www.iitd.ac.in",
    email: "admissions@iitd.ac.in",
    phone: "+91-11-2659-1749",
    branchPlacements: [
      {
        branch: "Computer Science",
        averagePackage: "₹25 LPA",
        highestPackage: "₹1.8 Cr",
        medianPackage: "₹22 LPA",
        placedStudents: "98%",
      },
      {
        branch: "Electronics",
        averagePackage: "₹18 LPA",
        highestPackage: "₹1.2 Cr",
        medianPackage: "₹16 LPA",
        placedStudents: "95%",
      },
      {
        branch: "Mechanical",
        averagePackage: "₹14 LPA",
        highestPackage: "₹85 LPA",
        medianPackage: "₹12 LPA",
        placedStudents: "92%",
      },
      {
        branch: "Electrical",
        averagePackage: "₹16 LPA",
        highestPackage: "₹1 Cr",
        medianPackage: "₹14 LPA",
        placedStudents: "94%",
      },
      {
        branch: "Civil",
        averagePackage: "₹12 LPA",
        highestPackage: "₹50 LPA",
        medianPackage: "₹10 LPA",
        placedStudents: "88%",
      },
    ],
    cutoffs: [
      {
        year: "2024",
        quota: "AI",
        subcategory: "OPEN",
        seatType: "General",
        round: "1",
        openingRank: 45,
        closingRank: 98,
      },
      {
        year: "2024",
        quota: "AI",
        subcategory: "OPEN-PwD",
        seatType: "General",
        round: "1",
        openingRank: 8,
        closingRank: 12,
      },
      {
        year: "2024",
        quota: "AI",
        subcategory: "EWS",
        seatType: "General",
        round: "1",
        openingRank: 15,
        closingRank: 28,
      },
      {
        year: "2024",
        quota: "AI",
        subcategory: "OBC-NCL",
        seatType: "General",
        round: "1",
        openingRank: 120,
        closingRank: 245,
      },
      {
        year: "2024",
        quota: "AI",
        subcategory: "SC",
        seatType: "General",
        round: "1",
        openingRank: 89,
        closingRank: 156,
      },
      {
        year: "2023",
        quota: "AI",
        subcategory: "OPEN",
        seatType: "General",
        round: "1",
        openingRank: 50,
        closingRank: 105,
      },
      {
        year: "2023",
        quota: "AI",
        subcategory: "EWS",
        seatType: "General",
        round: "1",
        openingRank: 18,
        closingRank: 32,
      },
    ],
  },
  2: {
    established: 1958,
    affiliation: "Autonomous",
    accreditation: "NAAC A++, NBA",
    totalFees: "₹8.5 Lakhs",
    averagePackage: "₹19.2 LPA",
    highestPackage: "₹2.1 Crore",
    topRecruiters: ["Google", "Microsoft", "Apple", "McKinsey"],
    cutoffJEE: "JEE Advanced Rank 50-400",
    totalStudents: "10,000+",
    facultyRatio: "1:7",
    campusArea: "550 acres",
    facilities: [
      "Library",
      "Labs",
      "Sports Complex",
      "Hostel",
      "Wi-Fi",
      "Medical Center",
    ],
    courses: ["B.Tech", "M.Tech", "MBA", "Ph.D"],
    website: "www.iitb.ac.in",
    email: "admissions@iitb.ac.in",
    phone: "+91-22-2576-4564",
    branchPlacements: [
      {
        branch: "Computer Science",
        averagePackage: "₹28 LPA",
        highestPackage: "₹2.1 Cr",
        medianPackage: "₹25 LPA",
        placedStudents: "99%",
      },
      {
        branch: "Electronics",
        averagePackage: "₹20 LPA",
        highestPackage: "₹1.5 Cr",
        medianPackage: "₹18 LPA",
        placedStudents: "97%",
      },
      {
        branch: "Mechanical",
        averagePackage: "₹16 LPA",
        highestPackage: "₹95 LPA",
        medianPackage: "₹14 LPA",
        placedStudents: "94%",
      },
      {
        branch: "Electrical",
        averagePackage: "₹18 LPA",
        highestPackage: "₹1.2 Cr",
        medianPackage: "₹16 LPA",
        placedStudents: "96%",
      },
      {
        branch: "Civil",
        averagePackage: "₹14 LPA",
        highestPackage: "₹60 LPA",
        medianPackage: "₹12 LPA",
        placedStudents: "90%",
      },
    ],
    cutoffs: [
      {
        year: "2024",
        quota: "AI",
        subcategory: "OPEN",
        seatType: "General",
        round: "1",
        openingRank: 15,
        closingRank: 65,
      },
      {
        year: "2024",
        quota: "AI",
        subcategory: "OPEN-PwD",
        seatType: "General",
        round: "1",
        openingRank: 5,
        closingRank: 8,
      },
      {
        year: "2024",
        quota: "AI",
        subcategory: "EWS",
        seatType: "General",
        round: "1",
        openingRank: 8,
        closingRank: 18,
      },
      {
        year: "2024",
        quota: "AI",
        subcategory: "OBC-NCL",
        seatType: "General",
        round: "1",
        openingRank: 85,
        closingRank: 185,
      },
      {
        year: "2024",
        quota: "AI",
        subcategory: "SC",
        seatType: "General",
        round: "1",
        openingRank: 65,
        closingRank: 125,
      },
      {
        year: "2023",
        quota: "AI",
        subcategory: "OPEN",
        seatType: "General",
        round: "1",
        openingRank: 18,
        closingRank: 72,
      },
      {
        year: "2023",
        quota: "AI",
        subcategory: "EWS",
        seatType: "General",
        round: "1",
        openingRank: 10,
        closingRank: 22,
      },
    ],
  },
  3: {
    established: 1959,
    affiliation: "Autonomous",
    accreditation: "NAAC A++, NBA",
    totalFees: "₹8.5 Lakhs",
    averagePackage: "₹17.8 LPA",
    highestPackage: "₹1.7 Crore",
    topRecruiters: ["Google", "Microsoft", "Qualcomm", "Texas Instruments"],
    cutoffJEE: "JEE Advanced Rank 80-450",
    totalStudents: "9,500+",
    facultyRatio: "1:8",
    campusArea: "617 acres",
    facilities: [
      "Library",
      "Labs",
      "Sports Complex",
      "Hostel",
      "Wi-Fi",
      "Research Park",
    ],
    courses: ["B.Tech", "M.Tech", "MBA", "Ph.D"],
    website: "www.iitm.ac.in",
    email: "admissions@iitm.ac.in",
    phone: "+91-44-2257-8250",
    branchPlacements: [
      {
        branch: "Computer Science",
        averagePackage: "₹24 LPA",
        highestPackage: "₹1.7 Cr",
        medianPackage: "₹21 LPA",
        placedStudents: "98%",
      },
      {
        branch: "Electronics",
        averagePackage: "₹17 LPA",
        highestPackage: "₹1.1 Cr",
        medianPackage: "₹15 LPA",
        placedStudents: "95%",
      },
      {
        branch: "Mechanical",
        averagePackage: "₹13 LPA",
        highestPackage: "₹75 LPA",
        medianPackage: "₹11 LPA",
        placedStudents: "91%",
      },
      {
        branch: "Electrical",
        averagePackage: "₹15 LPA",
        highestPackage: "₹90 LPA",
        medianPackage: "₹13 LPA",
        placedStudents: "93%",
      },
      {
        branch: "Civil",
        averagePackage: "₹11 LPA",
        highestPackage: "₹45 LPA",
        medianPackage: "₹9 LPA",
        placedStudents: "87%",
      },
    ],
    cutoffs: [
      {
        year: "2024",
        quota: "AI",
        subcategory: "OPEN",
        seatType: "General",
        round: "1",
        openingRank: 60,
        closingRank: 125,
      },
      {
        year: "2024",
        quota: "AI",
        subcategory: "OPEN-PwD",
        seatType: "General",
        round: "1",
        openingRank: 10,
        closingRank: 15,
      },
      {
        year: "2024",
        quota: "AI",
        subcategory: "EWS",
        seatType: "General",
        round: "1",
        openingRank: 20,
        closingRank: 35,
      },
      {
        year: "2024",
        quota: "AI",
        subcategory: "OBC-NCL",
        seatType: "General",
        round: "1",
        openingRank: 150,
        closingRank: 285,
      },
      {
        year: "2024",
        quota: "AI",
        subcategory: "SC",
        seatType: "General",
        round: "1",
        openingRank: 105,
        closingRank: 185,
      },
      {
        year: "2023",
        quota: "AI",
        subcategory: "OPEN",
        seatType: "General",
        round: "1",
        openingRank: 65,
        closingRank: 135,
      },
      {
        year: "2023",
        quota: "AI",
        subcategory: "EWS",
        seatType: "General",
        round: "1",
        openingRank: 24,
        closingRank: 40,
      },
    ],
  },
  4: {
    established: 1959,
    affiliation: "Autonomous",
    accreditation: "NAAC A++, NBA",
    totalFees: "₹8.5 Lakhs",
    averagePackage: "₹16.5 LPA",
    highestPackage: "₹1.5 Crore",
    topRecruiters: ["Google", "Microsoft", "Samsung", "Amazon"],
    cutoffJEE: "JEE Advanced Rank 120-600",
    totalStudents: "8,500+",
    facultyRatio: "1:9",
    campusArea: "1055 acres",
    facilities: [
      "Library",
      "Labs",
      "Sports Complex",
      "Hostel",
      "Wi-Fi",
      "Innovation Hub",
    ],
    courses: ["B.Tech", "M.Tech", "MBA", "Ph.D"],
    website: "www.iitk.ac.in",
    email: "admissions@iitk.ac.in",
    phone: "+91-512-259-7045",
    branchPlacements: [
      {
        branch: "Computer Science",
        averagePackage: "₹22 LPA",
        highestPackage: "₹1.5 Cr",
        medianPackage: "₹19 LPA",
        placedStudents: "97%",
      },
      {
        branch: "Electronics",
        averagePackage: "₹16 LPA",
        highestPackage: "₹95 LPA",
        medianPackage: "₹14 LPA",
        placedStudents: "94%",
      },
      {
        branch: "Mechanical",
        averagePackage: "₹12 LPA",
        highestPackage: "₹65 LPA",
        medianPackage: "₹10 LPA",
        placedStudents: "90%",
      },
      {
        branch: "Electrical",
        averagePackage: "₹14 LPA",
        highestPackage: "₹80 LPA",
        medianPackage: "₹12 LPA",
        placedStudents: "92%",
      },
      {
        branch: "Civil",
        averagePackage: "₹10 LPA",
        highestPackage: "₹40 LPA",
        medianPackage: "₹8.5 LPA",
        placedStudents: "85%",
      },
    ],
    cutoffs: [
      {
        year: "2024",
        quota: "AI",
        subcategory: "OPEN",
        seatType: "General",
        round: "1",
        openingRank: 95,
        closingRank: 185,
      },
      {
        year: "2024",
        quota: "AI",
        subcategory: "OPEN-PwD",
        seatType: "General",
        round: "1",
        openingRank: 15,
        closingRank: 22,
      },
      {
        year: "2024",
        quota: "AI",
        subcategory: "EWS",
        seatType: "General",
        round: "1",
        openingRank: 30,
        closingRank: 48,
      },
      {
        year: "2024",
        quota: "AI",
        subcategory: "OBC-NCL",
        seatType: "General",
        round: "1",
        openingRank: 200,
        closingRank: 350,
      },
      {
        year: "2024",
        quota: "AI",
        subcategory: "SC",
        seatType: "General",
        round: "1",
        openingRank: 135,
        closingRank: 225,
      },
      {
        year: "2023",
        quota: "AI",
        subcategory: "OPEN",
        seatType: "General",
        round: "1",
        openingRank: 100,
        closingRank: 195,
      },
      {
        year: "2023",
        quota: "AI",
        subcategory: "EWS",
        seatType: "General",
        round: "1",
        openingRank: 35,
        closingRank: 52,
      },
    ],
  },
  5: {
    established: 1941,
    affiliation: "Delhi University",
    accreditation: "NAAC A+, NBA",
    totalFees: "₹7.8 Lakhs",
    averagePackage: "₹12.5 LPA",
    highestPackage: "₹1.2 Crore",
    topRecruiters: ["Amazon", "Adobe", "Microsoft", "Samsung"],
    cutoffJEE: "JEE Mains Rank 1500-8000",
    totalStudents: "7,500+",
    facultyRatio: "1:12",
    campusArea: "164 acres",
    facilities: [
      "Library",
      "Labs",
      "Sports Complex",
      "Hostel",
      "Wi-Fi",
      "Cafeteria",
    ],
    courses: ["B.Tech", "M.Tech", "MBA", "Ph.D"],
    website: "www.dtu.ac.in",
    email: "admissions@dtu.ac.in",
    phone: "+91-11-2787-1120",
    branchPlacements: [
      {
        branch: "Computer Science",
        averagePackage: "₹18 LPA",
        highestPackage: "₹1.2 Cr",
        medianPackage: "₹15 LPA",
        placedStudents: "95%",
      },
      {
        branch: "Electronics",
        averagePackage: "₹12 LPA",
        highestPackage: "₹65 LPA",
        medianPackage: "₹10 LPA",
        placedStudents: "90%",
      },
      {
        branch: "Mechanical",
        averagePackage: "₹9 LPA",
        highestPackage: "₹45 LPA",
        medianPackage: "₹7.5 LPA",
        placedStudents: "85%",
      },
      {
        branch: "Electrical",
        averagePackage: "₹10 LPA",
        highestPackage: "₹55 LPA",
        medianPackage: "₹8.5 LPA",
        placedStudents: "87%",
      },
      {
        branch: "Civil",
        averagePackage: "₹7.5 LPA",
        highestPackage: "₹30 LPA",
        medianPackage: "₹6.5 LPA",
        placedStudents: "80%",
      },
    ],
    cutoffs: [
      {
        year: "2024",
        quota: "Delhi",
        subcategory: "OPEN",
        seatType: "General",
        round: "1",
        openingRank: 1200,
        closingRank: 2500,
      },
      {
        year: "2024",
        quota: "Delhi",
        subcategory: "OBC-NCL",
        seatType: "General",
        round: "1",
        openingRank: 3000,
        closingRank: 5500,
      },
      {
        year: "2024",
        quota: "Delhi",
        subcategory: "SC",
        seatType: "General",
        round: "1",
        openingRank: 4500,
        closingRank: 8000,
      },
      {
        year: "2024",
        quota: "Outside Delhi",
        subcategory: "OPEN",
        seatType: "General",
        round: "1",
        openingRank: 800,
        closingRank: 1800,
      },
      {
        year: "2023",
        quota: "Delhi",
        subcategory: "OPEN",
        seatType: "General",
        round: "1",
        openingRank: 1300,
        closingRank: 2700,
      },
      {
        year: "2023",
        quota: "Outside Delhi",
        subcategory: "OPEN",
        seatType: "General",
        round: "1",
        openingRank: 850,
        closingRank: 1900,
      },
    ],
  },
  6: {
    established: 1964,
    affiliation: "Autonomous",
    accreditation: "NAAC A++, NBA",
    totalFees: "₹5.5 Lakhs",
    averagePackage: "₹14.2 LPA",
    highestPackage: "₹1.3 Crore",
    topRecruiters: ["Google", "Microsoft", "Amazon", "Cisco"],
    cutoffJEE: "JEE Mains Rank 800-5000",
    totalStudents: "8,000+",
    facultyRatio: "1:10",
    campusArea: "800 acres",
    facilities: ["Library", "Labs", "Sports Complex", "Hostel", "Wi-Fi", "Gym"],
    courses: ["B.Tech", "M.Tech", "MBA", "Ph.D"],
    website: "www.nitt.edu",
    email: "admissions@nitt.edu",
    phone: "+91-431-250-3000",
    branchPlacements: [
      {
        branch: "Computer Science",
        averagePackage: "₹20 LPA",
        highestPackage: "₹1.3 Cr",
        medianPackage: "₹17 LPA",
        placedStudents: "96%",
      },
      {
        branch: "Electronics",
        averagePackage: "₹14 LPA",
        highestPackage: "₹75 LPA",
        medianPackage: "₹12 LPA",
        placedStudents: "92%",
      },
      {
        branch: "Mechanical",
        averagePackage: "₹10 LPA",
        highestPackage: "₹50 LPA",
        medianPackage: "₹8.5 LPA",
        placedStudents: "88%",
      },
      {
        branch: "Electrical",
        averagePackage: "₹12 LPA",
        highestPackage: "₹60 LPA",
        medianPackage: "₹10 LPA",
        placedStudents: "90%",
      },
      {
        branch: "Civil",
        averagePackage: "₹8.5 LPA",
        highestPackage: "₹35 LPA",
        medianPackage: "₹7 LPA",
        placedStudents: "83%",
      },
    ],
    cutoffs: [
      {
        year: "2024",
        quota: "HS",
        subcategory: "OPEN",
        seatType: "General",
        round: "1",
        openingRank: 850,
        closingRank: 1800,
      },
      {
        year: "2024",
        quota: "HS",
        subcategory: "OBC-NCL",
        seatType: "General",
        round: "1",
        openingRank: 2100,
        closingRank: 3800,
      },
      {
        year: "2024",
        quota: "HS",
        subcategory: "SC",
        seatType: "General",
        round: "1",
        openingRank: 3200,
        closingRank: 5500,
      },
      {
        year: "2024",
        quota: "OS",
        subcategory: "OPEN",
        seatType: "General",
        round: "1",
        openingRank: 650,
        closingRank: 1400,
      },
      {
        year: "2023",
        quota: "HS",
        subcategory: "OPEN",
        seatType: "General",
        round: "1",
        openingRank: 900,
        closingRank: 1900,
      },
      {
        year: "2023",
        quota: "OS",
        subcategory: "OPEN",
        seatType: "General",
        round: "1",
        openingRank: 700,
        closingRank: 1500,
      },
    ],
  },
  7: {
    established: 1964,
    affiliation: "Deemed University",
    accreditation: "NAAC A, NBA",
    totalFees: "₹19.2 Lakhs",
    averagePackage: "₹15.8 LPA",
    highestPackage: "₹1.4 Crore",
    topRecruiters: ["Microsoft", "Amazon", "Google", "Flipkart"],
    cutoffJEE: "BITSAT Score 310+",
    totalStudents: "18,000+",
    facultyRatio: "1:15",
    campusArea: "328 acres",
    facilities: [
      "Library",
      "Labs",
      "Sports Complex",
      "Hostel",
      "Wi-Fi",
      "Shopping Complex",
    ],
    courses: ["B.E", "M.E", "MBA", "Ph.D"],
    website: "www.bits-pilani.ac.in",
    email: "admissions@pilani.bits-pilani.ac.in",
    phone: "+91-159-624-5073",
    branchPlacements: [
      {
        branch: "Computer Science",
        averagePackage: "₹21 LPA",
        highestPackage: "₹1.4 Cr",
        medianPackage: "₹18 LPA",
        placedStudents: "97%",
      },
      {
        branch: "Electronics",
        averagePackage: "₹15 LPA",
        highestPackage: "₹85 LPA",
        medianPackage: "₹13 LPA",
        placedStudents: "93%",
      },
      {
        branch: "Mechanical",
        averagePackage: "₹11 LPA",
        highestPackage: "₹55 LPA",
        medianPackage: "₹9.5 LPA",
        placedStudents: "89%",
      },
      {
        branch: "Electrical",
        averagePackage: "₹13 LPA",
        highestPackage: "₹70 LPA",
        medianPackage: "₹11 LPA",
        placedStudents: "91%",
      },
      {
        branch: "Civil",
        averagePackage: "₹9 LPA",
        highestPackage: "₹38 LPA",
        medianPackage: "₹7.5 LPA",
        placedStudents: "84%",
      },
    ],
    cutoffs: [
      {
        year: "2024",
        quota: "General",
        subcategory: "OPEN",
        seatType: "CS",
        round: "1",
        openingRank: 295,
        closingRank: 325,
      },
      {
        year: "2024",
        quota: "General",
        subcategory: "OPEN",
        seatType: "ECE",
        round: "1",
        openingRank: 310,
        closingRank: 340,
      },
      {
        year: "2024",
        quota: "General",
        subcategory: "OPEN",
        seatType: "Mech",
        round: "1",
        openingRank: 325,
        closingRank: 355,
      },
      {
        year: "2023",
        quota: "General",
        subcategory: "OPEN",
        seatType: "CS",
        round: "1",
        openingRank: 290,
        closingRank: 320,
      },
      {
        year: "2023",
        quota: "General",
        subcategory: "OPEN",
        seatType: "ECE",
        round: "1",
        openingRank: 305,
        closingRank: 335,
      },
    ],
  },
  8: {
    established: 1957,
    affiliation: "Deemed University",
    accreditation: "NAAC A, NBA",
    totalFees: "₹17.5 Lakhs",
    averagePackage: "₹8.5 LPA",
    highestPackage: "₹43 LPA",
    topRecruiters: ["Microsoft", "Amazon", "Infosys", "Wipro"],
    cutoffJEE: "MET Rank 1-10000",
    totalStudents: "25,000+",
    facultyRatio: "1:18",
    campusArea: "600 acres",
    facilities: [
      "Library",
      "Labs",
      "Sports Complex",
      "Hostel",
      "Wi-Fi",
      "Hospital",
    ],
    courses: ["B.Tech", "M.Tech", "MBA", "Ph.D"],
    website: "www.manipal.edu",
    email: "admissions@manipal.edu",
    phone: "+91-820-292-3456",
    branchPlacements: [
      {
        branch: "Computer Science",
        averagePackage: "₹12 LPA",
        highestPackage: "₹43 LPA",
        medianPackage: "₹10 LPA",
        placedStudents: "92%",
      },
      {
        branch: "Electronics",
        averagePackage: "₹8 LPA",
        highestPackage: "₹32 LPA",
        medianPackage: "₹7 LPA",
        placedStudents: "87%",
      },
      {
        branch: "Mechanical",
        averagePackage: "₹6.5 LPA",
        highestPackage: "₹25 LPA",
        medianPackage: "₹5.5 LPA",
        placedStudents: "82%",
      },
      {
        branch: "Electrical",
        averagePackage: "₹7.5 LPA",
        highestPackage: "₹28 LPA",
        medianPackage: "₹6.5 LPA",
        placedStudents: "85%",
      },
      {
        branch: "Civil",
        averagePackage: "₹5.5 LPA",
        highestPackage: "₹18 LPA",
        medianPackage: "₹4.5 LPA",
        placedStudents: "75%",
      },
    ],
    cutoffs: [
      {
        year: "2024",
        quota: "General",
        subcategory: "OPEN",
        seatType: "CS",
        round: "1",
        openingRank: 500,
        closingRank: 3500,
      },
      {
        year: "2024",
        quota: "General",
        subcategory: "OPEN",
        seatType: "ECE",
        round: "1",
        openingRank: 1200,
        closingRank: 5000,
      },
      {
        year: "2024",
        quota: "General",
        subcategory: "OPEN",
        seatType: "Mech",
        round: "1",
        openingRank: 2000,
        closingRank: 7000,
      },
      {
        year: "2023",
        quota: "General",
        subcategory: "OPEN",
        seatType: "CS",
        round: "1",
        openingRank: 550,
        closingRank: 3700,
      },
      {
        year: "2023",
        quota: "General",
        subcategory: "OPEN",
        seatType: "ECE",
        round: "1",
        openingRank: 1300,
        closingRank: 5200,
      },
    ],
  },
  9: {
    established: 1984,
    affiliation: "Deemed University",
    accreditation: "NAAC A++, NBA",
    totalFees: "₹7.8 Lakhs",
    averagePackage: "₹8.2 LPA",
    highestPackage: "₹75 LPA",
    topRecruiters: ["TCS", "Cognizant", "Accenture", "Infosys"],
    cutoffJEE: "VITEEE Rank 1-25000",
    totalStudents: "30,000+",
    facultyRatio: "1:20",
    campusArea: "350 acres",
    facilities: [
      "Library",
      "Labs",
      "Sports Complex",
      "Hostel",
      "Wi-Fi",
      "Food Court",
    ],
    courses: ["B.Tech", "M.Tech", "MBA", "Ph.D"],
    website: "www.vit.ac.in",
    email: "admissions@vit.ac.in",
    phone: "+91-416-220-2555",
    branchPlacements: [
      {
        branch: "Computer Science",
        averagePackage: "₹11 LPA",
        highestPackage: "₹75 LPA",
        medianPackage: "₹9 LPA",
        placedStudents: "90%",
      },
      {
        branch: "Electronics",
        averagePackage: "₹7.5 LPA",
        highestPackage: "₹35 LPA",
        medianPackage: "₹6.5 LPA",
        placedStudents: "85%",
      },
      {
        branch: "Mechanical",
        averagePackage: "₹6 LPA",
        highestPackage: "₹22 LPA",
        medianPackage: "₹5 LPA",
        placedStudents: "80%",
      },
      {
        branch: "Electrical",
        averagePackage: "₹7 LPA",
        highestPackage: "₹30 LPA",
        medianPackage: "₹6 LPA",
        placedStudents: "83%",
      },
      {
        branch: "Civil",
        averagePackage: "₹5 LPA",
        highestPackage: "₹15 LPA",
        medianPackage: "₹4 LPA",
        placedStudents: "72%",
      },
    ],
    cutoffs: [
      {
        year: "2024",
        quota: "General",
        subcategory: "OPEN",
        seatType: "CS",
        round: "1",
        openingRank: 1,
        closingRank: 5000,
      },
      {
        year: "2024",
        quota: "General",
        subcategory: "OPEN",
        seatType: "ECE",
        round: "1",
        openingRank: 2000,
        closingRank: 10000,
      },
      {
        year: "2024",
        quota: "General",
        subcategory: "OPEN",
        seatType: "Mech",
        round: "1",
        openingRank: 5000,
        closingRank: 15000,
      },
      {
        year: "2023",
        quota: "General",
        subcategory: "OPEN",
        seatType: "CS",
        round: "1",
        openingRank: 1,
        closingRank: 5500,
      },
      {
        year: "2023",
        quota: "General",
        subcategory: "OPEN",
        seatType: "ECE",
        round: "1",
        openingRank: 2200,
        closingRank: 10500,
      },
    ],
  },
  10: {
    established: 1983,
    affiliation: "State University",
    accreditation: "NAAC A+, NBA",
    totalFees: "₹6.5 Lakhs",
    averagePackage: "₹10.8 LPA",
    highestPackage: "₹1 Crore",
    topRecruiters: ["Amazon", "Microsoft", "Adobe", "Google"],
    cutoffJEE: "JEE Mains Rank 2000-10000",
    totalStudents: "6,500+",
    facultyRatio: "1:12",
    campusArea: "145 acres",
    facilities: [
      "Library",
      "Labs",
      "Sports Complex",
      "Hostel",
      "Wi-Fi",
      "Auditorium",
    ],
    courses: ["B.Tech", "M.Tech", "MBA", "Ph.D"],
    website: "www.nsut.ac.in",
    email: "admissions@nsut.ac.in",
    phone: "+91-11-2590-1370",
    branchPlacements: [
      {
        branch: "Computer Science",
        averagePackage: "₹16 LPA",
        highestPackage: "₹1 Cr",
        medianPackage: "₹13 LPA",
        placedStudents: "93%",
      },
      {
        branch: "Electronics",
        averagePackage: "₹11 LPA",
        highestPackage: "₹55 LPA",
        medianPackage: "₹9 LPA",
        placedStudents: "88%",
      },
      {
        branch: "Mechanical",
        averagePackage: "₹8 LPA",
        highestPackage: "₹38 LPA",
        medianPackage: "₹6.5 LPA",
        placedStudents: "83%",
      },
      {
        branch: "Electrical",
        averagePackage: "₹9.5 LPA",
        highestPackage: "₹45 LPA",
        medianPackage: "₹8 LPA",
        placedStudents: "85%",
      },
      {
        branch: "Civil",
        averagePackage: "₹7 LPA",
        highestPackage: "₹28 LPA",
        medianPackage: "₹5.5 LPA",
        placedStudents: "78%",
      },
    ],
    cutoffs: [
      {
        year: "2024",
        quota: "Delhi",
        subcategory: "OPEN",
        seatType: "General",
        round: "1",
        openingRank: 2000,
        closingRank: 4500,
      },
      {
        year: "2024",
        quota: "Delhi",
        subcategory: "OBC-NCL",
        seatType: "General",
        round: "1",
        openingRank: 5000,
        closingRank: 8000,
      },
      {
        year: "2024",
        quota: "Delhi",
        subcategory: "SC",
        seatType: "General",
        round: "1",
        openingRank: 7000,
        closingRank: 11000,
      },
      {
        year: "2024",
        quota: "Outside Delhi",
        subcategory: "OPEN",
        seatType: "General",
        round: "1",
        openingRank: 1500,
        closingRank: 3500,
      },
      {
        year: "2023",
        quota: "Delhi",
        subcategory: "OPEN",
        seatType: "General",
        round: "1",
        openingRank: 2200,
        closingRank: 4800,
      },
      {
        year: "2023",
        quota: "Outside Delhi",
        subcategory: "OPEN",
        seatType: "General",
        round: "1",
        openingRank: 1600,
        closingRank: 3700,
      },
    ],
  },
};

export function CollegeComparisonPage({
  colleges,
  onNavigate,
}: CollegeComparisonPageProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "placements" | "cutoffs" | "fees" | "facilities"
  >("overview");

  // Cutoff filters
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [selectedQuota, setSelectedQuota] = useState<string>("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("All");
  const [selectedSeatType, setSelectedSeatType] = useState<string>("All");
  const [selectedRound, setSelectedRound] = useState<string>("All");

  const comparisonData = useMemo(
    () =>
      colleges.map((college) => ({
        ...college,
        details: collegeDetails[college.id] || {},
      })),
    [colleges]
  );

  // Extract unique filter values from all colleges
  const years = useMemo(
    () =>
      Array.from(
        new Set(
          comparisonData.flatMap(
            (c) => c.details.cutoffs?.map((co: CutoffData) => co.year) || []
          )
        )
      )
        .sort()
        .reverse(),
    [comparisonData]
  );

  const quotas = useMemo(
    () =>
      Array.from(
        new Set(
          comparisonData.flatMap(
            (c) =>
              c.details.cutoffs
                ?.filter((co: CutoffData) => co.year === selectedYear)
                .map((co: CutoffData) => co.quota) || []
          )
        )
      ),
    [comparisonData, selectedYear]
  );

  const subcategories = useMemo(
    () =>
      Array.from(
        new Set(
          comparisonData.flatMap(
            (c) =>
              c.details.cutoffs
                ?.filter(
                  (co: CutoffData) =>
                    co.year === selectedYear &&
                    (selectedQuota === "All" || co.quota === selectedQuota)
                )
                .map((co: CutoffData) => co.subcategory) || []
          )
        )
      ),
    [comparisonData, selectedYear, selectedQuota]
  );

  const seatTypes = useMemo(
    () =>
      Array.from(
        new Set(
          comparisonData.flatMap(
            (c) =>
              c.details.cutoffs
                ?.filter(
                  (co: CutoffData) =>
                    co.year === selectedYear &&
                    (selectedQuota === "All" || co.quota === selectedQuota) &&
                    (selectedSubcategory === "All" ||
                      co.subcategory === selectedSubcategory)
                )
                .map((co: CutoffData) => co.seatType) || []
          )
        )
      ),
    [comparisonData, selectedYear, selectedQuota, selectedSubcategory]
  );

  const rounds = useMemo(
    () =>
      Array.from(
        new Set(
          comparisonData.flatMap(
            (c) =>
              c.details.cutoffs
                ?.filter((co: CutoffData) => co.year === selectedYear)
                .map((co: CutoffData) => co.round) || []
          )
        )
      ),
    [comparisonData, selectedYear]
  );

  // Filter cutoffs based on selected filters
  const getFilteredCutoffs = useMemo(() => {
    return (cutoffs: CutoffData[]) => {
      if (!cutoffs) return [];
      return cutoffs.filter(
        (co) =>
          co.year === selectedYear &&
          (selectedQuota === "All" || co.quota === selectedQuota) &&
          (selectedSubcategory === "All" ||
            co.subcategory === selectedSubcategory) &&
          (selectedSeatType === "All" || co.seatType === selectedSeatType) &&
          (selectedRound === "All" || co.round === selectedRound)
      );
    };
  }, [
    selectedYear,
    selectedQuota,
    selectedSubcategory,
    selectedSeatType,
    selectedRound,
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-8 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate("compare")}
            className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Selection
          </button>
          <h1 className="text-3xl mb-2">College Comparison</h1>
          <p className="text-gray-300">
            Comparing {colleges.length} colleges side by side
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6 p-2 flex gap-2 overflow-x-auto">
          {[
            { id: "overview", label: "Overview" },
            { id: "placements", label: "Branch-wise Placements" },
            { id: "cutoffs", label: "Cutoffs" },
            { id: "fees", label: "Fees & Courses" },
            { id: "facilities", label: "Facilities" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(
                  tab.id as
                    | "overview"
                    | "placements"
                    | "cutoffs"
                    | "fees"
                    | "facilities"
                )
              }
              className={`px-6 py-3 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white"
                  : "bg-gray-100 text-slate-900 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cutoff Filters */}
        {activeTab === "cutoffs" && (
          <div className="bg-white rounded-lg shadow-md mb-6 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-slate-900" />
              <h3 className="text-slate-900">Filter Cutoffs</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-slate-900 mb-2">
                  Academic Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-900 mb-2">Quota</label>
                <select
                  value={selectedQuota}
                  onChange={(e) => setSelectedQuota(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="All">All Quotas</option>
                  {quotas.map((quota) => (
                    <option key={quota} value={quota}>
                      {quota}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-900 mb-2">Subcategory</label>
                <select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="All">All Categories</option>
                  {subcategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-900 mb-2">Seat Type</label>
                <select
                  value={selectedSeatType}
                  onChange={(e) => setSelectedSeatType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="All">All Seat Types</option>
                  {seatTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-900 mb-2">Round</label>
                <select
                  value={selectedRound}
                  onChange={(e) => setSelectedRound(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="All">All Rounds</option>
                  {rounds.map((round) => (
                    <option key={round} value={round}>
                      Round {round}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-900">
                  <th className="p-4 text-left text-white w-48 sticky left-0 bg-slate-900 z-10">
                    Parameter
                  </th>
                  {comparisonData.map((college) => (
                    <th
                      key={college.id}
                      className="p-4 text-center text-white border-l border-slate-700 min-w-[250px]"
                    >
                      <div className="text-4xl mb-2">{college.logo}</div>
                      <div className="mb-2">{college.name}</div>
                      <div className="flex items-center justify-center gap-2 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{college.rating}</span>
                        <span className="text-gray-300">
                          • Rank #{college.ranking}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeTab === "overview" && (
                  <>
                    <ComparisonRow
                      label="Location"
                      icon={<MapPin className="w-5 h-5" />}
                      values={comparisonData.map((c) => c.location)}
                    />
                    <ComparisonRow
                      label="Type"
                      icon={<Building className="w-5 h-5" />}
                      values={comparisonData.map((c) => c.type)}
                    />
                    <ComparisonRow
                      label="Established"
                      icon={<Award className="w-5 h-5" />}
                      values={comparisonData.map(
                        (c) => c.details.established || "N/A"
                      )}
                    />
                    <ComparisonRow
                      label="Affiliation"
                      values={comparisonData.map(
                        (c) => c.details.affiliation || "N/A"
                      )}
                    />
                    <ComparisonRow
                      label="Accreditation"
                      values={comparisonData.map(
                        (c) => c.details.accreditation || "N/A"
                      )}
                    />
                    <ComparisonRow
                      label="Total Students"
                      icon={<Users className="w-5 h-5" />}
                      values={comparisonData.map(
                        (c) => c.details.totalStudents || "N/A"
                      )}
                    />
                    <ComparisonRow
                      label="Faculty:Student Ratio"
                      values={comparisonData.map(
                        (c) => c.details.facultyRatio || "N/A"
                      )}
                    />
                    <ComparisonRow
                      label="Campus Area"
                      values={comparisonData.map(
                        (c) => c.details.campusArea || "N/A"
                      )}
                    />
                  </>
                )}

                {activeTab === "placements" && (
                  <>
                    <ComparisonRow
                      label="Overall Average Package"
                      icon={<TrendingUp className="w-5 h-5" />}
                      values={comparisonData.map(
                        (c) => c.details.averagePackage || "N/A"
                      )}
                      highlight={true}
                    />
                    <ComparisonRow
                      label="Overall Highest Package"
                      icon={<TrendingUp className="w-5 h-5" />}
                      values={comparisonData.map(
                        (c) => c.details.highestPackage || "N/A"
                      )}
                      highlight={true}
                    />
                    <tr className="border-t-4 border-yellow-400">
                      <td
                        colSpan={comparisonData.length + 1}
                        className="p-4 bg-slate-50"
                      >
                        <h4 className="text-slate-900 text-center">
                          Branch-wise Placement Details
                        </h4>
                      </td>
                    </tr>
                    {comparisonData[0]?.details.branchPlacements?.map(
                      (_, branchIndex: number) => (
                        <BranchComparisonRow
                          key={branchIndex}
                          colleges={comparisonData}
                          branchIndex={branchIndex}
                        />
                      )
                    )}
                  </>
                )}

                {activeTab === "cutoffs" && (
                  <>
                    {getFilteredCutoffs(
                      comparisonData[0]?.details.cutoffs || []
                    ).length > 0 ? (
                      <>
                        <tr className="border-t border-gray-200 bg-slate-50">
                          <td className="p-4 text-slate-900 sticky left-0 bg-slate-50 border-r border-gray-200">
                            Filter Results
                          </td>
                          {comparisonData.map((college, idx) => {
                            const filtered = getFilteredCutoffs(
                              college.details.cutoffs || []
                            );
                            return (
                              <td
                                key={idx}
                                className="p-4 text-center border-l border-gray-200 text-gray-700"
                              >
                                {filtered.length} result
                                {filtered.length !== 1 ? "s" : ""}
                              </td>
                            );
                          })}
                        </tr>
                        <CutoffComparisonRow
                          colleges={comparisonData}
                          getFilteredCutoffs={getFilteredCutoffs}
                        />
                      </>
                    ) : (
                      <tr className="border-t border-gray-200">
                        <td
                          colSpan={comparisonData.length + 1}
                          className="p-8 text-center text-gray-500"
                        >
                          No cutoff data available for the selected filters.
                          Please try different filter combinations.
                        </td>
                      </tr>
                    )}
                  </>
                )}

                {activeTab === "fees" && (
                  <>
                    <ComparisonRow
                      label="Total Fees (4 Years)"
                      values={comparisonData.map(
                        (c) => c.details.totalFees || "N/A"
                      )}
                      highlight={true}
                    />
                    <ComparisonRowList
                      label="Courses Offered"
                      values={comparisonData.map(
                        (c) => c.details.courses || []
                      )}
                    />
                  </>
                )}

                {activeTab === "facilities" && (
                  <>
                    <ComparisonRowList
                      label="Campus Facilities"
                      values={comparisonData.map(
                        (c) => c.details.facilities || []
                      )}
                    />
                    <ComparisonRow
                      label="Website"
                      icon={<Globe className="w-5 h-5" />}
                      values={comparisonData.map(
                        (c) => c.details.website || "N/A"
                      )}
                    />
                    <ComparisonRow
                      label="Email"
                      icon={<Mail className="w-5 h-5" />}
                      values={comparisonData.map(
                        (c) => c.details.email || "N/A"
                      )}
                    />
                    <ComparisonRow
                      label="Phone"
                      icon={<Phone className="w-5 h-5" />}
                      values={comparisonData.map(
                        (c) => c.details.phone || "N/A"
                      )}
                    />
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => onNavigate("compare")}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors"
          >
            Add More Colleges
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 rounded-lg transition-colors"
          >
            Print Comparison
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper Components
interface ComparisonRowProps {
  label: string;
  values: (string | number)[];
  icon?: React.ReactNode;
  highlight?: boolean;
}

const ComparisonRow = memo(function ComparisonRow({
  label,
  values,
  icon,
  highlight,
}: ComparisonRowProps) {
  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50">
      <td className="p-4 text-slate-900 sticky left-0 bg-white border-r border-gray-200">
        <div className="flex items-center gap-2">
          {icon && <span className="text-slate-600">{icon}</span>}
          <span>{label}</span>
        </div>
      </td>
      {values.map((value, index) => (
        <td
          key={index}
          className={`p-4 text-center border-l border-gray-200 ${
            highlight ? "text-slate-900" : "text-gray-700"
          }`}
        >
          {value}
        </td>
      ))}
    </tr>
  );
});

interface ComparisonRowListProps {
  label: string;
  values: string[][];
}

const ComparisonRowList = memo(function ComparisonRowList({
  label,
  values,
}: ComparisonRowListProps) {
  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50">
      <td className="p-4 text-slate-900 sticky left-0 bg-white border-r border-gray-200">
        {label}
      </td>
      {values.map((items, index) => (
        <td key={index} className="p-4 border-l border-gray-200">
          <div className="flex flex-col gap-2">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </td>
      ))}
    </tr>
  );
});

interface CollegeWithDetails extends College {
  details: CollegeDetails;
}

interface BranchComparisonRowProps {
  colleges: CollegeWithDetails[];
  branchIndex: number;
}

const BranchComparisonRow = memo(function BranchComparisonRow({
  colleges,
  branchIndex,
}: BranchComparisonRowProps) {
  const branchName =
    colleges[0]?.details.branchPlacements?.[branchIndex]?.branch;

  if (!branchName) return null;

  return (
    <>
      <tr className="border-t-2 border-gray-300 bg-slate-100">
        <td colSpan={colleges.length + 1} className="p-3 text-slate-900">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            <span>{branchName}</span>
          </div>
        </td>
      </tr>
      <tr className="border-t border-gray-200 hover:bg-gray-50">
        <td className="p-4 pl-8 text-gray-700 sticky left-0 bg-white border-r border-gray-200">
          Average Package
        </td>
        {colleges.map((college, idx) => (
          <td
            key={idx}
            className="p-4 text-center border-l border-gray-200 text-slate-900"
          >
            {college.details.branchPlacements?.[branchIndex]?.averagePackage ||
              "N/A"}
          </td>
        ))}
      </tr>
      <tr className="border-t border-gray-200 hover:bg-gray-50">
        <td className="p-4 pl-8 text-gray-700 sticky left-0 bg-white border-r border-gray-200">
          Highest Package
        </td>
        {colleges.map((college, idx) => (
          <td
            key={idx}
            className="p-4 text-center border-l border-gray-200 text-slate-900"
          >
            {college.details.branchPlacements?.[branchIndex]?.highestPackage ||
              "N/A"}
          </td>
        ))}
      </tr>
      <tr className="border-t border-gray-200 hover:bg-gray-50">
        <td className="p-4 pl-8 text-gray-700 sticky left-0 bg-white border-r border-gray-200">
          Median Package
        </td>
        {colleges.map((college, idx) => (
          <td
            key={idx}
            className="p-4 text-center border-l border-gray-200 text-gray-700"
          >
            {college.details.branchPlacements?.[branchIndex]?.medianPackage ||
              "N/A"}
          </td>
        ))}
      </tr>
      <tr className="border-t border-gray-200 hover:bg-gray-50">
        <td className="p-4 pl-8 text-gray-700 sticky left-0 bg-white border-r border-gray-200">
          Placement Rate
        </td>
        {colleges.map((college, idx) => (
          <td
            key={idx}
            className="p-4 text-center border-l border-gray-200 text-gray-700"
          >
            {college.details.branchPlacements?.[branchIndex]?.placedStudents ||
              "N/A"}
          </td>
        ))}
      </tr>
    </>
  );
});

interface CutoffComparisonRowProps {
  colleges: CollegeWithDetails[];
  getFilteredCutoffs: (cutoffs: CutoffData[]) => CutoffData[];
}

const CutoffComparisonRow = memo(function CutoffComparisonRow({
  colleges,
  getFilteredCutoffs,
}: CutoffComparisonRowProps) {
  return (
    <>
      <tr className="border-t border-gray-200 hover:bg-gray-50">
        <td className="p-4 text-slate-900 sticky left-0 bg-white border-r border-gray-200">
          Opening Rank
        </td>
        {colleges.map((college, idx) => {
          const filtered = getFilteredCutoffs(college.details.cutoffs || []);
          return (
            <td key={idx} className="p-4 border-l border-gray-200">
              <div className="flex flex-col gap-2">
                {filtered.map((cutoff: CutoffData, i: number) => (
                  <div key={i} className="text-center">
                    <div className="text-slate-900">{cutoff.openingRank}</div>
                    <div className="text-gray-500">
                      {cutoff.quota} - {cutoff.subcategory}
                    </div>
                  </div>
                ))}
              </div>
            </td>
          );
        })}
      </tr>
      <tr className="border-t border-gray-200 hover:bg-gray-50">
        <td className="p-4 text-slate-900 sticky left-0 bg-white border-r border-gray-200">
          Closing Rank
        </td>
        {colleges.map((college, idx) => {
          const filtered = getFilteredCutoffs(college.details.cutoffs || []);
          return (
            <td key={idx} className="p-4 border-l border-gray-200">
              <div className="flex flex-col gap-2">
                {filtered.map((cutoff: CutoffData, i: number) => (
                  <div key={i} className="text-center">
                    <div className="text-slate-900">{cutoff.closingRank}</div>
                    <div className="text-gray-500">
                      {cutoff.quota} - {cutoff.subcategory}
                    </div>
                  </div>
                ))}
              </div>
            </td>
          );
        })}
      </tr>
    </>
  );
});
