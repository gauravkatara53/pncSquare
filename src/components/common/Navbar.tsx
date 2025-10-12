"use client";

import { Search, Menu, User } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import AuthPopup from "./AuthPopup";
import { collegeSearchSuggestions } from "../../Data/searchSuggestion";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    typeof collegeSearchSuggestions
  >([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const navItems = [
    { name: "Colleges", id: "colleges", href: "/colleges?page=1&limit=9" },
    { name: "Courses", id: "courses", href: "/courses" },
    { name: "Exams", id: "exams", href: "/exam" },
    { name: "Reviews", id: "reviews", href: "/review" },
    { name: "Cutoffs", id: "cutoff", href: "/cutoff" },
    { name: "News", id: "news", href: "/news" },
  ];
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");

  // Handle search input changes and filter suggestions
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedSuggestionIndex(-1); // Reset selection when typing

    if (value.trim().length >= 2) {
      const filtered = collegeSearchSuggestions
        .filter((college) =>
          college.name.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 4); // Limit to 4 suggestions

      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (
    college: (typeof collegeSearchSuggestions)[0]
  ) => {
    setSearchTerm(college.name);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    const params = new URLSearchParams();
    params.append("searchTerm", college.name);
    router.push(`/colleges?${params.toString()}`);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || filteredSuggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          // Select the highlighted suggestion
          handleSuggestionClick(filteredSuggestions[selectedSuggestionIndex]);
        } else {
          // Perform normal search
          handleSearch(e);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
      default:
        break;
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
      const params = new URLSearchParams();
      params.append("searchTerm", searchTerm.trim());
      router.push(`/colleges?${params.toString()}`);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // handle user icon click (desktop + mobile)
  const handleUserClick = () => {
    if (user) {
      router.push("/profile"); // if logged in → profile
    } else {
      setMode("signIn"); // if not logged in → show login modal
      setOpen(true);
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
              alt="Pncsquare Logo"
              width={40}
              height={40}
              className="w-10 h-10 rounded-lg"
            />
            <div className="flex flex-col">
              <div className="font-bold text-slate-900 text-lg">Pncsquare</div>
              <div className="text-xs text-gray-500">
                Find Your Dream College
              </div>
            </div>
          </Link>

          {/* Search Bar - Hidden on Mobile */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-2xl mx-8 hidden md:block"
            role="search"
            aria-label="Search colleges"
          >
            <div className="relative" ref={searchRef}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search College, Course, Exam..."
                className="pl-10 pr-4 py-2 w-full bg-gray-50 border-gray-300 focus:border-blue-500"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                aria-label="Search Colleges"
                autoComplete="off"
                onFocus={() => {
                  if (
                    searchTerm.length >= 2 &&
                    filteredSuggestions.length > 0
                  ) {
                    setShowSuggestions(true);
                  }
                }}
              />

              {/* Search Suggestions Dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                  {filteredSuggestions.map((college, index) => (
                    <div
                      key={`${college.id}-${index}`}
                      onClick={() => handleSuggestionClick(college)}
                      onMouseEnter={() => setSelectedSuggestionIndex(index)}
                      className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center justify-between transition-colors ${
                        index === selectedSuggestionIndex
                          ? "bg-blue-50 border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span
                          className={`text-sm font-medium ${
                            index === selectedSuggestionIndex
                              ? "text-blue-900"
                              : "text-gray-900"
                          }`}
                        >
                          {college.name}
                        </span>
                      </div>
                      <Search
                        className={`w-4 h-4 ${
                          index === selectedSuggestionIndex
                            ? "text-blue-500"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-900 hover:text-gray-900"
              onClick={handleUserClick}
            >
              <User className="w-4 h-4 mr-2" />
              {user ? user.firstName : "Sign In"}
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="sm" onClick={handleUserClick}>
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
