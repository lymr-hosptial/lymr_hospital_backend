pipeline{
    agent any
    stages{
        stage('Build Containers'){
            steps{
                print(" test")
                //bat 'docker compose build'
                //bat 'kubectl create -f kube.yaml'
            }
        }
        stage('SonarQube analysis') {
            steps {
               // def scannerHome = tool 'SONAR_RUNNER';
                withSonarQubeEnv(installationName: 'sq1') {
                    bat "C:\\temp\\sonar-scanner-cli-4.8.0.2856-windows\\sonar-scanner-4.8.0.2856-windows\\bin\\sonar-scanner.bat"
                
               
       
       }
               
                
                }

        }

        stage('Quality Gate') {
            steps {
               timeout(time:5, unit: 'MINUTES')  {
                    waitForQualityGate abortPipeline: true
                
               
       
       }
                
                
                }
            
            }
        }
            
        }
    