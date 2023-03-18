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
               bat 'java -jar "D:\Program Files\OWASP\Zed Attack Proxy"\zap-2.12.0.jar -cmd -quickurl https://localhost:30002/ -quickout "D:\Program Files\OWASP\Zed Attack Proxy"\Auth.out' 
               bat 'java -jar "D:\Program Files\OWASP\Zed Attack Proxy"\zap-2.12.0.jar -cmd -quickurl https://localhost:30003/ -quickout "D:\Program Files\OWASP\Zed Attack Proxy"\Reg.out'
               bat 'java -jar "D:\Program Files\OWASP\Zed Attack Proxy"\zap-2.12.0.jar -cmd -quickurl https://localhost:30004/ -quickout "D:\Program Files\OWASP\Zed Attack Proxy"\PD.out'

            }
        }
       
}
}   
