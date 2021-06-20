pipeline {
    agent { docker { image 'node:14' } }
    environment {
        registry = 'cotcac/node1'
        registryCredential = 'dockerhub_auth'
        dockerImage = ''
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
            // Build local image
            // steps {
            //     echo 'echo Build docker image....'
            //     sh 'docker build -t node-mongo .'
            // }

            // Build upload to github.
            steps {
                script {
                    dockerImage = docker.build registry + ':latest'
                }
            }
        }
        stage('Deploy pro') {
            environment {
                PORT = 3002
                STAGE = 'production'
            }
            steps {
                echo 'echo Deploy production'
                // Deploy locally
                // sh 'docker stop my_container_pro || true'
                // sh 'docker rm my_container_pro || true'
                // /* groovylint-disable-next-line LineLength */
                // sh 'docker run -d -e PORT=$PORT -e STAGE=$STAGE -e DB_URI=$DB_URI --network host --name my_container_pro node-mongo'

                // Uploading Docker images into Docker Hub
                script {
                    /* groovylint-disable-next-line NestedBlockDepth */
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }
                }
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
                sh 'docker rmi $registry:$BUILD_NUMBER'
            }
        }
    }
}
