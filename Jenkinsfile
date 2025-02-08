pipeline {
    agent { label 'docker-node' }

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
                sh 'npm install --no-bin-links'  // Avoid symlink issues
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    try {
                        sh 'npx playwright install --with-deps'
                        sh 'npx playwright test'  // Run tests
                    } catch (Exception e) {
                        echo "Tests failed, but continuing to generate report..."
                    }
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
                sh 'npm run allure:generate || true'  // Prevent failure from stopping pipeline
            }
        }

        stage('Publish Allure Report') {
    steps {
        script {
            if (fileExists('allure-results')) {
                allure([
                    results: [[path: 'allure-results']]
                ])
            } else {
                echo '⚠️ Warning: No Allure results found!'
            }
        }
    }
}

        stage('Deploy Report to Localhost') {
        steps {
        sh 'npm install http-server'  // Install locally instead of globally
        sh 'npx http-server allure-report -p 4051 &'
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
