pipeline{
    agent any
    stages{
        stage('Stage 1'){
            steps{
                sh 'lavanyaseetharaman docker compose build'
                sh 'lavanyaseetharaman kubectl create -f kube.yaml'
            }
        }
    }
}