pipeline{
    agent any
    stages{
       // stage('Stage 1: Cleanup'){
         //   steps{
                //bat ' kubectl delete -f kube.yaml --ignore-not-found=true'
                //bat 'docker rmi auth-im reg-im pd-im &>/dev/null'
           // }
        //}
        stage('Stage 2: Build Docker Images'){
            steps{
               bat 'docker-compose build'
            }
        }
        stage('Stage 3: Deploy Kubernetes Services'){
            steps{
               bat 'kubectl create -f kube.yaml'
            }
        }
    }
}