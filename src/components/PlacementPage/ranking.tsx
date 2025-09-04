import { Trophy } from "lucide-react";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Ranking = {
  rankingBody: string;
  category: string;
  rankingType: "national" | "international";
  ranksByYear: { year: number; rank: string }[];
};

export function Rankings({ rankings }: { rankings?: Ranking[] }) {
  if (!rankings || rankings.length === 0) return null;

  // Separate rankings by type
  const nationalRankings = rankings.filter((r) => r.rankingType === "national");
  const internationalRankings = rankings.filter(
    (r) => r.rankingType === "international"
  );

  // Helper: Get latest and previous rank
  const getRanks = (ranksByYear: { year: number; rank: string }[]) => {
    if (!ranksByYear || ranksByYear.length === 0)
      return { latest: "--", prev: "--" };

    const sorted = [...ranksByYear].sort((a, b) => b.year - a.year);

    const latest = `${sorted[0].rank} (${sorted[0].year})`;
    const prev =
      sorted[1] !== undefined ? `${sorted[1].rank} (${sorted[1].year})` : "--";

    return { latest, prev };
  };

  const renderTable = (rankings: Ranking[]) => (
    <Table>
      <TableHeader>
        <TableRow className="border-slate-200">
          <TableHead className="text-slate-600">Ranking Body</TableHead>
          <TableHead className="text-slate-600">Category</TableHead>
          <TableHead className="text-center text-slate-600">
            Latest (Year)
          </TableHead>
          <TableHead className="text-center text-slate-600">
            Previous (Year)
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rankings.map((ranking, idx) => {
          const { latest, prev } = getRanks(ranking.ranksByYear);
          return (
            <TableRow key={idx} className="border-slate-100">
              <TableCell className="font-medium text-slate-900">
                {ranking.rankingBody}
              </TableCell>
              <TableCell className="text-slate-700">
                {ranking.category}
              </TableCell>
              <TableCell className="text-center text-slate-900">
                {latest}
              </TableCell>
              <TableCell className="text-center text-slate-700">
                {prev}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );

  return (
    <section className="mb-16">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="h-5 w-5 text-slate-600" />
          <h2 className="text-2xl font-semibold text-slate-900">Rankings</h2>
        </div>
        <p className="text-slate-600">National and international recognition</p>
      </div>

      <div className="space-y-8">
        {/* International Rankings */}
        {internationalRankings.length > 0 && (
          <Card className="border border-slate-200 shadow-sm">
            <div className="py-8 px-4">
              <h3 className="font-medium text-slate-900 mb-6">
                International Rankings
              </h3>
              <div className="overflow-x-auto">
                {renderTable(internationalRankings)}
              </div>
            </div>
          </Card>
        )}

        {/* National Rankings */}
        {nationalRankings.length > 0 && (
          <Card className="border border-slate-200 shadow-sm">
            <div className="py-8 px-4">
              <h3 className="font-medium text-slate-900 mb-6">
                National Rankings
              </h3>
              <div className="overflow-x-auto">
                {renderTable(nationalRankings)}
              </div>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
}
