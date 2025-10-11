/**
 * Testing utilities and examples for the cutoff filter configuration system
 * Use these functions to validate and debug filter configurations
 */

import {
  getCollegeTagFromSlug,
  getCompleteFilterOptions,
  getAvailableExamTypes,
  getAvailableExamTypesForCollege,
  isIITCollege,
  getDefaultQuota,
  COLLEGE_TAG_CONFIGS,
  INDIVIDUAL_COLLEGE_CONFIGS,
} from "./cutoffFilters";

export interface TestResult {
  success: boolean;
  message: string;
  data?: unknown;
}

/**
 * Test a specific college and exam combination
 */
export function testCollegeExamCombo(
  collegeSlug: string,
  examType: string
): TestResult {
  try {
    const filterOptions = getCompleteFilterOptions(collegeSlug, examType);

    if (!filterOptions) {
      return {
        success: false,
        message: `No filter configuration found for college: ${collegeSlug}, exam: ${examType}`,
      };
    }

    return {
      success: true,
      message: `Configuration found for ${collegeSlug} - ${examType}`,
      data: filterOptions,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error testing ${collegeSlug} - ${examType}: ${error}`,
    };
  }
}

/**
 * Test all exams for a given college
 */
export function testAllExamsForCollege(
  collegeSlug: string,
  availableExams: string[]
): TestResult[] {
  return availableExams.map((examType) =>
    testCollegeExamCombo(collegeSlug, examType)
  );
}

/**
 * Check if a college has individual configuration
 */
export function checkCollegeConfig(collegeSlug: string): TestResult {
  const hasIndividualConfig =
    INDIVIDUAL_COLLEGE_CONFIGS.hasOwnProperty(collegeSlug);
  const detectedTag = getCollegeTagFromSlug(collegeSlug);

  return {
    success: true,
    message: hasIndividualConfig
      ? `College has individual configuration`
      : `College uses tag-based configuration: ${detectedTag}`,
    data: {
      hasIndividualConfig,
      detectedTag,
      individualConfig: hasIndividualConfig
        ? INDIVIDUAL_COLLEGE_CONFIGS[collegeSlug]
        : null,
      tagConfig: COLLEGE_TAG_CONFIGS[detectedTag],
    },
  };
}

/**
 * Validate all filter options for consistency
 */
export function validateFilterOptions(
  collegeSlug: string,
  examType: string
): TestResult {
  const filterOptions = getCompleteFilterOptions(collegeSlug, examType);

  if (!filterOptions) {
    return {
      success: false,
      message: "No filter options found",
    };
  }

  const issues: string[] = [];

  // Check required fields
  if (!filterOptions.years || filterOptions.years.length === 0) {
    issues.push("No years available");
  }

  if (
    !filterOptions.seatTypeOptions ||
    filterOptions.seatTypeOptions.length === 0
  ) {
    issues.push("No seat type options available");
  }

  // Check conditional requirements
  if (
    filterOptions.requiresSubCategory &&
    (!filterOptions.subCategories || filterOptions.subCategories.length === 0)
  ) {
    issues.push("Requires sub category but no sub categories provided");
  }

  if (
    filterOptions.requiresQuota &&
    (!filterOptions.quotaOptions || filterOptions.quotaOptions.length === 0)
  ) {
    issues.push("Requires quota but no quota options provided");
  }

  return {
    success: issues.length === 0,
    message:
      issues.length === 0
        ? "All validation checks passed"
        : `Issues found: ${issues.join(", ")}`,
    data: { issues, filterOptions },
  };
}

/**
 * Test college slug pattern detection
 */
export function testSlugPatterns(): TestResult[] {
  const testCases = [
    { slug: "iit-delhi", expected: "IIT" },
    { slug: "nit-trichy", expected: "NIT" },
    { slug: "iiit-hyderabad", expected: "IIIT" },
    { slug: "aiims-delhi", expected: "AIIMS" },
    { slug: "some-medical-college", expected: "Medical" },
    { slug: "random-university", expected: "University" },
    { slug: "nsut-delhi", expected: "University" }, // Has individual config
  ];

  return testCases.map((testCase) => {
    const detected = getCollegeTagFromSlug(testCase.slug);
    return {
      success: detected === testCase.expected,
      message: `${testCase.slug} → Expected: ${testCase.expected}, Got: ${detected}`,
      data: { slug: testCase.slug, expected: testCase.expected, detected },
    };
  });
}

/**
 * Run comprehensive test suite
 */
export function runFullTestSuite(): {
  collegeSlugs: string[];
  examTypes: string[];
  results: {
    configTests: TestResult[];
    validationTests: TestResult[];
    patternTests: TestResult[];
    summary: {
      total: number;
      passed: number;
      failed: number;
    };
  };
} {
  const testCollegeSlugs = [
    "iit-delhi",
    "nit-trichy",
    "iiit-hyderabad",
    "aiims-delhi",
    "nsut-delhi",
    "dtu-delhi",
    "random-university",
  ];

  const testExamTypes = ["JEE-Main", "JEE-Advanced", "NEET-UG"];

  const configTests: TestResult[] = [];
  const validationTests: TestResult[] = [];

  // Test all combinations
  testCollegeSlugs.forEach((slug) => {
    testExamTypes.forEach((exam) => {
      const configTest = testCollegeExamCombo(slug, exam);
      configTests.push(configTest);

      if (configTest.success) {
        const validationTest = validateFilterOptions(slug, exam);
        validationTests.push(validationTest);
      }
    });
  });

  const patternTests = testSlugPatterns();

  const allTests = [...configTests, ...validationTests, ...patternTests];
  const passed = allTests.filter((test) => test.success).length;
  const failed = allTests.length - passed;

  return {
    collegeSlugs: testCollegeSlugs,
    examTypes: testExamTypes,
    results: {
      configTests,
      validationTests,
      patternTests,
      summary: {
        total: allTests.length,
        passed,
        failed,
      },
    },
  };
}

/**
 * Pretty print test results to console
 */
export function printTestResults(results: TestResult[]): void {
  console.group("🧪 Filter Configuration Test Results");

  results.forEach((result, index) => {
    const icon = result.success ? "✅" : "❌";
    console.log(`${icon} Test ${index + 1}: ${result.message}`);

    if (result.data && !result.success) {
      console.log("   Details:", result.data);
    }
  });

  const passed = results.filter((r) => r.success).length;
  const total = results.length;

  console.log(
    `\n📊 Summary: ${passed}/${total} tests passed (${Math.round(
      (passed / total) * 100
    )}%)`
  );
  console.groupEnd();
}

/**
 * Test function for browser console usage
 */
export function quickTest(collegeSlug: string, examType: string): void {
  console.group(`🔍 Testing ${collegeSlug} - ${examType}`);

  const configCheck = checkCollegeConfig(collegeSlug);
  console.log("📋 Config Check:", configCheck.message);
  console.log("   Details:", configCheck.data);

  const filterTest = testCollegeExamCombo(collegeSlug, examType);
  console.log("🎛️ Filter Test:", filterTest.message);
  if (filterTest.data) {
    console.log("   Filter Options:", filterTest.data);
  }

  const validation = validateFilterOptions(collegeSlug, examType);
  console.log("✅ Validation:", validation.message);
  if (!validation.success && validation.data) {
    console.log(
      "   Issues:",
      (validation.data as { issues?: string[] }).issues
    );
  }

  console.groupEnd();
}

// Export for easy console testing
if (typeof window !== "undefined") {
  // @ts-expect-error - Adding testing utilities to window for debugging
  window.filterTesting = {
    quickTest,
    runFullTestSuite,
    testCollegeExamCombo,
    checkCollegeConfig,
    validateFilterOptions,
    printTestResults,
  };
}

// Example usage for different college types

// 1. IIT College
console.log("=== IIT Delhi ===");
const iitSlug = "iit-delhi";
const iitTag = getCollegeTagFromSlug(iitSlug);
const iitExamTypes = getAvailableExamTypes(iitTag);
console.log("College Tag:", iitTag);
console.log("Available Exam Types:", iitExamTypes);
console.log("Is IIT:", isIITCollege(iitSlug));
console.log("Default Quota:", getDefaultQuota(iitTag));

if (iitExamTypes.includes("JEE-Advanced")) {
  const iitFilters = getCompleteFilterOptions(iitSlug, "JEE-Advanced");
  console.log("JEE-Advanced Filters:", {
    requiresSubCategory: iitFilters?.requiresSubCategory,
    requiresQuota: iitFilters?.requiresQuota,
    seatTypeOptions: iitFilters?.seatTypeOptions.length,
    quotaOptions: iitFilters?.quotaOptions,
  });
}

// 2. NIT College
console.log("\n=== NIT Trichy ===");
const nitSlug = "nit-trichy";
const nitTag = getCollegeTagFromSlug(nitSlug);
const nitExamTypes = getAvailableExamTypes(nitTag);
console.log("College Tag:", nitTag);
console.log("Available Exam Types:", nitExamTypes);
console.log("Is IIT:", isIITCollege(nitSlug));

if (nitExamTypes.includes("JEE-Main")) {
  const nitFilters = getCompleteFilterOptions(nitSlug, "JEE-Main");
  console.log("JEE-Main Filters:", {
    requiresSubCategory: nitFilters?.requiresSubCategory,
    requiresQuota: nitFilters?.requiresQuota,
    seatTypeOptions: nitFilters?.seatTypeOptions.length,
    quotaOptions: nitFilters?.quotaOptions,
  });
}

// 3. AIIMS College
console.log("\n=== AIIMS Delhi ===");
const aiimsSlug = "aiims-delhi";
const aiimsTag = getCollegeTagFromSlug(aiimsSlug);
const aiimsExamTypes = getAvailableExamTypes(aiimsTag);
console.log("College Tag:", aiimsTag);
console.log("Available Exam Types:", aiimsExamTypes);

if (aiimsExamTypes.includes("NEET-UG")) {
  const aiimsFilters = getCompleteFilterOptions(aiimsSlug, "NEET-UG");
  console.log("NEET-UG Filters:", {
    requiresSubCategory: aiimsFilters?.requiresSubCategory,
    requiresQuota: aiimsFilters?.requiresQuota,
    seatTypeOptions: aiimsFilters?.seatTypeOptions.length,
  });
}

// 4. NSUT Delhi (Individual College Config)
console.log("\n=== NSUT Delhi (Individual Config) ===");
const nsutSlug = "nsut-delhi";
const nsutTag = getCollegeTagFromSlug(nsutSlug);
const nsutExamTypes = getAvailableExamTypesForCollege(nsutSlug);
console.log("College Tag:", nsutTag);
console.log("Available Exam Types:", nsutExamTypes);
console.log("Is IIT:", isIITCollege(nsutSlug));

if (nsutExamTypes.includes("JEE-Main")) {
  const nsutFilters = getCompleteFilterOptions(nsutSlug, "JEE-Main");
  console.log("NSUT JEE-Main Filters:", {
    years: nsutFilters?.years,
    requiresSubCategory: nsutFilters?.requiresSubCategory,
    requiresQuota: nsutFilters?.requiresQuota,
    seatTypeOptions: nsutFilters?.seatTypeOptions,
    quotaOptions: nsutFilters?.quotaOptions,
    subCategories: nsutFilters?.subCategories,
  });
}

// 5. DTU Delhi (Individual College Config)
console.log("\n=== DTU Delhi (Individual Config) ===");
const dtuSlug = "dtu-delhi";
const dtuExamTypes = getAvailableExamTypesForCollege(dtuSlug);
console.log("Available Exam Types:", dtuExamTypes);

if (dtuExamTypes.includes("JEE-Main")) {
  const dtuFilters = getCompleteFilterOptions(dtuSlug, "JEE-Main");
  console.log("DTU JEE-Main Filters:", {
    years: dtuFilters?.years,
    subCategories: dtuFilters?.subCategories,
    quotaOptions: dtuFilters?.quotaOptions,
  });
}

// 6. Private College (Tag-based)
console.log("\n=== Manipal University (Tag-based) ===");
const privateSlug = "manipal-university";
const privateTag = getCollegeTagFromSlug(privateSlug);
const privateExamTypes = getAvailableExamTypes(privateTag);
console.log("College Tag:", privateTag);
console.log("Available Exam Types:", privateExamTypes);
console.log("Is IIT:", isIITCollege(privateSlug));
