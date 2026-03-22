pipeline {
    agent any
    
    parameters {
        choice(name: 'TEST_SUITE', choices: ['all', 'smoke', 'regression', 'specific_file'], description: 'Select the test suite.')
        string(name: 'SPEC_PATH', defaultValue: '', description: 'Enter path if "specific_file" is selected (e.g., tests/login.spec.js)')
    }

    triggers {
        githubPush() 
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm 
            }
        }
        stage('Install Dependencies') {
            steps {
                // Using 'bat' for Windows environment
                bat 'npm install'
                bat 'npx playwright install --with-deps' 
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    def runCommand = ""

                    if (params.TEST_SUITE == 'specific_file' && params.SPEC_PATH != "") {
                        runCommand = "${params.SPEC_PATH}"
                    } else if (params.TEST_SUITE == 'smoke') {
                        runCommand = "--grep @smoke"
                    } else if (params.TEST_SUITE == 'regression') {
                        runCommand = "--grep @regression"
                    } else {
                        runCommand = "tests/"
                    }
                    
                    // Clean previous results
                    bat "npx rimraf allure-results allure-report"
                    // Execute Playwright tests
                    bat "npx playwright test ${runCommand}"
                }
            }
        }
    }
    
    post {
        always {
            // We use a script block to ensure 'bat' and 'archiveArtifacts' 
            // have a valid node/workspace context even if previous stages failed.
            script {
                try {
                    // Generate Allure Report
                    bat 'npx allure generate ./allure-results -o ./allure-report'
                    // Archive the report folder
                    archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
                } catch (Exception e) {
                    echo "Post-build step skipped or failed: ${e.message}"
                }
            }
        }
    }
}
