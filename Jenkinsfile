pipeline {
    agent any
    
    parameters {
        choice(name: 'TEST_SUITE', choices: ['all', 'smoke', 'regression', 'specific_file'], description: 'Select the test suite.')
        string(name: 'SPEC_PATH', defaultValue: '', description: 'Enter path if "specific_file" is selected (e.g., tests/login.spec.js)')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm 
            }
        }
        stage('Install Dependencies') {
            steps {
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
                    
                    // 1. CRITICAL: Clean old results BEFORE running tests
                    bat "npx rimraf allure-results allure-report"
                    
                    // 2. USE try-finally: This ensures that even if tests fail, 
                    // Jenkins doesn't skip the rest of the script logic.
                    try {
                        bat "npx playwright test ${runCommand}"
                    } finally {
                        // This block runs even if the test fails
                        echo "Tests completed (Passed or Failed). Proceeding to report generation..."
                    }
                }
            }
        }
    }
    
    post {
        always {
            script {
               
                    try {
                        // 3. Generate the report with --clean to overwrite old data
                        bat 'npx allure generate ./allure-results -o ./allure-report'
                        
                        // 4. Archive the report
                        archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
                        
                        echo "Allure report successfully generated and archived."
                    } catch (Exception e) {
                        echo "Failed to generate Allure report: ${e.message}"
                    }
                }
        }
    }
}
