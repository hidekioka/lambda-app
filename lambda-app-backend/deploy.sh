mvn clean package -Pcontainer
aws ecr get-login-password --region sa-east-1 | docker login --username AWS --password-stdin 936280927743.dkr.ecr.sa-east-1.amazonaws.com
docker build -t aws-lambda-container-complex .
docker tag aws-lambda-container-complex:latest 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest
docker push 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest
aws lambda update-function-code --function-name java-container-create --image-uri 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest 2>&1 > /dev/null
aws lambda update-function-code --function-name java-container-load --image-uri 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest 2>&1 > /dev/null
aws lambda update-function-code --function-name java-container-delete --image-uri 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest 2>&1 > /dev/null
aws lambda update-function-code --function-name java-container-update --image-uri 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest 2>&1 > /dev/null
aws lambda update-function-code --function-name md-note-create --image-uri 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest 2>&1 > /dev/null
aws lambda update-function-code --function-name md-note-load --image-uri 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest 2>&1 > /dev/null
aws lambda update-function-code --function-name md-note-delete --image-uri 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest 2>&1 > /dev/null
aws lambda update-function-code --function-name md-note-update --image-uri 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest 2>&1 > /dev/null
mvn clean package
aws lambda update-function-code --function-name web-notes-create --zip-file fileb://target/lambda-web-notes-backend.jar 2>&1 > /dev/null
aws lambda update-function-code --function-name web-notes-load --zip-file fileb://target/lambda-web-notes-backend.jar 2>&1 > /dev/null
aws lambda update-function-code --function-name web-notes-delete --zip-file fileb://target/lambda-web-notes-backend.jar 2>&1 > /dev/null
aws lambda update-function-code --function-name web-notes-update --zip-file fileb://target/lambda-web-notes-backend.jar 2>&1 > /dev/null
