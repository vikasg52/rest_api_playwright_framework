# Playwright Test Automation Framework

## 📌 Project Overview
This project is a **Playwright-based test automation framework** for **UI and API testing**. It includes:
- **Playwright for browser automation**
- **TypeScript for writing tests**
- **Allure Reports for test results visualization**
- **Jenkins pipeline for CI/CD execution**

---

## 🚀 Setup Instructions

### **1️⃣ Prerequisites**
Ensure you have the following installed:
- **Node.js (v16+)** → [Download](https://nodejs.org/)
- **Playwright** → Installed via npm
- **Allure Commandline** → `npm install -g allure-commandline`
- **Jenkins (Optional)** → For CI/CD pipeline execution


### **2️⃣ Clone the Repository**
```sh
# Clone the repo
git clone <repo-url>

# Navigate to project folder
cd rest_api_playwright_framework
```


### **3️⃣ Install Dependencies**
```sh
npm install
```


### **4️⃣ Configure Environment Variables**
Create a `.env` file in the root directory and set environment variables:
```env
BASE_URL=https://www.saucedemo.com
HEADLESS=true
BROWSER=chromium
```

---

## 🎭 Running Playwright Tests

### **Run All Tests**
```sh
npx playwright test
```

### **Run a Specific Test**
```sh
npx playwright test tests/login.spec.ts
```

### **Run Tests in UI Mode**
```sh
npx playwright test --headed
```

### **Run Tests in Different Browsers**
```sh
npx playwright test --browser=firefox
npx playwright test --browser=webkit
```

### **Generate HTML Report**
```sh
npx playwright show-report
```

---

## 📊 Generating Allure Reports

### **Run Tests and Generate Allure Report**
```sh
npm run test:allure
```

### **Manually Generate Report**
```sh
npm run allure:generate
```

### **Open Allure Report in Browser**
```sh
npm run allure:open
```

---

## 🤖 Jenkins CI/CD Setup

### **1️⃣ Install Required Jenkins Plugins**
- 🟢 **Pipeline**
- 🟢 **Allure Report**
- 🟢 **NodeJS**
- 🟢 **Workspace Cleanup**

### **2️⃣ Add `Jenkinsfile` to Project**
Ensure your project has a `Jenkinsfile` (already included in this repo).

### **3️⃣ Setup Jenkins Job**
1. Go to **Jenkins Dashboard** → **New Item**
2. Select **Pipeline** → Name it `Playwright-Pipeline`
3. In **Pipeline section**, choose `Pipeline script from SCM`
4. Enter your **Git Repository URL**
5. Save and Run the job 🎯

### **4️⃣ Access Allure Report from Jenkins**
Once the pipeline completes, go to the **Allure Report** tab in Jenkins.

---

## 🛠 Troubleshooting

### **1️⃣ Playwright Not Found?**
Run:
```sh
npx playwright install
```

### **2️⃣ Headless Mode Not Working?**
Ensure `HEADLESS` is set properly in the `.env` file.

### **3️⃣ Allure Reports Not Showing Trends?**
Make sure to copy history:
```sh
cp -r allure-report/history allure-results/
```

---

## 📌 Author
👤 **Vikas Kumar**  
📧 Email: vikas.garg.bharat@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/vikas-kumar-garg/)

