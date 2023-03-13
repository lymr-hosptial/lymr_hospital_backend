pipeline{
    agent any
    stages{
        stage('Stage 1'){
            steps{
                'docker compose build'
                'kubectl create -f kube.yaml'
            }
        }
    }
}