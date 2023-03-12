pipeline{
    agent any
    stages{
        stage('Stage 1'){
            steps{
                sh 'sudo -u makram docker compose build'
                sh 'sudo -u makram kubectl create -f kube.yaml'
            }
        }
    }
}