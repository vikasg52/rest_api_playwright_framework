pipeline {
    agent any
    
tools {
    nodejs 'node-js'
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
               sh 'npm install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright install'
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
                sh 'npm run allure:generate'
            }
        }

        stage('Publish Allure Report') {
            steps {
                allure([
                    results: [[path: 'allure-results']]
                ])
            }
        }

        stage('Deploy Report to Localhost') {
            steps {
                sh 'npm install -g http-server'
                sh 'http-server allure-report -p 4000 &'
                echo 'Allure report deployed at http://localhost:4000'
            }
        }
    }

    post {
        always {
            cleanWs()  // Clean workspace after execution
        }
    }
}
