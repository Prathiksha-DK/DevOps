pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Code pulled from GitHub'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'echo Jenkins is running on Linux container'
            }
        }

        stage('Build for Dev') {
            when {
                branch 'dev'
            }
            steps {
                echo 'This is TEST build for dev branch'
            }
        }

        stage('Build for Main') {
            when {
                branch 'main'
            }
            steps {
                echo 'This is PRODUCTION build for main branch'
            }
        }
    }
}