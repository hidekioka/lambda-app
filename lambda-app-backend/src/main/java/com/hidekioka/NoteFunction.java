package com.hidekioka;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.hidekioka.component.DaggerNoteComponent;
import com.hidekioka.component.NoteComponent;
import com.hidekioka.exception.LambdaException;
import com.hidekioka.service.NoteService;
import com.hidekioka.util.LocalUtils;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class NoteFunction {

    private static final String APP_VERSION = "app-version";
    private static final String MESSAGE = "message";
    private static final String ERROR_MISSING_PARAM = "Missing parameter";
    NoteComponent noteComponent;

    public String hello() {
        return "Hello world!";
    }

    public APIGatewayProxyResponseEvent create(final APIGatewayProxyRequestEvent input, final Context context) throws LambdaException {
        APIGatewayProxyResponseEvent response = LocalUtils.buildResponse();
        try {
            if (input == null || input.getQueryStringParameters() == null) {
                throw new LambdaException(ERROR_MISSING_PARAM);
            }
            String text = input.getQueryStringParameters().get("text");
            if (text == null) {
                throw new LambdaException(ERROR_MISSING_PARAM + ": text", null);
            }
            String token = input.getQueryStringParameters().get("token");
            if (token == null) {
                throw new LambdaException(ERROR_MISSING_PARAM + ": token", null);
            }
            getService().create(text, LocalUtils.getEmailFromToken(token));
            JSONObject body = new JSONObject();
            body.put(APP_VERSION, LocalUtils.getApplicationVersion());
            body.put(MESSAGE, "Created");
            return response.withStatusCode(HttpURLConnection.HTTP_CREATED).withBody(body.toString());
        } catch (LambdaException e) {
            e.printStackTrace();
            return LocalUtils.buildErrorResponse(response, e);
        }
    }

    public APIGatewayProxyResponseEvent load(final APIGatewayProxyRequestEvent input, final Context context) {
        APIGatewayProxyResponseEvent response = LocalUtils.buildResponse();
        try {
            if (input == null || input.getQueryStringParameters() == null) {
                throw new LambdaException(ERROR_MISSING_PARAM);
            }
            String token = input.getQueryStringParameters().get("token");
            if (token == null) {
                throw new LambdaException(ERROR_MISSING_PARAM + ": token", null);
            }
            String functionReturnString = getService().findAll(LocalUtils.getEmailFromToken(token));
            JSONObject body = new JSONObject();
            body.put(APP_VERSION, LocalUtils.getApplicationVersion());
            body.put(MESSAGE, functionReturnString);
            return response.withStatusCode(HttpURLConnection.HTTP_OK).withBody(body.toString());
        } catch (LambdaException e) {
            e.printStackTrace();
            return LocalUtils.buildErrorResponse(response, e);
        }
    }

    public APIGatewayProxyResponseEvent delete(final APIGatewayProxyRequestEvent input, final Context context) {
        return remove(input, context);
    }

    public APIGatewayProxyResponseEvent remove(final APIGatewayProxyRequestEvent input, final Context context) {
        APIGatewayProxyResponseEvent response = LocalUtils.buildResponse();
        try {
            if (input == null || input.getQueryStringParameters() == null) {
                throw new LambdaException(ERROR_MISSING_PARAM);
            }
            String selectedId = input.getQueryStringParameters().get("id");
            if (selectedId == null) {
                throw new LambdaException(ERROR_MISSING_PARAM + ": id", null);
            }
            String token = input.getQueryStringParameters().get("token");
            if (token == null) {
                throw new LambdaException(ERROR_MISSING_PARAM + ": token", null);
            }
            getService().remove(selectedId);
            JSONObject body = new JSONObject();
            body.put(APP_VERSION, LocalUtils.getApplicationVersion());
            body.put(MESSAGE, "Removed");
            return response.withStatusCode(HttpURLConnection.HTTP_OK).withBody(body.toString());
        } catch (LambdaException e) {
            e.printStackTrace();
            return LocalUtils.buildErrorResponse(response, e);
        }
    }

    public APIGatewayProxyResponseEvent update(final APIGatewayProxyRequestEvent input, final Context context) throws LambdaException {
        APIGatewayProxyResponseEvent response = LocalUtils.buildResponse();
        try {
            if (input == null || input.getQueryStringParameters() == null) {
                throw new LambdaException(ERROR_MISSING_PARAM);
            }
            String selectedId = input.getQueryStringParameters().get("id");
            if (selectedId == null) {
                throw new LambdaException(ERROR_MISSING_PARAM + ": id", null);
            }
            String token = input.getQueryStringParameters().get("token");
            if (token == null) {
                throw new LambdaException(ERROR_MISSING_PARAM + ": token", null);
            }
            String text = input.getQueryStringParameters().get("text");
            getService().update(selectedId, text);
            JSONObject body = new JSONObject();
            body.put(APP_VERSION, LocalUtils.getApplicationVersion());
            body.put(MESSAGE, "Removed");
            return response.withStatusCode(HttpURLConnection.HTTP_OK).withBody(body.toString());
        } catch (LambdaException e) {
            e.printStackTrace();
            return LocalUtils.buildErrorResponse(response, e);
        }
    }

    private NoteService getService() {
        if (noteComponent == null) {
            noteComponent = DaggerNoteComponent.create();
        }
        return noteComponent.getNoteService();
    }
}
