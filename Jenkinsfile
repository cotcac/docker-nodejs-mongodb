pipeline {
    agent { dockerfile true }
    stages {
        stage('build') {
            steps {
                sh 'node --version'
                sh 'npm install'
            }
        }
    }
}