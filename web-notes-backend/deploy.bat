mvn clean package -Pcontainer
aws ecr get-login-password --region sa-east-1 | docker login --username AWS --password-stdin 936280927743.dkr.ecr.sa-east-1.amazonaws.com
docker build  --platform linux/arm64 -t  aws-lambda-container-complex .
docker tag aws-lambda-container-complex:latest 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest
docker push 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest
