pipeline {
    agent any  // Run on any available agent

    environment {
        CI = "true"
        BASE_URL = "https://www.saucedemo.com"  // Update if needed
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    checkout scm  // Checkout from Git
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'  // Install required dependencies
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    sh 'npx playwright test'  // Execute Playwright tests
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                script {
                    sh 'npm run allure:generate'
                }
            }
        }

        stage('Publish Allure Report') {
            steps {
                allure([
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }

    post {
        always {
            cleanWs()  // Clean workspace after execution
        }
    }
}
