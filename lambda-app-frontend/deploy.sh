
aws ecr get-login-password --region sa-east-1 | docker login --username AWS --password-stdin 936280927743.dkr.ecr.sa-east-1.amazonaws.com
docker build -t ${PWD##*/} .
docker tag lambda-app-frontend:latest 936280927743.dkr.ecr.sa-east-1.amazonaws.com/lambda-app-frontend:latest
docker push 936280927743.dkr.ecr.sa-east-1.amazonaws.com/lambda-app-frontend:latest
