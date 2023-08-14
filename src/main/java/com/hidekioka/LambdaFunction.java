package com.hidekioka;

import static com.hidekioka.LocalUtils.LINE_BREAK;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.Properties;

import com.amazonaws.services.lambda.runtime.Context;

public class LambdaFunction {
	static final String DATE_PATTERN = "yyyy/MM/dd HH:mm:ss a z";
	String version = "";

	private String getApplicationVersion() {
		if (version.isEmpty()) {
			try {
				Properties properties = new Properties();
				properties.load(this.getClass().getClassLoader().getResourceAsStream("application.properties"));
				version = getApplicationVersion();
			} catch (IOException e) {
				// Could not load version
			}
		}
		return version;

	}

	public String hello() {
		return "Hello world!";
	}

	public String function(Map<String, String> input, Context context) throws IOException, SQLException {
		String returnText = LocalUtils.textWithVersion(getApplicationVersion(), "Nothing done!");
		String function = input.get("function");
		LocalUtils.logWithClass(this.getClass().toString(), context.getLogger(), "Calling function: " + function);
		if (function != null) {
			if (function.equals("hello")) {
				returnText = LocalUtils.textWithVersion(getApplicationVersion(), "Hello world!");
			} else if (function.equals("create")) {
				returnText = create();
			} else if (function.equals("load")) {
				returnText = load();
			} else if (function.equals("remove") || function.equals("delete")) {
				returnText = remove();
			}
		}
		return returnText;
	}

	public String create() {
		insertDB();
		return LocalUtils.textWithVersion(getApplicationVersion(), "Created!");
	}

	public String load() {
		return LocalUtils.textWithVersion(getApplicationVersion(), findAllDB());
	}

	public String remove() {
		removeDB();
		return LocalUtils.textWithVersion(getApplicationVersion(), "Removed!");
	}

	private void insertDB() {
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		try {
			con = LocalUtils.connect();
			stmt = con.createStatement();
			String text = "random text at time: " + new SimpleDateFormat(DATE_PATTERN).format(new Date());
			stmt.executeUpdate("insert into text (text) values ('" + text + "')");

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			LocalUtils.closeQuietly(rs);
			LocalUtils.closeQuietly(stmt);
			LocalUtils.closeQuietly(con);
		}
	}

	private String findAllDB() {
		StringBuilder sb = new StringBuilder();
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		try {
			con = LocalUtils.connect();
			stmt = con.createStatement();

			rs = stmt.executeQuery("select text from text");
			while (rs.next()) {
				sb.append(rs.getString(1) + LINE_BREAK);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			LocalUtils.closeQuietly(rs);
			LocalUtils.closeQuietly(stmt);
			LocalUtils.closeQuietly(con);
		}
		return sb.toString();
	}

	private void removeDB() {
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		try {
			con = LocalUtils.connect();
			stmt = con.createStatement();
			stmt.executeUpdate("delete from text");
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			LocalUtils.closeQuietly(rs);
			LocalUtils.closeQuietly(stmt);
			LocalUtils.closeQuietly(con);
		}
	}
}
