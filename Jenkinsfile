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
            // Get the PID of the existing http-server process on port 4051
            def processID = sh(script: "lsof -ti:4051", returnStdout: true).trim()
            
            if (processID) {
                echo "Killing existing process on port 4051 (PID: ${processID})"
                sh "kill -9 ${processID}"  // Force kill the old process
            } else {
                echo "No existing process on port 4051"
            }
        }

        // Start the HTTP server with nohup to ensure it runs independently
        sh "nohup npx http-server ${PLAYWRIGHT_REPORT_DIR} -p 4051 > /dev/null 2>&1 &"
        echo 'Allure report deployed at http://localhost:4051'
    }
}

    post {
        always {
            cleanWs()  // Clean workspace after execution
        }
    }
}
