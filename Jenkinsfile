pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.50.1-focal'
        }
    }

    tools {
        nodejs 'node-js'  // Ensure 'node-js' is configured in Jenkins
    }

    environment {
        CI = "true"
        BASE_URL = "https://www.saucedemo.com"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm  // Fetch code from Git
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install --no-bin-links'  // Avoids symlink issues in restricted environments
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright install --with-deps'  // Ensures dependencies are installed
                sh 'npx playwright test'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh 'npm run allure:generate || true'  // Prevents failure if command fails
            }
        }

        stage('Publish Allure Report') {
            steps {
                script {
                    try {
                        allure([
                            results: [[path: 'allure-results']]
                        ])
                    } catch (Exception e) {
                        echo 'Allure report could not be published'
                    }
                }
            }
        }

        stage('Deploy Report to Localhost') {
            steps {
                sh 'npm install -g http-server || true'  // Avoids failure if global install fails
                sh 'nohup http-server allure-report -p 4050 &'
                echo 'Allure report deployed at http://localhost:4050'
            }
        }
    }

    post {
        always {
            cleanWs()  // Clean workspace after execution
        }
    }
}
