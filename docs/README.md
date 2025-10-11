# Cutoff Filter System Documentation

This directory contains comprehensive documentation for the dynamic cutoff filter system implemented in the PNC Square platform.

## 📚 Documentation Files

### 1. [Cutoff Filters User Guide](./cutoffFiltersGuide.md)

**Main Documentation** - Complete guide covering:

- System architecture and overview
- How college tags are detected
- Filter configurations for different college types
- Individual college configurations
- Adding new configurations
- UI behavior patterns
- Debugging and troubleshooting
- Best practices and examples

### 2. [Quick Reference Card](./cutoffFiltersQuickRef.md)

**Developer Cheat Sheet** - Quick reference for:

- Common code patterns
- Configuration examples
- Dropdown logic
- Debugging checklist
- Testing commands
- Common mistakes to avoid

## 🛠️ Code Files

### 1. `/src/config/cutoffFilters.ts`

**Main Configuration System** - Contains:

- `EXAM_CONFIGS` - Exam type definitions
- `COLLEGE_TAG_CONFIGS` - Tag-based college configurations
- `INDIVIDUAL_COLLEGE_CONFIGS` - Specific college overrides
- Utility functions for dynamic filter resolution

### 2. `/src/config/testFilters.ts`

**Testing Utilities** - Provides:

- Validation functions for configurations
- Test suites for college/exam combinations
- Pattern detection tests
- Browser console testing tools
- Comprehensive test runner

## 🎯 Key Features

### Dynamic Configuration

- **Tag-based**: Colleges automatically get filters based on detected patterns (IIT, NIT, IIIT, AIIMS, Medical, University)
- **Individual overrides**: Specific colleges can have custom configurations that override tag-based defaults
- **Exam-specific**: Different filter options for different exam types (JEE-Main, JEE-Advanced, NEET-UG, etc.)

### Smart UI Behavior

- **Conditional dropdowns**: Sub-category and quota dropdowns appear only when required
- **Dynamic options**: Filter options change based on college type and exam type
- **Fallback handling**: Graceful degradation when configurations are missing

### Comprehensive Testing

- **Validation suite**: Ensure all configurations are complete and consistent
- **Pattern testing**: Verify college slug detection works correctly
- **Browser testing**: Easy debugging tools available in browser console

## 🚀 Quick Start

### For Developers

1. **Check college configuration**:

   ```typescript
   import { getCompleteFilterOptions } from "@/config/cutoffFilters";
   const filters = getCompleteFilterOptions("college-slug", "exam-type");
   ```

2. **Test in browser console**:

   ```javascript
   // Available in browser after page load
   filterTesting.quickTest("nsut-delhi", "JEE-Main");
   ```

3. **Add new college configuration**:
   ```typescript
   // In INDIVIDUAL_COLLEGE_CONFIGS
   "new-college": {
     slug: "new-college",
     examConfigs: { /* config */ },
     fallbackTag: "University"
   }
   ```

### For Users

1. **Understanding dropdowns**: Different college types show different filter options
2. **Using filters**: Select exam type first, then other filters will appear as needed
3. **Troubleshooting**: If filters aren't working, check the debugging guide in the main documentation

## 📋 File Structure

```
docs/
├── cutoffFiltersGuide.md      # Complete user guide
├── cutoffFiltersQuickRef.md   # Developer reference
└── README.md                  # This file

src/config/
├── cutoffFilters.ts           # Main configuration system
└── testFilters.ts            # Testing utilities
```

## 🆘 Need Help?

1. **Start here**: Read the [main user guide](./cutoffFiltersGuide.md)
2. **Quick lookup**: Use the [quick reference](./cutoffFiltersQuickRef.md)
3. **Test your changes**: Use functions in `testFilters.ts`
4. **Debug issues**: Check browser console and use testing utilities

## 🔄 System Overview

```
College Slug → Tag Detection → Configuration Lookup → Filter Options → UI Rendering
     ↓              ↓               ↓                    ↓              ↓
  "iit-delhi"    "IIT" tag    IIT exam configs    Requires sub-cat   Show dropdowns
```

The system automatically detects what type of college it is, finds the appropriate configuration, and renders the correct filter dropdowns with the right options for that specific college and exam combination.
