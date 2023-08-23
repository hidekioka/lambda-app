package com.hidekioka;

import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;

import java.io.IOException;
import java.sql.*;
import java.util.*;
import java.util.stream.Collectors;

class LocalUtils {

    public static final String LINE_BREAK = "<br/>" + System.lineSeparator();
    static final String DEFAULT_URL = "jdbc:postgresql://ec2-15-229-32-184.sa-east-1.compute.amazonaws" +
            ".com:5432/postgres";
    static final String DEFAULT_USER = "postgres";
    static final String DEFAULT_PASSWORD = "";
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
        headers.put("X-Custom-Header", "application/json");
        headers.put("Access-Control-Allow-Origin", "*");
        headers.put("Access-Control-Allow-Origin", "*");

        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent().withHeaders(headers);
        return response;
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
                dbPassword != null && !dbPassword.isBlank() ? dbPassword :
                        DEFAULT_PASSWORD);
        return conn;
    }

    public static List<Map<String, Object>> findAllDB(String table) throws LambdaException {
        List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
        StringBuilder sb = new StringBuilder();
        Connection con = null;
        Statement stmt = null;
        ResultSet rs = null;
        try {
            con = LocalUtils.connect();
            stmt = con.createStatement();

            rs = stmt.executeQuery("select * from " + table);
            ResultSetMetaData metaData = rs.getMetaData();
            Integer columnCount = metaData.getColumnCount();
            while (rs.next()) {
                Map<String, Object> row = new HashMap<String, Object>();
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
        Statement stmt = null;
        ResultSet rs = null;
        try {
            con = LocalUtils.connect();
            stmt = con.createStatement();
            String keys = params.entrySet().stream()
                    .map(Map.Entry::getKey).collect(Collectors.joining(","));
            String values = params.entrySet().stream()
                    .map(a -> a.getValue().toString()).collect(Collectors.joining(","));
            stmt.executeUpdate("insert into " + table + " ( " + keys + " ) values ('" + values + "')");

        } catch (SQLException e) {
            e.printStackTrace();
            throw new LambdaException(e.getMessage(), e);
        } finally {
            LocalUtils.closeQuietly(rs);
            LocalUtils.closeQuietly(stmt);
            LocalUtils.closeQuietly(con);
        }
    }

    public static void updateDB(String table, Map.Entry<String, String> param, String whereClause) throws LambdaException {
        Connection con = null;
        Statement stmt = null;
        ResultSet rs = null;
        try {
            con = LocalUtils.connect();
            stmt = con.createStatement();
            String updateClause = "update " + table + " set " + param.getKey() + " = '" + param.getValue() + "' where " + whereClause;
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