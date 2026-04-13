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
                bat 'npm install'
            }
        }

        stage('Build for Dev') {
            when {
                branch 'dev'
            }
            steps {
                echo 'This is TEST build (dev branch)'
            }
        }

        stage('Build for Main') {
            when {
                branch 'main'
            }
            steps {
                echo 'This is PRODUCTION build (main branch)'
            }
        }
    }
}