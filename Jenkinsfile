pipeline {
    agent any

    stages {
        stage('Git Clone') {
            steps {
                sh '''
                    git clone --depth 1 https://github.com/evdmatvey/tpo_7.git tmp_repo
                    mv tmp_repo/* .
                    mv tmp_repo/.* . || true
                    rm -rf tmp_repo
                    ls -la
                '''
            }
        }

        stage('Initializing QEMU') {
            steps {
                sh '''
                    chmod +x ./scripts/start_qemu.sh
                    ./scripts/start_qemu.sh &
                    sleep 120
                '''
            }
        }

        stage('API Tests') {
            steps {
                sh '''
                    chmod +x ./scripts/run_vitest_tests.sh
                    ./scripts/run_vitest_tests.sh
                '''
            }
        }

        stage('UI Tests') {
            steps {
                sh '''
                    chmod +x ./scripts/run_selenium_tests.sh
                    ./scripts/run_selenium_tests.sh
                '''
            }
        }

        stage('Load Tests') {
            steps {
                sh '''
                    chmod +x ./scripts/run_locust_tests.sh
                    ./scripts/run_locust_tests.sh
                '''
            }
        }
    }

    post {
        always {
            echo "СТАТУС: ${currentBuild.currentResult}"
        }
    }
}