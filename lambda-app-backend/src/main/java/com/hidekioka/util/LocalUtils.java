package com.hidekioka.util;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.stream.Collectors;

import org.json.JSONObject;

import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.hidekioka.exception.LambdaException;

public class LocalUtils {

	public static final String LINE_BREAK = "<br/>" + System.lineSeparator();
	static final String DEFAULT_URL = "jdbc:postgresql://postgres.ceuekxnc0ork.sa-east-1.rds.amazonaws"
			+ ".com:5432/postgres";
	static final String DEFAULT_USER = "postgres";
	static final String DEFAULT_PASSWORD = "postgres";
	static String version = "";

	public static String getApplicationVersion() {
		if (version.isEmpty()) {
			try {
				Properties properties = new Properties();
				properties.load(LocalUtils.class.getClassLoader().getResourceAsStream("application.properties"));
				version = properties.getProperty("app.version");
			} catch (IOException e) {
				// Could not load version
			}
		}
		return version;
	}

	private LocalUtils() {
		throw new IllegalStateException("Utility class");
	}

	public static void logWithClass(String classDesc, LambdaLogger logger, String text) {
		logger.log("[" + classDesc + "] " + text);
	}

	public static String textWithVersion(String version, String text) {
		return "[" + version + "] " + LINE_BREAK + text;
	}

	public static APIGatewayProxyResponseEvent buildResponse() {
		Map<String, String> headers = new HashMap<>();
		headers.put("Content-Type", "application/json");
        // CORS in the backend: https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html
        //		headers.put("Access-Control-Allow-Headers", "Content-Type,X-Amz-Date,Authorization,X-Api-Key,
        //		X-Amz-Security-Token");
        headers.put("Access-Control-Allow-Headers", "*");
        headers.put("Access-Control-Allow-Methods", "*");
        headers.put("Access-Control-Allow-Origin", "*");

		APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent().withHeaders(headers);
		return response;
	}

	public static APIGatewayProxyResponseEvent buildErrorResponse(APIGatewayProxyResponseEvent response, Exception e) {
		JSONObject body = new JSONObject();
		body.append("app-version", LocalUtils.getApplicationVersion());
		body.append("message", e.getMessage());
		return response.withBody(body.toString()).withStatusCode(HttpURLConnection.HTTP_INTERNAL_ERROR);
	}

	public static void removeDB(String table) throws LambdaException {
		removeDB(table, "1=1");
	}

	public static void removeDB(String table, String whereClause) throws LambdaException {
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		try {
			con = LocalUtils.connect();
			stmt = con.createStatement();
			String deleteClause = "delete from " + table + " where " + whereClause;
			stmt.executeUpdate(deleteClause);
		} catch (SQLException e) {
			e.printStackTrace();
			throw new LambdaException(e.getMessage(), e);
		} finally {
			LocalUtils.closeQuietly(rs);
			LocalUtils.closeQuietly(stmt);
			LocalUtils.closeQuietly(con);
		}
	}

	public static Connection connect() throws SQLException {
		String dbUrl = System.getenv("DB_URL");
		String dbUser = System.getenv("DB_USER");
		String dbPassword = System.getenv("DB_PASSWORD");
		Connection conn = DriverManager.getConnection(dbUrl != null && !dbUrl.isBlank() ? dbUrl : DEFAULT_URL,
				dbUser != null && !dbUser.isBlank() ? dbUser : DEFAULT_USER,
				dbPassword != null && !dbPassword.isBlank() ? dbPassword : DEFAULT_PASSWORD);
		return conn;
	}

	public static List<Map<String, Object>> findAllDB(String table) throws LambdaException {
		List<Map<String, Object>> resultList = new ArrayList<>();
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		try {
			con = LocalUtils.connect();
			stmt = con.createStatement();

			rs = stmt.executeQuery("select * from " + table + " order by id");
			ResultSetMetaData metaData = rs.getMetaData();
			Integer columnCount = metaData.getColumnCount();
			while (rs.next()) {
				Map<String, Object> row = new HashMap<>();
				for (int i = 1; i <= columnCount; i++) {
					row.put(metaData.getColumnName(i), rs.getObject(i));
				}
				resultList.add(row);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new LambdaException(e.getMessage(), e);
		} finally {
			LocalUtils.closeQuietly(rs);
			LocalUtils.closeQuietly(stmt);
			LocalUtils.closeQuietly(con);
		}
		return resultList;
	}

	public static void insertDB(String table, Map<String, Object> params) throws LambdaException {
		Connection con = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		try {
			con = LocalUtils.connect();
			String keys = params.entrySet().stream().map(Map.Entry::getKey).collect(Collectors.joining(","));
//			String values = params.entrySet().stream().map(a -> "'" + a.getValue().toString() + "'")
//					.collect(Collectors.joining(","));
			String questionMarks = params.entrySet().stream().map(a -> "?").collect(Collectors.joining(","));
			stmt = con.prepareStatement("insert into " + table + " ( " + keys + " ) values (" + questionMarks + ")");
			int count = 1;
			for (Object value : params.values()) {
				stmt.setString(count, value.toString());
				count++;
			}
			System.err.print("insert into " + table + " ( " + questionMarks + " ) values (" + questionMarks + ")");
			System.err.print(stmt.getMetaData());
			System.err.print(stmt.getParameterMetaData());
			System.err.print(stmt);

			stmt.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw new LambdaException(e.getMessage(), e);
		} finally {
			LocalUtils.closeQuietly(rs);
			LocalUtils.closeQuietly(stmt);
			LocalUtils.closeQuietly(con);
		}
	}

	public static void updateDB(String table, Map.Entry<String, String> param, String whereClause)
			throws LambdaException {
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		try {
			con = LocalUtils.connect();
			stmt = con.createStatement();
			String updateClause = "update " + table + " set " + param.getKey() + " = '" + param.getValue() + "' where"
					+ " " + whereClause;
			stmt.executeUpdate(updateClause);
		} catch (SQLException e) {
			e.printStackTrace();
			throw new LambdaException(e.getMessage(), e);
		} finally {
			LocalUtils.closeQuietly(rs);
			LocalUtils.closeQuietly(stmt);
			LocalUtils.closeQuietly(con);
		}
	}

	public static void closeQuietly(ResultSet rs) {
		if (rs != null) {
			try {
				rs.close();
			} catch (SQLException e) {
				/* Ignored */
			}
		}
	}

	public static void closeQuietly(Statement stmt) {
		if (stmt != null) {
			try {
				stmt.close();
			} catch (SQLException e) {
				/* Ignored */
			}
		}
	}

	public static void closeQuietly(Connection con) {
		if (con != null) {
			try {
				con.close();
			} catch (SQLException e) {
				/* Ignored */
			}
		}
	}
}