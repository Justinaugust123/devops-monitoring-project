environment {
    IMAGE_NAME = "justinaugust123/devops-monitoring-app"
    IMAGE_TAG = "${BUILD_NUMBER}"
}

stage('Build Docker Image') {
    steps {
        sh '''
            docker build \
              -t ${IMAGE_NAME}:${IMAGE_TAG} \
              -t ${IMAGE_NAME}:latest \
              .
        '''
    }
}

stage('Docker Login') {
    steps {
        withCredentials([
            usernamePassword(
                credentialsId: 'dockerhub-credentials',
                usernameVariable: 'DOCKER_USERNAME',
                passwordVariable: 'DOCKER_PASSWORD'
            )
        ]) {
            sh '''
                echo "$DOCKER_PASSWORD" | docker login \
                  -u "$DOCKER_USERNAME" \
                  --password-stdin
            '''
        }
    }
}

stage('Push Docker Image') {
    steps {
        sh '''
            docker push ${IMAGE_NAME}:${IMAGE_TAG}
            docker push ${IMAGE_NAME}:latest
        '''
    }
}
