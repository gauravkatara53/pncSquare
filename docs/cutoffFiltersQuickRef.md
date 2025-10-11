# Quick Reference - Cutoff Filter System

## 🚀 Quick Start

### Check College Configuration

```typescript
import {
  getCompleteFilterOptions,
  getCollegeTagFromSlug,
} from "@/config/cutoffFilters";

// Check what tag a college gets
const tag = getCollegeTagFromSlug("nsut-delhi"); // Returns college tag

// Get filter options for specific college and exam
const filters = getCompleteFilterOptions("nsut-delhi", "JEE-Main");
console.log(filters);
/* Output:
{
  years: ["2025"],
  subCategories: ["NONE", "DEFENCE", "KASHMIRI MIGRANT", "PERSON WITH DISABILITIES"],
  quotaOptions: ["Delhi", "Outside Delhi"],
  seatTypeOptions: ["General", "EWS", "OBC", "SC", "ST"],
  requiresSubCategory: true,
  requiresQuota: true
}
*/
```

## ⚡ Common Patterns

### 1. Add New Individual College

```typescript
// In INDIVIDUAL_COLLEGE_CONFIGS
"college-slug": {
  slug: "college-slug",
  examConfigs: {
    "JEE-Main": {
      name: "JEE Main",
      requiresSubCategory: boolean,
      requiresQuota: boolean,
      years: ["2025"],
      seatTypeOptions: string[],
      quotaOptions: string[],
      subCategories: string[]
    }
  },
  fallbackTag: "University"
}
```

### 2. College Slug Patterns

```typescript
// Auto-detected patterns (in getCollegeTagFromSlug)
"iit-*" → "IIT" tag
"nit-*" → "NIT" tag
"iiit-*" → "IIIT" tag
"*aiims*" → "AIIMS" tag
"*medical*" or "*mbbs*" → "Medical" tag
Others → "University" tag
```

### 3. Filter Requirements by College Type

| College Type   | Sub Category  | Quota         | Seat Types                      |
| -------------- | ------------- | ------------- | ------------------------------- |
| **IIT**        | ✅ Required   | ❌ Auto (AI)  | OPEN, OBC-NCL, SC, ST, EWS, PwD |
| **NIT**        | ✅ Required   | ✅ Required   | OPEN, OBC-NCL, SC, ST, EWS, PwD |
| **IIIT**       | ✅ Required   | ✅ Required   | OPEN, OBC-NCL, SC, ST, EWS, PwD |
| **AIIMS**      | ❌ Not needed | ❌ Not needed | General, OBC, SC, ST, EWS, PwD  |
| **Medical**    | ❌ Not needed | ❌ Not needed | General, OBC, SC, ST, EWS, PwD  |
| **University** | Varies        | Varies        | Varies                          |

## 🎛️ Dropdown Logic

### When dropdowns appear:

```typescript
// Exam Type dropdown
examTypes.length > 1 → Show dropdown

// Sub Category dropdown
filterOptions.requiresSubCategory === true → Show dropdown

// Quota dropdown
filterOptions.requiresQuota === true && !isIIT → Show dropdown

// Year dropdown
Always show (uses filterOptions.years or default)

// Seat Type dropdown
Always show (uses filterOptions.seatTypeOptions)
```

## 🔧 Debugging Checklist

### College not showing correct filters?

1. ✅ Check slug matches pattern in `getCollegeTagFromSlug()`
2. ✅ Verify college exists in `INDIVIDUAL_COLLEGE_CONFIGS` (if special)
3. ✅ Check `examTypes` array is passed to Cutoffs component
4. ✅ Confirm exam type exists in college configuration

### API calls failing?

1. ✅ Check examType is included in API parameters
2. ✅ Verify selected filters match backend data structure
3. ✅ Ensure year is in available years list

### Dropdowns not appearing?

1. ✅ Check `requiresSubCategory` and `requiresQuota` flags
2. ✅ Verify `filterOptions` is not null
3. ✅ Check console for TypeScript errors

## 📋 Testing Commands

```bash
# Test configuration in browser console
import { getCompleteFilterOptions } from '/src/config/cutoffFilters.js';

// Test IIT Delhi
getCompleteFilterOptions('iit-delhi', 'JEE-Advanced');

// Test NSUT Delhi (individual config)
getCompleteFilterOptions('nsut-delhi', 'JEE-Main');

// Test NIT (tag-based config)
getCompleteFilterOptions('nit-trichy', 'JEE-Main');
```

## 🚨 Common Mistakes

### ❌ Wrong:

```typescript
// Hardcoding college checks
if (college.includes("iit")) {
  // show IIT filters
}
```

### ✅ Right:

```typescript
// Using configuration system
const filterOptions = getCompleteFilterOptions(college, examType);
if (filterOptions?.requiresQuota) {
  // show quota dropdown
}
```

### ❌ Wrong:

```typescript
// Hardcoding exam-specific logic
if (examType === "NEET-UG") {
  hideSubCategory();
}
```

### ✅ Right:

```typescript
// Using dynamic configuration
{
  filterOptions?.requiresSubCategory && <SubCategoryDropdown />;
}
```

## 🎯 Quick Configuration Examples

### Standard Delhi College:

```typescript
subCategories: [
  "NONE",
  "DEFENCE",
  "KASHMIRI MIGRANT",
  "PERSON WITH DISABILITIES",
];
quotaOptions: ["Delhi", "Outside Delhi"];
seatTypeOptions: ["General", "EWS", "OBC", "SC", "ST"];
```

### Standard Government College:

```typescript
subCategories: ["Gender-Neutral", "Female-only (including Supernumerary)"]
quotaOptions: ["HS", "OS", "AI"]
seatTypeOptions: ["OPEN", "OBC-NCL", "SC", "ST", "EWS", "OPEN (PwD)", ...]
```

### Medical College:

```typescript
requiresSubCategory: false
requiresQuota: false
seatTypeOptions: ["General", "OBC", "SC", "ST", "EWS", "General PwD", ...]
```

---

## 📞 Need Help?

1. **Check the main guide**: `/docs/cutoffFiltersGuide.md`
2. **Test your config**: Use functions in `/src/config/testFilters.ts`
3. **Examine examples**: See `INDIVIDUAL_COLLEGE_CONFIGS` for patterns
4. **Debug in browser**: Import functions and test in console
