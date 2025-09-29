"use client";

import { Search, Menu, User } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import AuthPopup from "./AuthPopup";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser();
  const navItems = [
    { name: "Colleges", id: "colleges", href: "/colleges" },
    { name: "Courses", id: "courses", href: "/courses" },
    { name: "Exams", id: "exams", href: "/exam" },
    { name: "Reviews", id: "reviews", href: "/review" },
    { name: "Cutoffs", id: "cutoff", href: "/cutoff" },
    { name: "News", id: "news", href: "/news" },
  ];
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const params = new URLSearchParams();
      params.append("searchTerm", searchTerm.trim());
      router.push(`/colleges?${params.toString()}`);
    }
  };

  return (
    <header className="bg-white border-b border-gray-500 top-0 z-50 shadow-sm">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/image/logo.png"
              alt="PNC Square Logo"
              width={40}
              height={40}
              className="w-10 h-10 rounded-lg"
            />
            <div className="flex flex-col">
              <div className="font-bold text-slate-900 text-lg">PNC Square</div>
              <div className="text-xs text-gray-500">
                Find Your Dream College
              </div>
            </div>
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-2xl mx-8 hidden md:block"
            role="search"
            aria-label="Search colleges"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search College, Course, Exam..."
                className="pl-10 pr-4 py-2 w-full bg-gray-50 border-gray-300 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search Colleges"
              />
            </div>
          </form>

          {/* Desktop Buttons */}
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-900 hover:text-gray-900"
              >
                <User className="w-4 h-4 mr-2" />
                {user.firstName}
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-900 hover:text-gray-900"
                onClick={() => {
                  setMode("signIn"); // open sign in modal by default
                  setOpen(true);
                }}
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
              <User className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-slate-900 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="hidden md:flex space-x-6 py-3 overflow-x-auto">
            {navItems.map((item) => {
              const isActive = pathname?.startsWith(item.href) ?? false;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`text-sm font-medium whitespace-nowrap px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "text-yellow-400 bg-white/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <nav className="md:hidden flex flex-col space-y-2 py-3">
              {navItems.map((item) => {
                const isActive = pathname?.startsWith(item.href) ?? false;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-medium text-left px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? "text-yellow-400 bg-white/10"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </div>

      {/* Auth Popup */}
      <AuthPopup open={open} setOpen={setOpen} mode={mode} setMode={setMode} />
    </header>
  );
}
