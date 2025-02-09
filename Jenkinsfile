pipeline {
    agent { label 'docker-node' }

    tools {
        nodejs 'node-js'  // Ensure 'node-js' is configured in Jenkins
    }

    environment {
        CI = "true"
        BASE_URL = "https://www.saucedemo.com"
        ALLURE_RESULTS_DIR = "${WORKSPACE}/allure-results"
        PLAYWRIGHT_REPORT_DIR = "${WORKSPACE}/playwright-report"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm  // Fetch code from Git
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install --no-bin-links'  // Avoid symlink issues
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh "npx playwright test --reporter=line,allure-playwright"
            }
            post {
                always {
                    archiveArtifacts artifacts: "${ALLURE_RESULTS_DIR}/**", allowEmptyArchive: true
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh "rm -rf ${PLAYWRIGHT_REPORT_DIR} && mkdir -p ${PLAYWRIGHT_REPORT_DIR}"  // Clean previous reports
                sh "npx allure generate ${ALLURE_RESULTS_DIR} --clean -o ${PLAYWRIGHT_REPORT_DIR}"
            }
        }

        stage('Publish Allure Report in Jenkins') {
            steps {
                allure([
                    results: [[path: "${ALLURE_RESULTS_DIR}"]]
                ])
            }
        }

        stage('Deploy Report to Localhost') {
            steps {
                script {
                    // 1️⃣ Find and kill any existing http-server process running on port 4051
                    def processID = sh(script: "lsof -ti:4052 || true", returnStdout: true).trim()
                    if (processID) {
                        echo "Stopping existing http-server process on port 4052 (PID: ${processID})"
                        sh "kill -9 ${processID}"
                        sleep 4  // Ensure the process fully stops
                    } else {
                        echo "No existing process running on port 4052"
                    }

                    // 2️⃣ Clean the previous report to ensure the latest one is deployed
                    echo "Cleaning old Playwright reports..."
                    sh "rm -rf ${PLAYWRIGHT_REPORT_DIR} && mkdir -p ${PLAYWRIGHT_REPORT_DIR}"

                    // 3️⃣ Generate the latest Allure report
                    sh "npx allure generate ${ALLURE_RESULTS_DIR} --clean -o ${PLAYWRIGHT_REPORT_DIR}"

                    // 4️⃣ Start a new HTTP server process in the background
                    echo "Starting http-server with the latest report..."
                    sh "nohup npx http-server ${PLAYWRIGHT_REPORT_DIR} -p 4052 > /dev/null 2>&1 & disown"
                }
            }
        }
    }

    post {
        always {
            cleanWs()  // Clean workspace after execution
        }
    }
}
