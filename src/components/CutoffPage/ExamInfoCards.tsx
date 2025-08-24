"use client";

import { Card } from "@/components/ui/card";

interface ExamInfoCardsProps {
  selectedExam: string;
}

export function ExamInfoCards({ selectedExam }: ExamInfoCardsProps) {
  return (
    <section className="mb-16">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Exam Pattern</h3>
          <div className="space-y-2 text-sm text-slate-600">
            {selectedExam === "jee-advanced" && (
              <>
                <p>• Duration: 6 hours (3 hours each paper)</p>
                <p>• Total Questions: 54</p>
                <p>• Subjects: Physics, Chemistry, Mathematics</p>
                <p>• Mode: Computer Based Test (CBT)</p>
              </>
            )}
            {selectedExam === "jee-main" && (
              <>
                <p>• Duration: 3 hours</p>
                <p>• Total Questions: 90</p>
                <p>• Subjects: Physics, Chemistry, Mathematics</p>
                <p>• Mode: Computer Based Test (CBT)</p>
              </>
            )}
            {selectedExam === "neet" && (
              <>
                <p>• Duration: 3 hours 20 minutes</p>
                <p>• Total Questions: 200</p>
                <p>• Subjects: Physics, Chemistry, Biology</p>
                <p>• Mode: Pen and Paper (Offline)</p>
              </>
            )}
          </div>
        </Card>

        <Card className="border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Key Dates 2024</h3>
          <div className="space-y-2 text-sm text-slate-600">
            {selectedExam === "jee-advanced" && (
              <>
                <p>• Registration: April 30 - May 9</p>
                <p>• Exam Date: May 26, 2024</p>
                <p>• Result: June 9, 2024</p>
                <p>• Counselling: June 10 onwards</p>
              </>
            )}
            {selectedExam === "jee-main" && (
              <>
                <p>• Session 1: Jan 24-31, 2024</p>
                <p>• Session 2: April 4-15, 2024</p>
                <p>• Result: Feb & April 2024</p>
                <p>• Counselling: June onwards</p>
              </>
            )}
            {selectedExam === "neet" && (
              <>
                <p>• Registration: Feb 9 - Mar 9</p>
                <p>• Exam Date: May 5, 2024</p>
                <p>• Result: June 4, 2024</p>
                <p>• Counselling: July onwards</p>
              </>
            )}
          </div>
        </Card>

        <Card className="border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Statistics</h3>
          <div className="space-y-2 text-sm text-slate-600">
            {selectedExam === "jee-advanced" && (
              <>
                <p>• Total Applicants: ~2.5 lakh</p>
                <p>• Total Seats: ~16,000</p>
                <p>• Acceptance Rate: ~6.4%</p>
                <p>• Conducting Body: IIT Madras</p>
              </>
            )}
            {selectedExam === "jee-main" && (
              <>
                <p>• Total Applicants: ~12 lakh</p>
                <p>• Total Seats: ~1.5 lakh</p>
                <p>• Acceptance Rate: ~12.5%</p>
                <p>• Conducting Body: NTA</p>
              </>
            )}
            {selectedExam === "neet" && (
              <>
                <p>• Total Applicants: ~20 lakh</p>
                <p>• Total Seats: ~1.08 lakh</p>
                <p>• Acceptance Rate: ~5.4%</p>
                <p>• Conducting Body: NTA</p>
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
