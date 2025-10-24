import dfd from "danfojs-node";
// === Fixed Input Parameters ===
const examType = "JEE-Main";
const rank = 50000;
const seatType = "OPEN";
const subCategory = "Gender-Neutral";
const user_state = "Odisha";

// === Load Data ===
async function predictCollegesTable() {
  const cutoffs = await dfd.readCSV("../Data/PNC_DB.cutoffs.csv");
  const branchWeights = await dfd.readCSV("../Data/BRANCH WEIGHT.csv");
  const collegeWeights = await dfd.readCSV(
    "../Data/college_weight_scores_with_stateCopy-CollegeDatawithweight.csv"
  );

  // === Merge Data ===
  let merged = cutoffs.merge(branchWeights, {
    leftOn: "branch",
    rightOn: "Branch",
    how: "left",
  });
  merged = merged.merge(collegeWeights, { on: "slug", how: "left" });

  // === Filter by Input Parameters ===
  let filtered = merged.query(
    merged["examType"].str
      .toLowerCase()
      .eq(examType.toLowerCase())
      .and(merged["seatType"].str.toLowerCase().eq(seatType.toLowerCase()))
      .and(
        merged["subCategory"].str.toLowerCase().eq(subCategory.toLowerCase())
      )
  );

  if (filtered.shape[0] === 0) {
    console.log("❌ No matching data found for given inputs.");
    return new dfd.DataFrame([]);
  }

  // === New HS quota filtering logic ===
  filtered = filtered.filter((row: object) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rowData = row as Record<string, unknown>;
    const quota_value = String(rowData["quota"] || "")
      .trim()
      .toUpperCase();
    const college_state = String(rowData["state"] || "")
      .trim()
      .toLowerCase();
    if (quota_value === "HS") {
      return college_state === user_state.toLowerCase();
    }
    return true;
  });

  // === Convert closing rank and clean ===
  filtered["closingRank"] = filtered["closingRank"].astype("float32");
  filtered = filtered.dropNa({ columns: ["closingRank"] });

  // === Fill missing weights ===
  filtered["Weight"] = filtered["Weight"].fillNa(70);
  filtered["weight"] = filtered["weight"].fillNa(70);

  // === Compute Results ===
  const tableRows = [];
  const grouped = filtered.groupby(["slug", "course", "branch"]);
  for (const group of grouped) {
    const groupDf = group[1];
    const eligibleRounds = groupDf.query(groupDf["closingRank"].ge(rank));
    if (eligibleRounds.shape[0] === 0) continue;

    const firstRound = eligibleRounds.sortValues("round").iloc({ rows: [0] });

    const closingRank = firstRound["closingRank"].values[0];
    const rankScore = Math.max(
      0,
      1 - Math.abs(rank - closingRank) / closingRank
    );
    const finalScore =
      rankScore * 0.4 +
      (firstRound["Weight"].values[0] / 100) * 0.3 +
      (firstRound["weight"].values[0] / 100) * 0.3;

    interface CollegeDetails {
      College: string;
      College_Name: string;
      State: string;
      nirfRank: string | number;
      fees: string | number;
      avgSalary: string | number;
      Course: string;
      Branch: string;
      Quota: string;
      SeatType: string;
      SubCategory: string;
      PriorityScore: number;
      Weight: number;
      RankScore: number;
      FinalScore: number;
      institute_type?: string;
      ownership?: string;
      location?: string;
      website?: string;
      email?: string;
      phone?: string;
      address?: string;
      [key: string]: string | number | undefined; // <-- This line allows string indexing
    }

    const cutoffStr: string = groupDf
      .sortValues("round")
      .apply((row: object): string => {
        const rowData = row as Record<string, unknown>;
        return `${rowData["round"]}: ${parseInt(
          String(rowData["closingRank"])
        )}`;
      })
      .values.join(", ");

    const collegeDetails: CollegeDetails = {
      College: firstRound["slug"].values[0],
      College_Name: firstRound["name"].values[0] || "",
      State: firstRound["state"].values[0] || "",
      nirfRank: firstRound["nirf_number"].values[0] || "",
      fees: firstRound["fees"].values[0] || "",
      avgSalary: firstRound["avgSalary"].values[0] || "",
      Course: firstRound["course"].values[0],
      Branch: firstRound["branch"].values[0],
      Quota: firstRound["quota"].values[0] || "",
      SeatType: firstRound["seatType"].values[0],
      SubCategory: firstRound["subCategory"].values[0],
      PriorityScore: parseFloat(firstRound["Weight"].values[0]),
      Weight: parseFloat(firstRound["weight"].values[0]),
      RankScore: rankScore,
      FinalScore: finalScore,
    };

    [
      "institute_type",
      "ownership",
      "location",
      "website",
      "email",
      "phone",
      "address",
    ].forEach((col: string) => {
      if (firstRound.hasOwnProperty(col)) {
        (collegeDetails as Record<string, string | number | undefined>)[col] =
          firstRound[col].values[0] || "";
      }
    });

    tableRows.push({
      ...collegeDetails,
      AllRoundsCutoff: cutoffStr,
    });
  }

  let resultDf = new dfd.DataFrame(tableRows);

  if (resultDf.shape[0] === 0) {
    console.log("❌ No eligible colleges found for your rank and filters.");
    return resultDf;
  }

  // === Sort by FinalScore ===
  resultDf = resultDf.sortValues("FinalScore", { ascending: false });

  // === Display Results ===
  resultDf.print();
  return resultDf;
}
// === Run ===
predictCollegesTable();
