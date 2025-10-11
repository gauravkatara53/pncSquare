# Cutoff Filter System - User Guide

## 📋 Overview

The Cutoff Filter System is a dynamic configuration system that automatically determines which filter dropdowns to show based on the college type and exam type. It eliminates hardcoded logic and provides a flexible way to manage cutoff filters for different colleges and exams.

## 🏗️ System Architecture

### Core Components

1. **Tag-Based Configuration** - Generic filters for college categories (IIT, NIT, IIIT, etc.)
2. **Individual College Configuration** - Specific filters for unique colleges (NSUT Delhi, DTU Delhi, etc.)
3. **Priority System** - Individual college config → Tag-based config → Default fallback

## 🎯 How It Works

### Step 1: College Classification

When a college page loads, the system automatically determines the college type:

```typescript
// Auto-detection based on college slug
"iit-delhi" → "IIT" tag
"nit-trichy" → "NIT" tag
"nsut-delhi" → Individual config (overrides tag)
"some-university" → "University" tag (fallback)
```

### Step 2: Filter Configuration Lookup

The system checks for filters in this priority order:

1. **Individual College Config** (if exists)
2. **Tag-Based Config** (fallback)
3. **Default Config** (final fallback)

### Step 3: Dynamic UI Generation

Based on the configuration found, the UI automatically shows appropriate dropdowns.

## 🏛️ College Types & Their Filters

### IIT Colleges

- **Exam Types**: JEE-Advanced, GATE
- **Sub Category**: Required (Gender-Neutral, Female-only)
- **Quota**: Not required (Auto: AI)
- **Seat Types**: OPEN, OBC-NCL, SC, ST, EWS, PwD variants
- **Example**: `iit-delhi`, `iit-bombay`

### NIT Colleges

- **Exam Types**: JEE-Main, GATE
- **Sub Category**: Required (Gender-Neutral, Female-only)
- **Quota**: Required (HS, OS, AI)
- **Seat Types**: OPEN, OBC-NCL, SC, ST, EWS, PwD variants
- **Example**: `nit-trichy`, `nit-warangal`

### IIIT Colleges

- **Exam Types**: JEE-Main, GATE
- **Sub Category**: Required (Gender-Neutral, Female-only)
- **Quota**: Required (HS, OS, AI)
- **Seat Types**: OPEN, OBC-NCL, SC, ST, EWS, PwD variants
- **Example**: `iiit-hyderabad`, `iiit-bangalore`

### AIIMS/Medical Colleges

- **Exam Types**: NEET-UG
- **Sub Category**: Not required
- **Quota**: Not required
- **Seat Types**: General, OBC, SC, ST, EWS, PwD variants
- **Example**: `aiims-delhi`, `medical-college`

### Universities

- **Exam Types**: CUET-UG, JEE-Main, NEET-UG
- **Sub Category**: Varies by exam
- **Quota**: Varies by exam
- **Seat Types**: Varies by exam
- **Example**: `jamia-millia-islamia`

## 🎛️ Individual College Configurations

Some colleges have unique filter requirements that don't fit the standard patterns:

### NSUT Delhi

```typescript
Exam: JEE-Main
Years: 2025 only
Sub Categories: NONE, DEFENCE, KASHMIRI MIGRANT, PERSON WITH DISABILITIES
Quota: Delhi, Outside Delhi
Seat Types: General, EWS, OBC, SC, ST
```

### DTU Delhi

```typescript
Exam: JEE-Main
Years: 2025, 2024
Sub Categories: NONE, DEFENCE, KASHMIRI MIGRANT, PERSON WITH DISABILITIES, SPORTS
Quota: Delhi, Outside Delhi
Seat Types: General, EWS, OBC, SC, ST
```

### IIIT Delhi

```typescript
Exam: JEE-Main
Years: 2025, 2024
Sub Categories: NONE, DEFENCE, KASHMIRI MIGRANT, PERSON WITH DISABILITIES
Quota: Delhi, Outside Delhi
Seat Types: General, EWS, OBC, SC, ST
```

## 🔧 Adding New Configurations

### Adding a New Individual College

1. **Edit** `/src/config/cutoffFilters.ts`
2. **Add to** `INDIVIDUAL_COLLEGE_CONFIGS`:

```typescript
"your-college-slug": {
  slug: "your-college-slug",
  examConfigs: {
    "JEE-Main": {
      name: "JEE Main",
      requiresSubCategory: true,
      requiresQuota: true,
      years: ["2025", "2024"], // Available years
      seatTypeOptions: ["General", "OBC", "SC", "ST", "EWS"],
      quotaOptions: ["HS", "OS"],
      subCategories: ["Gender-Neutral", "Female-only"]
    }
  },
  fallbackTag: "University" // Falls back to University config for other exams
}
```

### Adding a New College Tag

1. **Add to** `COLLEGE_TAG_CONFIGS`:

```typescript
"NewCollegeType": {
  tag: "NewCollegeType",
  examConfigs: {
    "EXAM-NAME": EXAM_CONFIGS["EXAM-NAME"]
  },
  defaultQuota: "AI", // Optional
  isGovernmentInstitute: true
}
```

