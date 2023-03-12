pipeline{
    agent any
    stages{
        stage('Stage 1'){
            steps{
                sh 'sudo -u akabawi kubectl delete pod authenticaion registration patientdata'
                sh 'sudo -u akabawi kubectl delete service auth-service reg-service pd-service'
                sh 'sudo -u akabawi docker rmi localhost:5000/auth-im localhost:5000/reg-im localhost:5000/pd-im'
                sh 'sudo -u akabawi docker compose build'
                sh 'sudo -u akabawi kubectl create -f kube.yaml'
            }
        }
    }
}