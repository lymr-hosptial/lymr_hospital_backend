pipeline{
    agent any
    stages{
        stage('Stage 1'){
            steps{
                sh ''' sudo -u akabawi -i 'docker compose up -d' '''
            }
        }
    }
}