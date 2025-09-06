"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { School } from "lucide-react";
import { jeeAdvancedColleges, jeeMainColleges, neetColleges } from "./data";

interface CollegeWiseCutoffsProps {
  selectedExam: string;
}

export function CollegeWiseCutoffs({ selectedExam }: CollegeWiseCutoffsProps) {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <School className="h-5 w-5 text-slate-600" />
          <h2 className="text-2xl font-semibold text-slate-900">
            Top College Cutoffs
          </h2>
        </div>
        <p className="text-slate-600">
          Branch-wise cutoff data for premier institutions
        </p>
      </div>

      <Card className="border border-slate-200 shadow-sm">
        <div className="p-8">
          <div className="overflow-x-auto">
            {selectedExam === "JEE-Advanced" && (
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="text-slate-600 font-medium">
                      College
                    </TableHead>
                    <TableHead className="text-center text-slate-600 font-medium">
                      NIRF Rank
                    </TableHead>
                    <TableHead className="text-center text-slate-600 font-medium">
                      CSE
                    </TableHead>
                    <TableHead className="text-center text-slate-600 font-medium">
                      EE
                    </TableHead>
                    <TableHead className="text-center text-slate-600 font-medium">
                      ME
                    </TableHead>
                    <TableHead className="text-center text-slate-600 font-medium">
                      CE
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jeeAdvancedColleges.map((college, index) => (
                    <TableRow key={index} className="border-slate-100">
                      <TableCell className="font-medium text-slate-900">
                        {college.college}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{college.ranking}</Badge>
                      </TableCell>
                      <TableCell className="text-center font-medium text-blue-700">
                        {college.cse}
                      </TableCell>
                      <TableCell className="text-center font-medium text-green-700">
                        {college.ee}
                      </TableCell>
                      <TableCell className="text-center font-medium text-amber-700">
                        {college.me}
                      </TableCell>
                      <TableCell className="text-center font-medium text-purple-700">
                        {college.ce}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {selectedExam === "JEE-Main" && (
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="text-slate-600 font-medium">
                      College
                    </TableHead>
                    <TableHead className="text-center text-slate-600 font-medium">
                      NIRF Rank
                    </TableHead>
                    <TableHead className="text-center text-slate-600 font-medium">
                      CSE
                    </TableHead>
                    <TableHead className="text-center text-slate-600 font-medium">
                      EE
                    </TableHead>
                    <TableHead className="text-center text-slate-600 font-medium">
                      ME
                    </TableHead>
                    <TableHead className="text-center text-slate-600 font-medium">
                      CE
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jeeMainColleges.map((college, index) => (
                    <TableRow key={index} className="border-slate-100">
                      <TableCell className="font-medium text-slate-900">
                        {college.college}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{college.ranking}</Badge>
                      </TableCell>
                      <TableCell className="text-center font-medium text-blue-700">
                        {college.cse}%
                      </TableCell>
                      <TableCell className="text-center font-medium text-green-700">
                        {college.ee ? `${college.ee}%` : "-"}
                      </TableCell>
                      <TableCell className="text-center font-medium text-amber-700">
                        {college.me ? `${college.me}%` : "-"}
                      </TableCell>
                      <TableCell className="text-center font-medium text-purple-700">
                        {college.ce ? `${college.ce}%` : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {selectedExam === "NEET" && (
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="text-slate-600 font-medium">
                      College
                    </TableHead>
                    <TableHead className="text-center text-slate-600 font-medium">
                      NIRF Rank
                    </TableHead>
                    <TableHead className="text-center text-slate-600 font-medium">
                      MBBS
                    </TableHead>
                    <TableHead className="text-center text-slate-600 font-medium">
                      BDS
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {neetColleges.map((college, index) => (
                    <TableRow key={index} className="border-slate-100">
                      <TableCell className="font-medium text-slate-900">
                        {college.college}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{college.ranking}</Badge>
                      </TableCell>
                      <TableCell className="text-center font-medium text-blue-700">
                        {college.mbbs}
                      </TableCell>
                      <TableCell className="text-center font-medium text-green-700">
                        {college.bds || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </Card>
    </section>
  );
}
