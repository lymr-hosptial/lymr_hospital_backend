pipeline{
    agent any
    stages{
        stage('Stage 1'){
            steps{
                sh 'sudo -u lavanyaseetharaman docker compose build'
                sh 'sudo -u lavanyaseetharaman kubectl create -f kube.yaml'
            }
        }
    }
}