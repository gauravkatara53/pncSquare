import { GraduationCap, Award, Wallet, IndianRupee } from "lucide-react";
import { Badge } from "../ui/badge";
import Image from "next/image";

export default function CollegeHeader() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform rotate-45"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-8 h-8 text-yellow-400" />
              <Badge className="bg-yellow-400 text-yellow-900 px-3 py-1 hover:bg-yellow-400">
                Report 2025
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              NIT JAMSHEDPUR
              <span className="block text-yellow-400">Statistics 2025</span>
            </h1>

            <p className="text-xl hidden sm:block text-blue-100 mb-8 leading-relaxed">
              Exceptional placement outcomes with record-breaking packages and
              industry partnerships across diverse sectors.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {/* Fees */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm text-center sm:text-left">
                <div className="p-2 bg-yellow-400/20 rounded-lg">
                  <IndianRupee className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <div className="text-sm text-blue-200">Fees</div>
                  <div className="font-semibold text-lg">1.39 L</div>
                </div>
              </div>

              {/* Avg Package */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm text-center sm:text-left">
                <div className="p-2 bg-green-400/20 rounded-lg">
                  <Wallet className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-blue-200">Avg offer</div>
                  <div className="font-semibold text-lg">13 L</div>
                </div>
              </div>

              {/* NIRF */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm text-center sm:text-left">
                <div className="p-2 bg-purple-400/20 rounded-lg">
                  <Award className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-blue-200">NIRF</div>
                  <div className="font-semibold text-lg">101-150</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20">
              <Image
                src="https://avenuemail.in/wp-content/uploads/2023/11/20231102_195315.jpg"
                alt="IIT Bhubaneswar Campus"
                width={400}
                height={256}
                className="w-full h-64 object-cover rounded-xl"
              />
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">₹1.25Cr</div>
                  <div className="text-sm text-blue-200">Highest Package</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">97.2%</div>
                  <div className="text-sm text-blue-200">Placement Rate</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
