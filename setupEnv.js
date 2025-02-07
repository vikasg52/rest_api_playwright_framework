const fs = require('fs');
const path = require('path');

// Define allure-results directory
const allureResultsPath = 'allure-results';
fs.mkdirSync(allureResultsPath, { recursive: true });

/* 🛑 Auto-incrementing test run number is commented out
// const runCounterFile = path.join(allureResultsPath, 'test-run-counter.txt');
// let runNumber = 1;
// if (fs.existsSync(runCounterFile)) {
//   const prevRun = fs.readFileSync(runCounterFile, 'utf-8').trim();
//   runNumber = Number(prevRun) + 1;
// }
// fs.writeFileSync(runCounterFile, runNumber.toString());
*/

// 🟢 STEP 1: Write environment.properties file
const envFilePath = path.join(allureResultsPath, 'environment.properties');
fs.writeFileSync(envFilePath, `Browser=${process.env.BROWSER || 'chromium'}
BaseURL=${process.env.BASE_URL || 'https://www.saucedemo.com'}
Headless=${process.env.HEADLESS || 'true'}
OS=${process.platform}`);

console.log(`✅ Environment file created at: ${envFilePath}`);

// 🟢 STEP 2: Create categories.json for Allure (Defect Categorization)
const categoriesFile = path.join(allureResultsPath, 'categories.json');
const categoriesData = JSON.stringify([
  {
    name: "Product Defects",
    matchedStatuses: ["failed"],
    description: "Issues related to product bugs",
    traceRegex: ".*AssertionError.*"
  },
  {
    name: "Test Defects",
    matchedStatuses: ["broken"],
    description: "Issues related to test failures, such as incorrect test implementation",
    traceRegex: ".*TypeError.*"
  },
  {
    name: "Flaky Tests",
    matchedStatuses: ["failed", "broken"],
    description: "Tests that sometimes fail and sometimes pass",
    traceRegex: ".*TimeoutError.*"
  }
], null, 2);

fs.writeFileSync(categoriesFile, categoriesData);
console.log("✅ categories.json file created successfully!");
