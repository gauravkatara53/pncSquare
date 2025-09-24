import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Building2, MapPin, Users } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface RecruiterProps {
  name: string;
  sector: string;
  hiresCount: number;
  topPackage: string;
  locations: string[];
}

function RecruiterCard({
  name,
  sector,
  hiresCount,
  topPackage,
  locations,
}: RecruiterProps) {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
          <Building2 className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{name}</h4>
          <Badge variant="secondary" className="mb-2 text-xs">
            {sector}
          </Badge>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{hiresCount} hired</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-green-600 font-medium">₹{topPackage}</span>
              <span>top package</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{locations.join(", ")}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function TopRecruiters() {
  const recruiters = [
    {
      name: "Microsoft",
      sector: "Technology",
      hiresCount: 15,
      topPackage: "1.8 Cr",
      locations: ["Hyderabad", "Bangalore"],
    },
    {
      name: "Google",
      sector: "Technology",
      hiresCount: 12,
      topPackage: "2.14 Cr",
      locations: ["Bangalore", "Gurgaon"],
    },
    {
      name: "Amazon",
      sector: "E-commerce/Cloud",
      hiresCount: 18,
      topPackage: "58 L",
      locations: ["Bangalore", "Chennai"],
    },
    {
      name: "Adobe",
      sector: "Software",
      hiresCount: 8,
      topPackage: "44 L",
      locations: ["Bangalore"],
    },
    {
      name: "Goldman Sachs",
      sector: "Finance",
      hiresCount: 6,
      topPackage: "39 L",
      locations: ["Bangalore", "Mumbai"],
    },
    {
      name: "Flipkart",
      sector: "E-commerce",
      hiresCount: 14,
      topPackage: "42 L",
      locations: ["Bangalore"],
    },
    {
      name: "Samsung",
      sector: "Electronics",
      hiresCount: 10,
      topPackage: "28 L",
      locations: ["Bangalore", "Noida"],
    },
    {
      name: "Intel",
      sector: "Semiconductor",
      hiresCount: 7,
      topPackage: "32 L",
      locations: ["Bangalore"],
    },
  ];

  return (
    <Card className="px-2 sm:px-6 py-4 sm:py-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl text-gray-800">Top Recruiters 2024</h3>
        <Badge className="bg-blue-100 text-blue-800">120+ Offer</Badge>
      </div>

      <div className="mb-6">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1590494162566-ed7bd874ed33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29tcGFueSUyMGxvZ29zJTIwY29ycG9yYXRlfGVufDF8fHx8MTc1NTI4Mzc4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Corporate recruiters"
          className="w-full h-24 object-cover rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {recruiters.map((recruiter, index) => (
          <RecruiterCard key={index} {...recruiter} />
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">120+</div>
            <div className="text-sm text-gray-600">Total Recruiters</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">45</div>
            <div className="text-sm text-gray-600">PPO</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">68%</div>
            <div className="text-sm text-gray-600">Average</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">+15%</div>
            <div className="text-sm text-gray-600">Rise-Placement</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
