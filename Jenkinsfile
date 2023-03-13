pipeline{
    agent any
    stages{
        stage('Stage 1'){
            steps{
                sh '/usr/local/bin/docker compose build'
                sh '/opt/homebrew/bin/kubectl create -f kube.yaml'
            }
        }
    }
}
//checking JIRA integration