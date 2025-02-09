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
                // Kill any existing process using port 4051
                sh "fuser -k 4051/tcp || true"

                // Start the new server
                sh "npx http-server ${PLAYWRIGHT_REPORT_DIR} -p 4051 &"
                echo 'Allure report deployed at http://localhost:4051'
            }
        }
    }

    post {
        always {
            cleanWs()  // Clean workspace after execution
        }
    }
}
