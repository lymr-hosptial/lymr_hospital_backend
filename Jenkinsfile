pipeline{
    agent any
    stages{
        stage('Stage 1'){
            steps{
                print(" test")
                //bat 'docker compose build'
                //bat 'kubectl create -f kube.yaml'
            }
        }
        stage('SonarQube analysis') {
            steps {
                def scannerHome = tool 'SONAR_RUNNER';
                withSonarQubeEnv(installationName: 'sq1') {
                    bat "\"${scannerHome}\\bin\\sonar-scanner.bat\""
                
               
       
       }
                
                
                }
            }
        }
            
        }
    