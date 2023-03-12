pipeline{
    agent any
    stages{
        stage('Stage 1'){
            steps{
                sh 'docker-compose up'
                //sh 'kubectl create -f kube.yaml'
            }
        }
    }
}