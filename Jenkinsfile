pipeline {
    agent any
    options {
        skipDefaultCheckout()
    }

    stages {
        stage('Clean Workspace') {
            steps {
                sh 'rm -rf * .git* reports || true'
                sh 'mkdir -p reports'
            }
        }

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
                    sleep 60
                '''
            }
        }

        stage('API Tests') {
            steps {
                ansiColor('xterm') {
                    sh '''
                        chmod +x ./scripts/run_vitest_tests.sh
                        ./scripts/run_vitest_tests.sh
                    '''
                }
            }
            post {
                always {
                    junit 'reports/vitest-*.xml'
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'reports',
                        reportFiles: 'vitest-report.html',
                        reportName: 'Vitest HTML Report'
                    ])
                }
            }
        }

        stage('UI Tests') {
            steps {
                sh '''
                    chmod +x ./scripts/run_selenium_tests.sh
                    ./scripts/run_selenium_tests.sh
                '''
            }
            post {
                always {
                    junit 'reports/selenium-*.xml'
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'reports',
                        reportFiles: 'selenium-report.html',
                        reportName: 'Selenium HTML Report'
                    ])
                }
            }
        }

        stage('Load Tests') {
            steps {
                sh '''
                    chmod +x ./scripts/run_locust_tests.sh
                    ./scripts/run_locust_tests.sh
                '''
            }
            post {
                always {
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'reports',
                        reportFiles: 'locust_report.html',
                        reportName: 'Locust Load Test Report'
                    ])
                    archiveArtifacts 'reports/locust_report.html'
                }
            }
        }
    }

    post {
        always {
            echo "СТАТУС: ${currentBuild.currentResult}"
            archiveArtifacts 'reports/**/*'

            junit 'reports/**/*.xml'
        }
        success {
            echo "ВСЕ ТЕСТЫ ПРОЙДЕНЫ УСПЕШНО"
        }
        failure {
            echo "ТЕСТЫ ЗАВЕРШИЛИСЬ С ОШИБКАМИ"
        }
    }
}