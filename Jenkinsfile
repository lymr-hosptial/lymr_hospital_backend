pipeline{
    agent any
    stages{
        stage('Stage 1'){
            steps{
                sh '/usr/local/bin/docker compose build'
                sh 'kubectl create -f kube.yaml'
            }
        }
    }
}