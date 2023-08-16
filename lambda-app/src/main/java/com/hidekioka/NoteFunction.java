package com.hidekioka;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;

import java.net.HttpURLConnection;

public class NoteFunction {
    NoteComponent noteComponent;

    public String hello() {
        return "Hello world!";
    }

    public APIGatewayProxyResponseEvent create(final APIGatewayProxyRequestEvent input, final Context context) throws LambdaException {
        APIGatewayProxyResponseEvent response = LocalUtils.buildResponse();
        try {
            if (input == null || input.getQueryStringParameters() == null || input.getQueryStringParameters().get(
                    "text") == null) {
                throw new LambdaException("Missing parameter: text", null);
            }
            getNoteService().create(input.getQueryStringParameters().get("text"));
            String body =

                    String.format("{ \"app-version\": \"" + LocalUtils.getApplicationVersion() + "\", \"message\": " +
                            "\"" + "Created" + "\"}");

            return response.withStatusCode(HttpURLConnection.HTTP_CREATED).withBody(body);
        } catch (LambdaException e) {
            String body = String.format("{ \"message\": \"" + e.getMessage());
            return response.withBody(body).withStatusCode(HttpURLConnection.HTTP_INTERNAL_ERROR);
        }
    }

    public APIGatewayProxyResponseEvent load(final APIGatewayProxyRequestEvent input, final Context context) {
        APIGatewayProxyResponseEvent response = LocalUtils.buildResponse();
        try {
            String functionReturnString = getNoteService().findAll();
            String body =
                    String.format("{ \"app-version\": " + LocalUtils.getApplicationVersion() + "\"message\": " + functionReturnString);

            return response.withStatusCode(HttpURLConnection.HTTP_OK).withBody(body);
        } catch (LambdaException e) {
            String body = String.format("{ \"message\": \"" + e.getMessage());
            return response.withBody(body).withStatusCode(HttpURLConnection.HTTP_INTERNAL_ERROR);
        }
    }

    public APIGatewayProxyResponseEvent delete() throws LambdaException {
        return remove();
    }

    public APIGatewayProxyResponseEvent remove() {
        APIGatewayProxyResponseEvent response = LocalUtils.buildResponse();
        try {
            getNoteService().remove();
            String body =
                    String.format("{ \"app-version\": " + LocalUtils.getApplicationVersion() + "\"message\": \"" +
                            "Removed" + "\"}");

            return response.withStatusCode(HttpURLConnection.HTTP_OK).withBody(body);
        } catch (LambdaException e) {
            String body = String.format("{ \"message\": \"" + e.getMessage());
            return response.withBody(body).withStatusCode(HttpURLConnection.HTTP_INTERNAL_ERROR);
        }
    }

    private NoteService getNoteService() {
        if (noteComponent == null) {
            noteComponent = DaggerNoteComponent.create();
        }
        return noteComponent.getNoteService();
    }
}
