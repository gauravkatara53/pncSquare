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

export function Rankings() {
  return (
    <div className=" ">
      {/* Rankings */}
      <section className="mb-16">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="h-5 w-5 text-slate-600" />
            <h2 className="text-2xl font-semibold text-slate-900">Rankings</h2>
          </div>
          <p className="text-slate-600">
            National and international recognition
          </p>
        </div>

        <div className="space-y-8">
          {/* International Rankings */}
          <Card className="border border-slate-200 shadow-sm">
            <div className="py-8 px-4">
              <h3 className="font-medium text-slate-900 mb-6">
                International Rankings
              </h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="text-slate-600">
                        Ranking Body
                      </TableHead>
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
                    <TableRow className="border-slate-100">
                      <TableCell className="font-medium text-slate-900">
                        QS Rankings
                      </TableCell>
                      <TableCell className="text-slate-700">
                        World University Rankings
                      </TableCell>
                      <TableCell className="text-center text-slate-900">
                        951-1000 (2025)
                      </TableCell>
                      <TableCell className="text-center text-slate-700">
                        731-740 (2024)
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-slate-100">
                      <TableCell className="font-medium text-slate-900">
                        QS Rankings
                      </TableCell>
                      <TableCell className="text-slate-700">
                        Asia University Rankings
                      </TableCell>
                      <TableCell className="text-center text-slate-900">
                        421-430 (2025)
                      </TableCell>
                      <TableCell className="text-center text-slate-700">
                        301-350 (2024)
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-slate-100">
                      <TableCell className="font-medium text-slate-900">
                        THE Rankings
                      </TableCell>
                      <TableCell className="text-slate-700">
                        World University Rankings
                      </TableCell>
                      <TableCell className="text-center text-slate-900">
                        1001–1200 (2023)
                      </TableCell>
                      <TableCell className="text-center text-slate-700">
                        1001–1200 (2022)
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-slate-100">
                      <TableCell className="font-medium text-slate-900">
                        THE Rankings
                      </TableCell>
                      <TableCell className="text-slate-700">
                        Asia University Rankings
                      </TableCell>
                      <TableCell className="text-center text-slate-900">
                        301–350 (2023)
                      </TableCell>
                      <TableCell className="text-center text-slate-700">
                        301–350 (2022)
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-slate-100">
                      <TableCell className="font-medium text-slate-900">
                        THE Rankings
                      </TableCell>
                      <TableCell className="text-slate-700">
                        Engineering Subject Rankings
                      </TableCell>
                      <TableCell className="text-center text-slate-900">
                        601–800 (2023)
                      </TableCell>
                      <TableCell className="text-center text-slate-700">
                        601–800 (2022)
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>

          {/* National Rankings */}
          <Card className="border border-slate-200 shadow-sm">
            <div className="py-8 px-4">
              <h3 className="font-medium text-slate-900 mb-6">
                National Rankings
              </h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="text-slate-600">
                        Ranking Body
                      </TableHead>
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
                    <TableRow className="border-slate-100">
                      <TableCell className="font-medium text-slate-900">
                        NIRF
                      </TableCell>
                      <TableCell className="text-slate-700">
                        Overall Rankings
                      </TableCell>
                      <TableCell className="text-center text-slate-900">
                        101-150 (2024)
                      </TableCell>
                      <TableCell className="text-center text-slate-700">
                        91 (2023)
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-slate-100">
                      <TableCell className="font-medium text-slate-900">
                        NIRF
                      </TableCell>
                      <TableCell className="text-slate-700">
                        Engineering Rankings
                      </TableCell>
                      <TableCell className="text-center text-slate-900">
                        54 (2024)
                      </TableCell>
                      <TableCell className="text-center text-slate-700">
                        47 (2023)
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-slate-100">
                      <TableCell className="font-medium text-slate-900">
                        NIRF
                      </TableCell>
                      <TableCell className="text-slate-700">
                        Research Rankings
                      </TableCell>
                      <TableCell className="text-center text-slate-900">
                        37 (2022)
                      </TableCell>
                      <TableCell className="text-center text-slate-700">
                        --
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-slate-100">
                      <TableCell className="font-medium text-slate-900">
                        India Today
                      </TableCell>
                      <TableCell className="text-slate-700">
                        Top Govt. Engineering Colleges
                      </TableCell>
                      <TableCell className="text-center text-slate-900">
                        11 (2022)
                      </TableCell>
                      <TableCell className="text-center text-slate-700">
                        --
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
