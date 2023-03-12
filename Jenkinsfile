pipeline{
    agent any
    stages{
        stage('Stage 1'){
            steps{
                bat 'docker-compose build'
                bat 'kubectl create -f kube.yaml'
            }
        }
    }
}