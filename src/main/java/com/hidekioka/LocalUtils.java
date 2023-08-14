package com.hidekioka;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.amazonaws.services.lambda.runtime.LambdaLogger;

class LocalUtils {

	public static final String LINE_BREAK = "<br/>" + System.lineSeparator();
	static final String URL = "jdbc:postgresql://ec2-15-229-32-184.sa-east-1.compute.amazonaws.com:5432/postgres";
	static final String USER = "postgres";
	static final String PASSWORD = "";

	private LocalUtils() {
		throw new IllegalStateException("Utility class");
	}

	public static void logWithClass(String classDesc, LambdaLogger logger, String text) {
		logger.log("[" + classDesc + "] " + text);
	}

	public static String textWithVersion(String version, String text) {
		return "[" + version + "] " + LINE_BREAK + text;
	}

	public static Connection connect() throws SQLException {
		Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
		return conn;
	}

	public static void closeQuietly(ResultSet rs) {
		if (rs != null) {
			try {
				rs.close();
			} catch (SQLException e) {
				/* Ignored */}
		}
	}

	public static void closeQuietly(Statement stmt) {
		if (stmt != null) {
			try {
				stmt.close();
			} catch (SQLException e) {
				/* Ignored */}
		}
	}

	public static void closeQuietly(Connection con) {
		if (con != null) {
			try {
				con.close();
			} catch (SQLException e) {
				/* Ignored */}
		}
	}
}