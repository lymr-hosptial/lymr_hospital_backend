pipeline{
    agent any
    stages{
        stage('Stage 1'){
            steps{
                sh 'sudo -u akabawi kubectl delete -f kube.yaml --ignore-not-found=true'
                sh 'sudo -u akabawi docker rmi auth-im reg-im pd-im &>/dev/null'
                sh 'sudo -u akabawi docker compose build'
                sh 'sudo -u akabawi kubectl create -f kube.yaml'
            }
        }
    }
}