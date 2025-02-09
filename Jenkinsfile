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
    // Find process ID (PID) running on port 4051, ignore error if no process found
    def processID = sh(script: "lsof -ti:4051 || true", returnStdout: true).trim()

    if (processID) {  // Check if processID is non-empty
        echo "Stopping existing http-server process on port 4051 (PID: ${processID})"
        sh "kill -9 ${processID}"
        sleep 2  // Wait for process to fully stop
    } else {
        echo "No existing process running on port 4051"
    }
}

                // Start the HTTP server
                sh "nohup npx http-server ${PLAYWRIGHT_REPORT_DIR} -p 4051 > /dev/null 2>&1 & disown"
                echo 'Allure report deployed at http://localhost:4051'
            }
        }
    }  // <- Closing brace for stages

    post {
        always {
            cleanWs()  // Clean workspace after execution
        }
    }
}  // <- Closing brace for pipeline
