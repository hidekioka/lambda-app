package com.hidekioka;

import java.net.HttpURLConnection;

import org.json.JSONObject;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.hidekioka.component.DaggerMDNoteComponent;
import com.hidekioka.component.MDNoteComponent;
import com.hidekioka.exception.LambdaException;
import com.hidekioka.service.MDNoteService;
import com.hidekioka.util.LocalUtils;

public class MDNoteFunction {

	private static final String APP_VERSION = "app-version";
	private static final String MESSAGE = "message";
	private static final String ERROR_MISSING_PARAM = "Missing parameter";

	MDNoteComponent component;

	public String hello() {
		return "Hello world!";
	}

	public APIGatewayProxyResponseEvent create(final APIGatewayProxyRequestEvent input, final Context context)
			throws LambdaException {
		APIGatewayProxyResponseEvent response = LocalUtils.buildResponse();
		try {
			if (input == null || input.getQueryStringParameters() == null) {
				throw new LambdaException(ERROR_MISSING_PARAM);
			}
			String title = input.getQueryStringParameters().get("title");
			String description = input.getQueryStringParameters().get("description");
			if (title == null) {
				throw new LambdaException(ERROR_MISSING_PARAM + ": title", null);
			} else if (description == null) {
				throw new LambdaException(ERROR_MISSING_PARAM + ": description", null);
			}
			getService().create(title, description);
			JSONObject body = new JSONObject();
			body.put(APP_VERSION, LocalUtils.getApplicationVersion());
			body.put(MESSAGE, "Created");
			return response.withStatusCode(HttpURLConnection.HTTP_CREATED).withBody(body.toString());
		} catch (LambdaException e) {
			return LocalUtils.buildErrorResponse(response, e);
		}
	}

	public APIGatewayProxyResponseEvent load(final APIGatewayProxyRequestEvent input, final Context context) {
		APIGatewayProxyResponseEvent response = LocalUtils.buildResponse();
		try {
			String functionReturnString = getService().findAll();
			JSONObject body = new JSONObject();
			body.put(APP_VERSION, LocalUtils.getApplicationVersion());
			body.put(MESSAGE, functionReturnString);
			return response.withStatusCode(HttpURLConnection.HTTP_OK).withBody(body.toString());
		} catch (LambdaException e) {
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
			getService().remove(selectedId);
			JSONObject body = new JSONObject();
			body.put(APP_VERSION, LocalUtils.getApplicationVersion());
			body.put(MESSAGE, "Removed");
			return response.withStatusCode(HttpURLConnection.HTTP_OK).withBody(body.toString());
		} catch (LambdaException e) {
			return LocalUtils.buildErrorResponse(response, e);
		}
	}

	public APIGatewayProxyResponseEvent update(final APIGatewayProxyRequestEvent input, final Context context)
			throws LambdaException {
		APIGatewayProxyResponseEvent response = LocalUtils.buildResponse();
		try {
			if (input == null || input.getQueryStringParameters() == null) {
				throw new LambdaException(ERROR_MISSING_PARAM);
			}
			String selectedId = input.getQueryStringParameters().get("id");
			if (selectedId == null) {
				throw new LambdaException(ERROR_MISSING_PARAM + ": id", null);
			}
			getService().update(selectedId, input.getQueryStringParameters());
			JSONObject body = new JSONObject();
			body.put(APP_VERSION, LocalUtils.getApplicationVersion());
			body.put(MESSAGE, "Removed");
			return response.withStatusCode(HttpURLConnection.HTTP_OK).withBody(body.toString());
		} catch (LambdaException e) {
			return LocalUtils.buildErrorResponse(response, e);
		}
	}

	private MDNoteService getService() {
		if (component == null) {
			component = DaggerMDNoteComponent.create();
		}
		return component.getMDNoteService();
	}
}
