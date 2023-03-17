pipeline{
    agent any
    stages{
        stage('Stage 1: Cleanup'){
            steps{
                sh 'sudo -u akabawi kubectl delete -f kube.yaml --ignore-not-found=true'
                sh 'sudo -u akabawi docker rmi auth-im reg-im pd-im &>/dev/null'
            }
        }
        stage('Stage 2: Build Docker Images'){
            steps{
                sh 'sudo -u akabawi docker compose build'
            }
        }
        stage('Stage 3: Deploy Kubernetes Services'){
            steps{
                sh 'sudo -u akabawi kubectl create -f kube.yaml'
            }
        }
    }
}