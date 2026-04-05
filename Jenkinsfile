pipeline {
    agent any
    
    parameters {
        // Option 1: Choose a Suite
        choice(name: 'TEST_SUITE', choices: ['all', 'smoke', 'regression', 'specific_file'], description: 'Select the test suite or choose "specific_file" to use the box below.')
        
        //Option 2: Choose a Env
        choice(name: 'TEST_ENV',  defaultValue: 'test', choices: ['dev', 'test', 'uat'], description: 'Select the Environment to run tests')

        // Option 3: Type a specific file path
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
                bat 'npm install'
                bat 'npx playwright install --with-deps' 
            }
        }
        stage('Run Tests') {
            steps {
                withCredentials([
                    string(credentialsId: 'USERNAME', variable: 'USERNAME'),
                    string(credentialsId: 'PASSWORD', variable: 'PASSWORD')
                ])

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
                    
                    bat "npx rimraf allure-results allure-report"
                    // Execute the dynamic command
                    try{
                        bat "set TEST_ENV=${params.TEST_ENV} && set USERNAME=${USERNAME} && set PASSWORD=${PASSWORD} && npx playwright test ${runCommand}"
                    }catch (Exception e) {
                        echo "Failed to Process Test: ${e.message}"
                    }
                }
            }
        }
    }
    
    post {
        always {
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
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
