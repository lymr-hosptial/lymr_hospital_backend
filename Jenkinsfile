pipeline{
    agent any
    stages{
        stage('Stage 1'){
            steps{
                sh 'sudo -u akabawi docker compose build'
                sh 'kubectl apply -f kube.yaml'
            }
        }
    }
}