import Papa from "papaparse";

interface CollegeData {
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
  closingRank: number | string;
  round: number | string;
  Weight?: number;
  weight?: number;
}

interface BranchWeight {
  Branch: string;
  Weight: number;
}

interface CollegeWeight {
  slug: string;
  weight: number;
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
  PriorityScore: number;
  Weight: number;
  RankScore: number;
  FinalScore: number;
  AllRoundsCutoff: string;
}

// Lazy load CSV data
let cutoffsData: CollegeData[] | null = null;
let branchWeightsData: BranchWeight[] | null = null;
let collegeWeightsData: CollegeWeight[] | null = null;

async function loadCutoffsData(): Promise<CollegeData[]> {
  if (cutoffsData) return cutoffsData;

  const response = await fetch("/college-predictor-data/PNC_DB.cutoffs.csv");
  const text = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      dynamicTyping: true,
      complete: (results: Papa.ParseResult<CollegeData>) => {
        cutoffsData = results.data as CollegeData[];
        resolve(cutoffsData);
      },
      error: reject,
    });
  });
}

async function loadBranchWeights(): Promise<BranchWeight[]> {
  if (branchWeightsData) return branchWeightsData;

  const response = await fetch("/college-predictor-data/BRANCH%20WEIGHT.csv");
  const text = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      dynamicTyping: true,
      complete: (results: Papa.ParseResult<BranchWeight>) => {
        branchWeightsData = results.data as BranchWeight[];
        resolve(branchWeightsData);
      },
      error: reject,
    });
  });
}

async function loadCollegeWeights(): Promise<CollegeWeight[]> {
  if (collegeWeightsData) return collegeWeightsData;

  const response = await fetch(
    "/college-predictor-data/college_weight_scores_with_stateCopy-CollegeDatawithweight.csv"
  );
  const text = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      dynamicTyping: true,
      complete: (results: Papa.ParseResult<CollegeWeight>) => {
        collegeWeightsData = results.data as CollegeWeight[];
        console.log(collegeWeightsData);
        resolve(collegeWeightsData);
      },
      error: reject,
    });
  });
}

export async function predictCollegesTable(
  examType: string,
  rank: number,
  seatType: string,
  subCategory: string,
  user_state: string
): Promise<PredictionResult[]> {
  // Load all data
  const [cutoffs, branchWeights, collegeWeights] = await Promise.all([
    loadCutoffsData(),
    loadBranchWeights(),
    loadCollegeWeights(),
  ]);

  // Create lookup maps for merging
  const branchWeightMap = new Map<string, number>();
  branchWeights.forEach((bw) => {
    branchWeightMap.set(bw.Branch, bw.Weight || 70);
  });

  const collegeWeightMap = new Map<string, number>();
  collegeWeights.forEach((cw) => {
    collegeWeightMap.set(cw.slug, cw.weight);
  });

  // Merge data: Add Weight and weight columns to cutoffs
  const merged = cutoffs.map((row) => ({
    ...row,
    Weight: branchWeightMap.get(row.branch) || 70,
    weight: collegeWeightMap.get(row.slug) || 70,
  }));

  // Filter by input parameters
  let filtered = merged.filter((row) => {
    return (
      String(row.examType || "").toLowerCase() === examType.toLowerCase() &&
      String(row.seatType || "").toLowerCase() === seatType.toLowerCase() &&
      String(row.subCategory || "").toLowerCase() === subCategory.toLowerCase()
    );
  });

  if (filtered.length === 0) {
    console.log("❌ No matching data found for given inputs.");
    return [];
  }

  // HS quota filtering logic (exactly like Python)
  filtered = filtered.filter((row) => {
    const quota_value = String(row.quota || "")
      .trim()
      .toUpperCase();
    const college_state = String(row.state || "")
      .trim()
      .toLowerCase();
    if (quota_value === "HS") {
      return college_state === user_state.toLowerCase();
    }
    return true; // keep all other quotas (OPEN, AI, etc.)
  });

  // Convert closing rank and clean
  filtered = filtered
    .map((row) => ({
      ...row,
      closingRank: parseFloat(String(row.closingRank)) || NaN,
    }))
    .filter((row) => !isNaN(row.closingRank) && row.closingRank > 0);

  // Fill missing weights (already done in merge, but ensure)
  filtered = filtered.map((row) => ({
    ...row,
    Weight: row.Weight || 70,
    weight: row.weight || 70,
  }));

  // Compute Results
  const groupedMap = new Map<string, CollegeData[]>();

  filtered.forEach((row) => {
    const key = `${row.slug}-${row.course}-${row.branch}`;
    if (!groupedMap.has(key)) {
      groupedMap.set(key, []);
    }
    groupedMap.get(key)!.push(row);
  });

  const tableRows: PredictionResult[] = [];

  for (const [key, groupData] of groupedMap) {
    // Filter eligible rounds (closingRank >= rank) - exactly like Python
    const eligibleRounds = groupData.filter(
      (row) => parseFloat(String(row.closingRank)) >= rank
    );

    if (eligibleRounds.length === 0) continue;

    // Sort by round and get first
    const sortedRounds = eligibleRounds.sort(
      (a, b) => parseFloat(String(a.round)) - parseFloat(String(b.round))
    );
    const firstRound = sortedRounds[0];
    const closingRank = parseFloat(String(firstRound.closingRank));
    const rankScore = Math.max(
      0,
      1 - Math.abs(rank - closingRank) / closingRank
    );

    // Use Weight and weight from merged data
    const branchWeight = firstRound.Weight || 70;
    const collegeWeight = firstRound.weight || 70;

    const finalScore =
      rankScore * 0.4 +
      (branchWeight / 100) * 0.3 +
      (collegeWeight / 100) * 0.3;

    // Create cutoff string - exactly like Python (includes ALL rounds from ALL years)
    const sortedAllRounds = groupData.sort(
      (a, b) => parseFloat(String(a.round)) - parseFloat(String(b.round))
    );
    const cutoffStr = sortedAllRounds
      .map((row) => `${row.round}: ${parseInt(String(row.closingRank))}`)
      .join(", ");

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
      PriorityScore: branchWeight,
      Weight: collegeWeight,
      RankScore: rankScore,
      FinalScore: finalScore,
      AllRoundsCutoff: cutoffStr,
    });
  }

  if (tableRows.length === 0) {
    console.log("❌ No eligible colleges found for your rank and filters.");
    return [];
  }

  // Sort by FinalScore
  tableRows.sort((a, b) => b.FinalScore - a.FinalScore);

  return tableRows;
}
