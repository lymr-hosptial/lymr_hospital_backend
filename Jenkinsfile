pipeline{
    agent any
    stages{
        stage('Stage 1'){
            steps{
                sh 'docker compose build'
                sh 'kubectl create -f kube.yaml'
            }
        }
    }
}