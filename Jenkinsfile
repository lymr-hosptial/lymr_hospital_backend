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
                withSonarQubeEnv(installationName: 'sq1') {
                    bat 'mvn clean org.sonarsource.scanner.maven:sonar-maven-plugin:3.9.0.2155:sonar'
                }
            }
        }
            
        }
    }
