pipeline {
    agent { dockerfile true }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
                echo 'echo Test....'
                sh 'npm install'
                sh 'npm run test'
            }
        }
        stage('build') {
            steps {
                echo 'echo Build docker image....'
                sh 'docker build -t node-mongo .'
            }
        }
        stage('Deploy') {
            when { tag "release-*" }
            steps {
                echo 'echo Deploy....'
                // echo 'Push new docker image to Repo'
                // echo 'ssh to web server and tell it to pull new image'
                sh 'docker stop my_container || true'
                sh 'docker rm my_container || true'
                sh 'docker run -d -p 3000:3000 -e DB_URI=mongodb://127.0.0.1:27017 --network host --name my_container node-mongo'
            }
        }
        stage('Cleanup') {
            steps {
                echo 'prune and cleanup'
                sh 'npm prune'
                sh 'rm node_modules -rf'
            }
        }
    }
}
