pipeline {
    agent any

    stages {
        stage('Initializing QEMU') {
            steps {
                script {
                    echo "ЗАПУСК QEMU..."
                    sh '''
                        chmod +x ./scripts/start_qemu.sh
                        ./scripts/start_qemu.sh
                        echo "⏳ Ждем 120 секунд пока QEMU запустится..."
                        sleep 120
                        echo "✅ QEMU должен быть готов"
                    '''
                }
            }
        }

        stage('API Tests') {
            steps {
                script {
                    echo "ЗАПУСК API ТЕСТОВ..."
                    sh '''
                        chmod +x ./scripts/run_vitest_tests.sh
                        ./scripts/run_vitest_tests.sh
                    '''
                }
            }
        }

        stage('UI Tests') {
            steps {
                script {
                    echo "ЗАПУСК UI ТЕСТОВ..."
                    sh '''
                        chmod +x ./scripts/run_selenium_tests.sh
                        ./scripts/run_selenium_tests.sh
                    '''
                }
            }
        }

        stage('Load Tests') {
            steps {
                script {
                    echo "ЗАПУСК НАГРУЗОЧНЫХ ТЕСТОВ..."
                    sh '''
                        chmod +x ./scripts/run_locust_tests.sh
                        ./scripts/run_locust_tests.sh
                    '''
                }
            }
        }
    }

    post {
        always {
            echo "ЗАВЕРШЕНИЕ ПАЙПЛАЙНА"
            sh '''
                echo "СТАТУС ВЫПОЛНЕНИЯ"
                echo "Pipeline: ${currentBuild.currentResult}"
                date
            '''
        }
        success {
            echo "ВСЕ ТЕСТЫ УСПЕШНО ЗАВЕРШЕНЫ!"
        }
        failure {
            echo "ТЕСТЫ ЗАВЕРШИЛИСЬ С ОШИБКАМИ"
        }
    }
}