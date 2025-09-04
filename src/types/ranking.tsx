export type Ranking = {
  rankingBody: string;
  category: string;
  rankingType: "national" | "international";
  ranksByYear: { year: number; rank: string }[];
};
