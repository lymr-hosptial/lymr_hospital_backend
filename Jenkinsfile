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
        stage('Scan') {
            steps {
                def scannerHome = tool 'SONAR_RUNNER';
                withSonarQubeEnv(installationName: 'sq1') {
                    //bat 'C:\temp\apache-maven-3.9.0-bin\apache-maven-3.9.0\bin\mvn clean org.sonarsource.scanner.maven:sonar-maven-plugin:3.9.0.2155:sonar'
                   //withSonarQubeEnv('SonarQube') {
                    bat "\"${scannerHome}\\bin\\sonar-scanner.bat\""
       }
}
                }
            }
        }
            
        
    
