// src/components/CollegePageClientWrapper.tsx
'use client'

import React from "react";

const CollegePageClientWrapper = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.slice(1);
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);
  return <>{children}</>;
};

export default CollegePageClientWrapper;
