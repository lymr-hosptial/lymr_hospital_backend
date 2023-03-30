pipeline{
    agent any
    stages{
        stage('Stage 1: Cleanup'){
            steps{
                sh 'sudo -u akabawi kubectl delete -f kube.yaml --ignore-not-found=true'
                sh 'sudo -u akabawi docker rmi auth-im reg-im pd-im &>/dev/null'
            }
        }
        // stage('Stage 2: Unit Testing'){
        //     steps{
        //         sh 'cd authentication'
        //         sh 'sudo -u akabawi npm run test'
        //         sh 'cd ../patientdata'
        //         sh 'sudo -u akabawi npm run test'
        //         sh 'cd ../registration'
        //         sh 'sudo -u akabawi npm run test'
        //     }
        //}
        stage('Stage 3: Build Docker Images'){
            steps{
                sh 'sudo -u akabawi docker compose build'
            }
        }        
        stage('Stage 4: Deploy Kubernetes Services'){
            steps{
                sh 'sudo -u akabawi kubectl create -f kube.yaml'
            }
        }
        stage('Stage 5: Security Testing'){
            steps{
                sh """sudo ./zap.sh -cmd -port 8089 -quickurl https://localhost:30002/ -quickout /home/akabawi/out.html -quickprogress"""
                sh """sudo ./zap.sh -cmd -port 8089 -quickurl https://localhost:30003/ -quickout /home/akabawi/out.html -quickprogress"""
                sh """sudo ./zap.sh -cmd -port 8089 -quickurl https://localhost:30004/ -quickout /home/akabawi/out.html -quickprogress"""
                // withSonarQubeEnv(installationName: 'sq1'){
                //     sh """sudo -u akabawi /home/akabawi/sonar-scanner-4.2.0.1873-linux/bin/sonar-scanner"""
                // }
                
            }
        }
    }
}