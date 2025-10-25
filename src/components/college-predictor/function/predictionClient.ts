import Papa from "papaparse";

interface FinalMainData {
  slug: string;
  name: string;
  state: string;
  nirf_number: string;
  fees: string;
  avgSalary: string;
  course: string;
  branch: string;
  quota: string;
  seatType: string;
  subCategory: string;
  examType: string;
  year: string;
  closingRank: number | string;
  round: string;
  branch_weight?: number;
  weight?: number;
}

interface PredictionResult {
  College: string;
  College_Name: string;
  State: string;
  nirfRank: string;
  fees: string;
  avgSalary: string;
  Course: string;
  Branch: string;
  Quota: string;
  SeatType: string;
  SubCategory: string;
  BranchWeight: number;
  CollegeWeight: number;
  RankScore: number;
  PriorityScore: number;
  Weight: number;
  FinalScore: number;
  AllRoundsCutoff: string;
}

let finalMainData: FinalMainData[] | null = null;

async function loadFinalMainData(): Promise<FinalMainData[]> {
  if (finalMainData) {
    console.log("✅ Using cached data:", finalMainData.length, "rows");
    return finalMainData;
  }

  try {
    const response = await fetch(
      "/college-predictor-data/final_main_college_predictor.csv"
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }

    const text = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse<FinalMainData>(text, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
        complete: (results: Papa.ParseResult<FinalMainData>) => {
          console.log(`✅ Loaded ${results.data.length} rows from CSV`);
          finalMainData = results.data as FinalMainData[];
          resolve(finalMainData);
        },
      });
    });
  } catch (error) {
    console.error("❌ Error loading CSV:", error);
    throw error;
  }
}

