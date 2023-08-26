package com.hidekioka.exception;

public class LambdaException extends Exception {

	private static final long serialVersionUID = -1319019707869982297L;

	public LambdaException(String message) {
		super(message);
	}

	public LambdaException(String message, Throwable cause) {
		super(message, cause);
	}
}
