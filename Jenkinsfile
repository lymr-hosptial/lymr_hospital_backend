pipeline{
    agent any
    stages{
        stage('Stage 1: Cleanup'){
            steps{
                bat ' kubectl delete -f kube.yaml --ignore-not-found=true'
                //bat 'docker rmi auth-im reg-im pd-im &>/dev/null'
           }
        }
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
        stage('Stage 4: RUN ZAP SCAN'){
            steps{
               bat 'set PATH = "%ZAPPOXY_HOME%;%PATH%"'
               bat 'java -jar zap-2.12.0.jar -cmd -quickurl https://localhost:30002/ -quickout Auth.out'
               bat 'java -jar zap-2.12.0.jar -cmd -quickurl https://localhost:30003/ -quickout Reg.out'
               bat 'java -jar zap-2.12.0.jar -cmd -quickurl https://localhost:30004/ -quickout PD.out'

            }
        }
       
}
}   
