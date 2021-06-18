pipeline {
    agent { 
            dockerfile true 
            label 'docker-node'
        }
    stages {
        stage('build') {
            steps {
                sh 'node --version'
                sh 'npm install'
            }
        }
    }
}