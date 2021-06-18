pipeline {
    agent { dockerfile true }
    stages {
        stage('build') {
            steps {
                sh 'node --version'
                sh 'npm install'
            }
        }
         stage('Test') { 
            steps {
                echo 'echo Test....'
                sh 'npm run test'
            }
        }
        stage('Deploy') { 
            steps {
                echo 'echo Deploy....'
            }
        }
    }
}