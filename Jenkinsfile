pipeline{
    agent any
    stages{
        stage('Stage 1'){
            steps{
                bat 'docker-compose version'
                //sh 'kubectl create -f kube.yaml'
            }
        }
    }
}