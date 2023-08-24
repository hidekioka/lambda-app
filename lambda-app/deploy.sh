docker kill $(docker ps -q)
mvn clean package -Pcontainer
aws ecr get-login-password --region sa-east-1 | docker login --username AWS --password-stdin 936280927743.dkr.ecr.sa-east-1.amazonaws.com
docker build -t aws-lambda-container-complex .
docker run -d -v ~/.aws-lambda-rie:/aws-lambda -p 9001:8080  --entrypoint /aws-lambda/aws-lambda-rie     aws-lambda-container-complex     /usr/bin/java -cp './*' com.amazonaws.services.lambda.runtime.api.client.AWSLambda com.hidekioka.NoteFunction::load
curl "http://localhost:9001/2015-03-31/functions/function/invocations" -d '{"key1": "value1"}'

docker tag aws-lambda-container-complex:latest 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest
docker push 936280927743.dkr.ecr.sa-east-1.amazonaws.com/aws-lambda-container-complex:latest
