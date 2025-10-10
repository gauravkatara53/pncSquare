/**
 * Example Usage: Placement Data with availablePlacementReports
 * This shows how the placement section behaves with different scenarios
 */

// Example 1: College with placement data for multiple years
const collegeWithMultipleYears = {
  name: "IIT Delhi",
  slug: "iit-delhi",
  availablePlacementReports: [2027, 2026, 2025, 2024, 2023],
  isPlacementRateAvailable: true,
  isMedianPackageAvailable: true,
  isHighestPackageAvailable: true,
  isAveragePackageAvailable: true,
};

// Result:
// ✅ Placement section will be shown
// ✅ Year dropdown will show: 2027, 2026, 2025, 2024, 2023 (newest first)
// ✅ Default selected year: 2027 (most recent)
// ✅ API calls will only be made for years in the availablePlacementReports array

// Example 2: College with placement data for single year
const collegeWithSingleYear = {
  name: "NSUT Delhi",
  slug: "nsut-delhi",
  availablePlacementReports: [2025],
  isPlacementRateAvailable: true,
  isMedianPackageAvailable: true,
  isHighestPackageAvailable: false,
  isAveragePackageAvailable: true,
};

// Result:
// ✅ Placement section will be shown
// ❌ No year dropdown (since only 1 year)
// ✅ Shows badge: "Placement Data for Year: 2025"
// ✅ API calls will be made for 2025 only

// Example 3: College with no placement data
const collegeWithNoPlacement = {
  name: "Some Private College",
  slug: "some-private-college",
  // availablePlacementReports: undefined or []
  isPlacementRateAvailable: false,
  isMedianPackageAvailable: false,
  isHighestPackageAvailable: false,
  isAveragePackageAvailable: false,
};

// Result:
// ❌ Placement section will NOT be rendered at all in CollegePageClient
// ❌ No API calls will be made

// Example 4: College with empty placement reports array
const collegeWithEmptyReports = {
  name: "New College",
  slug: "new-college",
  availablePlacementReports: [],
  isPlacementRateAvailable: true,
  isMedianPackageAvailable: true,
  isHighestPackageAvailable: true,
  isAveragePackageAvailable: true,
};

// Result:
// ❌ Placement section will NOT be rendered in CollegePageClient
// ❌ No API calls will be made

console.log("Placement data handling examples ready!");

export {
  collegeWithMultipleYears,
  collegeWithSingleYear,
  collegeWithNoPlacement,
  collegeWithEmptyReports,
};
