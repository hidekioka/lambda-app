#Based on https://docs.aws.amazon.com/lambda/latest/dg/java-image.html#java-image-base
FROM public.ecr.aws/amazoncorretto/amazoncorretto:11 as base
COPY target/*.jar ./
COPY target/dependency/*.jar ./
ENTRYPOINT [ "/usr/bin/java", "-cp", "./*", "com.amazonaws.services.lambda.runtime.api.client.AWSLambda" ]
CMD [ "com.hidekioka.NoteFunction::load" ]