mvn clean package -Pcontainer
aws ecr get-login-password --region sa-east-1 | docker login --username AWS --password-stdin 936280927743.dkr.ecr.sa-east-1.amazonaws.com
docker build -t aws-lambda-container-complex .
docker tag aws-lambda-container-complex:latest 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest
docker push 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest
echo "update-function-code --function-name java-container-create"
aws lambda update-function-code --function-name java-container-create --image-uri 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest 2>&1 > /dev/null
echo "update-function-code --function-name java-container-create"
aws lambda update-function-code --function-name java-container-load --image-uri 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest 2>&1 > /dev/null
echo "update-function-code --function-name java-container-create"
aws lambda update-function-code --function-name java-container-delete --image-uri 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest 2>&1 > /dev/null
echo "update-function-code --function-name java-container-create"
aws lambda update-function-code --function-name java-container-update --image-uri 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest 2>&1 > /dev/null
echo "update-function-code --function-name md-notes-create"
aws lambda update-function-code --function-name md-notes-create --image-uri 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest 2>&1 > /dev/null
echo "update-function-code --function-name md-notes-load"
aws lambda update-function-code --function-name md-notes-load --image-uri 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest 2>&1 > /dev/null
echo "update-function-code --function-name md-notes-delete"
aws lambda update-function-code --function-name md-notes-delete --image-uri 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest 2>&1 > /dev/null
echo "update-function-code --function-name md-notes-update"
aws lambda update-function-code --function-name md-notes-update --image-uri 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest 2>&1 > /dev/null
mvn clean package
echo "update-function-code --function-name web-notes-create"
aws lambda update-function-code --function-name web-notes-create --zip-file fileb://target/lambda-app-backend.jar 2>&1 > /dev/null
echo "update-function-code --function-name web-notes-load"
aws lambda update-function-code --function-name web-notes-load --zip-file fileb://target/lambda-app-backend.jar 2>&1 > /dev/null
echo "update-function-code --function-name web-notes-delete"
aws lambda update-function-code --function-name web-notes-delete --zip-file fileb://target/lambda-app-backend.jar 2>&1 > /dev/null
echo "update-function-code --function-name web-notes-update"
aws lambda update-function-code --function-name web-notes-update --zip-file fileb://target/lambda-app-backend.jar 2>&1 > /dev/null
date +"%r"