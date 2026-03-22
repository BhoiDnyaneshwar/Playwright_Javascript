pipeline {
    agent any
    
    parameters {
        // Option 1: Choose a Suite
        choice(name: 'TEST_SUITE', choices: ['all', 'smoke', 'regression', 'specific_file'], description: 'Select the test suite or choose "specific_file" to use the box below.')
        
        // Option 2: Type a specific file path
        string(name: 'SPEC_PATH', defaultValue: '', description: 'If you selected "specific_file" above, enter the path (e.g., tests/login.spec.js)')
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
                sh 'npm install'
                sh 'npx playwright install --with-deps' 
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    def runCommand = ""

                    if (params.TEST_SUITE == 'specific_file' && params.SPEC_PATH != "") {
                        // Run exactly one file
                        runCommand = "${params.SPEC_PATH}"
                    } else if (params.TEST_SUITE == 'smoke') {
                        // Run by tag
                        runCommand = "--grep @smoke"
                    } else if (params.TEST_SUITE == 'regression') {
                        // Run by tag
                        runCommand = "--grep @regression"
                    } else {
                        // Default: Run everything in the tests folder
                        runCommand = "tests/"
                    }
                    
                    sh "npx rimraf allure-results allure-report"
                    // Execute the dynamic command
                    sh "npx playwright test ${runCommand}"
                }
            }
        }
    }
    
    post {
        always {
            sh 'npx allure generate ./allure-results -o ./allure-report --clean'
            archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
        }
    }
}
