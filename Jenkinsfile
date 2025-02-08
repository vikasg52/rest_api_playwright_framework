pipeline {
    agent {
        label 'docker-node'  // Ensure your Jenkins node is configured with this label
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
                allure([
                    results: [[path: 'allure-results']]
                ])
            }
        }

        stage('Deploy Report to Localhost') {
    steps {
        sh 'nohup http-server allure-report -p 8090 > http-server.log 2>&1 &'
        sleep 5  // Give some time for the server to start
        sh 'curl -I http://localhost:8090 || echo "Server failed to start"'
    }
}
    }

    post {
        always {
            cleanWs()  // Clean workspace after execution
        }
    }
}
