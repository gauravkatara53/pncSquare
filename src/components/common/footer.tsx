import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";
export function Footer() {
  const quickLinks = [
    { name: "About Us", href: "/aboutus" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Careers", href: "/careers" },
    { name: "Help Center", href: "/help-center" },
  ];

  const examLinks = [
    { name: "JEE Main", href: "exam?exam=jee-main" },
    { name: "JEE Advanced", href: "exam?exam=jee-advanced" },
    { name: "NEET UG", href: "exam?exam=neet-ug" },
    { name: "GATE", href: "exam?exam=gate" },
    { name: "CAT", href: "exam?exam=cat" },
    { name: "CLAT", href: "exam?exam=clat" },
  ];

  const collegeLinks = [
    {
      name: "Engineering Colleges",
      href: "colleges?stream=Engineering&page=1&limit=9",
    },
    {
      name: "Medical Colleges",
      href: "colleges?stream=Medical&page=1&limit=9",
    },
    {
      name: "Management Colleges",
      href: "colleges?stream=Management&page=1&limit=9",
    },
    { name: "Law Colleges", href: "colleges?stream=Law&page=1&limit=9" },
    {
      name: "Arts & Science",
      href: "colleges?stream=Arts%20&%20Science&page=1&limit=9",
    },
    {
      name: "Pharmacy Colleges",
      href: "colleges?stream=Pharmacy&page=1&limit=9",
    },
  ];

  return (
    <footer className="bg-slate-900 text-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P&C</span>
              </div>
              <div>
                <div className="font-bold text-white text-lg">P&C Square</div>
                <div className="text-xs text-gray-400">
                  Find Your Dream College
                </div>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-4 sm:mb-6 leading-relaxed">
              India&apos;s most trusted platform for college admissions,
              rankings, and reviews. Helping students make informed decisions
              about their future since 2024.
            </p>

            <div className="space-y-2 sm:space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-4 h-4 text-yellow-400" />
                <span>6200284909</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-4 h-4 text-yellow-400" />
                <span>info@p&csquare.com</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 text-yellow-400" />
                <span>Noida, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links (hidden on small screens) */}
          <div className="hidden lg:block">
            <h3 className="font-semibold text-white mb-4 sm:mb-6">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Exams (hidden on small screens) */}
          <div className="hidden lg:block">
            <h3 className="font-semibold text-white mb-4 sm:mb-6">
              Popular Exams
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {examLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* College Categories (hidden on small screens) */}
          <div className="hidden lg:block">
            <h3 className="font-semibold text-white mb-4 sm:mb-6">
              College Categories
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {collegeLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="text-gray-400 text-sm">Follow us:</span>
              <div className="flex items-center gap-3 sm:gap-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/pncsquare/"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                {/* <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a> */}
              </div>
            </div>

            <div className="text-gray-400 text-sm text-center sm:text-right mt-2 sm:mt-0">
              <p>© 2025 Pncsquare. All rights reserved.</p>
              <p className="mt-1">Made with ❤️ for students across India</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