2. **Update** `getCollegeTagFromSlug()` function:

```typescript
if (lowerSlug.includes("your-pattern")) return "NewCollegeType";
```

### Adding a New Exam Type

1. **Add to** `EXAM_CONFIGS`:

```typescript
"NEW-EXAM": {
  name: "New Exam Name",
  requiresSubCategory: true,
  requiresQuota: false,
  seatTypeOptions: ["Type1", "Type2", "Type3"],
  quotaOptions: ["Quota1", "Quota2"],
  subCategories: COMMON_SUB_CATEGORIES
}
```

## 📱 User Interface Behavior

### Dropdown Visibility Rules

| Condition                         | Show Dropdown                |
| --------------------------------- | ---------------------------- |
| Multiple exam types available     | ✅ Exam Type dropdown        |
| `requiresSubCategory: true`       | ✅ Sub Category dropdown     |
| `requiresQuota: true` AND not IIT | ✅ Quota dropdown            |
| IIT college                       | ❌ Quota dropdown (auto: AI) |
| NEET-UG exam                      | ❌ Sub Category dropdown     |

### Example UI Flow

**For IIT Delhi (JEE-Advanced):**

```
1. Auto-detect: "iit-delhi" → IIT tag
2. Show: Exam Type (if multiple), Year, Sub Category, Seat Type
3. Hide: Quota (auto-set to "AI")
4. API call: /cutoff/all?slug=iit-delhi&examType=JEE-Advanced&year=2025&subCategory=Gender-Neutral&quota=AI&seatType=OPEN
```

**For NSUT Delhi (JEE-Main):**

```
1. Auto-detect: "nsut-delhi" → Individual config
2. Show: Year (2025 only), Sub Category (custom list), Quota (Delhi/Outside Delhi), Seat Type
3. API call: /cutoff/all?slug=nsut-delhi&examType=JEE-Main&year=2025&subCategory=NONE&quota=Delhi&seatType=General
```

## 🔍 Debugging & Troubleshooting

### Common Issues

1. **No dropdowns showing**

   - Check if `examTypes` array is passed to Cutoffs component
   - Verify college slug matches configuration

2. **Wrong filters showing**

   - Check `getCollegeTagFromSlug()` function
   - Verify individual college config is properly defined

3. **API 404 errors**
   - Ensure selected filters match available backend data
   - Check if examType is included in API call

### Testing Configuration

Use the test functions to verify your configuration:

```typescript
import {
  getCollegeTagFromSlug,
  getCompleteFilterOptions,
  getAvailableExamTypesForCollege,
} from "@/config/cutoffFilters";

// Test college classification
console.log(getCollegeTagFromSlug("your-college-slug"));

// Test available exams
console.log(getAvailableExamTypesForCollege("your-college-slug"));

// Test filter options
console.log(getCompleteFilterOptions("your-college-slug", "JEE-Main"));
```

## 📊 Configuration Examples

### Complete Configuration for a New Delhi College

```typescript
"new-delhi-college": {
  slug: "new-delhi-college",
  examConfigs: {
    "JEE-Main": {
      name: "JEE Main",
      requiresSubCategory: true,
      requiresQuota: true,
      years: ["2025"], // Only current year
      seatTypeOptions: [
        "General",
        "EWS",
        "OBC",
        "SC",
        "ST"
      ],
      quotaOptions: ["Delhi", "Outside Delhi"],
      subCategories: [
        "NONE",
        "DEFENCE",
        "KASHMIRI MIGRANT",
        "PERSON WITH DISABILITIES",
        "SPORTS",
        "SINGLE GIRL CHILD"
      ]
    },
    "NEET-UG": {
      name: "NEET UG",
      requiresSubCategory: false,
      requiresQuota: true,
      years: ["2025", "2024"],
      seatTypeOptions: [
        "General",
        "OBC",
        "SC",
        "ST",
        "EWS"
      ],
      quotaOptions: ["State", "Management"]
    }
  },
  fallbackTag: "University"
}
```

## 🚀 Best Practices

1. **Always test** new configurations with the provided test functions
2. **Use specific slugs** - be precise with college slug patterns
3. **Maintain consistency** - use standard naming conventions
4. **Document changes** - update this guide when adding new patterns
5. **Validate data** - ensure backend APIs support your filter combinations

## 📁 File Structure

```
src/config/
├── cutoffFilters.ts          # Main configuration file
├── testFilters.ts           # Test examples
└── cutoffFiltersGuide.md    # This guide

src/components/PlacementPage/
├── Cutoffs.tsx              # Main cutoff component
└── CollegePageClient.tsx    # College page layout
```

## 🎯 Summary

The Cutoff Filter System provides:

- ✅ **Automatic filter detection** based on college type
- ✅ **Individual college overrides** for unique requirements
- ✅ **Dynamic UI generation** - no hardcoded dropdowns
- ✅ **Easy configuration** - add colleges without code changes
- ✅ **Type safety** - full TypeScript support
- ✅ **Fallback system** - graceful handling of missing configs

This system eliminates the need for complex conditional logic in components and makes it easy to add new colleges with custom filter requirements.