export async function predictCollegesTable(
  examType: string,
  rank: number,
  seatType: string,
  subCategory: string,
  user_state: string
): Promise<PredictionResult[]> {
  // === Load Combined Data ===
  const data = await loadFinalMainData();

  // === Normalize input parameters ===
  const normalizedExamType = examType.trim().toLowerCase();
  const normalizedSeatType = seatType.trim().toLowerCase();
  const normalizedSubCategory = subCategory.trim().toLowerCase();
  const normalizedUserState = user_state.trim().toLowerCase();

  // === Filter by Input Parameters ===
  let filtered = data.filter((row) => {
    const rowExamType = String(row.examType || "")
      .trim()
      .toLowerCase();
    const rowSeatType = String(row.seatType || "")
      .trim()
      .toLowerCase();
    const rowSubCategory = String(row.subCategory || "")
      .trim()
      .toLowerCase();

    return (
      rowExamType === normalizedExamType &&
      rowSeatType === normalizedSeatType &&
      rowSubCategory === normalizedSubCategory
    );
  });

  if (filtered.length === 0) {
    console.log("❌ No matching data found for given inputs.");
    return [];
  }

  // === HS quota filtering ===
  filtered = filtered.filter((row) => {
    const quota_value = String(row.quota || "")
      .trim()
      .toUpperCase();
    const college_state = String(row.state || "")
      .trim()
      .toLowerCase();

    if (quota_value === "HS") {
      return college_state === normalizedUserState;
    }
    return true; // Keep others (AI, OPEN, etc.)
  });

  // === Convert closingRank to numeric ===
  filtered = filtered
    .map((row) => ({
      ...row,
      closingRank:
        typeof row.closingRank === "number"
          ? row.closingRank
          : parseFloat(String(row.closingRank || "0")),
    }))
    .filter(
      (row) =>
        !isNaN(row.closingRank as number) && (row.closingRank as number) > 0
    );

  // === Fill missing weights ===
  filtered = filtered.map((row) => ({
    ...row,
    branch_weight:
      row.branch_weight !== undefined && row.branch_weight !== null
        ? row.branch_weight
        : 70,
    weight: row.weight !== undefined && row.weight !== null ? row.weight : 70,
  }));

  // === Compute Results ===
  const groupedMap = new Map<string, FinalMainData[]>();

  filtered.forEach((row) => {
    const key = `${row.slug}-${row.course}-${row.branch}`;
    if (!groupedMap.has(key)) {
      groupedMap.set(key, []);
    }
    groupedMap.get(key)!.push(row);
  });

  const tableRows: PredictionResult[] = [];

  for (const [, group] of groupedMap) {
    // Eligible rounds (closingRank >= rank)
    const eligibleRounds = group.filter((row) => {
      const closingRankNum =
        typeof row.closingRank === "number"
          ? row.closingRank
          : parseFloat(String(row.closingRank));
      return !isNaN(closingRankNum) && closingRankNum >= rank;
    });

    if (eligibleRounds.length === 0) continue;

    // Sort by round and get first
    const sortedRounds = eligibleRounds.sort((a, b) => {
      const aNum = parseInt(String(a.round).replace(/[^\d]/g, "")) || 0;
      const bNum = parseInt(String(b.round).replace(/[^\d]/g, "")) || 0;
      return aNum - bNum;
    });

    const firstRound = sortedRounds[0];
    const closingRank =
      typeof firstRound.closingRank === "number"
        ? firstRound.closingRank
        : parseFloat(String(firstRound.closingRank));

    // Compute score
    const rankScore =
      !isNaN(closingRank) && closingRank !== 0
        ? Math.max(0, 1 - Math.abs(rank - closingRank) / closingRank)
        : 0;

    const branchWeight = firstRound.branch_weight ?? 70;
    const collegeWeight = firstRound.weight ?? 70;
    const finalScore =
      rankScore * 0.4 +
      (branchWeight / 100) * 0.3 +
      (collegeWeight / 100) * 0.3;

    // ✅ Group by year and create cutoff string
    const yearGroups = new Map<string, FinalMainData[]>();

    group.forEach((row) => {
      const year = String(row.year || "2025");
      if (!yearGroups.has(year)) {
        yearGroups.set(year, []);
      }
      yearGroups.get(year)!.push(row);
    });

    // Sort years in descending order (2025, 2024, etc.)
    const sortedYears = Array.from(yearGroups.keys()).sort(
      (a, b) => parseInt(b) - parseInt(a)
    );

    const cutoffParts: string[] = [];

    sortedYears.forEach((year) => {
      const yearData = yearGroups.get(year)!;
      const sortedYearData = yearData.sort((a, b) => {
        const aNum = parseInt(String(a.round).replace(/[^\d]/g, "")) || 0;
        const bNum = parseInt(String(b.round).replace(/[^\d]/g, "")) || 0;
        return aNum - bNum;
      });

      const yearCutoffs = sortedYearData
        .map((row) => `${row.round}: ${Math.round(row.closingRank as number)}`)
        .join(", ");

      cutoffParts.push(yearCutoffs);
    });

    // Join years with " | " separator
    const cutoffStr = cutoffParts.join(" | ");

    tableRows.push({
      College: firstRound.slug,
      College_Name: firstRound.name || "",
      State: firstRound.state || "",
      nirfRank: firstRound.nirf_number || "",
      fees: firstRound.fees || "",
      avgSalary: firstRound.avgSalary || "",
      Course: firstRound.course,
      Branch: firstRound.branch,
      Quota: firstRound.quota || "",
      SeatType: firstRound.seatType,
      SubCategory: firstRound.subCategory,
      BranchWeight: branchWeight,
      CollegeWeight: collegeWeight,
      RankScore: rankScore,
      PriorityScore: 0, // Add a computed value if needed
      Weight: collegeWeight, // Added missing property
      FinalScore: finalScore,
      AllRoundsCutoff: cutoffStr,
    });
  }

  if (tableRows.length === 0) {
    console.log("❌ No eligible colleges found for your rank and filters.");
    return [];
  }

  // === Sort by FinalScore ===
  tableRows.sort((a, b) => b.FinalScore - a.FinalScore);

  console.log(`✅ Found ${tableRows.length} eligible colleges`);
  console.log("result:________", tableRows.slice(0, 5)); // Log top 5 results for verification
  return tableRows;
}
