pipeline{
    agent any
    stages{
        stage('Stage 1: Cleanup'){
            steps{
                sh """sudo -u akabawi kubectl delete -f kube.yaml --ignore-not-found=true"""
                sh """sudo -u akabawi docker rmi auth-im reg-im pd-im &>/dev/null"""
            }
        }
        stage('Stage 2: Code Quality and Security Testing'){
            steps{
                withSonarQubeEnv(installationName: 'sq1'){
                    sh """sudo sonar-scanner -D sonar.projectKey=project1 -D sonar.login=squ_672bb83dddf07fddc58f76b4a9beacc7206ffd4f"""
                 }
            }
        }
        stage('Stage 3: Unit Testing'){
            steps{
                dir('authentication'){
                    sh 'sudo -u akabawi npm test'}
                // sh 'cd ../patientdata'
                // sh 'sudo -u akabawi npm test'
                // sh 'cd ../registration'
                // sh 'sudo -u akabawi npm test'
            }
        }
        stage('Stage 4: Build Docker Images'){
            steps{
                sh 'sudo -u akabawi docker compose build'
            }
        }        
        stage('Stage 5: Deploy Kubernetes Services'){
            steps{
                sh 'sudo -u akabawi kubectl create -f kube.yaml'
            }
        }
        // stage('Stage 6: Active Security Testing'){
        //     steps{
        //         sh """sudo /home/akabawi/Downloads/ZAP_2.12.0/zap.sh -cmd -port 8089 -quickurl https://localhost:30002/ -quickout /home/akabawi/Documents/out-auth.html -quickprogress 2>/dev/null"""
        //         sh """sudo /home/akabawi/Downloads/ZAP_2.12.0/zap.sh -cmd -port 8089 -quickurl https://localhost:30003/ -quickout /home/akabawi/Documents/out-reg.html -quickprogress 2>/dev/null"""
        //         sh """sudo /home/akabawi/Downloads/ZAP_2.12.0/zap.sh -cmd -port 8089 -quickurl https://localhost:30004/ -quickout /home/akabawi/Documents/out-pd.html -quickprogress 2>/dev/null"""  
        //     }
        // }
    }
}