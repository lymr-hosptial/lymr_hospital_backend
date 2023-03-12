pipeline{
    agent any
    stages{
        stage('Stage 1'){
            steps{
                bat 'docker-compose up'
                bat 'kubectl create -f kube.yaml'
            }
        }
    }
}