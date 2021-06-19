pipeline {
    agent { dockerfile true }
    environment {
        DB_URI = credentials('DB_URI')
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
                echo 'echo Test....'
                sh 'npm install -D'
                sh 'npm run test'
            }
        }
        stage('build') {
            steps {
                echo 'echo Build docker image....'
                sh 'docker build -t node-mongo .'
            }
        }
        stage('Deploy devint') {
            when { tag 'devint-*' }
                environment {
                    PORT = 3000
                    STAGE = 'DevInt'
                }
            steps {
                echo 'echo Deploy....DevInt'
                // echo 'Push new docker image to Repo'
                // echo 'ssh to web server and tell it to pull new image'
                sh 'docker stop my_container_devint || true'
                sh 'docker rm my_container_devint || true'
                /* groovylint-disable-next-line LineLength */
                sh 'docker run -d -e PORT=$PORT -e STAGE=$STAGE -e DB_URI=$DB_URI --network host --name my_container_devint node-mongo'
            }
        }
        stage('Deploy qa') {
            when { tag 'qa-*' }
            environment {
                PORT = 3001
                STAGE = 'QA'
            }
            steps {
                echo 'echo Deploy QA'
                sh 'docker stop my_container_qa || true'
                sh 'docker rm my_container_qa || true'
                /* groovylint-disable-next-line LineLength */
                sh 'docker run -d -e PORT=$PORT -e STAGE=$STAGE -e DB_URI=$DB_URI --network host --name my_container_qa node-mongo'
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
