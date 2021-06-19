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
                echo 'Push new docker image to Repo'
                echo 'ssh to web server and tell it to pull new image'
                sh 'docker run -d -p 3000:3000 -e DB_URI=mongodb://127.0.0.1:27017 --network host node-mongo'
            }
        }
    }
}